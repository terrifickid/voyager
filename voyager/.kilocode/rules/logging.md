# Logging Standard (Pino)

All generated JavaScript/TypeScript (Node) code MUST use Pino structured logging
exactly as specified in this file. The structure is **canonical** — identical in
principle and in actual implementation across every file — and **extensible**:
grow the `EVENT` catalog and helpers for new use cases, but never change the
structure. Nothing may fail silently; a stranger reading only the raw logs must
be able to reconstruct what happened, where, and why.

## Installation

Place this file at `.kilo/rules/logging.md` and reference it in `kilo.jsonc`:

```jsonc
// kilo.jsonc
{
  "instructions": [".kilo/rules/logging.md"],
}
```

---

## Rule 1 — Canonical `logger.js` (create once, exactly)

Create `logger.js` with EXACTLY the following content. Import from it everywhere;
never call `pino()` again.

```js
// logger.js — canonical logging infrastructure.
// The single shared logger plus the vocabulary every other module uses.
// Extend EVENT and the helpers for new use cases, but DO NOT change the
// structure: one shared logger, child loggers for context, every log is a
// short `message` + context object, every error is typed + serialized,
// secrets are logged as presence/shape, never as values.

import pino from "pino";

// 1. EVENT CATALOG (extensible)
//    Every log line carries a `type` from here. ADD new entries for new use
//    cases. NEVER use free-text types. NEVER rename/remove an existing key.
export const EVENT = {
  // lifecycle (success steps) — log a *_START before and a *_SUCCESS after
  JOB_START: "JOB_START",
  JOB_SUCCESS: "JOB_SUCCESS",
  EXTERNAL_CALL_START: "EXTERNAL_CALL_START",
  EXTERNAL_CALL_SUCCESS: "EXTERNAL_CALL_SUCCESS",
  STORE_WRITE_START: "STORE_WRITE_START",
  STORE_WRITE_SUCCESS: "STORE_WRITE_SUCCESS",
  STORE_READ_SUCCESS: "STORE_READ_SUCCESS",

  // errors — type EVERY error log
  UNCAUGHT_EXCEPTION: "UNCAUGHT_EXCEPTION",
  UNHANDLED_REJECTION: "UNHANDLED_REJECTION",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  EXTERNAL_CALL_ERROR: "EXTERNAL_CALL_ERROR",
  STORE_ERROR: "STORE_ERROR",
  CONFIG_ERROR: "CONFIG_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  JOB_FAILURE: "JOB_FAILURE",
};

// 2. ERROR SERIALIZATION
//    Always pass a caught error through this before logging. Extend `keys` if
//    your error shapes carry more detail.
export function serializeError(err, context = {}) {
  if (!err || typeof err !== "object") {
    return { message: String(err), ...context };
  }
  const out = {
    message: err.message,
    name: err.name,
    stack: err.stack,
    code: err.code,
    ...context,
  };
  const keys = [
    "status",
    "statusCode",
    "statusText",
    "cause",
    "body",
    "headers",
  ];
  for (const k of keys) {
    if (err[k] !== undefined) out[k] = err[k];
  }
  return out;
}

// 3. LOGGER FACTORY + SHARED SINGLETON
export function createLogger(options = {}) {
  return pino({
    level: process.env.LOG_LEVEL || "info",
    messageKey: "message",
    base: {
      service: process.env.SERVICE_NAME || "app",
      version: process.env.SERVICE_VERSION || "0.0.0",
    },
    formatters: {
      level: (label) => ({ severity: label.toUpperCase() }),
    },
    ...options,
  });
}

// The one shared instance. Import `log` everywhere; do not call pino() again.
export const log = createLogger();

// 4. REDACTION HELPER
//    Return a presence/shape value instead of a secret. presence() returns
//    length for strings/arrays, key count for objects, false for null/empty.
export function presence(value) {
  if (value == null || value === "") return false;
  if (typeof value === "string" || Array.isArray(value)) return value.length;
  if (typeof value === "object") return Object.keys(value).length;
  return Boolean(value);
}
```

## Rule 2 — One shared logger (never console.\*)

- MUST import `{ log, EVENT, serializeError, presence }` from `logger.js`.
- MUST NOT use `console.log` / `console.error` in generated code.
- MUST NOT call `pino()` inside a business function.

```js
import { log, EVENT, serializeError, presence } from "./logger.js";
```

## Rule 3 — Child loggers for context

- Bind constant context once, with `child()` — never repeat it per call.
- One module-level child per file; one operation-level child per request/job/step.

