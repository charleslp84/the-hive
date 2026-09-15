/**
 * File paths in terminal output.
 *
 * The pure half of terminal file links: what in a line *looks like* a path,
 * and where its `:line:col` suffix ends. Whether any of it is a file on disk
 * is main's question (`electron/main/fs/resolve.ts`), and this module is
 * deliberately generous because of that split — a false positive costs one
 * `null` in a round trip that was already being made, while a false negative
 * is a path the user can see and cannot click.
 *
 * No `@xterm` import, and none of `features/`, `data/` or `stores/`:
 * `components/terminal/**` may import neither, and putting the whole decision
 * here is what makes it testable against a table of real compiler output
 * instead of against a rendered terminal.
 */

/** A path-shaped run in one line. `start` is 0-based, `end` exclusive. */
export interface FileLinkCandidate {
  text: string;
  start: number;
  end: number;
}

/**
 * One path segment: may begin with a dot, never ends with one.
 *
 * Both halves are load-bearing. A leading dot is how `~/.claude/settings.json`
 * and every other hidden directory is spelled; refusing a trailing one is what
 * keeps `see src/a.ts.` from yielding a path with the sentence's full stop
 * stuck to it, which main would then refuse and the user would see as a dead
 * spot on a path that is plainly there.
 */
const SEGMENT = String.raw`\.?[\w@+-]+(?:\.[\w@+-]+)*`;

/** `~/`, `./`, `../` or a leading `/`. Anything else starts mid-segment. */
const PREFIX = String.raw`(?:~\/|\.{1,2}\/|\/)?`;

/** `:12`, `:12:7`, or tsc's `(12,7)`. */
const POSITION = String.raw`(?:\(\d+,\d+\)|:\d+(?::\d+)?)?`;

/**
 * Either a path with a separator in it (`src/lib`, and also `and/or`, which
 * main will refuse) or a bare filename carrying an extension
 * (`package.json`). A word with neither matches nothing, which is what keeps
 * `Test Files 1 failed` dark.
 */
const CANDIDATE = new RegExp(
  [
    `${PREFIX}(?:${SEGMENT}\\/)+${SEGMENT}${POSITION}`,
    `${PREFIX}[\\w@+-]+(?:\\.[\\w@+-]+)+${POSITION}`,
  ].join('|'),
  'gu',
);

/**
 * A URL, so its path can be left alone.
 *
 * Whole spans rather than a look-behind on each candidate, because the
 * candidate does not begin where the URL's path begins: `PREFIX` happily eats
 * the second slash of `//`, so the run found inside `https://claude.ai/x` is
 * `/claude.ai/x` and the text before it ends in a single `:/` that reads like
 * no scheme at all. Comparing spans asks the question that is actually being
 * asked — does this run lie inside a URL — instead of a question about the one
 * character in front of it.
 *
 * The answer matters because a URL's path is already clickable: the web-links
 * addon opens it in the browser. Offering it as a file as well would give one
 * span on screen two different meanings and two different outcomes.
 */
const URL_SPAN = /[a-z][a-z0-9+.-]*:\/\/\S*/giu;

export function findCandidates(line: string): FileLinkCandidate[] {
  const urls = [...line.matchAll(URL_SPAN)].map((match) => {
    const start = match.index ?? 0;
    return { start, end: start + match[0].length };
  });

  const found: FileLinkCandidate[] = [];

  for (const match of line.matchAll(CANDIDATE)) {
    const start = match.index ?? 0;
    const end = start + match[0].length;

    if (urls.some((url) => start < url.end && end > url.start)) continue;
    /*
      A backslash in front means a Windows separator or a shell escape. Neither
      is a path this app can open — and without this, the `a.ts` ending
      `C:\Users\x\a.ts` would be offered on its own, as a relative path in the
      session's own directory, which is a different file entirely.
    */
    if (line.slice(0, start).endsWith('\\')) continue;

    found.push({ text: match[0], start, end });
  }

  return found;
}

/**
 * `a.ts:12:7`, and tsc's `a.ts(12,7)`, into a path and a 1-based position.
 *
 * A zero is dropped rather than kept or clamped: `:0` is what a tool prints
 * when it has no position to report, and turning that into line 1 would put
 * the caret somewhere the output never claimed.
 */
export function splitPosition(text: string): {
  path: string;
  line?: number;
  col?: number;
} {
  const paren = /^(.*)\((\d+),(\d+)\)$/u.exec(text);
  const colon = paren ? null : /^(.*?):(\d+)(?::(\d+))?$/u.exec(text);
  const hit = paren ?? colon;
  if (!hit) return { path: text };

  const path = hit[1] ?? text;
  const line = Number(hit[2]);
  if (line < 1) return { path };

  const col = hit[3] === undefined ? undefined : Number(hit[3]);
  return { path, line, ...(col !== undefined && col >= 1 ? { col } : {}) };
}
