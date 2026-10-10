import { useCallback, useState } from 'react';

import { resolvePaths } from '@lib/explorer/fs-client';
import type { RelativeHref } from '@lib/markdown/href';
import { linkCandidate, linkSessionId } from '@lib/markdown/link-target';
import { useEditorLayout } from '@stores/appearance-store';
import { useEditorActions } from '@stores/editor-store';

interface LinkSource {
  projectId: string;
  relPath: string;
  rootKey: string;
  sessionId?: string;
}

/**
 * Follow a relative link from a previewed file.
 *
 * Main decides whether the link names a file it would serve (`fs:resolve`);
 * the renderer never decides containment. A miss — including a resolve call
 * that failed outright — is named in the pane rather than ignored, because a
 * dead link that does nothing reads as a broken app.
 */
export function useOpenMarkdownLink({ projectId, relPath, rootKey, sessionId }: LinkSource) {
  const { openFile, closeAll } = useEditorActions();
  const { nav } = useEditorLayout();
  const [missing, setMissing] = useState<string | null>(null);

  const open = useCallback(
    async (link: RelativeHref): Promise<void> => {
      const candidate = linkCandidate({ relPath, rootKey }, link);
      const [hit] = await resolvePaths(projectId, linkSessionId({ rootKey, sessionId }), [
        candidate,
      ]).catch(() => [null]);
      if (!hit) {
        setMissing(link.path);
        return;
      }
      setMissing(null);
      // One-at-a-time mode is the caller's policy, exactly as in the explorer.
      if (nav === 'single') closeAll();
      openFile(projectId, hit.relPath, sessionId, hit.rootKey);
    },
    [projectId, relPath, rootKey, sessionId, nav, openFile, closeAll],
  );

  const dismiss = useCallback(() => setMissing(null), []);

  return { open, missing, dismiss };
}
