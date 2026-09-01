# Plan — Structured logging + uncaught-error capture for the home-page payment mockup

## Goal

Make `src/lib/components/PayCheckoutCard.svelte` and the app around it follow `.kilocode/rules/logging.md` so that:

1. Every meaningful user action in the payment card emits a typed log (currency change, vendor change, provider change, vendor menu open/close, Pay click, "Start over").
2. Any `error` thrown inside the card (including the `$effect` that drives `provider`) is caught, serialized via `serializeError`, and logged with type + context — never swallowed.
3. Truly uncaught errors anywhere in the app surface as `UNCAUGHT_EXCEPTION` / `UNHANDLED_REJECTION` log lines from a single global handler installed in `+layout.svelte`. This is what would have caught the prior `effect_update_depth_exceeded` and `startTime` crashes with full context instead of an opaque console error.

## Scope

In scope:

- `src/lib/components/PayCheckoutCard.svelte` — add structured logs to all interactive paths and a `try/catch` around the `$effect`.
- `src/routes/+layout.svelte` — install `window.onerror`, `window.onunhandledrejection`, and `console.error` interceptor; route them through `serializeError` to the shared `log`.
- `src/lib/log/vocab.js` — add two EVENT keys (`USER_ACTION`, `RENDER_ERROR`) needed for this component.

Out of scope (explicitly):

- No changes to other components (Header, PlanTripWizard, TravelFormPrefs, etc.) — they are not what the user asked about. They can adopt the same pattern in a follow-up.
- No telemetry sink / transport — logs continue to emit JSON lines per the existing browser logger. Wiring to a remote sink is a separate task.
- No fixing the underlying Svelte reactivity bug surfaced by the prior fatals. The whole point of this task is to make sure *next* time something throws, the log line tells us where. The `effect_update_depth_exceeded` would still happen, but it would log `UNCAUGHT_EXCEPTION` with stack + `component: "payments"` before the page dies.

## Decisions already made

- **Global handler lives in `src/routes/+layout.svelte`.** Confirmed by user. Runs on every route, including `/` where `PayCheckoutCard` is mounted.
- **Pay click is `JOB_START` → `JOB_SUCCESS`.** Confirmed by user. The "job" is the mocked charge.
- **No second `pino()` / no second logger module.** Use existing `$lib/logger.js` + `$lib/log/vocab.js`.
- **No `console.*` in component code.** All output goes through `log.{info,warn,error}` so a stranger can grep on `severity:"ERROR"` and reconstruct what happened. The global handler is the single exception — it must read `console.error` calls (Rule 11) to catch framework warnings.

## File-by-file changes

### 1. `src/lib/log/vocab.js`

Add two keys to `EVENT`:

```js
USER_ACTION: "USER_ACTION",       // expected user interaction (currency/vendor/pay click)
RENDER_ERROR: "RENDER_ERROR",    // caught error during a reactive update / $effect
```

These follow Rule 5 (typed events, never free-text) and Rule 14 (SCREAMING_SNAKE).

### 2. `src/lib/components/PayCheckoutCard.svelte`

Add at top of `<script>`:

```js
import { log, EVENT, serializeError, presence } from '$lib/logger.js';

const componentLog = log.child({ component: 'payments', function: 'PayCheckoutCard' });
```

Wrap the existing `$effect` (currently line 28) in `try/catch` and log entry/exit:

```js
$effect(() => {
  componentLog.debug({ type: EVENT.JOB_START, step: 'paycard:reconcile-provider' }, 'Reconciling provider');
  try {
    if (ranked.length === 0) {
      provider = null;
      componentLog.warn(
        { type: EVENT.VALIDATION_ERROR, step: 'paycard:reconcile-provider', reason: 'no_providers' },
        'No providers for current selection'
      );
      return;
    }
    const stillThere = ranked.find((r) => r.node.name === provider?.node?.name);
    const next = stillThere ?? ranked[0];
    if (next !== provider) {
      componentLog.info(
        {
          type: EVENT.USER_ACTION,
          step: 'paycard:auto-select-provider',
          from: provider?.node?.name ?? null,
          to: next.node.name,
        },
        'Auto-selected provider'
      );
      provider = next;
    }
  } catch (err) {
    componentLog.error(
      {
        type: EVENT.RENDER_ERROR,
        step: 'paycard:reconcile-provider',
        err: serializeError(err, { function: 'PayCheckoutCard:reconcileProvider' }),
      },
      `Provider reconcile failed: ${err.message}`
    );
  }
});
```

