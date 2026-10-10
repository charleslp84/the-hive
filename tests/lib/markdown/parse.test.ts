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

  it('maps lists, task items and ordered starts', async () => {
    const [bullets] = (await parseMarkdown('- a\n- b\n')).blocks;
    expect(bullets).toMatchObject({
      kind: 'list',
      ordered: false,
      start: 1,
      items: [{ task: false }, { task: false }],
    });

    const [ordered] = (await parseMarkdown('3. a\n4. b\n')).blocks;
    expect(ordered).toMatchObject({ kind: 'list', ordered: true, start: 3 });

    const [tasks] = (await parseMarkdown('- [x] done\n- [ ] todo\n')).blocks;
    expect(tasks).toMatchObject({
      kind: 'list',
      items: [
        {
          task: true,
          checked: true,
          blocks: [{ kind: 'paragraph', children: [{ kind: 'text', text: 'done' }] }],
        },
        { task: true, checked: false },
      ],
    });
  });

  it('maps a quote with its own blocks', async () => {
    const [quote] = (await parseMarkdown('> q\n')).blocks;
    expect(quote).toEqual({
      kind: 'quote',
      line: 0,
      blocks: [{ kind: 'paragraph', line: 0, children: [{ kind: 'text', text: 'q' }] }],
    });
  });

  it('maps a table with alignment and inline cells', async () => {
    const [table] = (await parseMarkdown('| a | b | c |\n|:-|:-:|-:|\n| `c` | d | e |\n')).blocks;
    expect(table).toEqual({
      kind: 'table',
      line: 0,
      align: ['left', 'center', 'right'],
      header: [
        [{ kind: 'text', text: 'a' }],
        [{ kind: 'text', text: 'b' }],
        [{ kind: 'text', text: 'c' }],
      ],
      rows: [
        [[{ kind: 'code', text: 'c' }], [{ kind: 'text', text: 'd' }], [{ kind: 'text', text: 'e' }]],
      ],
    });
  });

  it('gives every heading a unique anchor, nested ones included', async () => {
    const { blocks } = await parseMarkdown('# Intro\n\n> ## Intro\n\n- ## Intro\n');
    const ids = [
      blocks[0],
      blocks[1]?.kind === 'quote' ? blocks[1].blocks[0] : null,
      blocks[2]?.kind === 'list' ? blocks[2].items[0]?.blocks[0] : null,
    ].map((block) => (block?.kind === 'heading' ? block.id : null));
    expect(ids).toEqual(['intro', 'intro-1', 'intro-2']);
  });
});
