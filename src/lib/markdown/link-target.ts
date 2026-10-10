import { parentPath } from '@lib/explorer/fs-client';
import type { RelativeHref } from '@lib/markdown/href';

/**
 * The question a followed link asks main, through `fs:resolve`.
 *
 * Composed here; never answered here. Main realpaths the candidate and refuses
 * anything outside the root, so a climb like `../../etc/passwd` is sent as
 * written and comes back `null`. Normalising it away in the renderer would be
 * a second containment check that could disagree with the real one.
 */
function normalise(path: string): string {
  const out: string[] = [];
  for (const part of path.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..' && out.length > 0 && out[out.length - 1] !== '..') out.pop();
    else out.push(part);
  }
  return out.join('/');
}

export function linkCandidate(
  file: { relPath: string; rootKey: string },
  link: RelativeHref,
): string {
  const dir = parentPath(file.relPath);
  const joined = link.fromRoot || dir === '' ? link.path : `${dir}/${link.path}`;
  const relative = normalise(joined);
  // A widened root is named by its absolute path; main checks the candidate against it.
  return file.rootKey === '' ? relative : `${file.rootKey}/${relative}`;
}

/** The session to resolve under: none at the project root, the file's under a widened one. */
export const linkSessionId = (file: { rootKey: string; sessionId?: string }): string | undefined =>
  file.rootKey === '' ? undefined : file.sessionId;
