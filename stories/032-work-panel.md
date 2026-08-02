# 032 — Work Panel (tickets)

| | |
|---|---|
| **ID** | HIVE-032 |
| **Epic** | Left rail |
| **Depends on** | [030-left-rail.md](030-left-rail.md) |
| **Blocks** | — |
| **Points** | 3 |
| **Location** | `src/features/work/` — `components/work-panel.tsx`, `components/ticket-card.tsx` |

## Story

> As a user, I want work items (tickets) shown with the sessions and PRs attached to
> them, so I can navigate by "what I'm shipping" instead of by repo, and spot tickets
> whose PRs have review findings.

## Spec

One **ticket card** per fixture ticket, vertical stack gap 10:

- Card: 1px `--cc-border-soft` border, radius 12, padding `10px 12px`, column gap 7.
- **Header row**: ticket key (mono 12px 700 `--cc-brand`, e.g. `GRAC-3018`) · spacer ·
  status pill (10px 700 uppercase, `--cc-chip` bg; color by status:
  To Do `--cc-subtle`, In Progress `--cc-brand`, In Review `--cc-amber`,
  Done `--cc-green`).
- **Title**: 12.5px `--cc-ink`, line-height 1.4.
- **Linked sessions** (one row per session id that exists in the store):
  `StatusDot` · session id (mono 12px `--cc-muted`, ellipsis) · project (mono 10px
  `--cc-subtle`, right-aligned). Row hover `--cc-hover`; click → `openTab(sessionId)`.
- **Linked PRs** *(only if ≥1 linked session has a PR)* — separated by a top border:
  `ph-git-pull-request` icon (13px, colored by PR state) · `#N` (mono 11px `--cc-brand`)
  · repo (mono 11px `--cc-subtle`, ellipsis) · state label (10px 700 uppercase; merged
  `--cc-brand`, draft `--cc-subtle`, else `--cc-green`) · findings flag `⚠ n`
  (10px 700 `--cc-amber`) when the PR has open findings.
  - PR state/findings come from the global `prs` list when the PR number is known
    there (single source of truth), falling back to the session's own `pr` field.
  - Click → `openTab(owningSessionId)`.

## Acceptance criteria

- [ ] All 8 fixture tickets render; `GRAC-3010` shows two linked sessions
      (`nplusone`, `e2e-quote`).
- [ ] Ticket cards with no PRs omit the PR section entirely (no empty divider).
- [ ] Findings counts stay in sync with the PRs panel ([052](052-prs-panel.md)) —
      when simulation bumps #482's findings, both update.
- [ ] Every interactive row navigates to the right terminal tab.
- [ ] Sessions listed on a ticket but absent from the store are skipped silently
      (defensive — simulation may not create everything).

## Tests

- Unit ([013](013-testing-infrastructure.md)): a ticket with no PRs renders no PR
  section; a ticket referencing a missing session id renders without throwing;
  `useTicketPrs()` resolves PR state from the global `prs` list, not the session's
  stale copy.
- The PR-badge composition rules are tested as a pure function over
  `(state, findings, checks)` — shared with [052](052-prs-panel.md) via
  `src/features/shared/`, since both surfaces must agree.
