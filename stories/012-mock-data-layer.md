# 012 — Mock Data Layer (types, fixtures, stores)

| | |
|---|---|
| **ID** | HIVE-012 |
| **Epic** | Foundation |
| **Depends on** | [010-project-scaffold.md](010-project-scaffold.md) |
| **Blocks** | All panel & center stories |
| **Points** | 8 |
| **Location** | `src/types/`, `src/data/fixtures.ts`, `src/stores/hive-store.ts`, `src/stores/ui-store.ts` |
| **Architecture reference** | `incorpx` — `src/stores/*`, selector-hook convention |

## Story

> As a developer, I want one typed in-memory store holding every entity the UI shows,
> with actions that mimic what the future orchestrator daemon will do, so panels are
> pure views and swapping in a real backend later only replaces the store internals.

## Domain types (`src/types/`)

One file per concern, kebab-case, per [014](014-architecture-boundaries.md):
`entity.ts`, `ticket.ts`, `pull-request.ts`, `notification.ts`, `feed.ts`, `terminal.ts`.

```ts
export type SessionStatus = 'working' | 'waiting' | 'idle' | 'done';
export type TermColor = 'ink' | 'dim' | 'green' | 'blue' | 'amber' | 'red' | 'cyan';

export interface TermLine { text: string; color: TermColor }

export interface Session {
  kind: 'session';
  id: string;                 // 'hero-refresh'
  project: string;            // 'apfm-web'
  branch: string;             // 'feat/hero-refresh'
  status: SessionStatus;
  task: string;               // one-line description
  pr: { n: number; state: 'open' | 'merged' | 'draft' } | null;
  cost: string;               // '$2.41'
  model?: 'haiku' | 'sonnet' | 'opus' | 'fable';
  effort?: 'low' | 'medium' | 'high' | 'max';
  lines: TermLine[];          // terminal transcript (static)
}

export interface Agent {
  kind: 'agent';
  id: string;                 // 'slack-agent'
  icon: string;               // phosphor icon name
  sub: string;                // subtitle, e.g. '#eng-alerts · #deploys · #ask-eng'
  task: string;
  status: 'online';
  lines: TermLine[];
}

export type Entity = Session | Agent;

export interface Project { id: string; icon: string }   // 5 fixed projects

export interface Ticket {
  key: string;                // 'GRAC-3018'
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done';
  title: string;
  sessions: string[];         // session ids
}

export interface Pr {
  n: number; repo: string; title: string;
  state: 'open' | 'approved' | 'draft' | 'merged';
  findings: number;
  checks: 'passing' | 'running' | 'failing';
  session: string;            // owning session id
}

export interface Notification {
  icon: string; tone: 'amber' | 'green' | 'brand' | 'red';
  title: string; sub: string; time: string;
  unread: boolean; target: string;   // entity id to open on click
}

export interface FeedItem {
  time: string; txt: string;
  tone: 'brand' | 'green' | 'amber' | 'red'; icon: string;
}
```

## Two Zustand stores

Split along the same line `incorpx` splits its `ui-store` from its domain stores:
what the *user is looking at* versus what the *system knows*. The split is not
cosmetic — it keeps a keystroke in the picker from re-rendering thirteen terminals.

### `src/stores/hive-store.ts` — domain state

```ts
interface HiveState {
  entities: Record<string, Entity>;
  order: string[];            // session display order
  agentOrder: string[];
  projects: Project[];
  tickets: Ticket[];
  prs: Pr[];
  notifs: Notification[];
  feed: FeedItem[];
  orchLines: TermLine[];      // orchestrator console transcript
}
```

### `src/stores/ui-store.ts` — view state

```ts
interface UiState {
  theme: 'dark' | 'light';
  activeTab: 'orch' | string; // entity id or orchestrator
  selIdx: number;             // orchestrator table selection
  leftTab: 'projects' | 'work' | 'agents';
  railTab: 'inbox' | 'prs' | 'activity';
  collapsed: Record<string, boolean>;  // project id -> collapsed
  picker: boolean;            // new-session overlay open
  pickerQuery: string;
  newModel: Session['model']; // default 'opus'
  newEffort: Session['effort']; // default 'high'
  showActivityRail: boolean;  // 020
}
```

## Selector hooks — the `incorpx` rule

**Components never read a store object directly.** Every consumer goes through a named
selector hook exported next to the store, exactly as `incorpx` requires for
`useSidebarState()` / `useWorkbenchCount()`. This is what keeps a status change from
re-rendering the whole shell.

