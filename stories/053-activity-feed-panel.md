# 053 — Activity Feed Panel

| | |
|---|---|
| **ID** | HIVE-053 |
| **Epic** | Activity rail |
| **Depends on** | [050-activity-rail.md](050-activity-rail.md) |
| **Blocks** | — |
| **Points** | 2 |
| **Location** | `src/features/activity-feed/` — `components/`, `utils/fake-clock.ts` |

## Story

> As a user, I want a reverse-chronological feed of everything the orchestrator did —
> routed messages, spawned sessions, PR polling, agent hand-offs — so I can reconstruct
> what happened while I wasn't looking.

## Spec

Vertical stack (gap 10), newest first, non-clickable (log, not nav):

- Row: 22px circular icon tile (`--cc-chip` bg; 12px phosphor icon colored by tone:
  brand/green/amber/red) · body.
- Body: timestamp (mono 10px subtle, `HH:MM`) over text (12.5px muted, line-height 1.45).

## Data & behavior

- Source: `feed` in store, capped at 24 items (oldest dropped on push).
- Producers of feed items across the app:
  - `send` command / session message → `Routed your message to {id}` (brand, paper-plane)
  - `spawn` → `Spawned {id} on {repo}` (brand, plus-circle)
  - simulation ticks → PR polling, slack answers, pause/resume events
    ([061-simulation-mode.md](061-simulation-mode.md))
- Timestamps: prototype keeps a fake clock starting at `14:38`, +1 minute per event
  (as the concept does) — deterministic and demo-friendly.

## Fixtures (7 seed items)

14:37 PR poll · 14:36 routed reply to call-notes · 14:34 Slack PR comment answered ·
14:32 pr-reviewer kicked off on #482 · 14:28 fixes applied on #219 ·
14:21 spawned nplusone · 14:12 lead-form paused (amber).

## Acceptance criteria

- [ ] Seed items render in order with correct tones/icons.
- [ ] Any routed message or spawn (from console, session input, or picker) prepends a
      feed item with the next fake-clock timestamp.
- [ ] List never exceeds 24 items.
- [ ] The fake clock is a module (`utils/fake-clock.ts`) with an explicit `reset()`,
      not a module-level mutable counter — otherwise tests leak time into each other.

## Tests

- Unit ([013](013-testing-infrastructure.md)): the fake clock advances one minute per
  event and formats `HH:MM`; `pushFeed` prepends and drops the oldest past 24;
  `reset()` returns it to `14:38`.
- Feed items produced by [041](041-orchestrator-console.md), [043](043-session-view.md)
  and [044](044-new-session-picker.md) are asserted in those stories' tests — this
  panel only renders.
