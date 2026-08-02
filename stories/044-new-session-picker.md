# 044 — New Session Picker

| | |
|---|---|
| **ID** | HIVE-044 |
| **Epic** | Center stage |
| **Depends on** | [040-center-stage.md](040-center-stage.md), [012-mock-data-layer.md](012-mock-data-layer.md) |
| **Blocks** | — |
| **Points** | 5 |
| **Location** | `src/features/sessions/components/new-session-picker.tsx` |

## Story

> As a user, I want a fast, keyboard-first picker to start a new session — choose a
> project, pick model and thinking effort, go — so spawning an agent takes seconds and
> never leaves the terminal aesthetic.

## Trigger & dismissal

- Open: header "New session" button ([021](021-header.md)). Sets `picker: true`,
  focuses the search input.
- Close: `esc` key, the `esc · cancel` text button, or choosing a project (which also
  spawns + opens the new session). Closing restores the previous center view.

## Layout (fills the stage, `--cc-term-bg` bg, vertically centered column, gap 28)

1. **Title block**: "Start a new session" (display serif 22px, `#dbe4ff`) over
   "Pick a project — a Claude Code terminal will open for it" (13px `#7c88b8`).
2. **Pinned projects**: first 4 projects as pill buttons (icon + name, mono 13px,
   `#1c2648` bg, `#273159` border; hover: brand border + `#1b2344` bg).
   Click → spawn on that project.
3. **Selectors row** (two side-by-side, 560px max):
   - **Model**: `haiku · sonnet · opus · fable` (default **opus**)
   - **Thinking effort**: `low · medium · high · max` (default **high**)
   - Rendered as a horizontal "stepper": a 2px track with a green (`#7ee2b8`) fill up
     to the selected option; each option is a dot (14px selected w/ green glow, 10px
     otherwise, `#3a4674` border) with its label below (mono 11px; selected `#dbe4ff`
     700, others `#6b779f`). Clicking a dot/label selects. Animate fill width .25s.
4. **Search**: rounded input (`#0e1430` bg, `#273159` border, `ph-magnifying-glass`),
   placeholder `search all projects…`. Below, a filtered list (max-height 220, scroll):
   each match = icon · project name (mono 12.5px) · `{n} active` count. Click → spawn.
   - No matches: `no projects match "{query}"` (mono 12px dim).
   - Enter: spawn on the first match, if any.
5. **Cancel**: `esc · cancel` ghost text button (mono 12px, dim, hover ink).

## Spawn semantics

`spawnSession(projectId, task: '', model: newModel, effort: newEffort)`:

- id `sess-{4 random chars}`, branch `feat/{id}`, status `idle`,
  task `Ready for instructions`, cost `$0.02`.
- Transcript seed: `❯ claude --model {model} --effort {effort} — new session on {repo}`
  (green), `● Reading CLAUDE.md, mapping repo…` (blue),
  `· Ready — type below to give this session its task` (dim).
- Feed item `Spawned {id} on {repo}`; orchestrator console line `spawned {id} on {repo}`.
- Picker closes; the new session's tab opens with the input focused
  ([043](043-session-view.md)).

## Acceptance criteria

- [ ] Full keyboard path works: New session → type query → Enter → new terminal open,
      hands never leave keyboard.
- [ ] Model/effort selections persist across picker openings (store-held defaults).
- [ ] Search is case-insensitive substring match on project id.
- [ ] Escape restores exactly the previous center view (orch table or a session).
- [ ] Spawned sessions appear everywhere derived state says they should: projects panel
      count/list, orchestrator table, status counts in header.

## Implementation note — the one shadcn primitive that earns its place

Build the overlay on shadcn's **`Dialog`** ([010](010-project-scaffold.md)), styled to
the concept's full-stage look. It is not for visual convenience: it brings focus
trapping, `esc` handling, scroll locking, and `aria-modal` semantics that a hand-rolled
overlay reliably gets wrong. Keep the concept's visuals exactly; take Radix's behaviour.

The model/effort steppers are **not** shadcn — they are bespoke and belong in this
slice, since nothing else uses them.

## Tests

- Unit ([013](013-testing-infrastructure.md)): search filters case-insensitively;
  Enter spawns on the first match and is a no-op with zero matches; model/effort
  defaults persist in `ui-store` across open/close; `esc` restores the prior
  `activeTab` rather than defaulting to the orchestrator.
- `spawnSession` id generation is injected (a seedable generator), so tests assert an
  exact id instead of a regex.
- E2E ([070](070-e2e-harness.md)) — `picker.spec.ts`: the full keyboard path produces a
  live terminal.
