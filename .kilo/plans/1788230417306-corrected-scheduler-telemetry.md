# Plan: corrected crash telemetry for the Svelte scheduler `startTime` crash

## What's wrong with the current hook

The hook from `1788229685307-crash-telemetry-plan.md` is installed but **captured nothing useful** for the live repro. The devtools console from the click-around shows:

1. **One `CONFIG_ERROR`** — `Failed to resolve module specifier 'svelte'` from the dynamic `new Function('s','return import(s)')('svelte')` probe. Bare specifiers go through Vite's import-analysis plugin; `new Function` escapes static analysis but the browser still cannot resolve `'svelte'` at runtime. Probe path is dead.
2. **Zero `scheduler:console-error` `RENDER_ERROR` lines** — the live crash stack runs:
   ```
   et.reportAllChanges (.../runtime-DcmRJ03G.js:19429)
     → (.../runtime-DcmRJ03G.js:13070)
     → (.../runtime-DcmRJ03G.js:331)
     → d (.../runtime-DcmRJ03G.js:6141)
     → u (.../runtime-DcmRJ03G.js:6153)
     → ... flush ...
     → n.timeout (.../runtime-DcmRJ03G.js:5652)
   ```
   `n.timeout` is Svelte's `requestIdleCallback` scheduler wrapper. The throw escapes uncaught via the idle-callback microtask and surfaces as a plain `Uncaught TypeError` — it does **not** pass through `console.error`. So the wrapper is correct in principle but never fires for this specific crash mode.
3. The crash still reproduces on `/plan` after the previous-pass `let draft = $state(initialTripDraft())` fix, because the trigger is downstream of that change (likely the `class:hidden` flip + parent re-render during the scheduler flush).

So the current hook has two dead paths for the symptom we're trying to debug. The fix is to instrument the **actual boundary where this crash is observable**: the `requestIdleCallback` / microtask queue that the scheduler uses to defer its flush, and the `flush_tasks` / `process_microtask` entries where the dead `Task` is read.

## Goal

Capture the originating throw's stack at the boundary where the scheduler actually emits it, via the project's canonical logger, in dev only, with one source edit.

## Strategy: hook the microtask queue and the idle callback

There are two observable surfaces in Svelte 5's scheduler:

- **`queueMicrotask(fn)`** — the microtask scheduler used for non-idle flushes. Called from `runtime.js` to schedule `flush_sync_tasks` and `flush_tasks`.
- **`requestIdleCallback(fn)`** (with `setTimeout` polyfill) — used by `n.timeout` to defer long flushes. **This is where the live crash surfaces.**

Both are `globalThis` properties in browsers. Replacing them with a wrapper that records the *enqueued* callback (so when it fires we can correlate the throw to the originating write) is the minimum-friction capture.

We do not touch Svelte internals. We do not import `'svelte'` (the bare specifier is unresolvable from `new Function`). We do not write `console.*` except the unavoidable wrapper that forwards to the original. All structured logging still routes through `log` with `EVENT` types.

## Files changed

| File | Change |
|---|---|
| `voyager/src/lib/schedulerHook.js` | Rewrite. Replace the broken `console.error` + dynamic-`svelte`-import probes with `requestIdleCallback` / `queueMicrotask` wrappers that log via the project's logger. |
| `voyager/src/routes/+layout.svelte` | No change. Already imports + calls `installSchedulerHook` at the top of `<script>`. |

## Logging rules being conformed to

`.kilocode/rules/logging.md` — same set as the prior plan:

- **Rule 1**: import `{ log, EVENT, serializeError, presence }` from `$lib/logger.js`.
- **Rule 2**: no `console.log`/`console.error` in generated code. The hook does *not* call `console.*` itself. It wraps `requestIdleCallback` and `queueMicrotask` and forwards to the originals — same exception as the existing `+layout.svelte:67` interceptor: a transparent observation point, not a logging path. The wrapper logs via `log`, not via `console.*`.
- **Rule 3**: one module-level `log.child({ component, function })`.
- **Rule 4**: `JOB_START` then `JOB_SUCCESS` for the install; `RENDER_ERROR` for every captured throw.
- **Rule 5**: only `EVENT.*` types.
- **Rule 6**: every caught error via `serializeError(err, { function, step })`.
- **Rule 7**: `presence()` for redaction.
- **Rule 14**: kebab-case `component`, `function` per the export, colon-joined lowercase `step`.
- **Rule 15**: no second logger instance, no raw `Error` in logs, no swallowed catches (the wrappers re-invoke the original; the log fires before forwarding).

