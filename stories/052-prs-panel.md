# 052 — PRs Panel

| | |
|---|---|
| **ID** | HIVE-052 |
| **Epic** | Activity rail |
| **Depends on** | [050-activity-rail.md](050-activity-rail.md) |
| **Blocks** | — |
| **Points** | 3 |
| **Location** | `src/features/pull-requests/`; badge rules shared via `src/features/shared/` |

## Story

> As a user, I want the open PRs my sessions produced listed with state, findings, and
> checks, so I can see what's shippable and jump to the session that owns each PR.

## Spec

One card per PR in `prs` (gap 8):

- Card: horizontal, gap 10, padding `10px 12px`, radius 12, 1px `--cc-border-soft`
  border, hover `--cc-hover`, click → `openTab(pr.session)`.
- **Icon**: `ph-git-pull-request` 16px, colored by state
  (open/approved `--cc-green`, draft `--cc-subtle`, merged `--cc-brand`).
- **Body**:
  - Line 1: `#N` (mono 12px `--cc-brand`) + title (12.5px 600 ink, ellipsis).
  - Line 2: repo (mono 10.5px subtle).
  - Line 3: badge row (Badge atom, wrap, gap 6), composed by rule:

| Condition | Badge | Color |
|---|---|---|
| state merged | `merged` | brand |
| state approved | `approved` | green |
| state draft | `draft` | subtle |
| findings > 0 | `{n} open finding(s)` | amber |
| findings = 0 ∧ state open | `no findings` | subtle |
| checks running | `checks running` | subtle |
| checks failing | `checks failing` | red |

## Fixtures (4)

`#482 apfm-web` open, 2 findings, passing → `hero-refresh` ·
`#219 referral-api` approved, passing → `webhooks` ·
`#495 design-system` draft, running → `dark-tokens` ·
`#77 advisor-portal` merged → `tz-fix`.

## Acceptance criteria

- [ ] All four cards render with the exact badge combinations the rules produce
      (e.g. #482 → `2 open findings`; #219 → `approved` + `no findings`… verify rule
      table against expectations, adjust rule table if concept differs).
- [ ] Findings/state changes from simulation (e.g. #482 findings+1, #495 draft→open)
      re-render here and in the Work panel ([032](032-work-panel.md)) — single source
      of truth is the `prs` collection ([012](012-mock-data-layer.md)).
- [ ] Click always opens the owning session's terminal.
- [ ] The badge rules live in `src/features/shared/` and are imported by both this
      panel and the Work panel ([032](032-work-panel.md)) — feature isolation forbids
      importing them from `pull-requests` into `work` directly
      ([014](014-architecture-boundaries.md)).

## Tests

- Unit ([013](013-testing-infrastructure.md)): `composeBadges({ state, findings,
  checks })` is a pure function with a test per row of the rule table plus the four
  fixture combinations. Because [032](032-work-panel.md) renders the same badges, one
  test suite protects both surfaces.
- Mutating a PR in the store re-renders this panel with the new badges.
