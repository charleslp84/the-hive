# 043 — Session / Agent Terminal View

| | |
|---|---|
| **ID** | HIVE-043 |
| **Epic** | Center stage |
| **Depends on** | [040-center-stage.md](040-center-stage.md), [042-terminal-surface.md](042-terminal-surface.md) |
| **Blocks** | — |
| **Points** | 5 |
| **Location** | `src/features/sessions/` — `components/session-view.tsx`, `components/message-input.tsx` |

## Story

> As a user, I want to open any session or agent and see its terminal transcript with a
> message box underneath, so I can read what the agent did and answer its questions —
> with my message routed through the orchestrator.

## Layout

1. **Meta bar** — specified in [040-center-stage.md](040-center-stage.md).
2. **Terminal** — `TerminalSurface` for this entity (kept-alive instance per
   [042](042-terminal-surface.md)). Clicking anywhere in the terminal area focuses the
   input row (concept behavior) *without* clearing an in-progress text selection —
   only focus when the click wasn't a drag-select.
3. **Input row** (`--cc-term-input` bg, top border `--cc-border-soft`):
   - Prompt label: `{entityId} ❯` (mono 13px, `#7ee2b8`).
   - Borderless input, mono 12.5px, ink `#dbe4ff`, caret `#7ee2b8`.
   - Placeholder: `message this session — routed by the orchestrator`.
   - Right hint: `← back to list · ↵ send`.

## Send flow (Enter with non-empty input)

1. Clear the input.
2. Append to the entity transcript: blank line, then `❯ {text}` in cyan.
3. Push feed item `Routed your message to {id}` ([053](053-activity-feed-panel.md)).
4. After ~1.8s: append `● Acknowledged — working on it` (blue) + `✱ Working…` (amber);
   sessions get status → `working` (agents keep `online`).

This mimics the future daemon round-trip so the UI code is already event-shaped.

## Waiting sessions — the payoff moment

Fixture `lead-form` is `waiting` on a permission (`prisma migrate`), `call-notes` on a
question. Demo path: open from inbox → read the amber question in the terminal → type
the answer below → watch it resume. The prototype must make this loop feel smooth; it
is the product's core promise.

## Acceptance criteria

- [ ] Every fixture entity opens with its transcript colored per the palette and its
      meta bar correct (branch/status/PR chips for sessions; robot/online for agents).
- [ ] Send flow works on sessions and agents, including the status flip and the
      "needs input" chip clearing to "working" on the meta bar and all rails.
- [ ] ← (empty input) returns to the orchestrator ([060](060-keyboard-navigation.md)).
- [ ] Input autofocuses when the view opens and after sending.
- [ ] Multiple messages queue correctly (each gets its own ack after its delay).
- [ ] A freshly spawned, task-less session shows
      `· Ready — type below to give this session its task` and sending the first
      message sets it working.

## Tests

- Unit ([013](013-testing-infrastructure.md)): the send flow appends the cyan echo
  line, pushes a feed item, and — under fake timers — appends the ack and flips status
  after 1.8s; agents keep `online`. Two rapid sends produce two independent acks.
- E2E ([070](070-e2e-harness.md)) — `waiting-session.spec.ts` owns the payoff loop
  below end to end: inbox → amber prompt visible in the real terminal → answer →
  status flips everywhere. This is the product's core promise and the one flow that
  must be verified in a browser rather than against a mocked terminal.
