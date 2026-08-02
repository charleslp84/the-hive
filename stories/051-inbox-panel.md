# 051 — Inbox Panel

| | |
|---|---|
| **ID** | HIVE-051 |
| **Epic** | Activity rail |
| **Depends on** | [050-activity-rail.md](050-activity-rail.md) |
| **Blocks** | — |
| **Points** | 3 |
| **Location** | `src/features/inbox/` — `components/inbox-panel.tsx`, `components/notification-card.tsx` |

## Story

> As a user, I want an inbox of things agents need from me — approvals, questions, PR
> events — where clicking any item jumps me to the exact terminal that needs the
> answer, so no agent stays blocked longer than my attention span.

## Spec

Vertical stack of notification cards (gap 8), newest first:

- Card: horizontal, gap 10, padding `10px 12px`, radius 12, cursor pointer.
  - **Unread**: `--cc-chip` bg + `--cc-border` border.
  - **Read**: transparent bg + `--cc-border-soft` border.
  - Hover: `--cc-hover`.
- **Icon** (16px, colored by tone: amber/green/brand/red) — e.g. `ph-hand-palm`
  (approval), `ph-chat-circle-dots` (question), `ph-git-pull-request`,
  `ph-slack-logo`, `ph-check-circle`.
- **Body**: title (12.5px 600 ink, e.g. `lead-form needs approval`) over subtitle
  (11.5px muted, e.g. `prisma migrate dev — lead_phone_idx`).
- **Time**: mono 10px subtle, right-aligned (`4m`, `12m`, `1h`, `now`).

## Behavior

- Click card → `openTab(notification.target)` **and** mark that card read.
- Header bell click ([021](021-header.md)) marks all read.
- Simulation ([061](061-simulation-mode.md)) prepends new notifications (cap list at 8).
- Unread count drives: rail tab badge, header bell badge.

## Fixtures (5)

1. amber `ph-hand-palm` — "lead-form needs approval" / prisma migrate — unread → `lead-form`
2. amber `ph-chat-circle-dots` — "call-notes asked a question" — unread → `call-notes`
3. green `ph-git-pull-request` — "PR #219 approved" — unread → `webhooks`
4. brand `ph-slack-logo` — "Mention in #ask-eng" — read → `slack-agent`
5. green `ph-check-circle` — "PR #77 merged" — read → `tz-fix`

## Acceptance criteria

- [ ] Unread styling, per-card read-on-click, and mark-all-read all work and stay in
      sync with both badges.
- [ ] Clicking "lead-form needs approval" lands in lead-form's terminal where the amber
      permission prompt is visible ([043](043-session-view.md) payoff moment).
- [ ] New simulated notifications appear at top with `now` timestamp and unread style.

## Tests

- Unit ([013](013-testing-infrastructure.md)): clicking a card both opens its target
  tab and marks only that card read; `markAllRead()` zeroes the count; the list caps at
  8 when simulation prepends a ninth.
- E2E ([070](070-e2e-harness.md)): covered by `waiting-session.spec.ts` — the
  inbox→terminal jump is the entry point of the payoff loop
  ([043](043-session-view.md)).
