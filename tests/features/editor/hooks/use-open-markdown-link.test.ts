import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useOpenMarkdownLink } from '@features/editor/hooks/use-open-markdown-link';
import { useAppearanceStore } from '@stores/appearance-store';
import { fileKey, useEditorStore } from '@stores/editor-store';

const { readFile, resolvePaths } = vi.hoisted(() => ({
  readFile: vi.fn(),
  resolvePaths: vi.fn(),
}));
vi.mock('@lib/explorer/fs-client', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@lib/explorer/fs-client')>()),
  readFile,
  resolvePaths,
}));

const README = { projectId: 'demo', relPath: 'README.md', rootKey: '', sessionId: 'sess-1' };
const guide = { kind: 'relative' as const, path: 'docs/guide.md', fromRoot: false };

beforeEach(() => {
  vi.clearAllMocks();
  readFile.mockResolvedValue({ ok: true, value: { text: '# g\n', mtimeMs: 1, size: 4 } });
  useEditorStore.getState().reset();
  useAppearanceStore.getState().reset();
});

describe('useOpenMarkdownLink', () => {
  it('asks main without a session at the project root, then opens the answer', async () => {
    resolvePaths.mockResolvedValue([{ relPath: 'docs/guide.md', rootKey: '' }]);
    const { result } = renderHook(() => useOpenMarkdownLink(README));

    await act(async () => result.current.open(guide));

    expect(resolvePaths).toHaveBeenCalledWith('demo', undefined, ['docs/guide.md']);
    expect(useEditorStore.getState().activeKey).toBe(fileKey('demo', 'docs/guide.md'));
    expect(result.current.missing).toBeNull();
  });

  it('names a link main would not serve, and opens nothing', async () => {
    resolvePaths.mockResolvedValue([null]);
    const { result } = renderHook(() => useOpenMarkdownLink(README));

    await act(async () => result.current.open(guide));

    expect(result.current.missing).toBe('docs/guide.md');
    expect(useEditorStore.getState().openFiles).toHaveLength(0);

    act(() => result.current.dismiss());
    expect(result.current.missing).toBeNull();
  });

  /** A refused or failed IPC call is a miss too — never an unhandled rejection. */
  it('treats a failed resolve call as a miss', async () => {
    resolvePaths.mockRejectedValue(new Error('ipc closed'));
    const { result } = renderHook(() => useOpenMarkdownLink(README));

    await act(async () => result.current.open(guide));

    expect(result.current.missing).toBe('docs/guide.md');
  });

  it('replaces the open file in one-at-a-time mode, as the explorer does', async () => {
    useAppearanceStore.getState().setEditorNav('single');
    resolvePaths.mockResolvedValue([{ relPath: 'docs/guide.md', rootKey: '' }]);
    await act(async () => useEditorStore.getState().openFile('demo', 'README.md'));
    const { result } = renderHook(() => useOpenMarkdownLink(README));

    await act(async () => result.current.open(guide));

    expect(useEditorStore.getState().openFiles.map((file) => file.relPath)).toEqual([
      'docs/guide.md',
    ]);
  });
});
