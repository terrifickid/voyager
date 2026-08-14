# Apply logging rules to the WebLLM integration

## Goal
Bring the code added in commit `74f48f6` ("alpha print webllm") into compliance with `voyager/.kilocode/rules/logging.md`. The shared vocabulary (`EVENT`, `serializeError`, `presence`) and the canonical logger pattern must be present in every file that has logic, neither `console.*` nor a second `pino()` may be used, and every meaningful step must log `*_START` → `*_SUCCESS`/typed error.

## Scope (decided)
- Files with logic to instrument:
  - `voyager/src/lib/webllm/engine.svelte.js` (browser)
  - `voyager/src/routes/chat/+page.svelte` (browser)
  - `voyager/src/hooks.server.js` (server)
- Files left untouched (no logic, no entry points): `Header.svelte`, `+layout.svelte`, `+page.svelte` (home).

## Architectural decision (decided)
Pino is Node-only. Use **two logger entry points** that share the same `EVENT` / `serializeError` / `presence` vocabulary so call sites are identical:
- `voyager/src/lib/server/logger.js` — server-side. Uses `pino()` exactly as `logging.md` Rule 1 prescribes. Imported only from server modules (e.g. `hooks.server.js`). SvelteKit will tree-shake this out of the client bundle because it lives under `src/lib/server/`.
- `voyager/src/lib/logger.js` — client-side. Re-exports the canonical `EVENT`, `serializeError`, `presence` from the server module, and provides a browser-safe `log` shim that emits the same JSON shape to `console.info/warn/error` (no `pino` in the browser bundle). This keeps Rule 2 ("never `console.*` in generated code") satisfiable on the client by routing through the shared `log` object.

> Rationale: keeps the rule "import `log` from `logger.js`" honest everywhere, matches the structure of `logging.md` Rule 1, and avoids shipping `pino` to the browser.

## Implementation steps

### 1. Add `pino` dependency
- `voyager/package.json` → add `"pino"` to `dependencies`.
- Run `npm install` from `voyager/`.

### 2. Create server logger: `voyager/src/lib/server/logger.js`
- Verbatim contents of `logging.md` Rule 1 (the `EVENT` catalog, `serializeError`, `createLogger`, `log` singleton, `presence`).
- This is the canonical file. The client logger imports `EVENT`/`serializeError`/`presence` from here.

