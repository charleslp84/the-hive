# 030 — Left Rail (container & tabs)

| | |
|---|---|
| **ID** | HIVE-030 |
| **Epic** | Left rail |
| **Depends on** | [020-app-shell-layout.md](020-app-shell-layout.md), [012-mock-data-layer.md](012-mock-data-layer.md) |
| **Blocks** | [031](031-projects-panel.md), [032](032-work-panel.md), [033](033-agents-panel.md) |
| **Points** | 3 |
| **Location** | `src/components/layout/left-rail.tsx`; atoms in `src/components/ui/` |

## Story

> As a user, I want the left rail to switch between three views of the same fleet —
> by Project, by Work item, by Agent — so I can navigate to any terminal through the
> mental model I'm currently in.

## Spec

- Width 268px, `--cc-panel` bg, padding `14px 10px 20px`, column layout, gap 18,
  vertical scroll.
- **Tab bar** at top (shared `TabBar` atom, reused by activity rail
  [050](050-activity-rail.md)):
  - Tabs: `Projects` · `Work` · `Agents` (leftTab in store).
  - Style: 11px, 600, uppercase, letter-spacing 0.08em; active = `--cc-ink` text +
    2px `--cc-brand` underline; inactive = `--cc-subtle`, hover → `--cc-ink`.
  - `Work` tab shows a small count badge (chip bg, count of tickets).
- Body renders exactly one of: [ProjectsPanel](031-projects-panel.md),
  [WorkPanel](032-work-panel.md), [AgentsPanel](033-agents-panel.md).

## Acceptance criteria

- [ ] Tab switching is instant, preserves each panel's internal state
      (e.g. collapsed projects persist while visiting Agents and back — state lives in
      the store, not the component).
- [ ] `TabBar` atom is generic: `{ id, label, badgeCount? }[]`, `active`, `onSelect` —
      no rail-specific logic inside.
- [ ] Rail scrolls independently; tab bar stays visible (it's the first flex child,
      body scrolls).

## Shared atoms introduced here (in `src/components/ui/`)

They live beside the shadcn primitives, are domain-agnostic, and may not import from
`src/features/**` ([014](014-architecture-boundaries.md)). Each is documented in
`.claude/COMPONENTS.md` ([015](015-project-docs.md)).

| Atom | File | Used by | Spec |
|---|---|---|---|
| `TabBar` | `tab-bar.tsx` | 030, 050 | above |
| `StatusDot` | `status-dot.tsx` | 031, 032, 041 | 7px circle, color = status token, `ccpulse` animation when status `working` |
| `Chip` | `chip.tsx` | 021, 040 | pill, `--cc-chip` bg, mono 11.5px, optional icon |
| `Badge` | `badge.tsx` | 030, 050, 052 | tiny rounded count/label |

## Tests

- Unit ([013](013-testing-infrastructure.md)): `TabBar` is tested generically —
  renders arbitrary `{id,label,badgeCount}` items, fires `onSelect`, marks the active
  tab — with **no** Hive-specific fixtures. If a `TabBar` test needs to know what
  "Projects" is, the atom has leaked domain knowledge.
- `StatusDot` renders the right colour per status and applies the pulse animation only
  for `working`.
- Rail-level test: switching tabs swaps the panel and preserves `collapsed` state.
