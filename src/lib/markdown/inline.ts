import type { Token, Tokens } from 'marked';

import type { MdInline } from '@lib/markdown/model';

/**
 * marked's inline tokens → {@link MdInline}.
 *
 * marked escapes inline `text`, `codespan` and `escape` tokens because its own
 * renderer writes HTML strings. This app renders React elements, which escape
 * on their own, so the text is unescaped here — otherwise `a & b` would show
 * as `a &amp; b`.
 */

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

export const unescapeHtml = (text: string): string =>
  text.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity] ?? entity);

export function convertInlines(tokens: Token[] | undefined): MdInline[] {
  const out: MdInline[] = [];

  for (const token of tokens ?? []) {
    switch (token.type) {
      case 'text': {
        const text = token as Tokens.Text;
        // A tight list item's text nests its own inline tokens.
        if (text.tokens) out.push(...convertInlines(text.tokens));
        else out.push({ kind: 'text', text: unescapeHtml(text.text) });
        break;
      }
      case 'escape':
        out.push({ kind: 'text', text: unescapeHtml((token as Tokens.Escape).text) });
        break;
      case 'strong':
        out.push({ kind: 'strong', children: convertInlines((token as Tokens.Strong).tokens) });
        break;
      case 'em':
        out.push({ kind: 'em', children: convertInlines((token as Tokens.Em).tokens) });
        break;
      case 'del':
        out.push({ kind: 'del', children: convertInlines((token as Tokens.Del).tokens) });
        break;
      case 'codespan':
        out.push({ kind: 'code', text: unescapeHtml((token as Tokens.Codespan).text) });
        break;
      case 'br':
        out.push({ kind: 'br' });
        break;
      case 'link': {
        const link = token as Tokens.Link;
        out.push({ kind: 'link', href: link.href, children: convertInlines(link.tokens) });
        break;
      }
      case 'image': {
        const image = token as Tokens.Image;
        out.push({ kind: 'image', src: image.href, alt: image.text });
        break;
      }
      default:
        // Anything this model has no node for shows its own source.
        out.push({ kind: 'text', text: token.raw });
    }
  }

  return out;
}

/** The text of some inline nodes, for a heading's anchor. */
export function plainText(nodes: MdInline[]): string {
  return nodes
    .map((node) => {
      switch (node.kind) {
        case 'text':
        case 'code':
          return node.text;
        case 'image':
          return node.alt;
        case 'br':
          return ' ';
        default:
          return plainText(node.children);
      }
    })
    .join('');
}
