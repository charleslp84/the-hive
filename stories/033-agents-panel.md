# 033 — Agents Panel

| | |
|---|---|
| **ID** | HIVE-033 |
| **Epic** | Left rail |
| **Depends on** | [030-left-rail.md](030-left-rail.md) |
| **Blocks** | — |
| **Points** | 2 |
| **Location** | `src/features/agents/` — `components/agents-panel.tsx`, `components/agent-row.tsx` |

## Story

> As a user, I want my long-lived background agents listed with their live status, so I
> can open any agent's terminal to see what it has been doing on my behalf.

## Spec

One row per agent in `agentOrder` (`slack-agent`, `pr-reviewer`, `standup-agent`):

- Row: horizontal, gap 10, padding `7px 10px`, radius 8; active tab → `--cc-active` bg;
  hover `--cc-hover`; click → `openTab(agentId)`.
- **Avatar tile**: 28×28, radius 8, `--cc-chip` bg, agent's phosphor icon (15px,
  `--cc-brand`); **online dot** overlapping bottom-right: 9px `--cc-green` circle with
  2px `--cc-panel` ring.
- **Text block**: agent id (mono 12.5px) over subtitle (11px `--cc-subtle`, ellipsis) —
  e.g. `slack-agent` / `#eng-alerts · #deploys · #ask-eng`.

## Acceptance criteria

- [ ] All 3 fixture agents render with icons `ph-slack-logo`, `ph-git-pull-request`,
      `ph-calendar-check` and their fixture subtitles.
- [ ] Clicking an agent opens its terminal view ([043-session-view.md](043-session-view.md)
      — agents reuse the session view with agent chips).
- [ ] Active highlight follows the open tab.
- [ ] Online dot is always green in this phase (agents are always `online`).

## Tests

- Unit ([013](013-testing-infrastructure.md)): all three fixture agents render with
  their subtitles; clicking a row calls `openTab(agentId)`; the active row carries the
  active styling when `activeTab` matches.

## Out of scope

- Creating/pausing agents from the UI. Agents are fixture-defined in this phase.
