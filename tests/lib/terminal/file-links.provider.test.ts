import { describe, expect, it, vi } from 'vitest';

import {
  createFileLinkProvider,
  type FileLink,
  type FileLinkProviderOptions,
} from '@lib/terminal/file-links';

/**
 * The provider half: which candidates become links, and what opens one.
 *
 * Split from `file-links.test.ts` because the questions are different in kind
 * — that file is a table of real compiler output, this one is about a round
 * trip, a memo and a modifier. Nothing here renders a terminal; the buffer is
 * a `readLine` the test supplies, which is the whole reason the provider takes
 * one.
 */

const LINES = [' ❯ src/a.ts:12:7 and src/gone.ts', 'nothing here'];

function provider(over: Partial<FileLinkProviderOptions> = {}) {
  const resolve = vi.fn(async (paths: string[]) =>
    paths.map((path) =>
      path === 'src/a.ts' ? { relPath: 'src/a.ts', rootKey: '' } : null,
    ),
  );
  const open = vi.fn();
  const built = createFileLinkProvider({
    readLine: (y) => LINES[y - 1],
    resolve,
    open,
    isModified: (event) => event.metaKey,
    ...over,
  });

  const links = (y: number): Promise<FileLink[] | undefined> =>
    new Promise((done) => {
      built.provideLinks(y, done);
    });

  return { resolve, open, links };
}

describe('createFileLinkProvider', () => {
  it('asks main for the bare paths and links only what it accepts', async () => {
    const { resolve, links } = provider();
    const result = await links(1);

    // The position is stripped before the round trip: main resolves a file.
    expect(resolve).toHaveBeenCalledWith(['src/a.ts', 'src/gone.ts']);
    expect(result?.map((link) => ({ text: link.text, range: link.range }))).toEqual([
      { text: 'src/a.ts:12:7', range: { start: { x: 4, y: 1 }, end: { x: 16, y: 1 } } },
    ]);
  });

  it('answers undefined for a line with nothing in it, without a round trip', async () => {
    const { resolve, links } = provider();
    expect(await links(2)).toBeUndefined();
    expect(await links(99)).toBeUndefined();
    expect(resolve).not.toHaveBeenCalled();
  });

  it('opens with the position, and only under the modifier', async () => {
    const { open, links } = provider();
    const [link] = (await links(1)) ?? [];

    link?.activate(new MouseEvent('click'), link.text);
    expect(open).not.toHaveBeenCalled();

    link?.activate(new MouseEvent('click', { metaKey: true }), link.text);
    expect(open).toHaveBeenCalledWith({
      relPath: 'src/a.ts',
      rootKey: '',
      line: 12,
      col: 7,
    });
  });

  it('remembers a line by its text, so scrolling back never re-asks', async () => {
    const { resolve, links } = provider();
    await links(1);
    await links(1);
    expect(resolve).toHaveBeenCalledTimes(1);
  });

  /**
   * A hover is a mouse movement, not a request. A resolver that is down must
   * not turn one into an error the user has to dismiss — the text simply does
   * not underline.
   */
  it('treats a rejected resolve as no links', async () => {
    const { links } = provider({ resolve: () => Promise.reject(new Error('down')) });
    expect(await links(1)).toBeUndefined();
  });

  it('forwards hover and leave with the link text', async () => {
    const hover = vi.fn();
    const leave = vi.fn();
    const { links } = provider({ hover, leave });
    const [link] = (await links(1)) ?? [];

    link?.hover?.(new MouseEvent('mousemove'), link.text);
    link?.leave?.(new MouseEvent('mousemove'), link.text);
    expect(hover).toHaveBeenCalledWith('src/a.ts:12:7');
    expect(leave).toHaveBeenCalled();
  });
});
