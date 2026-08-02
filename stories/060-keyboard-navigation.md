# 060 — Keyboard Navigation

| | |
|---|---|
| **ID** | HIVE-060 |
| **Epic** | Cross-cutting |
| **Depends on** | [041-orchestrator-console.md](041-orchestrator-console.md), [043-session-view.md](043-session-view.md), [044-new-session-picker.md](044-new-session-picker.md) |
| **Blocks** | [070](070-e2e-harness.md) |
| **Points** | 5 |
| **Location** | `src/hooks/use-keyboard-nav.ts` + `src/hooks/resolve-key-action.ts` |

## Story

> As a keyboard-driven user, I want arrow-key navigation across the whole app — select
> sessions, open them, jump back — without ever clicking, so The Hive drives like a
> terminal multiplexer, not a web page.

## Key map

### Orchestrator view (`activeTab === 'orch'`, picker closed)

| Key | Condition | Action |
|---|---|---|
| `↓` / `↑` | always | move table selection within `navOrder` (active then done), clamped |
| `→` or `Enter` | command input **empty** | open selected session |
| `Enter` | input non-empty | run command ([041](041-orchestrator-console.md)) |

### Session/agent view

| Key | Condition | Action |
|---|---|---|
| `←` | input empty | back to orchestrator |
| `Enter` | input non-empty | send message ([043](043-session-view.md)) |

### Picker

| Key | Action |
|---|---|
| `Esc` | close picker |
| `Enter` | spawn on first search match |

## Global capture rule (the concept's trick — keep it)

A window-level `keydown` listener:

- **Ignores** events already targeted at any `INPUT`/`TEXTAREA` (they handle their own
  keys via the rules above).
- For `ArrowUp/Down/Left/Right/Enter` from anywhere else (e.g. after clicking a rail),
  runs the view's nav action in "forced" mode (arrows act even though focus was
  elsewhere) and then **refocuses the center input**, so the user is never stranded
  focus-wise.
- Picker open: global nav disabled (picker's own input handles keys).

The "input empty" condition prevents arrow-nav from hijacking cursor movement while
editing a command; forced mode (from outside inputs) ignores that condition.

## Acceptance criteria

- [ ] Full no-mouse session: launch → ↓↓ → Enter (open session) → type answer → Enter →
      ← (back) → New session via click-free path is not required (button is fine) but
      picker itself is fully keyboard-operable.
- [ ] Arrow keys in a non-empty command input move the caret (not the selection).
- [ ] Clicking a left-rail item, then pressing ←/→/↑/↓ immediately works (global
      capture + refocus).
- [ ] No key handling fires while the picker is open except the picker's own.
- [ ] Terminal text selection (mouse) is not disturbed by the refocus behavior
      ([042](042-terminal-surface.md) selection preservation).

## Tests

Keyboard behaviour is a state machine with a lot of conditions, so it is factored to be
testable rather than tested through the DOM:

- **`resolveKeyAction({ key, view, inputEmpty, pickerOpen, forced })` is a pure
  function** returning an action or `null`. Every cell of every key-map table above
  gets a test, including the "input non-empty" suppressions and forced mode.
- `use-keyboard-nav.ts` is tested for listener attach/detach only — it lives in
  `src/hooks/` and may not import `features/**`
  ([014](014-architecture-boundaries.md)), so it dispatches store actions.
- E2E ([070](070-e2e-harness.md)) — `keyboard.spec.ts` completes the full no-mouse path
  with zero mouse events. Focus behaviour and the "never stranded" refocus rule can
  only be proven in a real browser.

## Out of scope

- Configurable keybindings; cmd+K palette (candidate for a later story).
