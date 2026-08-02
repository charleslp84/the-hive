# 070 — Playwright E2E Harness

| | |
|---|---|
| **ID** | HIVE-070 |
| **Epic** | Cross-cutting |
| **Depends on** | [013](013-testing-infrastructure.md), [060](060-keyboard-navigation.md), [061](061-simulation-mode.md) |
| **Blocks** | [071](071-ci-workflow.md) |
| **Points** | 5 |
| **Architecture reference** | `incorpx` — `playwright.config.ts`, `tests/e2e/` |

## Story

> As a developer, I want Playwright specs that drive the real app in a real browser, so
> the two claims unit tests cannot make — *the terminal actually renders* and *the
> keyboard-only loop actually works* — are verified rather than assumed.

The terminal is the product ([000](000-overview.md)) and it is a canvas. Green unit
tests prove nothing about it. This is the only place the core promise gets checked.

## Spec

### Config

- `playwright.config.ts` at `app/` root, specs in `tests/e2e/`, mirroring `incorpx`.
- `webServer` block builds and serves the app (`pnpm build && pnpm preview`) so specs
  run against production output, with `reuseExistingServer` locally.
- Deterministic runs: every spec loads the app with **`?sim=0`**
  ([061](061-simulation-mode.md)) unless it is explicitly testing simulation. Timers and
  a fake clock make anything else flaky.
- Desktop viewport only (1440×900) — the app is desktop-width by design
  ([020](020-app-shell-layout.md)).
- Chromium is the required project; WebKit/Firefox optional and not CI-blocking.

### Spec suite

```
tests/e2e/
  smoke.spec.ts             # shell renders: header, both rails, center stage
  terminal.spec.ts          # THE spec — see below
  keyboard.spec.ts          # full no-mouse path (060)
  waiting-session.spec.ts   # the payoff loop (043, 051)
  picker.spec.ts            # spawn a session end to end (044)
  simulation.spec.ts        # sim on: statuses/badges/counts actually change (061)
  helpers/                  # selectors, app fixtures
```

**`terminal.spec.ts` — the one that matters.** Asserts what only a browser can:

- Opening a session renders a **non-empty xterm canvas** (canvas element present with
  non-zero dimensions inside the terminal container).
- The transcript's text is reachable via xterm's accessibility buffer (`.xterm-accessibility`)
  — assert on fixture strings, not on pixels.
- Text is selectable: drag across the terminal, read `window.getSelection()`, assert it
  matches transcript content.
- Switching tabs and returning preserves scroll position ([042](042-terminal-surface.md)
  kept-alive instances) — scroll up, switch away, switch back, assert the viewport
  offset survived.
- Theme toggle re-themes live instances **without clearing content**.
- Resizing the window refits with no clipped last line.

**`waiting-session.spec.ts` — the product promise.** Inbox → click
"lead-form needs approval" → the amber permission prompt is visible in the terminal →
type an answer → send → status flips to `working` and the chip label changes on the
meta bar, the projects panel, and the header counts.

**`keyboard.spec.ts`.** Launch → `↓↓` → `Enter` → session opens → type → `Enter` →
`←` → back at the orchestrator, all without a single mouse event.

### Selector policy

Prefer role- and text-based locators. Where the concept's markup makes that ambiguous
(status dots, carets, icon-only buttons), add explicit `data-testid` attributes in the
component and document them in `docs/component-patterns.md` — do not couple specs to
Tailwind classes.

## Acceptance criteria

- [ ] `pnpm test:e2e` runs the full suite green against a production build.
- [ ] `terminal.spec.ts` passes all six assertions above.
- [ ] `waiting-session.spec.ts` completes the inbox→answer→resume loop.
- [ ] `keyboard.spec.ts` completes with zero mouse interactions.
- [ ] Suite is deterministic: 5 consecutive runs, no flakes. Record the runs.
- [ ] Total wall-clock under 2 minutes on a dev machine (it gates CI —
      [071](071-ci-workflow.md)).
- [ ] Traces/screenshots are retained on failure only.

## Out of scope

- Cross-browser matrix, mobile viewports, visual-regression snapshots.
