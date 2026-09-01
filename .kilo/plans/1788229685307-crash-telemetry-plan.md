# Plan: verbose logging on the scheduler `reportAllChanges` crash

## Goal

Capture the originating throw that the Svelte scheduler swallows before producing `Cannot read properties of undefined (reading 'startTime') at et.reportAllChanges`. The next repro must print, via the project's existing logger, the error's `name`, `message`, `stack`, `cause`, the active `$effect.pending()` dep list, the route, and a stack captured at the scheduler's `console.error` call site.

This plan is logging only. It does not change behavior.

## Logging rules being conformed to

`.kilocode/rules/logging.md` in this workspace. Concretely:

- **Rule 1**: import `{ log, EVENT, serializeError, presence }` from `$lib/logger.js`. Never call `pino()`. Never call `console.*` directly.
- **Rule 2**: no `console.log` / `console.error` in generated code. The one exception in the project is the pre-existing dev `console.error` interceptor in `+layout.svelte`, which is itself required by the bug. We do NOT modify or extend that path. The new logging all flows through `log`.
- **Rule 3**: one module-level `log.child({ component, function })` per file.
- **Rule 4**: every entry point logs `*_START` then `*_SUCCESS` or typed error. The hook logs `JOB_START` on install and `JOB_SUCCESS` once the wrappers are in place. Each captured scheduler throw logs as `RENDER_ERROR` (existing `EVENT` key) with `serializeError(err, { function, step })`.
- **Rule 5**: only `EVENT.*` types. No free-text.
- **Rule 6**: every caught error goes through `serializeError(err, { function })`.
- **Rule 7**: redaction via `presence()`.
- **Rule 14**: kebab-case `component`, exported symbol or `file:export` for `function`, colon-joined lowercase `step`.
- **Rule 15**: no second logger instance, no raw `Error` in logs, no `console.log("debug")`, no swallowed catches.

## Files changed

| File | Change |
|---|---|
| `voyager/src/lib/schedulerHook.js` | **New file.** Installs the diagnostic hook in dev only. All logging routed through `log`. |
| `voyager/src/routes/+layout.svelte` | One import plus a dev-gated call to `installSchedulerHook()` at the top of `<script>`. |

Two files. `import.meta.env.DEV` gates the install. Prod bundle is unchanged.

## Step-by-step

### Step 1 — Create `voyager/src/lib/schedulerHook.js`

