# 041 — Orchestrator Console

| | |
|---|---|
| **ID** | HIVE-041 |
| **Epic** | Center stage |
| **Depends on** | [040-center-stage.md](040-center-stage.md), [042-terminal-surface.md](042-terminal-surface.md) |
| **Blocks** | [060-keyboard-navigation.md](060-keyboard-navigation.md) |
| **Points** | 8 |
| **Location** | `src/features/orchestrator/` — `components/`, `utils/parse-command.ts` |

## Story

> As a user, I want the default center view to be the orchestrator: a live table of all
> sessions plus a command console, so I can survey the whole hive and drive it with
> keyboard commands without leaving the terminal idiom.

## Layout (top → bottom inside the stage)

1. **Session table** (scrolls with the console area, `--cc-term-bg` background, mono
   12.5px):
   - Column header row (11px, `#4d5a86`, letter-spacing 0.06em):
     `▸(12px) | SESSION (130px) | STATUS (90px) | PROJECT · BRANCH (flex) | PR (34px)`.
   - One row per **active** (non-done) session in `order`, then a `COMPLETED` divider
     (label + horizontal rule) and the done sessions.
   - Row: selection caret `▸` (green, visible only on the selected row), session id,
     status (hex colors: working `#7ee2b8`, waiting `#ffc06e`, idle `#7c88b8`, done
     `#8fb5ff`; waiting renders "needs input"), `project · branch` (dim), `#PR` (cyan)
     or `—`.
   - Selected row bg `#1a2450`; hover `#161f45`. Click → select **and** open.
2. **Console transcript**: orchestrator lines (`orchLines`) rendered through the
   TerminalSurface with a StaticTransport bound to the orchestrator entity.
   Boot lines from fixtures (`maestro v0.4.2 — orchestrator console · host devbox-01` …).
3. **Command input row** (`--cc-term-input` bg, top border): green mono prompt
   `orchestrator ❯`, borderless input (mono 12.5px, caret `#7ee2b8`), right-side key
   hint `↑↓ select · → open · ↵ run`.
   Placeholder: `help · status · send <session> <message> · spawn <repo> <task>`.

   *(Implementation note: the table + transcript may be one scroll region; the table is
   DOM (not xterm) so rows stay clickable — only the transcript goes through xterm.)*

## Command grammar (executed by `runOrchCommand`, echoing `❯ cmd` in green first)

| Command | Behavior | Errors |
|---|---|---|
| `help` | print command list (dim) | — |
| `status` | one aligned line per session: id (16-col pad), status (13-col pad, colored), `project · branch` | — |
| `open <id>` | `openTab(id)` + confirm line (dim) | `no such session: x` (red) |
| `send <id> <msg…>` | append `❯ [orchestrator] msg` (cyan) to target, confirm `routed → id` (dim), push feed item; after ~2.2s target appends `● Acknowledged — resuming with your input` + `✱ Working…` and (sessions) status → working | missing id → red error; missing msg → `usage: send <session> <message>` |
| `spawn <repo> <task…>` | validate repo against projects; create session via `spawnSession` and open it | `unknown repo: x — try one from the Projects panel` (red) |
| `clear` | reset transcript to `console cleared — help for commands` (dim) | — |
| anything else | `command not found: x — try \`help\`` (red) | — |

Transcript capped at 200 lines (drop oldest).

## Hint bar (replaces input row context — bottom of stage in orch view)

Centered mono 11px `--cc-subtle`:
`↑↓ select` · `→ or ↵ open session` · `read-only — the orchestrator coordinates in the background`

*(Concept shows BOTH the command input and this hint bar in orch view; keep both: input
above hint bar.)*

## Acceptance criteria

- [ ] Table shows 8 active + 2 completed fixture sessions correctly partitioned.
- [ ] All six commands behave per the grammar table, including all error paths.
- [ ] `send lead-form y` demo flow works: lead-form's terminal gains the routed line,
      inbox/feed update, status flips to working after the delay.
- [ ] Keyboard: ↑/↓ move selection (clamped), →/Enter (with empty input) opens the
      selected session; typed text goes to the input (see [060](060-keyboard-navigation.md)).
- [ ] Newly spawned sessions appear in the table and in `navOrder` immediately.
- [ ] Transcript autoscrolls on new output (bottom-stick rule from [042](042-terminal-surface.md)).

## Tests

The command grammar is the highest-value unit-test target in the app: it is pure, it
has explicit error paths, and it is the closest thing the prototype has to the future
daemon's API surface.

- **`utils/parse-command.ts` is a pure parser** returning a discriminated
  `ParsedCommand` union — it does not touch the store. Every row of the grammar table,
  including every error path, gets a test.
- Executing the parsed command against a fresh store is tested separately (six commands
  × happy path + errors).
- Table partitioning (8 active / 2 completed) is tested from fixtures.
- Deferred acknowledgements use fake timers ([012](012-mock-data-layer.md)).
