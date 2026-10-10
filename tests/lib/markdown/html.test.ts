import { describe, expect, it } from 'vitest';

import { imgAttributes, isInlineTag, scanHtml } from '@lib/markdown/html';

describe('scanHtml', () => {
  it('splits tags, text and comments, lowercasing names', () => {
    expect(scanHtml('<Details open>x<!-- c --></details><br/>')).toEqual([
      { kind: 'open', tag: 'details', attrs: ' open', raw: '<Details open>', selfClosing: false },
      { kind: 'text', text: 'x' },
      { kind: 'comment' },
      { kind: 'close', tag: 'details', raw: '</details>' },
      { kind: 'open', tag: 'br', attrs: '', raw: '<br/>', selfClosing: true },
    ]);
  });

  it('treats a stray < as text', () => {
    expect(scanHtml('a < b')).toEqual([
      { kind: 'text', text: 'a ' },
      { kind: 'text', text: '<' },
      { kind: 'text', text: ' b' },
    ]);
  });
});

describe('isInlineTag', () => {
  it('admits kbd, sub and sup only', () => {
    expect(['kbd', 'sub', 'sup', 'script', 'a', 'img'].map(isInlineTag)).toEqual([
      true,
      true,
      true,
      false,
      false,
      false,
    ]);
  });
});

describe('imgAttributes', () => {
  it('reads src and alt and nothing else', () => {
    expect(imgAttributes(' src="a.png" alt=\'A\' onerror="boom()"')).toEqual({
      src: 'a.png',
      alt: 'A',
    });
    expect(imgAttributes(' onerror="x"')).toEqual({ src: '', alt: '' });
  });
});
