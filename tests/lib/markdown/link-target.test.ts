import { describe, expect, it } from 'vitest';

import { linkCandidate, linkSessionId } from '@lib/markdown/link-target';

const rel = (path: string, fromRoot = false) => ({ kind: 'relative' as const, path, fromRoot });

/*
  The renderer only composes the question; main answers it through
  `fs:resolve`, with realpath and containment. These cases pin the question.
*/
describe('linkCandidate', () => {
  it('joins against the file’s directory and normalises', () => {
    expect(linkCandidate({ relPath: 'docs/guide/a.md', rootKey: '' }, rel('../b.md'))).toBe(
      'docs/b.md',
    );
    expect(linkCandidate({ relPath: 'docs/a.md', rootKey: '' }, rel('./img/../c.md'))).toBe(
      'docs/c.md',
    );
    expect(linkCandidate({ relPath: 'README.md', rootKey: '' }, rel('docs/x.md'))).toBe(
      'docs/x.md',
    );
  });

  it('keeps a climb out of the root, for main to refuse', () => {
    expect(linkCandidate({ relPath: 'README.md', rootKey: '' }, rel('../../etc/passwd'))).toBe(
      '../../etc/passwd',
    );
  });

  it('reads a root-relative link from the root, not the file', () => {
    expect(linkCandidate({ relPath: 'docs/a.md', rootKey: '' }, rel('docs/x.md', true))).toBe(
      'docs/x.md',
    );
  });

  it('is absolute under a widened root', () => {
    expect(linkCandidate({ relPath: 'docs/a.md', rootKey: '/w/tree' }, rel('b.md'))).toBe(
      '/w/tree/docs/b.md',
    );
  });
});

/*
  Main resolves a relative candidate under the session's cwd first. A session
  sitting in a worktree would then answer with the worktree's copy of a file
  the README sits next to in the project root. So a root file asks without a
  session; a widened root needs the session, because only the session names it.
*/
describe('linkSessionId', () => {
  it('omits the session at the project root and keeps it under a widened root', () => {
    expect(linkSessionId({ rootKey: '', sessionId: 'sess-1' })).toBeUndefined();
    expect(linkSessionId({ rootKey: '/w/tree', sessionId: 'sess-1' })).toBe('sess-1');
  });
});
