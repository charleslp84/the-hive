# 013 — Testing Infrastructure

| | |
|---|---|
| **ID** | HIVE-013 |
| **Epic** | Foundation |
| **Depends on** | [010-project-scaffold.md](010-project-scaffold.md) |
| **Blocks** | Every story's test criteria; [071](071-ci-workflow.md) |
| **Points** | 3 |
| **Architecture reference** | `incorpx` — `vitest.config.mts`, `tests/` |

## Story

> As a developer, I want Vitest + React Testing Library wired up against a `tests/`
> tree that mirrors `src/`, with a coverage gate that fails the build, so every later
> story lands with tests and the prototype never accumulates the untested surface that
> makes a rewrite feel safer than a refactor.

The current backlog specifies no testing at all. `incorpx` runs an 80% gate across all
metrics and it is the single largest reason that codebase stayed refactorable — this
story imports that discipline before there is any code to retrofit.

## Spec

### Runner

- `vitest` + `@vitejs/plugin-react`, environment **happy-dom** (matches `incorpx`;
  markedly faster than jsdom for component-heavy suites).
- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`.
- `@vitest/coverage-v8` as the coverage provider.
- Setup file registers `jest-dom` matchers and a global `afterEach(cleanup)`.

### Layout — mirrors `src/`, exactly as `incorpx` does

```
tests/
  components/
    ui/            layout/        terminal/
  features/
    projects/  work/  agents/  orchestrator/  sessions/
    inbox/     pull-requests/   activity-feed/  simulation/
  stores/
  hooks/
  lib/
    terminal/
  e2e/             # Playwright — see 070, excluded from the Vitest run
```

A test for `src/features/inbox/components/inbox-panel.tsx` lives at
`tests/features/inbox/components/inbox-panel.test.tsx`. No exceptions — the mirror is
what makes "is this covered?" answerable by path.

### Coverage gate

- Thresholds **80%** for lines, statements, branches, and functions — the `incorpx`
  number, applied globally.
- `pnpm test:coverage` fails the process below threshold (this is what CI runs,
  [071](071-ci-workflow.md)).
- Excluded from coverage: `src/main.tsx`, `src/data/fixtures.ts` (data, not logic),
  shadcn primitives under `src/components/ui/` that are vendored verbatim, and type-only
  files.

### xterm.js under test

xterm needs a real canvas/DOM measurement path that happy-dom does not provide. The
contract:

- **`TerminalSurface` is tested through a mock transport, not through a real xterm
  instance.** Assert that the transport's `onData` subscription is established on mount,
  torn down on unmount, and that `resize` is called on container resize.
- A thin `__mocks__/xterm.ts` stubs `Terminal` with a recording fake (`write`, `open`,
  `dispose`, `options`, `buffer.active.viewportY`).
- Anything that genuinely requires a rendered terminal — colors on screen, selection,
  scrollback behaviour — is asserted in Playwright instead ([070](070-e2e-harness.md)).
  Do not chase canvas assertions in unit tests.

### Store testing

The Zustand stores ([012](012-mock-data-layer.md)) are plain functions and are the
highest-value target: every action gets a test that calls it against a fresh store and
asserts the resulting state. `beforeEach` resets stores to their initial fixture state.

## Acceptance criteria

- [ ] `pnpm test` runs the suite green; `pnpm test:watch` and `pnpm test:ui` work.
- [ ] `pnpm test:coverage` reports all four metrics and **exits non-zero** when a
      threshold is breached — verified by temporarily lowering a threshold, observing
      the failure, and restoring it.
- [ ] `tests/` mirrors `src/` and the mirror is documented in `AGENTS.md`
      ([015](015-project-docs.md)).
- [ ] The xterm mock is in place and a `TerminalSurface` mount/unmount test passes
      without a real canvas.
- [ ] At least one store action test and one component test exist as the reference
      pattern later stories copy.
- [ ] Vitest ignores `tests/e2e/**` (Playwright owns it).

## Out of scope

- Visual-regression snapshots. Playwright covers the rendered surface
  ([070](070-e2e-harness.md)); pixel snapshots on a prototype are churn.