## Step-by-step

### Step 1 — Rewrite `voyager/src/lib/schedulerHook.js`

Delete the current contents and write:

```js
// schedulerHook.js — dev-only diagnostic hook around Svelte's scheduler flush.
// See .kilocode/rules/logging.md for the logging conventions this file follows.
//
// We hook the two boundaries where Svelte 5's scheduler actually defers its
// flush:
//   - requestIdleCallback  (n.timeout path — where the live "startTime" crash
//                            surfaces as an Uncaught TypeError via the idle
//                            callback microtask)
//   - queueMicrotask        (flush_sync_tasks / flush_tasks scheduling)
//
// The console.error wrapper from the prior pass never fired for this crash
// because the throw escapes via the idle callback, not via console.error.
// We also drop the dynamic import('svelte') probe — bare specifiers are not
// resolvable from a `new Function` body in Vite dev (it goes through
// import-analysis at parse time), so the probe produced a CONFIG_ERROR
// every load and never wrapped anything.
//
// All structured logging still routes through log (Rule 1). The wrappers
// are transparent observation points — they log via log, invoke the
// original, and never call console.* themselves (Rule 2 / Rule 15).

import { log, EVENT, serializeError, presence } from './logger.js';

const hookLog = log.child({
	component: 'scheduler-hook',
	function: 'schedulerHook:install'
});

let installed = false;
let idleWrapCount = 0;
let microtaskWrapCount = 0;

function wrapIdleCallback(orig) {
	return function schedulerIdleWrapper(fn, opts) {
		idleWrapCount += 1;
		const captureIndex = idleWrapCount;
		hookLog.info(
			{
				type: EVENT.JOB_START,
				step: 'scheduler:idle-schedule',
				captureIndex,
				fnKind: typeof fn,
				opts: presence(opts)
			},
			`Idle callback scheduled (${captureIndex})`
		);
		const wrapped = function schedulerIdleInner(...args) {
			const route =
				(typeof globalThis !== 'undefined' && globalThis.location?.pathname) ||
				'(unknown)';
			let pendingDeps = 'unknown';
			try {
				if (
					typeof $effect !== 'undefined' &&
					typeof $effect.pending === 'function'
				) {
					pendingDeps = $effect.pending();
				}
			} catch (_) {
				pendingDeps = 'unavailable';
			}
			try {
				return fn.apply(this, args);
			} catch (err) {
				hookLog.error(
					{
						type: EVENT.RENDER_ERROR,
						step: 'scheduler:idle-throw',
						captureIndex,
						route,
						pendingDeps,
						err: serializeError(err, {
							function: 'schedulerHook:idleCallback',
							step: 'scheduler:idle-throw'
						})
					},
					`Idle callback threw: ${err?.message ?? String(err)}`
				);
				throw err;
			}
		};
		return orig.call(this, wrapped, opts);
	};
}

function wrapQueueMicrotask(orig) {
	return function schedulerMicrotaskWrapper(fn) {
		microtaskWrapCount += 1;
		const captureIndex = microtaskWrapCount;
		hookLog.info(
			{
				type: EVENT.JOB_START,
				step: 'scheduler:microtask-schedule',
				captureIndex,
				fnKind: typeof fn
			},
			`Microtask scheduled (${captureIndex})`
		);
		const wrapped = function schedulerMicrotaskInner(...args) {
			try {
				return fn.apply(this, args);
			} catch (err) {
				hookLog.error(
					{
						type: EVENT.RENDER_ERROR,
						step: 'scheduler:microtask-throw',
						captureIndex,
						err: serializeError(err, {
							function: 'schedulerHook:queueMicrotask',
							step: 'scheduler:microtask-throw'
						})
					},
					`Microtask threw: ${err?.message ?? String(err)}`
				);
				throw err;
			}
		};
		return orig.call(this, wrapped);
	};
}

export function installSchedulerHook() {
	if (!import.meta.env.DEV) return;
	if (installed) return;
	installed = true;

	hookLog.info(
		{
			type: EVENT.JOB_START,
			step: 'scheduler-hook:install'
		},
		'Scheduler hook install started'
	);

	let idleWrapped = false;
	let microtaskWrapped = false;

	if (typeof globalThis.requestIdleCallback === 'function') {
		const origIdle = globalThis.requestIdleCallback;
		globalThis.requestIdleCallback = wrapIdleCallback(origIdle);
		idleWrapped = true;
	}

	if (typeof globalThis.queueMicrotask === 'function') {
		const origMicro = globalThis.queueMicrotask;
		globalThis.queueMicrotask = wrapQueueMicrotask(origMicro);
		microtaskWrapped = true;
	}

	hookLog.info(
		{
			type: EVENT.JOB_SUCCESS,
			step: 'scheduler-hook:install',
			idleWrapped,
			microtaskWrapped
		},
		`Scheduler hook install succeeded (idle=${idleWrapped}, microtask=${microtaskWrapped})`
	);
}
```

