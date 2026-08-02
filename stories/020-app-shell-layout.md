# 020 — App Shell Layout

| | |
|---|---|
| **ID** | HIVE-020 |
| **Epic** | Shell |
| **Depends on** | [011-design-tokens-and-theming.md](011-design-tokens-and-theming.md), [012-mock-data-layer.md](012-mock-data-layer.md) |
| **Blocks** | [021](021-header.md), [030](030-left-rail.md), [040](040-center-stage.md), [050](050-activity-rail.md) |
| **Points** | 3 |
| **Location** | `src/components/layout/app-shell.tsx` |

## Story

> As a user, I want a fixed three-column command-center layout — navigation left,
> terminal center, activity right — that fills the viewport with no page scrolling, so
> the terminal always has maximum stable space.

## Layout spec (from concept)

```
<body>                        height: 100vh, overflow hidden, bg --cc-bg, color --cc-ink
└── AppShell                  flex column
    ├── Header                56px fixed, bg --cc-panel, border-bottom --cc-border-soft
    └── Row                   flex: 1, min-height: 0, display flex
        ├── LeftRail          268px fixed, bg --cc-panel, border-right --cc-border-soft,
        │                     own vertical scroll
        ├── CenterStage       flex: 1, min-width: 0, bg --cc-panel-2, flex column
        └── ActivityRail      316px fixed, bg --cc-panel, border-left --cc-border-soft,
                              own vertical scroll, hideable via prop/flag
```

## Acceptance criteria

- [ ] Whole app fits the viewport; only the three inner regions scroll independently.
- [ ] `min-width: 0` / `min-height: 0` set on flex children so the terminal can shrink
      (classic flexbox overflow trap — without this xterm's fit addon misbehaves).
- [ ] Body font: `var(--font-body), sans-serif`; mono regions opt in explicitly.
- [ ] `AppShell` renders `<Header/>`, `<LeftRail/>`, `<CenterStage/>`, `<ActivityRail/>`
      as placeholders (empty panels are fine until their stories land).
- [ ] Activity rail visibility controlled by `showActivityRail` in `ui-store`
      (default true) — read through a selector hook, not the store object
      ([012](012-mock-data-layer.md)).
- [ ] Resizing the window never produces a horizontal scrollbar; center column absorbs
      all width changes (rails are fixed-width).

## Tests

- Unit ([013](013-testing-infrastructure.md)): `AppShell` renders all four regions;
  toggling `showActivityRail` removes the rail from the tree.
- E2E ([070](070-e2e-harness.md)) — `smoke.spec.ts`: at 1440×900 the document has no
  horizontal scrollbar and `document.body.scrollHeight` equals the viewport height.

## Non-goals

- Draggable/resizable rails (nice-to-have, post-prototype).
- Responsive/mobile layout. Desktop-width only (min ~1200px sensible).