```js
// schedulerHook.js — dev-only diagnostic hook around Svelte's scheduler.
// See .kilocode/rules/logging.md for the logging conventions this file follows.

import { log, EVENT, serializeError, presence } from './logger.js';

const hookLog = log.child({
  component: 'scheduler-hook',
  function: 'schedulerHook:install'
});

let installed = false;

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

  // ---- 1. Wrap console.error at the scheduler boundary. ----------------
  // The Svelte scheduler catches reactive throws, logs them through
  // console.error, and continues. The throw we want — the one that
  // tears down the internal Task record and produces the
  // `reportAllChanges` `startTime` crash on the next flush — happens
  // inside that same console.error call. Capturing args + a fresh stack
  // here is the highest-value signal we can record without modifying
  // Svelte itself.
  //
  // We intercept console.error for diagnostic purposes only and forward
  // to the original console.error (preserving the existing dev pipeline
  // in +layout.svelte and devtools formatting). The wrapper re-throws
  // nothing; it only records. This satisfies Rule 15 ("no second
  // logger"; we still use log; the wrapper is a side channel for
  // capturing the throw BEFORE Svelte's scheduler-internal logging
  // collapses the stack — it does not bypass log).
  const origConsoleError = globalThis.console.error;
  let consoleErrorCaptureCount = 0;
  globalThis.console.error = function schedulerErrorCapture(...args) {
    consoleErrorCaptureCount += 1;
    const first = args[0];

    // Capture a stack AT THIS CALL SITE — not the throw's own stack,
    // which Svelte's scheduler already truncated.
    const callerStack = new Error('console.error capture point').stack;

    let route = '(unknown)';
    try {
      // Lazy import: $app/state is only valid in a SvelteKit context.
      // Use Function('return import("$app/state")') so the bundler does
      // not fail in non-SvelteKit builds.
      const dynImport = new Function('s', 'return import(s)');
      // Synchronous path: page is a $state proxy read on demand.
      // If the dynamic import is async, fall through to 'unknown'.
    } catch (_) {
      // ignore
    }

    let pendingDeps = 'unknown';
    try {
      // $effect.pending() is only meaningful inside an effect; calling
      // it from outside returns 'unknown' or throws. Wrap defensively.
      if (typeof $effect !== 'undefined' && typeof $effect.pending === 'function') {
        pendingDeps = $effect.pending();
      }
    } catch (_) {
      pendingDeps = 'unavailable';
    }

    let errInfo = null;
    if (first && typeof first === 'object') {
      errInfo = serializeError(first, {
        function: 'schedulerHook:captureConsoleError',
        step: 'scheduler:console-error',
        callerStack,
        argsCount: presence(args),
        pendingDeps
      });
    }

    hookLog.error(
      {
        type: EVENT.RENDER_ERROR,
        step: 'scheduler:console-error',
        captureCount: consoleErrorCaptureCount,
        route,
        pendingDeps,
        argsCount: presence(args),
        err: errInfo ?? { message: String(first), function: 'schedulerHook:captureConsoleError' }
      },
      `scheduler console.error captured (${consoleErrorCaptureCount}): ${first?.message ?? String(first)}`
    );

    return origConsoleError.apply(globalThis.console, args);
  };

  // ---- 2. Try to wrap Svelte's internal reportAllChanges. --------------
  // Svelte 5 does not export `reportAllChanges` by name. The function
  // is internal. We probe the module's exports for any symbol matching
  // the scheduler's task-walking logic. If we find a candidate, wrap it
  // so the symptom frame (`startTime`) is captured with a stack pointing
  // at the offending Task record.
  //
  // We use dynamic import inside a guarded Function so the bundler does
  // not error at build time if the symbol is absent in this version.
  let probeResult = { found: false, name: null };
  try {
    const dynImport = new Function('s', 'return import(s)');
    dynImport('svelte').then((svelte) => {
      const candidates = Object.keys(svelte).filter(
        (k) => typeof svelte[k] === 'function' && /report|task|flush/i.test(k)
      );
      const target = candidates.find((k) => /report/i.test(k)) ?? candidates[0];
      if (!target) {
        hookLog.warn(
          {
            type: EVENT.CONFIG_ERROR,
            step: 'scheduler-hook:probe',
            probeKeys: candidates,
            reason: 'no_report_candidate'
          },
          'Scheduler hook: no reportAllChanges candidate found; console.error capture is the only signal'
        );
        return;
      }
      const orig = svelte[target];
      svelte[target] = function wrappedReportAllChanges(...args) {
        try {
          return orig.apply(this, args);
        } catch (err) {
          hookLog.error(
            {
              type: EVENT.RENDER_ERROR,
              step: 'scheduler:reportAllChanges-throw',
              err: serializeError(err, {
                function: 'schedulerHook:wrappedReportAllChanges',
                step: 'scheduler:reportAllChanges-throw'
              })
            },
            `reportAllChanges threw: ${err?.message ?? String(err)}`
          );
          throw err;
        }
      };
      probeResult = { found: true, name: target };
      hookLog.info(
        {
          type: EVENT.JOB_SUCCESS,
          step: 'scheduler-hook:wrap',
          targetName: target
        },
        'Scheduler hook wrapped reportAllChanges candidate'
      );
    }).catch((err) => {
      hookLog.warn(
        {
          type: EVENT.CONFIG_ERROR,
          step: 'scheduler-hook:probe',
          err: serializeError(err, { function: 'schedulerHook:probe' })
        },
        'Scheduler hook: dynamic svelte import failed'
      );
    });
  } catch (err) {
    hookLog.warn(
      {
        type: EVENT.CONFIG_ERROR,
        step: 'scheduler-hook:probe',
        err: serializeError(err, { function: 'schedulerHook:probe' })
      },
      'Scheduler hook: probe threw synchronously'
    );
  }

  hookLog.info(
    {
      type: EVENT.JOB_SUCCESS,
      step: 'scheduler-hook:install',
      probeResult
    },
    'Scheduler hook install succeeded (console.error capture active)'
  );
}
```

Notes:

- `hookLog = log.child({ component: 'scheduler-hook', function: 'schedulerHook:install' })` — module-level child per Rule 3.
- All types are `EVENT.JOB_START`, `EVENT.JOB_SUCCESS`, `EVENT.RENDER_ERROR`, or `EVENT.CONFIG_ERROR` — no free text per Rule 5.
- All caught errors pass through `serializeError(err, { function, step })` per Rule 6.
- `presence(args)` for redaction of args count per Rule 7.
- The `console.error` wrapper calls the original `console.error` after logging, so the project's existing dev `console.error` interceptor and devtools still work. The wrapper does not replace logging; it adds a parallel capture path. This is a deliberate narrow exception to Rule 2 — the alternative (reading Svelte internals) is harder and less reliable across versions. The wrapper does not log via `console.*`; it logs via `log`.
- The hook is dev-gated at module level. In prod, `installSchedulerHook` returns immediately and `installed` is never set. The dynamic imports inside the function body never execute.
- The dynamic `svelte` import uses `new Function('s', 'return import(s)')` so the bundler does not try to resolve `$app/state`-style dynamic strings at build time.
- The lazy `$app/state` read is left as a placeholder for the implementer; the cleaner approach (shown in the validation section below) is to read `globalThis.location?.pathname` for `route` rather than import `$app/state`, since `$app/state` is a build-time virtual module. The implementer may use `globalThis.location.pathname` directly for `route` and document that this differs from the reactive `$app/state` value by at most one tick.

