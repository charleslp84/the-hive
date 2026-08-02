# 011 — Design Tokens & Theming

| | |
|---|---|
| **ID** | HIVE-011 |
| **Epic** | Foundation |
| **Depends on** | [010-project-scaffold.md](010-project-scaffold.md) |
| **Blocks** | Every visual story; [042-terminal-surface.md](042-terminal-surface.md) (xterm theme mapping) |
| **Points** | 3 |
| **Location** | `src/styles/tokens.css`, `src/styles/global.css`, `src/lib/terminal/ansi.ts`, `src/stores/ui-store.ts` |

## Story

> As a user, I want the app to render in a dark terminal-native theme by default with a
> one-click light theme, so the command center feels like a first-class terminal tool in
> both modes.

## Acceptance criteria

- [ ] `src/styles/tokens.css` defines the variables below on `:root` (dark) and
      overrides on `body[data-theme="light"]`.
- [ ] The tokens are registered with Tailwind v4 via **`@theme inline`** (below), so
      utilities like `bg-panel` / `text-muted` / `border-soft` resolve to the concept's
      exact values. Components use those utilities; raw hex literals in component code
      are banned (the `incorpx` rule — see [015](015-project-docs.md)).
- [ ] Theme state lives in `ui-store.ts` (Zustand, [012](012-mock-data-layer.md));
      toggling sets `data-theme` on `<body>` and re-themes **all mounted xterm
      instances** (xterm needs its `theme` option updated programmatically — CSS
      variables don't reach the canvas; see [042](042-terminal-surface.md)).
- [ ] Default theme: dark. No persistence needed in this phase.
- [ ] Keyframes `ccpulse` (opacity 1 → .3 → 1, 1.6s ease-in-out infinite) and `ccblink`
      defined in `global.css`.
- [ ] Thin custom scrollbars (10px, thumb = `--cc-border`, rounded, transparent track).

## Token set (from concept, keep names)

### Dark (default)

```css
:root {
  --cc-bg: #10152a;        --cc-panel: #141a33;    --cc-panel-2: #121731;
  --cc-hover: #1b2344;     --cc-active: #222c55;
  --cc-border: #273159;    --cc-border-soft: #1e2747;
  --cc-ink: #e9effc;       --cc-muted: #98a3cc;    --cc-subtle: #6b779f;
  --cc-brand: #8fa7f2;     --cc-green: #74b79c;    --cc-amber: #ffac47;
  --cc-red: #ff8d85;       --cc-chip: #1c2648;
  --cc-term-bg: #0b1023;   --cc-term-input: #0e1430;
}
```

### Light

```css
body[data-theme="light"] {
  --cc-bg: #fdfdfb;        --cc-panel: #ffffff;    --cc-panel-2: #f7fafb;
  --cc-hover: #f4f9ff;     --cc-active: #e9f3fc;
  --cc-border: #d4dee3;    --cc-border-soft: #edf2f4;
  --cc-ink: #2c2f34;       --cc-muted: #73767c;    --cc-subtle: #8e949c;
  --cc-brand: #334fa9;     --cc-green: #2e6b52;    --cc-amber: #c77414;
  --cc-red: #d3372f;       --cc-chip: #edf2f4;
  /* --cc-term-bg / --cc-term-input intentionally stay dark: the terminal keeps its
     dark background in light mode, like the concept and most real tools. */
}
```

### Tailwind v4 mapping

`@theme inline` binds the custom properties to Tailwind's namespaces without copying
the values, so `tokens.css` stays the single source of truth and the light-mode
override keeps working through the same variables:

```css
@import 'tailwindcss';

@theme inline {
  --color-bg: var(--cc-bg);
  --color-panel: var(--cc-panel);
  --color-panel-2: var(--cc-panel-2);
  --color-hover: var(--cc-hover);
  --color-active: var(--cc-active);
  --color-border: var(--cc-border);
  --color-border-soft: var(--cc-border-soft);
  --color-ink: var(--cc-ink);
  --color-muted: var(--cc-muted);
  --color-subtle: var(--cc-subtle);
  --color-brand: var(--cc-brand);
  --color-green: var(--cc-green);
  --color-amber: var(--cc-amber);
  --color-red: var(--cc-red);
  --color-chip: var(--cc-chip);
  --color-term-bg: var(--cc-term-bg);
  --color-term-input: var(--cc-term-input);

  --font-mono: ui-monospace, Menlo, 'SF Mono', monospace;
  --animate-ccpulse: ccpulse 1.6s ease-in-out infinite;
}
```

`inline` matters here: it makes the utilities emit `var(--cc-*)` rather than resolving
the value at build time, which is what lets a single `data-theme` flip re-colour the
whole app.

### Terminal text palette (used inside xterm, not CSS)

Exported as a TS constant from `src/lib/terminal/ansi.ts` so the transport, the xterm
theme, and `.claude/DESIGN-SYSTEM.md` all share one definition:

```ts
export const TERM = {
  ink:  '#dbe4ff',  // default foreground
  dim:  '#7c88b8',  // secondary / meta
  green:'#7ee2b8',  // success, prompts
  blue: '#8fb5ff',  // tool calls (Read/Edit/Bash lines)
  amber:'#ffc06e',  // working spinner, questions
  red:  '#ff8d85',  // errors
  cyan: '#7edce2',  // orchestrator-injected lines, PR refs
  bg:   '#0b1023',
  selection: '#222c55',
} as const;
```

This palette is intentionally **not** in `@theme` — it never reaches CSS. It is
consumed as JS by xterm's `theme` option and by the ANSI colorizer.

## Interaction

- Theme toggle button in the header ([021-header.md](021-header.md)): icon `ph-sun` when
  dark (click → light), `ph-moon` when light (click → dark).

## Tests

- Unit ([013](013-testing-infrastructure.md)): `toggleTheme()` flips `ui-store` state
  and writes `data-theme` to `document.body`; `TERM` values match the documented hexes.
- E2E ([070](070-e2e-harness.md)): toggling theme changes the shell's computed
  background colour, and the terminal background stays dark in both modes.

## Out of scope

- System-preference detection (`prefers-color-scheme`) — later.
- Per-session terminal color schemes.
