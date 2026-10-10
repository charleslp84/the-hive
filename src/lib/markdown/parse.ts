import type { Lexer, Token, Tokens } from 'marked';

import { convertInlines, unescapeHtml } from '@lib/markdown/inline';
import type { MdBlock, MdDocument } from '@lib/markdown/model';

/**
 * Markdown text → {@link MdDocument}.
 *
 * `marked` is imported lazily, like the editor's grammars: a session that never
 * previews a file never loads it. The promise is cached, so only the first
 * preview waits for the chunk.
 */
let loading: Promise<{ Lexer: typeof Lexer }> | null = null;
const loadMarked = () => (loading ??= import('marked'));

export async function parseMarkdown(text: string): Promise<MdDocument> {
  const { Lexer } = await loadMarked();
  // marked normalises line endings itself; doing it first keeps `raw` findable.
  const source = text.replace(/\r\n?/g, '\n');
  const tokens = Lexer.lex(source, { gfm: true });
  return { blocks: convertBlocks(tokens, lineLocator(source)) };
}

/**
 * Where each top-level token starts, as a 0-based source line.
 *
 * Found by searching for the token's `raw` from a moving cursor, not by summing
 * `raw` lengths: marked consumes a link-reference definition (`[a]: http://x`)
 * without emitting a token, so a running sum drifts by every definition above
 * the block. A `raw` that cannot be found keeps the previous line, which costs
 * sync precision and nothing else.
 */
function lineLocator(source: string): (raw: string) => number {
  let cursor = 0;
  let line = 0;

  const advance = (to: number) => {
    for (let index = cursor; index < to; index += 1) {
      if (source.charCodeAt(index) === 10) line += 1;
    }
    cursor = to;
  };

  return (raw) => {
    const at = source.indexOf(raw, cursor);
    if (at === -1) return line;
    advance(at);
    const start = line;
    advance(at + raw.length);
    return start;
  };
}

function convertBlocks(tokens: Token[], at: (raw: string) => number): MdBlock[] {
  const blocks: MdBlock[] = [];
  for (const token of tokens) {
    // Every token goes through the locator, `space` included, so the cursor moves.
    const line = at(token.raw);
    const block = convertBlock(token, line);
    if (block) blocks.push(block);
  }
  return blocks;
}

function convertBlock(token: Token, line: number): MdBlock | null {
  switch (token.type) {
    case 'heading': {
      const heading = token as Tokens.Heading;
      return {
        kind: 'heading',
        line,
        depth: heading.depth,
        id: '',
        children: convertInlines(heading.tokens),
      };
    }
    case 'paragraph':
      return {
        kind: 'paragraph',
        line,
        children: convertInlines((token as Tokens.Paragraph).tokens),
      };
    case 'text': {
      // A list item's body, and stray top-level text.
      const text = token as Tokens.Text;
      return {
        kind: 'paragraph',
        line,
        children: text.tokens
          ? convertInlines(text.tokens)
          : [{ kind: 'text', text: unescapeHtml(text.text) }],
      };
    }
    case 'code': {
      const code = token as Tokens.Code;
      // The info string's first word: ```ts title="x" is TypeScript.
      return {
        kind: 'code',
        line,
        lang: (code.lang ?? '').trim().split(/\s+/)[0] ?? '',
        text: code.text,
      };
    }
    case 'blockquote':
      return {
        kind: 'quote',
        line,
        blocks: convertBlocks((token as Tokens.Blockquote).tokens, () => line),
      };
    case 'list': {
      const list = token as Tokens.List;
      return {
        kind: 'list',
        line,
        ordered: list.ordered,
        start: typeof list.start === 'number' ? list.start : 1,
        items: list.items.map((item) => ({
          task: item.task,
          checked: item.checked ?? false,
          blocks: convertBlocks(item.tokens, () => line),
        })),
      };
    }
    case 'table': {
      const table = token as Tokens.Table;
      return {
        kind: 'table',
        line,
        align: table.align,
        header: table.header.map((cell) => convertInlines(cell.tokens)),
        rows: table.rows.map((row) => row.map((cell) => convertInlines(cell.tokens))),
      };
    }
    case 'hr':
      return { kind: 'hr', line };
    default:
      // `space`, and the kinds later tasks add.
      return null;
  }
}