```js
const componentLog = log.child({
  component: "payments",
  function: "runCharge",
}); // module scope
const opLog = componentLog.child({ userId, step: "charge:authorize" }); // operation scope
```

## Rule 4 — Full lifecycle logging

Every entry point logs on entry; every meaningful step logs a `*_START` before
and a `*_SUCCESS` / error after. Success logs are half the signal — do not skip
them.

```js
opLog.info({ type: EVENT.JOB_START, amount, currency }, "Starting charge");

if (!userId) {
  opLog.warn(
    { type: EVENT.VALIDATION_ERROR, reason: "missing_user_id" },
    "Charge rejected",
  );
  return { error: "user_id required" };
}

try {
  opLog.info(
    { type: EVENT.EXTERNAL_CALL_START, provider: "gateway" },
    "Authorizing with gateway",
  );
  const res = await gateway.authorize(charge);
  opLog.info(
    { type: EVENT.EXTERNAL_CALL_SUCCESS, chargeId: res.id },
    "Authorization succeeded",
  );
} catch (err) {
  const errInfo = serializeError(err, { function: "runCharge" });
  opLog.error(
    { type: EVENT.EXTERNAL_CALL_ERROR, provider: "gateway", err: errInfo },
    `Authorization failed: ${err.message}`,
  );
  throw err;
}
```

## Rule 5 — Typed events

- Every log carries a `type` from `EVENT` (SCREAMING_SNAKE). Errors MUST be typed.
- Add new entries to `EVENT`; never write a bare-string type inline.

## Rule 6 — Error serialization

- Every caught error MUST pass through `serializeError(err, { function })`.
- NEVER log a raw `Error` object or a message-only error.

## Rule 7 — Redaction (presence, not secrets)

- NEVER log tokens, passwords, keys, cookies, or `Authorization` header values.
- Log presence/shape instead: `presence()`, `has*` booleans, key lists, lengths.
- Identifiers (ids, usernames, resource names) are safe to log.
- Strip `auth`/`cookie` fields from any headers you log.

```js
// NEVER: opLog.info({ token, password, cookies }, ...)
// ALWAYS:
opLog.info(
  {
    hasToken: presence(token),
    passwordLength: presence(password),
    dataKeys: Object.keys(payload),
  },
  "Payload ready",
);
```

## Rule 8 — Severity levels

- `trace`/`debug` — high-volume internals, gated by `LOG_LEVEL`.
- `info` — normal lifecycle.
- `warn` — expected, user-caused failures (with `isExpectedUserError: true`).
- `error` — unexpected/system failures.

```js
const isExpectedUserError = /* 4xx / validation / bad credentials */;
opLog[isExpectedUserError ? "warn" : "error"](
  { type: isExpectedUserError ? EVENT.VALIDATION_ERROR : EVENT.EXTERNAL_CALL_ERROR, err: errInfo, isExpectedUserError },
  `Operation failed: ${err.message}`,
);
```

## Rule 9 — External-call instrumentation

Check `res.ok` on every outbound HTTP call; throw a typed error the caller
serializes; include `status`/`statusText`.

```js
const res = await fetch(url, opts);
if (!res.ok) {
  const text = await res.text();
  throw new Error(`request failed: ${res.status} ${text}`); // caller logs + re-throws
}
```

## Rule 10 — Persistence instrumentation (store / DB / cache)

Validate connectivity/permissions before writing when supported; log the key and
field names, never values; treat not-found as a typed error; re-throw every failure.

```js
async function save(key, data) {
  const stepLog = componentLog.child({ step: "store:write", key });
  stepLog.info(
    { type: EVENT.STORE_WRITE_START, dataKeys: Object.keys(data) },
    "Starting save",
  );
  try {
    await store.set(key, JSON.stringify(data));
    stepLog.info({ type: EVENT.STORE_WRITE_SUCCESS, key }, "Save succeeded");
  } catch (err) {
    stepLog.error(
      { type: EVENT.STORE_ERROR, err: serializeError(err), key },
      `Save failed: ${err.message}`,
    );
    throw err;
  }
}
```

## Rule 11 — Global / process-level handlers

Install both process-level and framework-level handlers; log the typed, serialized
error plus request context; return a safe message to the caller, full detail to the log.

```js
process.on("uncaughtException", (err, origin) => {
  log.error(
    { type: EVENT.UNCAUGHT_EXCEPTION, err: serializeError(err), origin },
    "Uncaught exception",
  );
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  log.error(
    { type: EVENT.UNHANDLED_REJECTION, err: serializeError(reason) },
    "Unhandled rejection",
  );
  process.exit(1);
});
```