### 3. Create client logger: `voyager/src/lib/logger.js`
- Imports `EVENT`, `serializeError`, `presence` from `./server/logger.js` (allowed — SvelteKit includes `lib/server` only in server bundles, but the named exports are pure JS that Vite's tree-shaker will embed for the client; to be safe, also re-declare the `EVENT` constant in this file and re-export `serializeError`/`presence` from a small shared module under `src/lib/` instead of `src/lib/server/`).
- Implementation refinement: split the shared vocabulary into `voyager/src/lib/log/vocab.js` (pure JS, no `pino` import) containing `EVENT`, `serializeError`, `presence`. Both `src/lib/server/logger.js` and `src/lib/logger.js` import from it. The server file adds `pino`; the client file adds a JSON `console`-based shim (`service`, `version`, `severity`, `messageKey: "message"`).
- `log` object exposes `trace/debug/info/warn/error/fatal/child` with the same Pino call signature.

### 4. Instrument `voyager/src/hooks.server.js`
- Add `import { log, EVENT, serializeError } from "$lib/server/logger.js";` (or relative path).
- Wrap `handle` in a try/catch:
  - Capture `Date.now()` start.
  - Compute `opLog = log.child({ component: "http", function: "handle", method: event.request.method, path: event.url.pathname })`.
  - Debug-gated `opLog.debug({ type: "REQUEST_START" }, "Request started")` (note: `REQUEST_START` should be added to `EVENT` or omitted — decide to add `REQUEST_START` / `REQUEST_SUCCESS` entries to keep vocabulary clean).
  - On resolve: `opLog.info({ type: EVENT.REQUEST_SUCCESS, status: response.status, durationMs: Date.now() - start }, "Request completed")`.
  - On throw: `opLog.error({ type: EVENT.STORE_ERROR or new UNCAUGHT-like type, err: serializeError(err, { function: "handle" }) }, "Request failed")` and re-throw. (Add `REQUEST_ERROR` to `EVENT` if kept; otherwise reuse `JOB_FAILURE`.)
- Keep the existing COOP/COEP header mutation untouched.

### 5. Instrument `voyager/src/lib/webllm/engine.svelte.js`
- `import { log, EVENT, serializeError, presence } from "$lib/logger.js";`
- Module-level `const componentLog = log.child({ component: "webllm", function: "engine" });`
- `initEngine()`:
  - On entry, `opLog = componentLog.child({ step: "engine:init", model: MODEL })`.
  - Log `JOB_START` with `hasModelId: presence(MODEL)`.
  - Pre-existing idempotency checks (`browser`, `status === 'ready'`, `initPromise`) → log `trace`/`debug` with `reason: "skip"` and return.
  - Wrap import + `CreateMLCEngine` in try/catch:
    - Before `import('@mlc-ai/web-llm')`: `EXTERNAL_CALL_START` with `provider: "cdn:jsdelivr"` (or the actual CDN URL).
    - After success: `EXTERNAL_CALL_SUCCESS`.
    - On throw: `EXTERNAL_CALL_ERROR` with `err: serializeError(err, { function: "initEngine" })`, then re-throw (the calling `$effect` already swallows, but rule 15 says "log AND propagate").
  - `initProgressCallback` is high-volume — log at `debug` only, with `progress` and `textLength: presence(rep.text)`.
  - On success: `JOB_SUCCESS` with `model: MODEL`.
- `streamChat(messages, onToken, signal)`:
  - `opLog = componentLog.child({ step: "engine:chat", messageCount: messages.length })`.
  - Log `JOB_START` with `messageCount` and `hasSignal: presence(signal)`.
  - Guard `!browser || !webllm.engine` → log `VALIDATION_ERROR` with `reason: "engine_not_ready"` and `warn` (expected user error).
  - On `chat.completions.create` success: `EXTERNAL_CALL_SUCCESS` with `stream: true`.
  - On token loop: do NOT log per token (high volume). Log `JOB_SUCCESS` once after the loop with `tokensDelivered: <count>` and `aborted: signal?.aborted === true`.
  - Wrap in try/catch/finally; on throw serialize and tag `EXTERNAL_CALL_ERROR`; re-throw so the chat page can surface it.

### 6. Instrument `voyager/src/routes/chat/+page.svelte`
- `import { log, EVENT, serializeError } from "$lib/logger.js";`
- Component-level `const chatLog = log.child({ component: "chat", function: "page" });`
- `handleSend(event)`:
  - On entry, `opLog = chatLog.child({ step: "chat:send", turns: messages.length })`.
  - Log `JOB_START` with `inputLength: presence(text)`.
  - Empty-text or `status !== 'ready'` → `VALIDATION_ERROR` with `reason` and `warn` (expected user error), return early.
  - After appending user + assistant placeholders: `STORE_WRITE_START` is *not* a real store, but rule 14 says "log the key and field names, never values". Skip; this is in-memory state. Instead log `info` with `turn: messages.length` and `role: "user"`.
  - Wrap `streamChat` call in try/catch:
    - On success: `JOB_SUCCESS` with `tokensDelivered` (track a counter inside the callback) and `turn`.
    - On error: serialize, log `JOB_FAILURE` with `err: serializeError(err, { function: "handleSend" })`, then write the visible error message into the message bubble (existing behavior).
- `handleClear()`: log `info` with `previousTurns: messages.length` and `reason: "user_clear"`.
- `handleRetry()`: `info` with `reason: "user_retry"` and let `initEngine` do its own logging; do not double-log the start.

### 7. `EVENT` catalog additions
Decide and add to `voyager/src/lib/log/vocab.js` (and therefore `server/logger.js`):
- `REQUEST_START`, `REQUEST_SUCCESS`, `REQUEST_ERROR` — for `hooks.server.js`.
- Re-use `JOB_START` / `JOB_SUCCESS` / `JOB_FAILURE` / `VALIDATION_ERROR` / `EXTERNAL_CALL_START` / `EXTERNAL_CALL_SUCCESS` / `EXTERNAL_CALL_ERROR` everywhere else. No new types needed for engine/chat.

### 8. Anti-pattern sweep (Rule 15)
- `grep -nE "console\.(log|error|warn|info|debug)" voyager/src` → must return zero hits in the touched files.
- `grep -nE "pino\(" voyager/src` → must return exactly one hit (the server `logger.js`).
- Every file touched imports `log` from its respective `logger.js` entry point.

## Validation
- `cd voyager && npm install` succeeds.
- `cd voyager && npm run build` succeeds (no Vite import errors; pino must not be in the client bundle — verify with `grep -R "pino" voyager/.svelte-kit/output/client` returning empty).
- `cd voyager && npm run dev` — manual smoke check:
  - Home page loads with no console errors.
  - `/chat` page logs `JOB_START` (engine init) → progress debugs → `JOB_SUCCESS` / `EXTERNAL_CALL_ERROR` as appropriate.
  - Sending a message logs `chat:send` `JOB_START` → `JOB_SUCCESS` with a token count.
  - Server logs JSON lines with `severity`, `service`, `version`, `component`, `function`, `type`.
- Definition-of-Done (Rule 16) self-check on each touched file.

## Risks & open questions
- Pino bundling: confirmed tree-shake away from client when only imported from `src/lib/server/`. Will be verified by the `build` validation step.
- `initProgressCallback` runs at high frequency; gated at `debug` to comply with Rule 8 and avoid log floods.
- Adding `REQUEST_START` to `EVENT` is optional; if the user prefers to keep the catalog minimal, `hooks.server.js` can use `JOB_START`/`JOB_SUCCESS`/`JOB_FAILURE` instead. Flagged in step 7 for confirmation.
