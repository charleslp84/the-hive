# 031 — Projects Panel

| | |
|---|---|
| **ID** | HIVE-031 |
| **Epic** | Left rail |
| **Depends on** | [030-left-rail.md](030-left-rail.md) |
| **Blocks** | — |
| **Points** | 3 |
| **Location** | `src/features/projects/` — `components/projects-panel.tsx`, `components/project-row.tsx`, `components/session-row.tsx` |

## Story

> As a user, I want a collapsible tree of projects with their live sessions nested
> underneath, so I can see at a glance what's running where and jump into any session's
> terminal in one click.

## Spec

**Project row** (one per fixture project, in fixture order):

- Layout: caret icon (`ph-caret-down` open / `ph-caret-right` collapsed, 11px
  `--cc-subtle`) · project icon (15px `--cc-subtle`) · project name (mono 12.5px,
  ellipsis) · count pill (mono 11px, `--cc-chip` bg, count of **non-done** sessions).
- Click anywhere on the row toggles collapse (`collapsed[projectId]` in store).
- Rows have `margin-top: 10px`, hover bg `--cc-hover`.

**Session row** (nested, only when project expanded; non-done sessions only):

- Line 1: `StatusDot` · session id (mono 12.5px, ellipsis) · status label
  (10.5px 600, status color; `waiting` renders as **"needs input"**).
- Line 2 (indented 15px): branch name, mono 10.5px `--cc-subtle`, ellipsis.
- Padding `3px 10px 3px 26px`; active session (open tab) gets `--cc-active` bg;
  hover `--cc-hover`.
- Click → `openTab(sessionId)` ([040-center-stage.md](040-center-stage.md)).

## Acceptance criteria

- [ ] All 5 projects render with correct counts (e.g. `apfm-web` shows its 2 active
      sessions; `tz-fix` and `ecs-scaling` are done → excluded from counts and lists).
- [ ] Collapse state persists across left-tab switches (store-held).
- [ ] The active tab's session row is highlighted; switching tabs moves the highlight.
- [ ] `working` dots pulse; `waiting` dots are steady amber.
- [ ] Newly spawned sessions ([044](044-new-session-picker.md) /
      [041](041-orchestrator-console.md) `spawn`) appear under their project immediately.
- [ ] Long ids/branches truncate with ellipsis; no horizontal overflow at 268px.

## Tests

- Unit ([013](013-testing-infrastructure.md)): counts exclude `done` sessions;
  collapsing a project hides its children and survives a left-tab switch; clicking a
  session row calls `openTab` with the right id.
- The panel reads only `useProjectSessions(projectId)` — assert it does not import
  fixtures ([014](014-architecture-boundaries.md) zone covers this at lint time).

## Empty states

- Project with zero active sessions: row still renders with count `0` and no children.
