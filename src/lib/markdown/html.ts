import type { InlineTag } from '@lib/markdown/model';

/**
 * Raw HTML inside markdown, decided tag by tag.
 *
 * A security predicate. The preview never hands a string to the DOM as markup;
 * this scanner only splits HTML into pieces so the converters can map a short
 * allowlist (`details`, `summary`, `br`, `kbd`, `sub`, `sup`, and `img` as a
 * placeholder) to model nodes, and show everything else — `<script>`, `on*=`
 * attributes, `<a href="javascript:…">` — as its own literal text. No
 * attribute survives except `open` on `details`, read by the block converter.
 */
export type HtmlPiece =
  | { kind: 'open'; tag: string; attrs: string; raw: string; selfClosing: boolean }
  | { kind: 'close'; tag: string; raw: string }
  | { kind: 'comment' }
  | { kind: 'text'; text: string };

const PIECE =
  /<!--[\s\S]*?-->|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:\s[^<>]*?)?)\s*(\/?)>|[^<]+|</g;

export function scanHtml(html: string): HtmlPiece[] {
  const pieces: HtmlPiece[] = [];
  for (const match of html.matchAll(PIECE)) {
    const [raw, closeTag, openTag, attrs = '', slash] = match;
    if (raw.startsWith('<!--')) pieces.push({ kind: 'comment' });
    else if (closeTag) pieces.push({ kind: 'close', tag: closeTag.toLowerCase(), raw });
    else if (openTag) {
      pieces.push({
        kind: 'open',
        tag: openTag.toLowerCase(),
        attrs,
        raw,
        selfClosing: slash === '/',
      });
    } else pieces.push({ kind: 'text', text: raw });
  }
  return pieces;
}

export const isInlineTag = (tag: string): tag is InlineTag =>
  tag === 'kbd' || tag === 'sub' || tag === 'sup';

/** An `<img>`'s `src` and `alt`, for the placeholder chip. Nothing is fetched. */
export function imgAttributes(attrs: string): { src: string; alt: string } {
  const read = (name: string): string => {
    const match = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i').exec(attrs);
    return match?.[1] ?? match?.[2] ?? '';
  };
  return { src: read('src'), alt: read('alt') };
}