## Rule 12 — Async jobs & polling

Log on start; treat "no data yet / keep polling" as normal (`continue`, no error
log); terminal failures are typed + serialized.

```js
while (!cancelled) {
  try {
    const res = await poll();
    if (res.noDataYet) continue; // normal — NOT an error
    opLog.info({ type: EVENT.JOB_SUCCESS, result: res.id }, "Poll complete");
    return res;
  } catch (err) {
    opLog.error(
      { type: EVENT.EXTERNAL_CALL_ERROR, err: serializeError(err) },
      `Poll failed: ${err.message}`,
    );
    return { error: err.message };
  }
}
```

## Rule 13 — Request tracing with timing

Capture start time; log completion with `status` + `durationMs`; gate high-volume
start lines behind debug/trace.

```js
const start = Date.now();
const verbose =
  process.env.LOG_LEVEL === "debug" || process.env.LOG_LEVEL === "trace";
if (verbose) reqLog.debug("Request started");
const response = await next();
if (verbose)
  reqLog.debug(
    { status: response.status, durationMs: Date.now() - start },
    "Request completed",
  );
```

## Rule 14 — Naming conventions

- `component` — kebab-case module/domain (e.g. `payments`, `user-import`).
- `function` — exported symbol, or `file:export` when ambiguous.
- `step` — lowercase colon-joined `domain:verb[:sub]` (e.g. `charge:authorize`).
- `type` — an `EVENT` constant.
- `err` — `serializeError(...)` result.
- Presence flags — `has*` or `presence(x)`.

## Rule 15 — Anti-patterns (never)

- No `console.log` / `console.error`.
- No second `pino()` instance; import `log`.
- No log with no context object.
- No raw `Error` object; always `serializeError`.
- No `catch (e) { log.error(...); /* ignore */ }` — log AND propagate.
- No logging control-flow signals (redirects/aborts) as errors.
- No logging tokens, passwords, keys, cookies, or auth headers.
- No untyped error logs.
- No temporary `console.log("debug")` — use gated `log.debug`.
- No inconsistent field/event/step naming.
- No skipping the success log.
- No repeating a constant field per call instead of binding it in a child logger.

## Rule 16 — Definition of Done (self-check before delivering)

1. Imports `log, EVENT, serializeError, presence` from `logger.js` (no console.\*).
2. Has a module-level `log.child({ component, function })`.
3. Every entry point logs on entry.
4. Every external step logs `*_START` → `*_SUCCESS`/error with a `step`.
5. Every `catch` block: `serializeError` → typed error/warn → re-throw or return.
6. No secret value in any log context.
7. Control-flow exceptions are not logged as errors.
8. Success logs include result shape (ids/counts/keys/status/duration).
9. Field names, event types, and step markers follow Rule 14.
10. Severity is deliberate per Rule 8.

---

## Full worked example

```js
import { log, EVENT, serializeError, presence } from "./logger.js";

const componentLog = log.child({ component: "import", function: "runImport" });

export async function runImport({ userId, source, apiKey }) {
  const opLog = componentLog.child({ userId, source });

  opLog.info(
    { type: EVENT.JOB_START, hasApiKey: presence(apiKey) },
    "Import started",
  );

  if (!userId) {
    opLog.warn(
      { type: EVENT.VALIDATION_ERROR, reason: "missing_user_id" },
      "Import rejected",
    );
    return { error: "user_id required" };
  }

  try {
    opLog.info(
      { type: EVENT.EXTERNAL_CALL_START, provider: "source-api" },
      "Fetching from source",
    );
    const data = await fetchFromSource(source, apiKey); // throws on !res.ok
    opLog.info(
      { type: EVENT.EXTERNAL_CALL_SUCCESS, rows: data.length },
      "Fetched from source",
    );

    opLog.info(
      { type: EVENT.STORE_WRITE_START, dataKeys: Object.keys(data[0] || {}) },
      "Persisting results",
    );
    await persist(data);
    opLog.info(
      { type: EVENT.STORE_WRITE_SUCCESS, rows: data.length },
      "Persisted results",
    );

    opLog.info(
      { type: EVENT.JOB_SUCCESS, rows: data.length },
      "Import complete",
    );
    return { ok: true, rows: data.length };
  } catch (err) {
    const errInfo = serializeError(err, { function: "runImport" });
    opLog.error(
      { type: EVENT.JOB_FAILURE, err: errInfo },
      `Import failed: ${err.message}`,
    );
    throw err;
  }
}
```
