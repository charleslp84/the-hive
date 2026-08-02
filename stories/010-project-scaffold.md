# 010 — Project Scaffold

| | |
|---|---|
| **ID** | HIVE-010 |
| **Epic** | Foundation |
| **Depends on** | [000-overview.md](000-overview.md) |
| **Blocks** | All implementation stories |
| **Points** | 5 |
| **Architecture reference** | `incorpx` — `package.json`, `tsconfig.json`, `components.json` |

## Story

> As a developer building The Hive, I want a Vite + React + TypeScript project laid out
> with the same feature-sliced architecture we already run in `incorpx`, so every later
> story has an obvious place to land, the boundaries are machine-enforced from day one,
> and the prototype can grow into the product without a rewrite.

## Acceptance criteria

- [ ] Vite app (react-ts template) lives at the repo root under `app/`, keeping
      `concept/` and `stories/` as siblings.
- [ ] **pnpm** is the package manager (matching `incorpx`); `.nvmrc` pins the Node
      major used by the team.
- [ ] `pnpm dev` serves the app; `pnpm build` passes with zero TS errors.
- [ ] Terminal dependencies installed: `@xterm/xterm`, `@xterm/addon-fit`,
      `@xterm/addon-web-links`. (Scoped `@xterm/*` packages, **not** the deprecated
      `xterm` package.)
- [ ] State: `zustand`. Styling: `tailwindcss` v4 + `@tailwindcss/vite`, `clsx`,
      `tailwind-merge`, `class-variance-authority`.
- [ ] shadcn/ui initialised (`components.json`) with **only** the primitives the UI
      needs: `dialog` (picker overlay), `tooltip` (meta-bar back button), `dropdown-menu`.
      Do not bulk-install the library.
- [ ] Icons: `@phosphor-icons/react` (typed + tree-shakeable) — preferred over the CDN
      CSS the concept uses.
- [ ] Strict TypeScript (`"strict": true`) and the full alias set below, resolved in
      **both** `tsconfig.json` and `vite.config.ts` (Vite needs its own resolver —
      `vite-tsconfig-paths` is acceptable).
- [ ] Scripts mirror `incorpx`'s vocabulary exactly, so muscle memory transfers:
      `dev`, `build`, `preview`, `lint`, `type-check`, `test`, `test:watch`,
      `test:coverage`, `test:ui`, `test:e2e`.
- [ ] `app/README.md` states run/build commands and links back to `../stories/`.

## Path aliases

Same set as `incorpx`, minus the ones with no Hive equivalent:

```jsonc
{
  "@/*":           ["./src/*"],
  "@components/*": ["./src/components/*"],
  "@features/*":   ["./src/features/*"],
  "@lib/*":        ["./src/lib/*"],
  "@stores/*":     ["./src/stores/*"],
  "@hooks/*":      ["./src/hooks/*"],
  "@utils/*":      ["./src/utils/*"],
  "@types/*":      ["./src/types/*"],
  "@config/*":     ["./src/config/*"]
}
```

Rule inherited from `incorpx`: **always absolute `@/` imports, never relative parent
imports (`../`)**.

## Folder structure

Feature-sliced, following `incorpx`'s bulletproof-react layout. Chrome lives in
`components/layout`, domain surfaces live in `features/`, and the terminal is
framework-level infrastructure that knows nothing about the domain.