Instrument the existing handlers (Rule 4 — entry-point lifecycle logging):

- `selectVendor(v)` → `JOB_START` with `{ from: vendor.name, to: v.name }`, then `JOB_SUCCESS`. Vendor menu close is part of the same log line (`reason: "menu_closed"`).
- `currency = f` button click → wrap in a named handler `selectCurrency(f)` → `USER_ACTION` with `{ from: currency, to: f }`.
- `provider = q` button click → wrap in `selectProvider(q)` → `USER_ACTION` with `{ from: provider?.node?.name ?? null, to: q.node.name }`.
- `pay()` → `JOB_START` with `{ vendor: vendor.name, provider: provider?.node?.name, fiat: currency, amountSats: vendor.amountSats }`, then `JOB_SUCCESS` after `isPaid = true` with `hasReceipt: true`.
- `startOver()` → `USER_ACTION` with `{ reason: "start_over" }`.

Rule 7 (redaction): never log tokens. The card deals in public shapes (vendor name, fiat code, sats amount) — all safe. `vendor.amountSats` is a public quote, not a secret.

Rule 14 (naming): `step` is colon-joined domain-verb (`paycard:select-vendor`, `paycard:pay`, etc.). `component` is `payments`. `function` is `PayCheckoutCard`.

### 3. `src/routes/+layout.svelte`

Install three handlers inside the script block, guarded to only run in the browser and only once:

```js
<script>
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { page } from '$app/state';
  import { browser } from '$app/environment';
  import { log, EVENT, serializeError } from '$lib/logger.js';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

  let { children } = $props();

  if (browser) {
    const glog = log.child({ component: 'app', function: 'global-errors', route: () => page.url.pathname });
    window.onerror = (message, source, lineno, colno, error) => {
      glog.error(
        {
          type: EVENT.UNCAUGHT_EXCEPTION,
          route: page.url.pathname,
          source,
          lineno,
          colno,
          err: serializeError(error ?? new Error(String(message)), { function: 'window.onerror' }),
        },
        `Uncaught exception: ${message}`
      );
    };
    window.onunhandledrejection = (event) => {
      const reason = event?.reason;
      glog.error(
        {
          type: EVENT.UNHANDLED_REJECTION,
          route: page.url.pathname,
          err: serializeError(reason, { function: 'window.onunhandledrejection' }),
        },
        `Unhandled rejection: ${reason?.message ?? reason}`
      );
    };
    const origConsoleError = console.error.bind(console);
    console.error = (...args) => {
      // Forward to our log so SvelteKit warnings / vendor warnings get captured.
      const first = args[0];
      const err = first instanceof Error ? first : new Error(String(first));
      glog.warn(
        {
          type: EVENT.VALIDATION_ERROR,
          route: page.url.pathname,
          err: serializeError(err, { function: 'console.error' }),
        },
        `console.error called: ${err.message}`
      );
      origConsoleError(...args);
    };
  }
</script>
```

Notes:

- Per Rule 15: the `console.error` interceptor is the *one* place we route through `console.error` (we forward the original call after logging). Everywhere else the rule forbids `console.*`.
- `serializeError` is called with a non-Error first arg by wrapping into `new Error(String(first))` so we always get a real `stack`. This is important when Svelte emits a plain string like `"effect_update_depth_exceeded"`.
- Handlers are installed in the script block (runs once per page navigation in SvelteKit) — they're overwritten on each nav but that's fine because they're idempotent.
- We don't try to recover or `process.exit` (this is a browser) — Rule 11 is adapted: log full detail, let the framework decide.

### 4. No other files

`+layout.svelte` is the only layout-level file. `PayCheckoutCard` is the only component being instrumented in this pass.

## Ordered implementation steps