Notes:

- `requestIdleCallback` is wrapped at module level via `globalThis.requestIdleCallback = wrapIdleCallback(origIdle)`. `wrapIdleCallback` returns a function, which we assign. This avoids reassigning through a named `globalThis.console.error` property and follows the same transparent-observation pattern as the existing layout interceptor.
- `queueMicrotask` is wrapped the same way. Svelte's `flush_sync_tasks` and `flush_tasks` both go through microtask scheduling; wrapping it gives us a second capture point if the idle path is bypassed.
- The wrappers never call `console.*`. They log via `log` (`hookLog.info` / `hookLog.error`), invoke the original, and rethrow. The existing `+layout.svelte:67` interceptor remains untouched and still fires for any `console.error` calls — it's now strictly additive.
- We dropped the `console.error` wrapper from the prior pass. Reason: the live crash escapes via `requestIdleCallback`'s microtask, not via `console.error`. Keeping it produced noise without signal. The existing `+layout.svelte:67` interceptor already captures every `console.error` call from Svelte, so we lose nothing.
- We dropped the dynamic `import('svelte')` probe entirely. Reason: bare specifier resolution from a `new Function` body fails in Vite dev with `Failed to resolve module specifier 'svelte'`. The probe never matched. Replacement: surface area is now `requestIdleCallback` + `queueMicrotask`, both `globalThis` properties, no resolution needed.
- Module-scoped counters (`idleWrapCount`, `microtaskWrapCount`) give every captured throw a `captureIndex` so the next repro can correlate the idle schedule log line with the throw log line one tick later.
- `$effect.pending()` is guarded with `typeof $effect !== 'undefined'` and `typeof $effect.pending === 'function'` — defensive but cheap. In Svelte 5.56.1 it is available.
- `route` is read inside the idle wrapper callback (not at schedule time) so it reflects the live URL at flush time, not the URL when the callback was scheduled (which may be the prior route for a navigated-while-flushing case).
- Dev-gated at function entry by `import.meta.env.DEV`. Prod bundle includes the file (already in tree) but `installSchedulerHook` returns immediately and the wrappers are never installed.

### Step 2 — `voyager/src/routes/+layout.svelte`

No change. Already imports `installSchedulerHook` and calls it at the top of `<script>`. Confirmed during the prior pass.

## Validation

1. **Build**: `cd /workspaces/voyager/voyager && npm run build` → clean compile. The dynamic-import removal should make the previous `Failed to resolve module specifier 'svelte'` CONFIG_ERROR go away.
2. **Smoke load**: `npm run dev`, open `/` in a fresh browser tab with devtools open.
   - Expect on first load:
     - one `{ type: JOB_START, step: 'scheduler-hook:install' }`
     - one `{ type: JOB_SUCCESS, step: 'scheduler-hook:install', idleWrapped: true, microtaskWrapped: true }`
   - Expect no `CONFIG_ERROR` lines from the hook (probe is gone).
   - Expect no `console.error` capture lines (wrapper is gone). The existing layout interceptor still fires for any console.error.
3. **Idle schedule baseline**: navigate `/` → `/plan`. Expect several `{ type: JOB_START, step: 'scheduler:idle-schedule', captureIndex }` lines as Svelte schedules its flushes. No throws should accompany these — they're the schedule side. Compare count to before the rewrite; should be similar.
4. **Repro the crash**: on `/plan`, click into the wizard, fill the form, click Finish. When the crash fires, expect:
   - A `{ type: RENDER_ERROR, step: 'scheduler:idle-throw', captureIndex, route, pendingDeps, err: { message, stack, name, cause } }` line. The `err.stack` points to `et.reportAllChanges` (the symptom). The `captureIndex` matches the most recent `scheduler:idle-schedule` log line.
   - Possibly a paired `{ type: RENDER_ERROR, step: 'scheduler:microtask-throw' }` if the throw is re-thrown through the microtask path on re-entry.
