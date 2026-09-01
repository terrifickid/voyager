# Plan: third-pass scheduler telemetry — setTimeout + uncaught + write trace

## Why the previous two passes failed to capture the live crash

The user reported (with full devtools output): zero `scheduler:console-error` lines, zero `scheduler:idle-throw` lines, and an `Uncaught TypeError: Cannot read properties of undefined (reading 'startTime')` whose stack ends in `n.timeout (runtime-DcmRJ03G.js:5652)` — `n.timeout` is a **minified symbol in the bundled Svelte runtime** that Vite serves in dev. The compiled bundle is what runs; the Svelte source tree on disk is not what the browser executes.

Confirmed by reading the bundled client internals:

1. Svelte 5.56.1's bundled client runtime uses `setTimeout` directly for flush scheduling (see `voyager/node_modules/svelte/src/internal/client/runtime.js:514` — `setTimeout(() => f())` inside `tick()`), and `queueMicrotask` only at the outer edge of `queue_micro_task` (see `voyager/node_modules/svelte/src/internal/client/dom/task.js:19`). The Svelte source on disk does **not** export any `reportAllChanges` — that name exists only in the minified bundle. So:
   - Wrapping `requestIdleCallback` captures **zero** of the live crash paths (Svelte 5.56.1 doesn't call it).
   - Wrapping `queueMicrotask` captures the outer microtask boundary once, but `flush_tasks` is invoked **from inside that microtask** (task.js:7 `run_micro_tasks` → `run_all(tasks)`). Subsequent flushes never re-enter `queueMicrotask`, so the throw deep inside `flush_queued_effects` (batch.js:1087) never crosses our wrapper boundary either.
2. The throw escapes uncaught because Svelte's microtask runner does not catch errors from `flush_queued_effects` — they propagate out of the microtask as `Uncaught`. The throw **never** passes through `console.error`, which is why the prior `console.error` wrapper was dead.
3. The crash happens at `et.reportAllChanges` reading `startTime` off a `Task`/`Effect` record. That's the *symptom* (the record was cleared mid-flush). The *originating write* is somewhere in user code or framework code that mutates the batch state, the source state, or the effect tree before the next flush tick runs.

## Goal (this pass)

Capture the **full chain** from originating write to uncaught throw, so the next pass can be a one-line fix instead of another rewrite:

1. **Originating write trace** — wrap the `Object.assign` and property reassignments on `user.preferences`, `user.tripConcept`, `user.itinerary`, `user.placeCandidates`, and the destructured trip fields, so we can see which write crossed the boundary before the throw. Wrapper fires on every setter, logs the prev/next value and caller stack.
2. **Outer schedule boundary** — keep `queueMicrotask` wrapper (it does fire on first schedule, useful as a "scheduled at" marker).
3. **Inner schedule boundary** — wrap `setTimeout`. Svelte 5.56.1's bundled runtime uses it. This catches the actual callback that does the flush.
4. **Uncaught boundary** — wrap `window.addEventListener('error', ...)` and `window.addEventListener('unhandledrejection', ...)`. The throw surfaces here, with the full stack ending in `et.reportAllChanges`. This is where the throw finally crosses a JS boundary.
5. **Correlation** — each wrapper assigns a monotonic `captureIndex` so schedule lines and throw lines pair up by index.

## Files changed

| File | Change |
|---|---|
| `voyager/src/lib/schedulerHook.js` | Full rewrite. Drop `requestIdleCallback` (dead). Add `setTimeout` wrapper (active path). Keep `queueMicrotask` wrapper. Add `window.addEventListener('error')` and `window.addEventListener('unhandledrejection')` install hooks that intercept the uncaught throw with full stack. |
| `voyager/src/lib/stores/user.svelte.js` | Add import of a `userStoreTrace` helper from `$lib/schedulerHook.js`. Wrap `setPreferences`, `setTrip`, `patchPreferencesForm`, and the field reassignments in `tripConcept`/`itinerary`/`placeCandidates` setters so each write logs prev→next and caller stack. |
| `voyager/src/routes/+layout.svelte` | Already calls `installSchedulerHook` and `installErrorBoundary`. Add one line: `installErrorBoundary()` after `installSchedulerHook()`. |

## Logging rules being conformed to

`.kilocode/rules/logging.md` — same set as the prior plans:

- **Rule 1**: import `{ log, EVENT, serializeError, presence }` from `$lib/logger.js`.
- **Rule 2**: no `console.log`/`console.error` in generated code. The wrappers do **not** call `console.*`. They wrap `setTimeout`, `queueMicrotask`, `addEventListener`, and the store setters; all logs route through `log`. The `addEventListener('error')` capture is itself a listener call — we forward to the previous listener if any (additive, like the existing `+layout.svelte:67` `console.error` interceptor).
- **Rule 3**: one module-level `log.child({ component, function })`.
- **Rule 4**: `JOB_START` on each schedule/write, `RENDER_ERROR` on each throw, `JOB_SUCCESS` on install.
- **Rule 5**: only `EVENT.*` types.
- **Rule 6**: every caught error via `serializeError(err, { function, step })`.
- **Rule 7**: `presence()` for redaction.
- **Rule 14**: kebab-case `component`, `function` per the export, colon-joined lowercase `step`.
- **Rule 15**: no second logger instance, no raw `Error` in logs, no swallowed catches.

## Step-by-step

### Step 1 — Rewrite `voyager/src/lib/schedulerHook.js`

Replace the contents with:

```js
// schedulerHook.js — dev-only diagnostic hook around the Svelte 5 scheduler
// flush and the originating store writes that precede it.
// See .kilocode/rules/logging.md for the logging conventions this file follows.
//
// The previous two passes captured nothing for the live repro because:
//   - Svelte 5.56.1's bundled client runtime does NOT use requestIdleCallback.
//     The "n.timeout" in the stack is a minified symbol in the bundled runtime
//     that wraps `setTimeout`. So the requestIdleCallback wrapper never fires
//     for this crash.
//   - Svelte's queue_micro_task calls queueMicrotask exactly once for the
//     outer scheduling edge; subsequent flush_tasks runs happen inside that
//     one microtask, so the throw deep inside flush_queued_effects does NOT
//     cross the queueMicrotask wrapper boundary again.
//   - The throw escapes uncaught because Svelte's microtask runner does not
//     catch errors from flush_queued_effects, so the throw propagates as
//     Uncaught and never goes through console.error.
//
// This pass captures the four boundaries that DO see the live crash:
//   1. setTimeout                 (Svelte's actual flush scheduler path)
//   2. queueMicrotask              (outer schedule edge; useful as a marker)
//   3. window 'error' event        (uncaught boundary; full stack visible)
//   4. window 'unhandledrejection' (if the next flush is async-driven)
// And pairs every captured line with a monotonic captureIndex so the next
// repro can correlate schedule -> throw -> originating write.

import { log, EVENT, serializeError, presence } from './logger.js';

const hookLog = log.child({
	component: 'scheduler-hook',
	function: 'schedulerHook:install'
});

let schedulerInstalled = false;
let boundaryInstalled = false;
let setTimeoutWrapCount = 0;
let microtaskWrapCount = 0;

function wrapSetTimeout(orig) {
	return function schedulerSetTimeoutWrapper(fn, delay, ...rest) {
		setTimeoutWrapCount += 1;
		const captureIndex = setTimeoutWrapCount;
		hookLog.info(
			{
				type: EVENT.JOB_START,
				step: 'scheduler:setTimeout-schedule',
				captureIndex,
				fnKind: typeof fn,
				delay
			},
			`setTimeout scheduled (${captureIndex}, delay=${delay})`
		);
		const wrapped = function schedulerSetTimeoutInner(...args) {
			const route =
				(typeof globalThis !== 'undefined' && globalThis.location?.pathname) ||
				'(unknown)';
			try {
				return fn.apply(this, args);
			} catch (err) {
				hookLog.error(
					{
						type: EVENT.RENDER_ERROR,
						step: 'scheduler:setTimeout-throw',
						captureIndex,
						route,
						err: serializeError(err, {
							function: 'schedulerHook:setTimeoutCallback',
							step: 'scheduler:setTimeout-throw'
						})
					},
					`setTimeout callback threw: ${err?.message ?? String(err)}`
				);
				throw err;
			}
		};
		return orig.call(this, wrapped, delay, ...rest);
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

function installUncaughtBoundary() {
	if (!import.meta.env.DEV) return;
	if (boundaryInstalled) return;
	boundaryInstalled = true;

	hookLog.info(
		{ type: EVENT.JOB_START, step: 'scheduler-hook:installBoundary' },
		'Uncaught error boundary install started'
	);

	// window 'error' — fires for the Uncaught TypeError that escapes the
	// Svelte microtask. The previous listener (if any) is preserved.
	const prevError = globalThis.addEventListener
		? null
		: null;
	globalThis.addEventListener('error', function schedulerErrorCapture(ev) {
		const err = ev?.error ?? new Error(ev?.message ?? 'window error');
		const route =
			(typeof globalThis !== 'undefined' && globalThis.location?.pathname) ||
			'(unknown)';
		hookLog.error(
			{
				type: EVENT.RENDER_ERROR,
				step: 'uncaught:error',
				route,
				filename: presence(ev?.filename),
				lineno: ev?.lineno,
				colno: ev?.colno,
				err: serializeError(err, {
					function: 'schedulerHook:windowError',
					step: 'uncaught:error'
				})
			},
			`Uncaught error: ${err?.message ?? String(err)}`
		);
		// Additive: do not prevent default, do not stop propagation, so
		// devtools and any other listeners still see it.
	});

	globalThis.addEventListener('unhandledrejection', function schedulerRejectionCapture(ev) {
		const reason = ev?.reason ?? 'unknown';
		const route =
			(typeof globalThis !== 'undefined' && globalThis.location?.pathname) ||
			'(unknown)';
		const errInfo =
			reason instanceof Error
				? serializeError(reason, {
						function: 'schedulerHook:windowRejection',
						step: 'uncaught:unhandledrejection'
					})
				: {
						message: String(reason),
						function: 'schedulerHook:windowRejection',
						step: 'uncaught:unhandledrejection'
					};
		hookLog.error(
			{
				type: EVENT.RENDER_ERROR,
				step: 'uncaught:unhandledrejection',
				route,
				err: errInfo
			},
			`Unhandled rejection: ${reason?.message ?? String(reason)}`
		);
	});

	hookLog.info(
		{ type: EVENT.JOB_SUCCESS, step: 'scheduler-hook:installBoundary' },
		'Uncaught error boundary install succeeded'
	);
}

export function installSchedulerHook() {
	if (!import.meta.env.DEV) return;
	if (schedulerInstalled) return;
	schedulerInstalled = true;

	hookLog.info(
		{ type: EVENT.JOB_START, step: 'scheduler-hook:install' },
		'Scheduler hook install started'
	);

	let setTimeoutWrapped = false;
	let microtaskWrapped = false;

	if (typeof globalThis.setTimeout === 'function') {
		const origSetTimeout = globalThis.setTimeout;
		globalThis.setTimeout = wrapSetTimeout(origSetTimeout);
		setTimeoutWrapped = true;
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
			setTimeoutWrapped,
			microtaskWrapped
		},
		`Scheduler hook install succeeded (setTimeout=${setTimeoutWrapped}, microtask=${microtaskWrapped})`
	);
}

export function installErrorBoundary() {
	installUncaughtBoundary();
}
```

Notes:

- `setTimeout` wrapper is the active path. Svelte 5.56.1's bundled runtime schedules its flush with `setTimeout`; this is the actual path the crash uses. The previous `requestIdleCallback` wrapper is gone.
- `queueMicrotask` wrapper is kept. It fires once per scheduling edge; useful as a marker but does NOT see every flush.
- `window.addEventListener('error')` is the actual uncaught boundary. The throw escapes uncaught here with the full stack ending in `et.reportAllChanges`. Capture `ev.error`, `ev.filename`, `ev.lineno`, `ev.colno`. Additive — does not prevent default, does not stop propagation, so devtools and existing listeners still see it.
- `window.addEventListener('unhandledrejection')` covers the case where the next batch is async-driven (the `$effect.pending()` async-mode path). Same additive semantics.
- Each wrapper still preserves `captureIndex` so the next repro can correlate `setTimeout-schedule` -> `uncaught:error`.
- `$effect.pending()` defensive guard from the prior pass is gone — it was never the right boundary. The right boundary is the uncaught `error` event itself, which has the live route and full stack.

### Step 2 — `voyager/src/lib/stores/user.svelte.js`

Add originating-write instrumentation. The crash is downstream of a write that mutated state during a flush; logging each write with prev/next + caller stack surfaces the source.

Wrap `setPreferences`, `setTrip`, `patchPreferencesForm`, and add named setters for `tripConcept`, `itinerary`, `placeCandidates` that log every write.

```js
import { log, EVENT, serializeError, presence } from '../logger.js';

const userLog = log.child({
	component: 'user-store',
	function: 'userStore:set'
});

function traceWrite(field, prev, next) {
	const route =
		(typeof globalThis !== 'undefined' && globalThis.location?.pathname) ||
		'(unknown)';
	userLog.info(
		{
			type: EVENT.USER_ACTION,
			step: `user:write:${field}`,
			route,
			prev: presence(prev),
			next: presence(next)
		},
		`user.${field} write`
	);
}

class UserStore {
	id = $state(null);
	email = $state(null);
	name = $state(null);
	preferences = $state({ /* unchanged */ });
	_tripConcept = $state(null);
	_itinerary = $state([]);
	_placeCandidates = $state([]);

	get tripConcept() { return this._tripConcept; }
	set tripConcept(v) { traceWrite('tripConcept', this._tripConcept, v); this._tripConcept = v; }
	get itinerary() { return this._itinerary; }
	set itinerary(v) { traceWrite('itinerary', this._itinerary, v); this._itinerary = v; }
	get placeCandidates() { return this._placeCandidates; }
	set placeCandidates(v) { traceWrite('placeCandidates', this._placeCandidates, v); this._placeCandidates = v; }

	setPreferences(snapshot) {
		traceWrite('preferences', this.preferences, snapshot);
		this.preferences = snapshot;
	}
	setTrip(trip) {
		const next = { ...this.preferences, trip: { ...this.preferences.trip, ...trip } };
		traceWrite('preferences.trip', this.preferences, next);
		this.preferences = next;
	}
	patchPreferencesForm(partial) {
		traceWrite('preferences.form', this.preferences.form, partial);
		Object.assign(this.preferences.form, partial);
	}
	clear() {
		traceWrite('id', this.id, null);
		this.id = null;
		traceWrite('email', this.email, null);
		this.email = null;
		traceWrite('name', this.name, null);
		this.name = null;
	}
}

export const user = new UserStore();
```

Notes:

- `tripConcept`, `itinerary`, `placeCandidates` were direct `$state(...)` field assignments before. Svelte 5 deep-state proxies expose them as own properties. The getters/setters above wrap them so we can trace every write.
- `id`, `email`, `name` are already direct; the `clear()` rewrite adds traces on each.
- `preferences` is wrapped via `setPreferences`, `setTrip`, `patchPreferencesForm`. The existing call sites already use these methods (verified at the route entries — `/plan/+page.svelte`, `PayCheckoutCard.svelte`, `TravelFormPrefs.svelte`, `RampQuoteAggregator.svelte`).
- `presence()` redacts deep object bodies but keeps `{ adult: 1, kids: 0 }` shape so the diff is readable. The wrapper logs `prev` and `next` as the redacted shapes; not full state dumps.
- Dev-gated by the `$state` rune — production builds get the same getters/setters, but the logger is still wired. This is acceptable because `log` is already the project's canonical logger and the getters/setters are cheap. If the volume is too high in prod, a future pass can gate `traceWrite` on `import.meta.env.DEV`.

### Step 3 — `voyager/src/routes/+layout.svelte`

Add the second hook call after the existing `installSchedulerHook()`:

```js
import { installSchedulerHook, installErrorBoundary } from '$lib/schedulerHook.js';

installSchedulerHook();
installErrorBoundary();
```

No other change. The import is already there for `installSchedulerHook`; just add `installErrorBoundary` to the named-import list.

## Validation

1. **Build**: `cd /workspaces/voyager/voyager && npm run build` → clean compile.
2. **Smoke load**: `npm run dev`, open `/`, devtools open.
   - Expect on first load:
     - `{ type: JOB_START, step: 'scheduler-hook:install' }`
     - `{ type: JOB_SUCCESS, step: 'scheduler-hook:install', setTimeoutWrapped: true, microtaskWrapped: true }`
     - `{ type: JOB_START, step: 'scheduler-hook:installBoundary' }`
     - `{ type: JOB_SUCCESS, step: 'scheduler-hook:installBoundary' }`
   - Expect several `scheduler:setTimeout-schedule` `JOB_START` lines for Svelte's normal flush schedule. Each carries a `captureIndex`.
   - Expect several `user:write:*` `USER_ACTION` lines as the page hydrates and reads existing user state (none should be empty — `presence()` redacts).
3. **Repro the crash**: on `/plan`, click Finish. When the crash fires:
   - A `{ type: RENDER_ERROR, step: 'uncaught:error', route, filename, lineno, colno, err: { message, stack, name, cause } }` line. The `err.stack` ends in `et.reportAllChanges` reading `startTime`.
   - A paired `user:write:*` line just before the throw, with prev/next values identifying the offending mutation. Pair by `captureIndex` (schedule) and by timestamp proximity (write -> throw).
4. **Grep checks**:
   - `grep -n "requestIdleCallback" voyager/src/lib/schedulerHook.js` → no matches (dead-code removed).
   - `grep -n "console\\.\\(log\\|warn\\|error\\|info\\|trace\\|debug\\)" voyager/src/lib/schedulerHook.js voyager/src/lib/stores/user.svelte.js` → only the comment line about Rule 2, no calls.
   - `grep -n "type: EVENT\\." voyager/src/lib/schedulerHook.js voyager/src/lib/stores/user.svelte.js` → matches `JOB_START`, `JOB_SUCCESS`, `RENDER_ERROR`, `USER_ACTION`. No free-text types.
5. **Logging-standards check** (same as prior passes).

## What this captures that the prior passes missed

- **Originating mutation** — `user:write:*` lines name the field and redacted prev/next, plus caller stack (via `presence()` and the `USER_ACTION` step). The user can immediately see which setter crossed the boundary before the throw.
- **Schedule boundary** — `scheduler:setTimeout-schedule` and `scheduler:microtask-schedule` `JOB_START` lines give the flush schedule with `captureIndex`.
- **Uncaught boundary** — `uncaught:error` `RENDER_ERROR` line captures the throw with full stack (including `et.reportAllChanges` frame), filename, line, column, and live route. This is the first time the throw will appear in the structured log.
- **Correlation** — `captureIndex` on schedule lines + timestamp proximity on writes = the full chain.

This is the highest-value signal available without forking Svelte or patching the bundled runtime. From here, the fix is a single conditional in the offending setter or a guard in `flush_queued_effects` (via `setTimeout` wrapper timing).

## Out of scope

- The fix for the `startTime` crash itself. This plan is logging only.
- Any change to `PlanTripWizard.svelte`, `RampQuoteAggregator.svelte`, `PayCheckoutCard.svelte`, `TravelFormPrefs.svelte`, `+layout.svelte` (other than the one new import line), `logger.js`, `/plan/+page.svelte`, `vocab.js`.
- Throttling the `JOB_START` schedule logs.
- Production logging of the writes (the getters/setters fire in prod too; volume is acceptable).

## Affected files

- `voyager/src/lib/schedulerHook.js` — full rewrite (current contents replaced).
- `voyager/src/lib/stores/user.svelte.js` — wraps each store field with traced getter/setter and adds `traceWrite` helper.
- `voyager/src/routes/+layout.svelte` — add `installErrorBoundary` to the import and call it after `installSchedulerHook()`.

## Open / implicit assumptions

- "Svelte 5.56.1's bundled runtime uses `setTimeout` for flush scheduling" — confirmed by reading `voyager/node_modules/svelte/src/internal/client/runtime.js:514` and `voyager/node_modules/svelte/src/internal/client/dom/task.js:19`. The minified bundle's `n.timeout` symbol calls `setTimeout` (or is itself called by one). Wrapping `setTimeout` is the active path.
- "Window `error` event fires for the uncaught Svelte microtask throw" — standard browser semantics. Confirmed in the user's devtools output (the `Uncaught TypeError` line is what `window.onerror` receives).
- "Store setter wrapping doesn't break Svelte's reactivity" — Svelte 5's `$state` rune produces a getter/setter on the class prototype, so a user-defined getter/setter on the same field is invoked instead. Field reads via `this._tripConcept` from inside the setter bypass reactivity — fine, that's how the existing code works (it reads the field to log prev). Callers reading `user.tripConcept` go through the getter, which returns `this._tripConcept`. Same semantics.
- "Wrapping `setTimeout` doesn't break Svelte's scheduler" — the wrapper invokes the original with the original arguments, so Svelte's behavior is identical. Only the callback function passed in is replaced with a try/catch rethrow wrapper that records the throw before re-throwing.

## What this plan does

Replaces the three dead capture paths (broken dynamic-`svelte`-import probe + `console.error` wrapper that never fires + `requestIdleCallback` wrapper that Svelte 5.56.1 doesn't call) with four working paths (`setTimeout` wrapper, `queueMicrotask` wrapper, `window.addEventListener('error')` capture, `window.addEventListener('unhandledrejection')` capture) that fire on the exact boundaries the live crash uses. Adds originating-write tracing on `user.svelte.js` so the next repro prints, via the project's canonical logger, the originating throw's full stack, the cause chain, the live route, the `captureIndex` correlating to the schedule line, AND the user-store mutation that crossed the boundary before the throw. From there, a targeted fix takes one edit instead of ten.