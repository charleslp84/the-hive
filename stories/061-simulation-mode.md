# 061 — Simulation Mode

| | |
|---|---|
| **ID** | HIVE-061 |
| **Epic** | Cross-cutting |
| **Depends on** | [012-mock-data-layer.md](012-mock-data-layer.md), [042-terminal-surface.md](042-terminal-surface.md), [051](051-inbox-panel.md), [052](052-prs-panel.md), [053](053-activity-feed-panel.md) |
| **Blocks** | [070](070-e2e-harness.md) |
| **Points** | 5 |
| **Location** | `src/features/simulation/` — `simulation.ts`, `script.ts`; flag in `src/config/env.ts` |

## Story

> As a demo viewer, I want the static prototype to feel alive — sessions stream output,
> PRs gain findings, agents pause with questions — so the product's promise is visible
> without a backend.

## Mechanics

- `src/features/simulation/simulation.ts` exports
  `startSimulation(store): () => void` (returns stop fn). The script itself lives in
  `script.ts` as data — an array of steps — so the runner is trivial and the script is
  reviewable.
- A tick every **9 seconds** executes the next step in a fixed script, looping.
- Controlled by a `simulate` flag (default **on**; expose as a query param `?sim=0`
  or a dev toggle). All timers cleaned up on unmount/stop.

## Scripted steps (port from concept, in order)

1. Feed: `Loop: polled open PRs — 1 new review comment on #482` (amber) **and**
   PR #482 `findings += 1`.
2. Feed: routed #482 comment to hero-refresh; hero-refresh transcript +=
   `● [orchestrator] new review comment on #482 — addressing` (cyan).
3. **dark-tokens pauses**: transcript += blank + amber question
   (`? Should elevated surfaces lighten or desaturate?` + reply hint), status →
   `waiting`; feed amber `dark-tokens paused — design question`; **new unread
   notification** targeting dark-tokens (cap notif list at 8).
4. Feed: Slack question answered by slack-agent (brand).
5. Feed: webhooks findings resolved on #219 (green); webhooks transcript +=
   `✓ contract tests passed (8/8)` (green).
6. **dark-tokens resumes**: transcript += edit line + `✱ Working…`, status → `working`;
   feed green `dark-tokens resumed — answer routed`.
7. Feed: checks green on #495 (green); PR #495 → `checks: passing`, `state: open`.
8. Feed: pr-reviewer kicked off on #482; hero-refresh transcript +=
   `● Bash yarn lint → ✓ clean` (green).

## Why this matters architecturally

Simulation exercises **every reactive path** the real daemon will use:
`appendEntityLines`, status transitions, PR mutations, notifications, feed pushes.
If simulation works end-to-end (terminal streams, dots flip, badges bump, counts
change), the store API is proven ready for the real transport.

## Acceptance criteria

- [ ] With sim on, all 8 steps visibly affect the UI in a full loop: header counts
      change at steps 3/6, inbox badge bumps at 3, PR badges change at 1/7, terminals
      stream at 2/3/5/6/8 (with bottom-stick autoscroll).
- [ ] Fake clock advances timestamps ([053](053-activity-feed-panel.md)).
- [ ] `?sim=0` renders a fully static app; no timers left running.
- [ ] Stopping and restarting sim doesn't duplicate lines or timers.
- [ ] The flag is read once through `src/config/env.ts`, not by scattered
      `location.search` parsing — `?sim=0` must be honoured by the e2e suite
      ([070](070-e2e-harness.md)), which depends on it for determinism.

## Tests

Simulation is the closest thing the prototype has to an integration test of the store,
so it is worth testing as such.

- Unit ([013](013-testing-infrastructure.md)) with fake timers: run all 8 steps against
  a fresh store and assert the resulting state after each — `#482.findings` bumps at
  step 1, `dark-tokens.status === 'waiting'` at 3 and `'working'` at 6, `#495` flips to
  `open`/`passing` at 7, notification list caps at 8.
- `stopSimulation()` clears every timer: assert `vi.getTimerCount() === 0` after stop,
  and that a stop→start cycle does not duplicate transcript lines.
- E2E ([070](070-e2e-harness.md)) — `simulation.spec.ts` is the only spec that runs with
  sim **on**, asserting that badges and counts visibly change.
