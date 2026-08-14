# Add system prompt to the in-browser Voyager concierge

## Goal

Give the in-browser WebLLM model a fixed persona and behavioral priorities
("Voyager, a Caribbean travel concierge…") by injecting a single `system`-role
message into every chat request, without touching the user-visible message
history.

## Decisions (resolved with user)

- **Location**: hard-coded `const SYSTEM_PROMPT = '...'` inside
  `voyager/src/lib/webllm/engine.svelte.js`. Imported only by that module;
  no other module needs the persona text.
- **Content source**: verbatim string literal — no env var, no config file,
  no build-time override. The exact 5-sentence text from the request is used.
- **Injection mechanism**: prepend `{ role: 'system', content: SYSTEM_PROMPT }`
  inside `streamChat` before the `webllm.engine.chat.completions.create` call.
  The `messages` parameter received by `streamChat` is **not mutated**; a new
  array is constructed so callers stay safe to reuse the reference.
- **UI visibility**: hidden. The user-visible `messages` array in
  `+page.svelte` is unchanged. The system prompt only appears in the payload
  sent to the model.
- **Logging**: add `hasSystemPrompt: presence(SYSTEM_PROMPT)` to the
  `JOB_START` context emitted by `streamChat` (Rule 7 — shape, not value;
  Rule 14 — presence flags). No other logging changes.

## Affected boundaries

- **In scope**: one file —
  `voyager/src/lib/webllm/engine.svelte.js`.
- **Out of scope** (deliberately):
  - `voyager/src/routes/chat/+page.svelte` — call site stays identical.
  - The user-visible `messages` array and its rendering.
  - The model selection (`MODEL = 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC'`) and the
    `initEngine` flow.
  - The `streamChat` signature (no new parameter — the prompt is a constant
    known to the engine module).
  - Logging rules / vocabulary — `hasSystemPrompt` reuses the existing
    `presence` helper; no new `EVENT` entry needed.

## Data flow

```
+page.svelte :: handleSend
    └─► engine.svelte.js :: streamChat(history, onToken, signal)
            └─► payload = [SYSTEM_PROMPT_MSG, ...history]
            └─► webllm.engine.chat.completions.create({
                  messages: payload,
                  stream: true,
                  signal
                })
```

- `history` is the user/assistant turn slice built at
  `+page.svelte:64-66`; it stays untouched.
- The new first element is `{ role: 'system', content: SYSTEM_PROMPT }` —
  the OpenAI-compatible role that `@mlc-ai/web-llm` understands.
- `signal` and `onToken` behavior is unchanged.

## Failure modes

- **Model ignores `system` role.** Qwen2.5-Instruct (the loaded MLC model)
  supports the `system` role via the chat template webllm wraps around it.
  If a future swap to a base/non-instruct model is made, the prompt may be
  inert — flagged as a follow-up, not a current risk.
- **Payload size.** The prompt is ~300 chars; negligible against the model's
  4k–8k context. No truncation logic needed.
- **`presence` on a hard-coded string.** `presence(SYSTEM_PROMPT)` returns
  the character length — stable across builds, safe to log.

## Implementation steps

1. **Add the constant** at the top of
   `voyager/src/lib/webllm/engine.svelte.js`, next to the existing `MODEL`
   constant:
   ```js
   const SYSTEM_PROMPT =
     'You are Voyager, a Caribbean travel concierge. ' +
     'You coordinate transportation, monitor weather, ' +
     'and proactively suggest activities. You communicate ' +
     'via text/email with drivers, businesses, and clients. ' +
     "You are warm, efficient, and anticipate needs before they're voiced.";
   ```
   - Verbatim from the user request. No edits to wording or punctuation.

2. **Prepend in `streamChat`** (currently `engine.svelte.js:91-160`).
   - After the existing `!browser || !webllm.engine` guard, before the
     `webllm.status = 'generating'` line, build:
     ```js
     const payload = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];
     ```
   - Replace the existing call
     `await webllm.engine.chat.completions.create({ messages, stream: true, signal })`
     with the same call but passing `payload` as `messages`.
   - Do **not** mutate or reassign the caller's `messages` array.

3. **Extend the `JOB_START` log** in `streamChat` to include
   `hasSystemPrompt: presence(SYSTEM_PROMPT)` alongside the existing
   `messageCount` and `hasSignal` fields. Keep severity at `info` and the
   `step: 'engine:chat'` child context unchanged.

## Validation

- `cd voyager && npm run build` succeeds (no new imports, no new deps).
- Manual smoke (per the existing logging plan's validation step):
  - Send a message in `/chat`; confirm the browser console emits a
    `JOB_START` log line whose context object contains `hasSystemPrompt:
    <number>` (the character length of `SYSTEM_PROMPT`).
  - Confirm the visible chat bubble for the assistant starts the
    conversation in the "Voyager concierge" persona (e.g. references
    Caribbean travel, transportation, weather).
  - Confirm the user-visible message history still begins with the user's
    first turn — no `system` row rendered.
- Anti-pattern sweep unchanged: no `console.*` introduced, no second
  `pino()`, `pino` still absent from `.svelte-kit/output/client`.

## Risks & follow-ups (out of scope)

- Persona is a single global constant. If a future feature needs
  per-conversation or per-user personas, lift `SYSTEM_PROMPT` into a
  dedicated module (e.g. `src/lib/webllm/prompts.js`) and pass it through
  `streamChat`'s signature. Not needed today.
- No tests exist for the chat engine; manual smoke is the only validation
  channel. Adding a vitest harness for `streamChat` (mocking
  `webllm.engine.chat.completions.create`) would let us assert the
  `system` message is prepended — out of scope here.
