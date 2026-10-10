import { Lexer, type Tokens } from 'marked';
import { describe, expect, it } from 'vitest';

import { convertInlines, plainText } from '@lib/markdown/inline';

/** The inline nodes of a one-paragraph document. */
const inlinesOf = (source: string) =>
  convertInlines((Lexer.lex(source, { gfm: true })[0] as Tokens.Paragraph).tokens);

describe('convertInlines', () => {
  /*
    marked HTML-escapes inline text for its own renderer. React escapes on its
    own, so text that stayed escaped would render as a literal `&amp;`.
  */
  it('unescapes the text marked escaped', () => {
    expect(inlinesOf('a & b < c "q"')).toEqual([{ kind: 'text', text: 'a & b < c "q"' }]);
  });

  it('maps strong, emphasis and strikethrough', () => {
    expect(inlinesOf('**b** *i* ~~s~~')).toEqual([
      { kind: 'strong', children: [{ kind: 'text', text: 'b' }] },
      { kind: 'text', text: ' ' },
      { kind: 'em', children: [{ kind: 'text', text: 'i' }] },
      { kind: 'text', text: ' ' },
      { kind: 'del', children: [{ kind: 'text', text: 's' }] },
    ]);
  });

  it('unescapes inline code', () => {
    expect(inlinesOf('`<x> & y`')).toEqual([{ kind: 'code', text: '<x> & y' }]);
  });

  it('keeps a link’s href as written', () => {
    expect(inlinesOf('[l](a%20b.md)')).toEqual([
      { kind: 'link', href: 'a%20b.md', children: [{ kind: 'text', text: 'l' }] },
    ]);
  });

  it('turns a bare URL into a link', () => {
    expect(inlinesOf('see https://ex.com')[1]).toEqual({
      kind: 'link',
      href: 'https://ex.com',
      children: [{ kind: 'text', text: 'https://ex.com' }],
    });
  });

  it('keeps an image as source and alt, never a fetch', () => {
    expect(inlinesOf('![alt](p.png)')).toEqual([{ kind: 'image', src: 'p.png', alt: 'alt' }]);
  });

  it('maps a hard break and an escape', () => {
    expect(inlinesOf('a  \nb')).toEqual([
      { kind: 'text', text: 'a' },
      { kind: 'br' },
      { kind: 'text', text: 'b' },
    ]);
    expect(inlinesOf('\\<')).toEqual([{ kind: 'text', text: '<' }]);
  });
});

describe('plainText', () => {
  it('flattens nodes to the text a heading anchor is made from', () => {
    expect(plainText(inlinesOf('Héllo **&** `code` ![pic](p.png)'))).toBe('Héllo & code pic');
  });
});
