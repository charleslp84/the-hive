# 014 — Architecture Boundaries & Lint Enforcement

| | |
|---|---|
| **ID** | HIVE-014 |
| **Epic** | Foundation |
| **Depends on** | [010-project-scaffold.md](010-project-scaffold.md) |
| **Blocks** | [042](042-terminal-surface.md) (seam enforcement); [071](071-ci-workflow.md) |
| **Points** | 3 |
| **Architecture reference** | `incorpx` — `eslint.config.mjs` |

## Story

> As a developer, I want the architecture rules to be enforced by ESLint rather than by
> memory and review, so feature isolation, the terminal transport seam, and kebab-case
> naming survive contact with a fast-moving prototype.

`incorpx` proves the point: its import zones are why features there never grew into a
tangle. The Hive gets the same fence on day one, when there is nothing to untangle.

## Spec

### Import zones (`import/no-restricted-paths`)

Ported from `incorpx` and adapted to the Hive's tree:

| Target | May **not** import from | Why |
|---|---|---|
| `./src/features/**/*` | `./src/features/**/*` except `./src/features/shared/**/*` | Feature isolation — slices talk through the store, never directly |
| `./src/components/**/*` | `./src/features/**/*` | Chrome and atoms stay domain-agnostic |
| `./src/components/terminal/**/*` | `./src/features/**/*`, `./src/data/**/*`, `./src/stores/**/*` | **The seam.** The terminal knows only its transport ([042](042-terminal-surface.md)) |
| `./src/lib/**/*` | `./src/features/**/*`, `./src/components/**/*` | Library code is leaf-level |
| `./src/hooks/**/*` | `./src/features/**/*` | Shared hooks stay shared |
| `./src/stores/**/*` | `./src/features/**/*`, `./src/components/**/*` | Stores are the bottom of the dependency graph |

As in `incorpx`, the rule is disabled *inside* `src/features/**` for same-slice imports
— a slice may freely import from itself; the cross-slice fence is the zone list above.

The `components/terminal` row is the Hive-specific addition and the most important one:
it turns [042](042-terminal-surface.md)'s "component has zero imports from `data/`"
criterion from a review note into a build failure.

### Other rules ported verbatim from `incorpx`

- `import/no-cycle: error` — no circular dependencies, no barrel-induced cycles.
- `check-file/filename-naming-convention`: `**/*.{ts,tsx}` → `KEBAB_CASE`
  (`ignoreMiddleExtensions: true`, so `*.test.tsx` is fine).
- `check-file/folder-naming-convention`: `src/**/` → `KEBAB_CASE`.
- `import/order` with groups `builtin → external → internal → parent → sibling → index`,
  `@/**` pinned to `internal` position `before`, `newlines-between: always`,
  alphabetised case-insensitively.
- TypeScript resolver pointed at `./tsconfig.json` so the alias set resolves.

### Base config

`incorpx` extends `next/core-web-vitals`, which the Hive cannot use. Substitute
`eslint-plugin-react-hooks` (rules-of-hooks + exhaustive-deps, both `error`) and
`eslint-plugin-jsx-a11y` recommended — these are the parts of the Next preset that
actually carry weight here.

## Acceptance criteria

- [ ] `pnpm lint` passes on the scaffold.
- [ ] Each zone is proven to fire: add a deliberate violating import, observe the
      specific rule name in the error, remove it. Record the six failures.
- [ ] An import from `src/components/terminal/**` into `src/data/**` fails lint —
      this is the [042](042-terminal-surface.md) seam guarantee.
- [ ] A `PascalCase.tsx` file name and a `PascalCase/` folder under `src/` both fail
      lint.
- [ ] A deliberate two-file import cycle fails lint.
- [ ] `pnpm lint --fix` reorders imports without other changes.
- [ ] The zone table above is reproduced in `AGENTS.md` ([015](015-project-docs.md))
      so the rules are discoverable without reading the config.

## Notes

- Lint scope excludes `tests/**` (matching `incorpx`, which preserved that boundary
  deliberately when migrating to flat config) — but **not** `tests/e2e/**` type-checking,
  which `pnpm type-check` still covers.
- No rule may be disabled inline to make a story pass. If a zone is wrong, change the
  zone in this story's config and say why.