1. Edit `src/lib/log/vocab.js` — add `USER_ACTION` and `RENDER_ERROR` to the `EVENT` object.
2. Edit `src/lib/components/PayCheckoutCard.svelte`:
   - Import `log, EVENT, serializeError, presence` from `$lib/logger.js`.
   - Create module-scope `componentLog`.
   - Convert each inline handler into a named function that logs `JOB_START` → mutates state → logs `JOB_SUCCESS` / `USER_ACTION`.
   - Wrap the `$effect` body in `try/catch` with typed `RENDER_ERROR` log on failure.
3. Edit `src/routes/+layout.svelte`:
   - Import `browser` from `$app/environment` and `log, EVENT, serializeError` from `$lib/logger.js`.
   - Add the three handlers inside an `if (browser)` block at script scope.
4. Build + smoke-test in the browser (see Validation).

## Definition of Done (per `logging.md` Rule 16)

- [ ] `PayCheckoutCard.svelte` imports only `{ log, EVENT, serializeError, presence }` — no `console.*`.
- [ ] One module-level `componentLog` in `PayCheckoutCard`.
- [ ] Every entry point (vendor select, currency select, provider select, vendor menu toggle, pay, start over) logs `JOB_START` → `JOB_SUCCESS` / `USER_ACTION` with a `step`.
- [ ] `$effect` body wrapped in `try/catch`, errors serialized, log includes `function` and `step`.
- [ ] `+layout.svelte` installs `window.onerror`, `window.onunhandledrejection`, `console.error` interceptor once in the browser only.
- [ ] All log contexts use `EVENT.*` keys (no free-text types).
- [ ] No raw `Error` objects logged; every error is `serializeError`'d.
- [ ] No secrets (vendor name and sats amount are public quotes — safe).

## Validation

1. `cd voyager && npm run build` — must succeed with no SSR/SvelteKit warnings introduced.
2. `cd voyager && npm run dev`, open `/`:
   - Open DevTools console.
   - Click each currency → one `USER_ACTION` log per click, `from`/`to` set.
   - Open vendor menu, select a different vendor → one `USER_ACTION` log.
   - Click Pay → one `JOB_START`, one `JOB_SUCCESS` with vendor/provider/fiat/amountSats fields.
   - Click Start over → one `USER_ACTION`.
3. Force a throw to verify the global handler:
   - Open DevTools console, paste `throw new Error("synthetic test")`.
   - Confirm one `UNCAUGHT_EXCEPTION` JSON line appears with `route: "/"`, `err.message: "synthetic test"`, full stack.
   - Paste `Promise.reject(new Error("synthetic rej"))`.
   - Confirm one `UNHANDLED_REJECTION` JSON line with `err.message: "synthetic rej"`.
4. Force a throw inside the card to verify the `RENDER_ERROR` path:
   - DevTools → Sources → add a `throw new Error("boom")` inside the `$effect` body, hot-reload, switch currency repeatedly.
   - Confirm `RENDER_ERROR` log lines (not a swallowed exception).
   - Revert the throw before commit.
5. Negative checks: no `console.log`/`console.error` lines in production output that don't come from the interceptor in step 3 (the interceptor logs once + forwards once, which is the only legitimate `console.error` path).
6. Grep guard: `grep -RIn "console\\.\\(log\\|warn\\|error\\)" src/lib/components/PayCheckoutCard.svelte` returns nothing. The same for `src/routes/+layout.svelte` except the single intentional interceptor block.

## Risks & trade-offs

- The `console.error` interceptor will double-emit during development (logged via `log` AND printed by the original `console.error`). This is the cost of catching vendor warnings and is intentional — a stranger reading the console still sees the original message.
- Installing handlers in `+layout.svelte` script scope means each SvelteKit navigation re-runs the assignment. Harmless (same function references), but worth a one-line comment.
- The `$effect` `try/catch` will not stop Svelte from throwing if the *read* phase itself throws — it only catches throws from inside the effect body. That matches the user's debugging need: a thrown effect body will log `RENDER_ERROR` and then the framework will surface the uncaught tail via `window.onerror`. Both lines will appear, with the more specific one first.

## Out-of-scope follow-ups (not done here)

- Wire the browser logger to a transport (Sentry, Datadog, server `/api/log`).
- Apply the same instrumentation pattern to `PlanTripWizard`, `TravelFormPrefs`, `Header`, etc.
- Audit and remove the `webllm/engine.svelte.js` dead module (it was the most likely source of the original `startTime` crash; once removed, that specific error class disappears too).