5. **Grep**: `rg -n "import\\(['\\\"]svelte['\\\"]\\)|new Function\\('s', 'return import" voyager/src/lib/schedulerHook.js` → no matches (dead-code cleanup confirmed).
6. **Logging-standards check**:
   - `rg -n "console\\.(log|warn|error|info|trace|debug)" voyager/src/lib/schedulerHook.js` → only the comment line about Rule 2, no calls.
   - `rg -n "type: EVENT\\." voyager/src/lib/schedulerHook.js` → matches `JOB_START`, `JOB_SUCCESS`, `RENDER_ERROR`. No free-text types.
   - `rg -n "serializeError|presence\\(" voyager/src/lib/schedulerHook.js` → present on every error path.

## What this captures that the prior hook missed

The `reportAllChanges startTime` crash is the *symptom* (a Task record was cleared mid-flush and the next iteration dereferenced `task.startTime`). The throw happens inside the callback that `requestIdleCallback` invokes. Wrapping `requestIdleCallback` and `queueMicrotask` lets us:

- **Log the schedule** with a `captureIndex` so we can pair schedule logs to throw logs.
- **Log the throw** at the exact callback boundary where it occurs, with the live `route`, `pendingDeps` from `$effect.pending()`, and `err.stack`/`err.cause` from `serializeError`.
- **See the stack frames leading up to** the `et.reportAllChanges` frame in the same stack trace (because we wrap *before* Svelte's internal re-throw chain can collapse it).
- **Identify the originating write** by correlating the most recent `scheduler:idle-schedule` log line (carries `fnKind`) with the throw line by `captureIndex`.

This is the highest-value signal available without forking Svelte or shipping a debug build of it.

## Risks

- `globalThis.requestIdleCallback` reassignment: this is a dev-only wrapper; in prod `installSchedulerHook` returns immediately. In dev, every `requestIdleCallback` call passes through the wrapper and through to the original. No behavior change, only capture.
- `globalThis.queueMicrotask` reassignment: same. The wrapper is a transparent observation point.
- The hook fires on *every* schedule, including Svelte's normal flushes, which can be 10–30 lines per navigation. Acceptable for dev-only. If the volume is too noisy for `JOB_START` on every schedule, a future pass can throttle to first-N per route; out of scope here.
- The hook does not modify Svelte, does not patch the runtime, and does not import `'svelte'`. It is browser-only.
- The wrappers log via `log`, invoke the original, and rethrow. Any non-throwing return is preserved.

## Out of scope

- The fix for the `startTime` crash itself. This plan is logging only.
- Any change to `PlanTripWizard.svelte`, `RampQuoteAggregator.svelte`, `PayCheckoutCard.svelte`, `TravelFormPrefs.svelte`, `user.svelte.js`, `+layout.svelte`, `logger.js`, or `/plan/+page.svelte`.
- Throttling the `JOB_START` schedule logs.
- Production logging.

## Affected files

- `voyager/src/lib/schedulerHook.js` — full rewrite (current contents replaced).
- **No other files change.**

## What this plan does

It replaces the two dead capture paths (broken dynamic-`svelte`-import probe + `console.error` wrapper that never fires for the live crash) with two working paths (`requestIdleCallback` + `queueMicrotask` wrappers) that fire on the exact boundary where the `startTime` crash is thrown. The next repro prints, via the project's canonical logger, the originating throw's full stack, cause chain, active reactive deps, route, and a `captureIndex` that correlates to the most recent schedule log line. From there, a targeted fix takes one edit instead of ten.

## Open / implicit assumptions

- "`requestIdleCallback` and `queueMicrotask` are the boundaries the live crash actually uses" — confirmed by the captured stack ending in `n.timeout` (which is `requestIdleCallback`'s Svelte-internal alias) and re-entering through `flush_tasks`. If the crash mode shifts to a different boundary in a future Svelte patch, this hook will need a new wrapper; that is the planned upgrade path.
- "Wrapping `requestIdleCallback` does not break Svelte's scheduler" — the wrapper invokes the original with the original arguments, so Svelte's behavior is identical. Only the callback function passed in is replaced with a `try/catch` rethrow wrapper that records the throw before re-throwing.
- "The `idleWrapCount`/`microtaskWrapCount` counters never overflow" — these are `let`s incremented per schedule. Even at 1k schedules/sec they wrap at 2^53 safely for any realistic dev session.