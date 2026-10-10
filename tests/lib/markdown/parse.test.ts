import { describe, expect, it } from 'vitest';

import { parseMarkdown } from '@lib/markdown/parse';

describe('parseMarkdown', () => {
  it('maps headings, paragraphs, fences and rules with their source lines', async () => {
    const { blocks } = await parseMarkdown(
      '# Title\n\nPara\n\n```ts title\nconst a = 1;\n```\n\n---\n',
    );

    expect(blocks).toEqual([
      {
        kind: 'heading',
        line: 0,
        depth: 1,
        id: expect.any(String),
        children: [{ kind: 'text', text: 'Title' }],
      },
      { kind: 'paragraph', line: 2, children: [{ kind: 'text', text: 'Para' }] },
      { kind: 'code', line: 4, lang: 'ts', text: 'const a = 1;' },
      { kind: 'hr', line: 8 },
    ]);
  });

  /*
    marked consumes a link-reference definition without emitting a token, so a
    running sum of `raw` lengths would put every later block two lines early.
  */
  it('keeps lines true below a link-reference definition', async () => {
    const { blocks } = await parseMarkdown('[a]: http://x\n\n# H\n\npara\n');
    expect(blocks.map((block) => block.line)).toEqual([2, 4]);
  });

  it('counts CRLF documents by line, not by byte', async () => {
    const { blocks } = await parseMarkdown('# A\r\n\r\nb\r\n');
    expect(blocks.map((block) => block.line)).toEqual([0, 2]);
  });
});
