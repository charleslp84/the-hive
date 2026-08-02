# 071 — CI Workflow

| | |
|---|---|
| **ID** | HIVE-071 |
| **Epic** | Cross-cutting |
| **Depends on** | [013](013-testing-infrastructure.md), [014](014-architecture-boundaries.md), [070](070-e2e-harness.md) |
| **Blocks** | — |
| **Points** | 2 |
| **Architecture reference** | `incorpx` — `.github/workflows/` |

## Story

> As a developer, I want every push and pull request to run lint, type-check, unit
> tests with the coverage gate, and the e2e suite, so the architectural rules from
> [014](014-architecture-boundaries.md) and the coverage floor from
> [013](013-testing-infrastructure.md) are enforced by the machine and not by
> whoever happens to review.

A boundary rule nobody runs is a comment. This story is what makes 013 and 014 real.

## Spec

`.github/workflows/ci.yml`, triggered on `push` to the default branch and on
`pull_request`:

| Job | Runs | Blocking |
|---|---|---|
| `quality` | `pnpm lint`, then `pnpm type-check` | yes |
| `test` | `pnpm test:coverage` (80% gate, [013](013-testing-infrastructure.md)) | yes |
| `e2e` | `pnpm exec playwright install --with-deps chromium`, then `pnpm test:e2e` | yes |

- `quality` and `test` run in parallel; `e2e` needs a build and may run alongside.
- Node version comes from `.nvmrc`; pnpm via `pnpm/action-setup` with the store cached
  on the lockfile hash.
- `pnpm install --frozen-lockfile` everywhere — a drifted lockfile fails the build.
- Coverage summary posted to the job summary; the HTML report uploaded as an artifact.
- Playwright traces/screenshots uploaded as artifacts **on failure only**
  ([070](070-e2e-harness.md)).
- Concurrency group per ref with `cancel-in-progress: true`, so superseded pushes stop
  burning runners.

## Acceptance criteria

- [ ] A pull request shows all three checks and they pass on a clean branch.
- [ ] A deliberately introduced lint violation (a cross-feature import — the
      [014](014-architecture-boundaries.md) zone) fails `quality`, naming the rule.
      Record the failing run, then revert.
- [ ] A deliberately introduced type error fails `quality`.
- [ ] Dropping coverage below 80% fails `test`. Record the failing run, then revert.
- [ ] A failing e2e spec fails `e2e` and uploads its trace artifact.
- [ ] Cached install: a second run on an unchanged lockfile is measurably faster than
      the first.
- [ ] Full pipeline completes in under 8 minutes.

## Out of scope

- Deployment, preview environments, release automation. The prototype has no
  deployment target until the desktop shell decision ([000](000-overview.md)).
- Branch-protection configuration — a repo setting, not a workflow file. Note it in
  the PR description so it gets enabled.
