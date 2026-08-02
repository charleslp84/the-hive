# 021 — Header

| | |
|---|---|
| **ID** | HIVE-021 |
| **Epic** | Shell |
| **Depends on** | [020-app-shell-layout.md](020-app-shell-layout.md) |
| **Blocks** | — |
| **Points** | 5 |
| **Location** | `src/components/layout/header.tsx`, `model-chip.tsx`, `status-counts.tsx` |

## Story

> As a user, I want a persistent header with the brand, the active session's model
> status, fleet-wide status counts, theme toggle, inbox bell, and a New-session button,
> so I always see the health of the whole hive and can act from anywhere.

## Anatomy (left → right)

1. **Brand block**: 30×30 rounded logo tile (hive mark image from `concept/assets/`),
   then two lines: wordmark "The Hive" (display serif 17px, letter-spacing −0.02em) and
   "APFM ENGINEERING" (10px, uppercase, letter-spacing 0.08em, `--cc-subtle`).
2. **Model chip** *(conditional)* — only when the active tab is a **session**:
   pill (`--cc-chip` bg, radius 999) with `ph-brain` icon in `--cc-brand`, mono 11.5px:
   `Opus 4.5 (1M) · high | ███░░░░░░░ 32% | 4% · resets 02:30 PM`
   - model display names: opus → `Opus 4.5`, sonnet → `Sonnet 4.5`, haiku → `Haiku 4.5`,
     fable → `Fable 1`.
   - context meter: 10-char bar of `█`/`░` from a ctx % (mock: derive deterministically
     from the session id as the concept does, or store per-session).
- 3. **Spacer** (flex: 1).
4. **Status counts** (mono 12px `--cc-muted`):
   `{working} working · {waiting} waiting · {idle} idle · {done} done`
   with "working" in `--cc-green` and "waiting" in `--cc-amber`. Derived live from the
   store — updates when simulation or actions change statuses.
5. **Theme toggle**: 34px circular ghost button, `ph-sun`/`ph-moon`
   (see [011](011-design-tokens-and-theming.md)).
6. **Inbox bell**: 34px circular ghost button, `ph-bell`; red badge (top-right, min 16px,
   count) when unread > 0. Click = mark all read ([051](051-inbox-panel.md)).
7. **New session** button: primary small button → opens the picker
   ([044-new-session-picker.md](044-new-session-picker.md)).

## Acceptance criteria

- [ ] All seven zones render per spec at 56px height, gap 14px, padding 0 16px.
- [ ] Model chip appears/disappears correctly when switching orchestrator ↔ session ↔
      agent tabs (agents and orchestrator show no chip).
- [ ] Counts come from the `useCounts()` selector ([012](012-mock-data-layer.md)) —
      no local state, no store-object reads.
- [ ] Bell badge shows exact unread count and hides at 0.
- [ ] Hover states: ghost buttons get `--cc-hover` bg and `--cc-ink` icon.
- [ ] "New session" opens the picker overlay and focuses its search input.

## Tests

- Unit ([013](013-testing-infrastructure.md)): counts render from fixture state;
  the model chip is absent for the orchestrator and for agents and present for a
  session; the bell badge hides at 0 unread and shows the exact count above 0.
- The three sub-components (`ModelChip`, `StatusCounts`, brand block) are tested
  independently — the header itself only composes.

## Out of scope

- Real token/usage metering (values are mock).
- Clicking the bell opening a dropdown — the inbox lives in the activity rail.
