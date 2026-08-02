# 040 — Center Stage (view states & session meta bar)

| | |
|---|---|
| **ID** | HIVE-040 |
| **Epic** | Center stage |
| **Depends on** | [020-app-shell-layout.md](020-app-shell-layout.md), [012-mock-data-layer.md](012-mock-data-layer.md) |
| **Blocks** | [041](041-orchestrator-console.md), [042](042-terminal-surface.md), [043](043-session-view.md), [044](044-new-session-picker.md) |
| **Points** | 5 |
| **Location** | `src/components/layout/center-stage.tsx`, `session-meta-bar.tsx` |

## Story

> As a user, I want the center of the screen to always show exactly one focused thing —
> the orchestrator overview, one session's terminal, one agent's terminal, or the
> new-session picker — so my attention has a single home.

## View state machine

Driven by two store fields: `activeTab` (`'orch'` | entityId) and `picker` (bool).

| State | Condition | Renders |
|---|---|---|
| **Picker** | `picker === true` | [NewSessionPicker](044-new-session-picker.md) full-stage overlay (replaces terminal area) |
| **Orchestrator** | `activeTab === 'orch'` | session table + orchestrator console + command input ([041](041-orchestrator-console.md)) + hint bar |
| **Session** | entity.kind === 'session' | meta bar + terminal ([042](042-terminal-surface.md)) + message input ([043](043-session-view.md)) |
| **Agent** | entity.kind === 'agent' | same as Session with agent chips |

Transitions: `openTab(id)` (from any rail/panel/console/notification), `backToOrch()`
(← button or ArrowLeft), `openPicker()`/`closePicker()` (New session / esc /
project chosen). Opening the picker hides the terminal but does **not** change
`activeTab` — closing it returns to the previous view.

## Session meta bar (shown in Session/Agent states, above the terminal)

- Bar: padding `10px 16px`, `--cc-panel` bg, bottom border `--cc-border-soft`,
  horizontal, wrap, gap 8.
- **Back button**: `←` pill (mono 11.5px, `--cc-chip` bg); tooltip "Back to
  orchestrator (←)"; click → `backToOrch()`.
- **Entity name**: mono 13px 600 `--cc-ink`.
- **Task**: 13px `--cc-muted` — the session's one-line task.
- **Chips** (Chip atom from [030](030-left-rail.md)):
  - Session: `ph-git-branch` + branch · `ph-circle-fill` + status label (status color)
    · if PR: `ph-git-pull-request` + `#N · state` (merged → `--cc-brand`, else
    `--cc-green`).
  - Agent: `ph-robot` + "dedicated agent" · `ph-circle-fill` + "online" (`--cc-green`).

## Acceptance criteria

- [ ] Exactly one state visible at a time; no flash of the wrong state on switch.
- [ ] Meta bar contents update when the entity's status/PR changes (e.g. simulation
      flips `dark-tokens` to waiting → chip label changes to "needs input").
- [ ] Header model chip visibility ([021](021-header.md)) matches this state machine.
- [ ] Switching tabs preserves each terminal's scrollback (see buffer strategy in
      [042-terminal-surface.md](042-terminal-surface.md)).
- [ ] The stage never scrolls as a whole; only the terminal region scrolls.

## Tests

- Unit ([013](013-testing-infrastructure.md)): the view-state machine is extracted as a
  pure `resolveView({ activeTab, picker, entity })` function and tested exhaustively
  over all four states — the component just renders what it returns.
- Meta-bar chips update when the underlying entity's status or PR changes.
- E2E ([070](070-e2e-harness.md)): switching tabs preserves terminal scroll position
  (the kept-alive-instance guarantee from [042](042-terminal-surface.md)).

## Note on `CenterStage` placement

It lives in `components/layout/` rather than a feature slice because it composes across
slices (orchestrator, sessions, picker). Under the import zones
([014](014-architecture-boundaries.md)) `components/**` may not import `features/**`,
so the composition happens one level up in `app.tsx`: `CenterStage` takes its view
children as props/slots rather than importing them.
