# 015 — Project Docs & Agent Guidance

| | |
|---|---|
| **ID** | HIVE-015 |
| **Epic** | Foundation |
| **Depends on** | [010-project-scaffold.md](010-project-scaffold.md), [011-design-tokens-and-theming.md](011-design-tokens-and-theming.md) |
| **Blocks** | — |
| **Points** | 2 |
| **Architecture reference** | `incorpx` — `AGENTS.md`, `docs/`, `.claude/DESIGN-SYSTEM.md` |

## Story

> As a developer (human or agent) picking up The Hive, I want a thin always-on index
> plus deep-dive docs loaded on demand, so I get the rules that always apply without
> paying the context cost of everything else.

This is the pattern `incorpx`'s `AGENTS.md` converged on after it grew too heavy: an
index that states the always-on rules and a table routing to deep-dives. The Hive
starts there rather than rediscovering it.

## Spec

### `AGENTS.md` at `app/` root, with `CLAUDE.md` as a committed symlink → `AGENTS.md`

Matches the `incorpHQ` convention exactly. Contents, kept deliberately thin:

1. **Project overview** — one paragraph: what the Hive is, current phase (static
   prototype), and the link to [000-overview.md](000-overview.md).
2. **Essential commands** — `pnpm dev|build|lint|type-check|test|test:coverage|test:e2e`,
   flagging that **lint and type-check must pass before any task is considered done**.
3. **Deep-dive doc table** — "when you are working on X, load Y" (below).
4. **Architecture rules** — the import-zone table and naming conventions from
   [014](014-architecture-boundaries.md), stated as rules not prose.
5. **The terminal seam** — the single most important invariant in the codebase:
   `components/terminal/` speaks only `TerminalTransport`; never reach for the store
   from inside it ([042](042-terminal-surface.md)).
6. **State management** — Zustand selector hooks only; never read the store object
   directly in a component ([012](012-mock-data-layer.md)).
7. **Testing requirements** — `tests/` mirrors `src/`, 80% gate
   ([013](013-testing-infrastructure.md)).

### `docs/` deep-dives

| When you are working on… | Load |
|---|---|
| The terminal, transports, ANSI, xterm config | `docs/terminal-architecture.md` |
| Store shape, actions, selectors, fixture data | `docs/state-and-data.md` |
| Panels, atoms, rails, the view-state machine | `docs/component-patterns.md` |
| Simulation script and the fake clock | `docs/simulation.md` |

Each is seeded by the story that owns the subject — [042](042-terminal-surface.md)
writes `terminal-architecture.md`, [012](012-mock-data-layer.md) writes
`state-and-data.md`, and so on. This story creates the files, the routing table, and
the convention; it does not pre-write content that later stories will own.

### `.claude/DESIGN-SYSTEM.md` and `.claude/COMPONENTS.md`

Mirroring `incorpx`, where every UI task is required to consult both:

- **`DESIGN-SYSTEM.md`** — the `--cc-*` token table from
  [011](011-design-tokens-and-theming.md), the Tailwind `@theme` mapping, the terminal
  `TERM` palette, type scale, the status→colour model from
  [000](000-overview.md), and the rule that terminal surfaces stay dark in light mode.
- **`COMPONENTS.md`** — the atom inventory (`TabBar`, `StatusDot`, `Chip`, `Badge`,
  `KeyHint`) with props and usage, plus which shadcn primitives are installed and why
  the rest are not.

## Acceptance criteria

- [ ] `app/AGENTS.md` exists with all seven sections; `app/CLAUDE.md` is a symlink to
      it (`ls -l` shows the link, and it is committed as a symlink).
- [ ] The four `docs/*.md` files exist with a title, a one-line scope statement, and a
      "owned by story NNN" line — placeholders are acceptable, absent files are not.
- [ ] `.claude/DESIGN-SYSTEM.md` reproduces the full dark and light token sets and the
      `TERM` palette, and its values match `src/styles/tokens.css` exactly (verify by
      diffing the values, not by eye).
- [ ] `.claude/COMPONENTS.md` lists every atom with its props signature.
- [ ] `AGENTS.md` is under 200 lines — if it grows past that, content belongs in a
      deep-dive.

## Out of scope

- `.impeccable.md` (design-intent doc). The concept file is the Hive's design intent
  for this phase; revisit when the prototype earns a real design system.
