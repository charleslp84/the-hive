# 050 — Activity Rail (container & tabs)

| | |
|---|---|
| **ID** | HIVE-050 |
| **Epic** | Activity rail |
| **Depends on** | [020-app-shell-layout.md](020-app-shell-layout.md), [030-left-rail.md](030-left-rail.md) (TabBar atom) |
| **Blocks** | [051](051-inbox-panel.md), [052](052-prs-panel.md), [053](053-activity-feed-panel.md) |
| **Points** | 2 |
| **Location** | `src/components/layout/activity-rail.tsx` |

## Story

> As a user, I want a right-hand rail that rotates between Inbox, PRs, and Activity, so
> everything that might need my attention accumulates in one glanceable place beside
> the terminal.

## Spec

- Width 316px, `--cc-panel` bg, left border `--cc-border-soft`, padding
  `14px 14px 20px`, column gap 18, own scroll. Hideable via `showActivityRail`
  ([020](020-app-shell-layout.md)).
- `TabBar` (shared atom): `Inbox` · `PRs` · `Activity` (railTab in store).
  - Inbox tab shows a **red** badge (`--color-error`-style red, white text) with the
    unread count when > 0 — visually louder than the left rail's neutral badge, because
    it means "you are blocking agents".
- Body renders exactly one of: [InboxPanel](051-inbox-panel.md),
  [PrsPanel](052-prs-panel.md), [ActivityFeedPanel](053-activity-feed-panel.md).

## Acceptance criteria

- [ ] Tab switching preserves scroll position per panel (nice-to-have: store scrollTop;
      acceptable: reset to top — pick one and note it).
- [ ] Unread badge updates live (marking read in inbox, header bell "mark all read",
      simulation adding notifications).
- [ ] With the rail hidden, center stage reclaims the width and terminals refit
      ([042](042-terminal-surface.md) ResizeObserver requirement).

## Tests

- Unit ([013](013-testing-infrastructure.md)): the unread badge renders the
  `useUnreadCount()` value and disappears at 0; switching `railTab` swaps the panel.
- Like `CenterStage` ([040](040-center-stage.md)), this container may not import
  `features/**` — the three panels arrive as slots, composed in `app.tsx`
  ([014](014-architecture-boundaries.md)).