| Hook | Returns |
|---|---|
| `useEntity(id)` | one entity, or `undefined` |
| `useCounts()` | `{ working, waiting, idle, done }` — drives the header ([021](021-header.md)) |
| `useNavOrder()` | `[...activeSessionIds, ...doneSessionIds]` — [041](041-orchestrator-console.md), [060](060-keyboard-navigation.md) |
| `useProjectSessions(projectId)` | non-done sessions for a project ([031](031-projects-panel.md)) |
| `useTicketPrs(ticketKey)` | PRs reachable from a ticket's sessions ([032](032-work-panel.md)) |
| `useUnreadCount()` | inbox unread count ([050](050-activity-rail.md), [021](021-header.md)) |
| `useActiveEntity()` | the entity behind `activeTab`, or `null` for the orchestrator |

Derived values are computed in selectors, never stored — there is exactly one source
of truth for every number on screen.

## Actions (mirror the future daemon API)

| Action | Store | Behavior in prototype |
|---|---|---|
| `openTab(id \| 'orch')` | ui | set activeTab, close picker |
| `toggleTheme()` | ui | flip theme, write `data-theme` on body |
| `toggleProject(id)` | ui | collapse/expand in projects panel |
| `setLeftTab / setRailTab` | ui | switch panels |
| `openPicker() / closePicker()` | ui | overlay control |
| `spawnSession(repo, task?, model?, effort?)` | hive | create session `sess-xxxx`, branch `feat/sess-xxxx`, status `idle` if no task else `working`, seed 3 transcript lines, append to order, push feed item, open its tab |
| `sendToEntity(id, msg)` | hive | append `❯ [orchestrator] msg` (cyan) to entity lines; after ~2s append acknowledgement + `✱ Working…` and set status `working`; push feed item |
| `runOrchCommand(raw)` | hive | parse & execute console command (see [041](041-orchestrator-console.md)) |
| `markAllRead()` / `markRead(i)` | hive | inbox management |
| `pushFeed(item)` | hive | prepend, cap at 24 |
| `appendEntityLines(id, lines, status?)` | hive | used by simulation |

Actions that span both stores (`spawnSession` opens a tab) call the other store's
action explicitly — no store subscribes to the other. Deferred effects (the ~2s
acknowledgement) return their timer handle so tests and
[061](061-simulation-mode.md) can cancel them deterministically.

## Fixtures (`src/data/fixtures.ts`)

Port the concept's dataset verbatim — it is well-tuned demo data:

- **10 sessions**: `hero-refresh`, `lead-form`, `webhooks`, `rails-upgrade`,
  `call-notes`, `tz-fix`, `dark-tokens`, `ecs-scaling`, `e2e-quote`, `nplusone` —
  with the same projects, branches, statuses, tasks, PRs, costs, and transcript lines
  as `concept/Command Center.dc.html` (constructor block, `mk(...)` calls).
- **3 agents**: `slack-agent`, `pr-reviewer`, `standup-agent` (same subs/lines).
- **5 projects**: `apfm-web`, `referral-api`, `advisor-portal`, `design-system`,
  `infra-terraform` with the same phosphor icons.
- **8 tickets** (`GRAC-*`), **4 PRs** (#482, #219, #495, #77), **5 notifications**,
  **7 feed items**, **3 orchestrator boot lines** (`maestro v0.4.2 …`).

Fixtures export a `createInitialState()` factory rather than a frozen object, so every
test starts from a clean copy ([013](013-testing-infrastructure.md)).

## Acceptance criteria

- [ ] All types above compile; fixtures typecheck against them.
- [ ] Both stores implemented with Zustand; every consumer path has a named selector
      hook — **no component imports a store's `getState` or subscribes to the whole
      store**.
- [ ] Actions produce the documented state changes and are unit-testable without React.
- [ ] Nothing outside `src/stores/` imports `src/data/fixtures.ts` — enforced by an
      import zone ([014](014-architecture-boundaries.md)), not by review.
- [ ] `createInitialState()` returns a fresh deep copy each call (mutating one test's
      state cannot leak into the next).

## Tests

- Every action in the table above has a unit test against a fresh store
  ([013](013-testing-infrastructure.md)) — this is the reference test pattern for the
  repo.
- Every selector hook has a test asserting its derived value against fixtures
  (`useCounts()` returns the fixture's 8 active / 2 done split, etc.).
- Timer-based behaviour (`sendToEntity`'s delayed ack) is tested with fake timers,
  never with real waits.

## Out of scope

- Persistence, undo, websockets. The stores' public API is the seam for the future
  daemon ([000-overview.md](000-overview.md) → Decision record).