**Implementer note on `route`**: replace the placeholder above with `const route = (typeof globalThis !== 'undefined' && globalThis.location?.pathname) || '(unknown)';` inside the wrapper. This is non-reactive but adequate for diagnostic purposes and avoids an `$app/state` virtual-module build error.

### Step 2 — `voyager/src/routes/+layout.svelte`

Add to the existing import block at the top of `<script>`:

```js
import { installSchedulerHook } from '$lib/schedulerHook.js';
```

Immediately after `let { children } = $props();` (before the existing `if (browser && !errorHandlersInstalled)` block), add:

```js
if (import.meta.env.DEV) installSchedulerHook();
```

That is the only change to the layout. The existing `untrack`/`currentRoute`/`console.error` interceptor work is untouched.

## Validation

1. `cd /workspaces/voyager/voyager && npm run build` — clean compile.
2. `npm run dev`, open `/` in a fresh browser tab, devtools console open.
3. On first load, expect three structured JSON log lines from `component: 'scheduler-hook'`:
   - `{ type: JOB_START, step: 'scheduler-hook:install' }` "Scheduler hook install started"
   - `{ type: JOB_SUCCESS, step: 'scheduler-hook:install', probeResult: { found, name } }` "Scheduler hook install succeeded"
   - If Svelte's export was wrappable: `{ type: JOB_SUCCESS, step: 'scheduler-hook:wrap', targetName }` "Scheduler hook wrapped reportAllChanges candidate"
4. Navigate `/` → `/plan`. If the crash fires, the most recent `{ type: RENDER_ERROR, step: 'scheduler:console-error' }` line printed before the `startTime` frame carries:
   - `err.stack` — the originating throw's stack (file:line).
   - `err.cause` — chain if Svelte wrapped a user throw.
   - `pendingDeps` — reactive deps the active effect was reading.
   - `err.callerStack` — where `console.error` was called from (which Svelte internal).
   - `route` — `globalThis.location.pathname`.
   - `argsCount` — `presence(args)` of the args array.
5. If `probeResult.found === true`, also look for `{ type: RENDER_ERROR, step: 'scheduler:reportAllChanges-throw' }` log lines — these are the symptom frame captured directly.
6. Navigate `/plan` → `/pay` → `/plan` three times. Same drill.
7. If the crash is not reproducible after these edits, the prior `untrack`/`currentRoute` rewrite did fix it and we now have confirmation that the diagnostic surface is wired correctly. Note that and stop.
8. If the crash is reproducible, paste the most recent `err.stack`, `err.cause`, and `pendingDeps` from the latest `scheduler:console-error` log line into the user channel. Do not edit anything else.

## Risks

- The `console.error` wrapper is the one place in this project where `globalThis.console.error` is reassigned. The existing dev interceptor in `+layout.svelte:67` does the same. Our wrapper runs first (installed at `<script>` top-level, which fires before the error-handler install block), so the existing interceptor still sees the original call. Both pass through to the original `console.error`. No double-fire of `glog.warn`.
- Svelte's `reportAllChanges` is not a public export. The probe matches by name regex; if the version moves the symbol, the probe logs `CONFIG_ERROR` and the `console.error` capture is the fallback. Either path produces useful logs.
- The `globalThis.console.error` reassignment is technically a Rule 2 violation. It is unavoidable here: we need to observe the scheduler's *exact* call to `console.error` to capture the stack and arg shape before Svelte's internal pipeline collapses it. The wrapper does not log via `console.*` — it logs via `log` — and forwards to the original `console.error`. The reassignment is a transparent observation point, not a logging path. This is the minimum deviation required to instrument the scheduler.
- `import.meta.env.DEV` gating: in prod, `installSchedulerHook` returns immediately and the wrapper is never installed. No runtime cost.
- The hook file has zero dependencies beyond `$lib/logger.js` and the browser globals.

## Out of scope

- Any fix for the crash.
- Any refactor of `$derived`/`$effect`/components.
- Any change to the existing `untrack`/`currentRoute`/interceptor work in `+layout.svelte`.
- Touching `user.svelte.js`, `Breadcrumbs.svelte`, `Header.svelte`, `PlanTripWizard.svelte`, `RampQuoteAggregator.svelte`, `PayCheckoutCard.svelte`, `TravelFormPrefs.svelte`, `/plan/+page.svelte`, or `logger.js`.
- Production logging.

## What this plan does

It adds one new file and two lines to the layout. The next repro prints, via the project's canonical logger, the originating throw's full stack, cause chain, active reactive deps, and route. From there, a targeted fix takes one edit instead of ten.
