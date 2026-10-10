import { describe, expect, it } from 'vitest';

import { classifyHref } from '@lib/markdown/href';

describe('classifyHref', () => {
  it('lets only http, https and mailto out to the browser', () => {
    expect(classifyHref('https://example.com/a?b#c')).toEqual({
      kind: 'external',
      url: 'https://example.com/a?b#c',
    });
    expect(classifyHref('HTTP://example.com')).toEqual({
      kind: 'external',
      url: 'http://example.com/',
    });
    expect(classifyHref('mailto:a@b.co')).toEqual({ kind: 'external', url: 'mailto:a@b.co' });
  });

  it.each([
    'javascript:alert(1)',
    'JavaScript:alert(1)',
    '  javascript:alert(1)',
    'vbscript:x',
    'data:text/html,<script>1</script>',
    'file:///etc/passwd',
    'C:\\Windows',
    '//evil.example/x',
    '',
    '#',
    '?only=query',
    '%E0%A4%A',
  ])('refuses %j', (href) => {
    expect(classifyHref(href)).toEqual({ kind: 'refused' });
  });

  it('reads a fragment as an anchor, decoded', () => {
    expect(classifyHref('#caf%C3%A9')).toEqual({ kind: 'anchor', id: 'café' });
  });

  it('reads a path as relative to the file, decoded, fragment and query dropped', () => {
    expect(classifyHref('docs/a%20b.md#part')).toEqual({
      kind: 'relative',
      path: 'docs/a b.md',
      fromRoot: false,
    });
    expect(classifyHref('../x.md?raw=1')).toEqual({
      kind: 'relative',
      path: '../x.md',
      fromRoot: false,
    });
  });

  it('reads a leading slash as the repository root, as GitHub does', () => {
    expect(classifyHref('/docs/x.md')).toEqual({
      kind: 'relative',
      path: 'docs/x.md',
      fromRoot: true,
    });
  });
});
