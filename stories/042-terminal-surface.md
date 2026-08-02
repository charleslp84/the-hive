# 042 — Terminal Surface (xterm.js) — THE core component

| | |
|---|---|
| **ID** | HIVE-042 |
| **Epic** | Center stage |
| **Depends on** | [011-design-tokens-and-theming.md](011-design-tokens-and-theming.md), [040-center-stage.md](040-center-stage.md) |
| **Blocks** | [041](041-orchestrator-console.md), [043](043-session-view.md), [061](061-simulation-mode.md) |
| **Points** | 13 |
| **Location** | `src/components/terminal/` (component) + `src/lib/terminal/` (seam) |
| **Architecture reference** | `incorpx` — `src/lib/http-client.ts`, `components/ai/stream/` |

## Story

> As a user, I want the center terminal to be a **real terminal surface** (xterm.js) —
> real selection, real ANSI colors, real scrollback — even while its content is still
> static, so the prototype already feels like the product and the component never needs
> replacing when real PTYs arrive.

This is the heart of The Hive. Build it carefully; everything else is furniture.

## Component contract

```tsx
export interface TerminalTransport {
  write(data: string): void;                       // user keystrokes → backend
  onData(cb: (chunk: string) => void): () => void; // backend output → terminal
  resize(cols: number, rows: number): void;
}

interface TerminalSurfaceProps {
  transport: TerminalTransport;
  theme: 'dark' | 'light';
  fontSize?: number;      // default 12.5
  readOnly?: boolean;     // orchestrator table era: true; input handled separately
}
```

**The component must know nothing about sessions, stores, or mocks** — only the
transport. This is the seam that later swaps to IPC→PTY (see decision record in
[000-overview.md](000-overview.md)).

## Prototype transport: `StaticTransport`

Lives at `src/lib/terminal/static-transport.ts`, beside the interface
(`terminal-transport.ts`) and `ansi.ts`. Wraps an entity's `TermLine[]`:

- On mount / entity switch: replays all lines as ANSI-colored output.
- Subscribes to the store; when `appendEntityLines` adds lines, emits only the new ones.
- `write()` is a no-op (the prototype's input row is a separate DOM input —
  [043](043-session-view.md)); `resize()` is a no-op.
- `src/lib/terminal/ansi.ts` maps `TermColor` → SGR truecolor using the `TERM` palette from
  [011](011-design-tokens-and-theming.md):
  `colorize('● Bash yarn test', 'blue')` → `\x1b[38;2;143;181;255m…\x1b[0m`.

## xterm configuration

- Packages: `@xterm/xterm`, `@xterm/addon-fit`, `@xterm/addon-web-links`.
- Options: `fontFamily: "ui-monospace, Menlo, 'SF Mono', monospace"`, `fontSize: 12.5`,
  `lineHeight: 1.4` (xterm's metric; tune visually against the concept's 1.7 CSS value),
  `cursorBlink: false` in read-only, `scrollback: 5000`, `convertEol: true`.
- Theme object built from `TERM` palette: `background: TERM.bg`, `foreground: TERM.ink`,
  `selectionBackground: TERM.selection`, ANSI slots mapped to the palette. On app theme
  toggle, call `term.options.theme = …` (terminal stays dark in light mode per
  [011](011-design-tokens-and-theming.md); only selection/cursor tint may vary).
- **FitAddon**: refit on mount, on container resize (ResizeObserver), and on rail
  visibility change. Container needs `min-width: 0 / min-height: 0` ancestors
  ([020](020-app-shell-layout.md)).
- Padding: wrap the terminal in a `--cc-term-bg` container with `16px 18px` padding
  (xterm has no padding option).

## Instance & buffer strategy

**One xterm instance per entity, kept alive and shown/hidden** (CSS `display`), NOT one
shared instance re-fed on tab switch:

- Preserves native scrollback position and selection per session — closest to real
  multiplexer behavior and closest to future PTY semantics.
- 13 entities × 5k scrollback is fine for a prototype.
- Implement as a `TerminalHost` keyed by entity id that mounts surfaces lazily on first
  visit and calls `fit()` when a surface becomes visible.

## Acceptance criteria

- [ ] Opening any session shows its fixture transcript with correct colors (prompt
      lines green, tool lines blue, notes dim, warnings amber, orchestrator lines cyan).
- [ ] Text is selectable/copyable like a real terminal; links (e.g. a pasted URL) are
      clickable via the web-links addon.
- [ ] New lines appended by simulation/actions stream in and auto-scroll — but **only
      when the viewport is already at the bottom** (respect the user reading scrollback;
      check `buffer.active.viewportY` before `scrollToBottom()`).
- [ ] Switching tabs and returning preserves scroll position and selection.
- [ ] Window/rail resize refits with no reflow artifacts or clipped last line.
- [ ] Theme toggle re-themes all live instances without losing content.
- [ ] Component has zero imports from `src/data/`, `src/stores/`, or `src/features/`
      (transport injected). **Enforced by the `components/terminal` import zone in
      [014](014-architecture-boundaries.md)** — a violation fails `pnpm lint`, not
      review.

## The seam, stated plainly

This is the Hive's equivalent of `incorpx`'s `lib/http-client.ts`: the one module every
byte flows through, so replacing the backend is a one-file change. `StaticTransport`
knows about the store; `TerminalSurface` knows only `TerminalTransport`. When the PTY
daemon lands, a `PtyTransport` implementing the same three methods drops in and no
component changes. If a future story ever needs the terminal component to read the
store, that story is wrong — pass it through the transport.

## Tests

Split by what each tool can actually prove — see
[013](013-testing-infrastructure.md) for the xterm mocking contract.

**Unit (Vitest, mocked xterm):**

- `ansi.ts` `colorize()` emits the exact SGR truecolor sequence for each `TermColor`.
- `StaticTransport` replays all lines on subscribe, emits **only new** lines on
  `appendEntityLines`, and its unsubscribe function detaches the store listener (no
  leak on unmount).
- `TerminalSurface` subscribes on mount, unsubscribes on unmount, and calls
  `resize(cols, rows)` when its container resizes.
- The bottom-stick rule is a pure predicate `shouldAutoScroll(viewportY, baseY, rows)`
  tested independently of xterm.

**E2E (Playwright, real browser — [070](070-e2e-harness.md)):** rendered colors,
selection, scrollback preservation across tab switches, refit on resize, and theme
re-theming. These cannot be asserted against a mocked canvas and must not be faked in
unit tests.

## Out of scope (this phase)

- Real keystroke echo into xterm (input row is separate — [043](043-session-view.md)).
- Search addon, sixel/images, ligatures, WebGL renderer (revisit if perf demands).