```
app/
├─ src/
│  ├─ main.tsx                       # entry
│  ├─ app.tsx                        # composition root — renders <AppShell/>
│  ├─ styles/
│  │   ├─ tokens.css                 # --cc-* custom properties + @theme (011)
│  │   └─ global.css                 # resets, scrollbars, keyframes (011)
│  ├─ components/
│  │   ├─ ui/                        # shadcn primitives + Hive atoms
│  │   │   ├─ dialog.tsx  tooltip.tsx  dropdown-menu.tsx     # shadcn
│  │   │   ├─ tab-bar.tsx            # 030, reused by 050
│  │   │   ├─ status-dot.tsx         # 031, 032, 041
│  │   │   ├─ chip.tsx               # 021, 040
│  │   │   ├─ badge.tsx              # 030, 050, 052
│  │   │   └─ key-hint.tsx           # 041, 043 right-side key hints
│  │   ├─ layout/                    # app chrome — the fixed three-column shell
│  │   │   ├─ app-shell.tsx          # 020
│  │   │   ├─ header.tsx             # 021
│  │   │   ├─ model-chip.tsx         # 021
│  │   │   ├─ status-counts.tsx      # 021
│  │   │   ├─ left-rail.tsx          # 030 container
│  │   │   ├─ activity-rail.tsx      # 050 container
│  │   │   ├─ center-stage.tsx       # 040 view-state machine
│  │   │   └─ session-meta-bar.tsx   # 040
│  │   └─ terminal/                  # THE core component — domain-agnostic
│  │       ├─ terminal-surface.tsx   # 042 — takes a transport, nothing else
│  │       └─ terminal-host.tsx      # 042 — keyed, kept-alive instances
│  ├─ features/
│  │   ├─ shared/                    # the ONLY slice other slices may import
│  │   ├─ projects/                  # 031
│  │   ├─ work/                      # 032
│  │   ├─ agents/                    # 033
│  │   ├─ orchestrator/              # 041
│  │   ├─ sessions/                  # 043, 044
│  │   ├─ inbox/                     # 051
│  │   ├─ pull-requests/             # 052
│  │   ├─ activity-feed/             # 053
│  │   └─ simulation/                # 061
│  ├─ stores/
│  │   ├─ hive-store.ts              # 012 — entities, tickets, prs, notifs, feed
│  │   └─ ui-store.ts                # 012 — theme, tabs, selection, picker
│  ├─ hooks/
│  │   ├─ use-keyboard-nav.ts        # 060
│  │   └─ use-element-size.ts        # 042 ResizeObserver helper
│  ├─ lib/
│  │   ├─ terminal/
│  │   │   ├─ terminal-transport.ts  # 042 — the seam (interface only)
│  │   │   ├─ static-transport.ts    # 042 — prototype implementation
│  │   │   └─ ansi.ts                # 042 — TermColor → SGR truecolor
│  │   └─ utils.ts                   # cn() and friends
│  ├─ types/                         # 012 — shared domain types
│  ├─ data/                          # 012 — fixtures (store-only consumers)
│  └─ config/
│      └─ env.ts                     # ?sim= flag parsing (061)
├─ tests/                            # mirrors src/ — see 013
├─ docs/                             # deep-dive docs — see 015
├─ .claude/                          # DESIGN-SYSTEM.md, COMPONENTS.md — see 015
├─ .github/workflows/                # see 071
├─ AGENTS.md  (CLAUDE.md → symlink)  # see 015
├─ eslint.config.mjs                 # see 014
├─ components.json
├─ vite.config.ts
├─ vitest.config.ts                  # see 013
├─ playwright.config.ts              # see 070
└─ tsconfig.json
```

### Feature slice anatomy

Every slice follows the same shape as an `incorpx` feature — only the folders it
actually needs, plus a barrel:

```
src/features/<slice>/
  components/     # slice-local React components
  hooks/          # slice-local hooks
  stores/         # slice-local Zustand store, when state is genuinely slice-only
  types/          # slice-local types
  utils/          # pure helpers (the natural unit-test target)
  index.ts        # public surface — the only thing app/layout code imports
```

## Notes / decisions

- **Tailwind v4, not CSS Modules.** The concept's `--cc-*` custom properties stay the
  source of truth and are registered with Tailwind through `@theme`
  ([011](011-design-tokens-and-theming.md)), so utilities resolve to the exact concept
  palette. This matches `incorpx`'s CSS-variable theming rather than fighting it.
- **Zustand, not context + `useReducer`.** `incorpx` runs Zustand with selector hooks;
  the Hive does the same. It also removes the re-render problem a single large context
  would create with 13 live terminals mounted
  ([012](012-mock-data-layer.md)).
- **No router.** The app is a single screen; "tabs" are store state, not URLs. This is
  also what keeps the eventual Electron/Tauri wrap trivial.
- **`components/terminal/` is not a feature.** It is infrastructure, like `incorpx`'s
  stream transport layer: it may not import from `features/` or `data/`, and the lint
  zones in [014](014-architecture-boundaries.md) enforce that.
- Fonts: `ui-monospace, Menlo, 'SF Mono', monospace` for all terminal/mono text; a
  display serif for the wordmark (concept uses `--font-display`). System fallbacks fine.

## Definition of done

Blank dark page renders with tokens loaded, xterm.js imported successfully (a throwaway
`<TerminalSurface>` smoke test mounts an empty terminal), and `pnpm lint`,
`pnpm type-check`, `pnpm build` are all green.
