/**
 * What a link in a previewed markdown file may do.
 *
 * A security predicate: the file is written by whoever can push to the repo,
 * and the preview renders in the app's own document. Only `http`, `https` and
 * `mailto` become navigable anchors (and main's `isSafeExternalUrl` still
 * checks those). A relative path is a request to main, which decides through
 * `fs:resolve` whether it names a file in the project. Every other scheme,
 * protocol-relative `//host` included, renders as plain text.
 */
export type HrefKind =
  | { kind: 'anchor'; id: string }
  | { kind: 'relative'; path: string; fromRoot: boolean }
  | { kind: 'external'; url: string }
  | { kind: 'refused' };

export type RelativeHref = Extract<HrefKind, { kind: 'relative' }>;

const REFUSED: HrefKind = { kind: 'refused' };
const SCHEME = /^([a-zA-Z][a-zA-Z0-9+.-]*):/;
const EXTERNAL_SCHEMES = new Set(['http', 'https', 'mailto']);

const decode = (text: string): string | null => {
  try {
    return decodeURIComponent(text);
  } catch {
    return null;
  }
};

export function classifyHref(href: string): HrefKind {
  const value = href.trim();
  if (value === '' || value.startsWith('//')) return REFUSED;

  if (value.startsWith('#')) {
    const id = decode(value.slice(1));
    return id ? { kind: 'anchor', id } : REFUSED;
  }

  const scheme = SCHEME.exec(value)?.[1]?.toLowerCase();
  if (scheme !== undefined) {
    if (!EXTERNAL_SCHEMES.has(scheme)) return REFUSED;
    try {
      return { kind: 'external', url: new URL(value).href };
    } catch {
      return REFUSED;
    }
  }

  const path = decode(value.split(/[?#]/, 1)[0] ?? '');
  if (!path) return REFUSED;
  return path.startsWith('/')
    ? { kind: 'relative', path: path.replace(/^\/+/, ''), fromRoot: true }
    : { kind: 'relative', path, fromRoot: false };
}
