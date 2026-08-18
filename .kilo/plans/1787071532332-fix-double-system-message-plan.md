# Fix: WebLLM rejects two system messages at send time

## Problem
After the previous step injected `userContextMessage` as a system message into the chat payload, the user reports the chat fails with:

> System prompt should always be the first message in `messages`.

Confirmed against the WebLLM source (`mlc-ai/web-llm/src/conversation.ts`): exactly **one** system message is permitted, and it must be at `messages[0]`. Any `role: 'system'` at `i !== 0` throws the above error.

Our current engine payload at `src/lib/webllm/engine.svelte.js:124`:

```js
const payload = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];
```

When the chat page passes `[userContextMessage, ...turns]`, the final payload is:

```js
[SYSTEM_PROMPT, userContextMessage, turn1, turn2, ...]
//  0           1                2      3
```

`messages[1].role === 'system'` → WebLLM throws → engine rethrows → chat page catches and surfaces `(error: System prompt should always be the first message in messages.)`.

## Decision
**Combine the two system messages into one at index 0.** Do this at the call site (chat page) by passing the combined system content as a new `system` argument to `streamChat`. The engine becomes user of that argument and stops auto-prepending its own. This keeps `SYSTEM_PROMPT` as the authoritative base and lets the user context append into the same slot.

Alternatives considered:
- *Merge in engine (engine imports the context builder)* — engine becomes non-user-agnostic, violates existing separation.
- *Concat in engine (`SYSTEM_PROMPT + userContext`)* — engine must know about user state; same problem.
- *Chat page passes full system string and engine never prepends* — clean: engine stays ignorant; chat page composes the full instruction string. **Chosen.**

## Affected files
- `src/lib/webllm/engine.svelte.js` — change `streamChat` signature: accept an optional `system` string, build the system message from it (default to `SYSTEM_PROMPT` when not provided). Existing callers (none today outside the chat page) keep working.
- `src/lib/preferences/contextPrompt.svelte.js` — also export the current system context as a **plain string** (or alongside the message). Two consumers: the chat page (for the combined system arg) and the message-style consumer (no longer used).
- `src/routes/chat/+page.svelte` — remove the `userContextMessage` prepend from `history`; instead pass the combined system string to `streamChat`.

## Implementation

### 1. `src/lib/preferences/contextPrompt.svelte.js`
Add a plain-string getter (in addition to the existing `$derived.by` message, kept for any consumer that wants the structured object):

```js
const userContextMessage = $derived.by(() => { /* unchanged */ });

export function getUserContextMessage() { return userContextMessage; }

export function getUserContextSystemText() {
  const m = userContextMessage;
  return m.content;
}
```

The message's `content` is already the prose notice or the JSON block — drop it directly into the single combined system message.

### 2. `src/lib/webllm/engine.svelte.js`
At `:98`, change signature and the payload assembly:

```js
export async function streamChat(messages, onToken, signal, system = SYSTEM_PROMPT) {
  // ...
  const payload = [{ role: 'system', content: system }, ...messages];
```

Default keeps current behavior for any future caller. `SYSTEM_PROMPT` remains exported only as the default; remove no callers (there is only the chat page).

### 3. `src/routes/chat/+page.svelte`
At `:5`, import both helpers:
```js
import { getUserContextSystemText } from '$lib/preferences/contextPrompt.svelte.js';
```
(`getUserContextMessage` is no longer used at this site — can stop importing.)

At `:70`, build history WITHOUT the context message and pass the combined system:
```js
const history = messages.slice(0, i).map((m) => ({ role: m.role, content: m.content }));
const system = SYSTEM_PROMPT_CHAT + '\n\n' + getUserContextSystemText();
await streamChat(history, onToken, undefined, system);
```

Add at the top of the script:
```js
import { SYSTEM_PROMPT } from '$lib/webllm/engine.svelte.js';
```
or — to avoid dual-import noise — import `SYSTEM_PROMPT` directly. Confirm it isn't exported today; if not, export it. (Check current `engine.svelte.js:6` — `SYSTEM_PROMPT` is module-local; export it.)

## Why this works
- Final payload to WebLLM: `[{role:'system', content: SYSTEM_PROMPT + userContextText}, ...turns]`. Exactly one system message, at index 0.
- `SYSTEM_PROMPT` content remains untouched; user context rides in the same slot.
- The empty-form branch of `getUserContextSystemText()` still injects the "no preferences yet" notice into the single system message — model still gets the hint.
- Engine signature: a default parameter means no caller breaks. Only one caller today.

## Data flow (after fix)
1. User edits preferences on `/preferences` → `user.preferences` mutates via the `$effect` in `TravelFormPrefs.svelte`.
2. User navigates to `/chat`, sends a message.
3. `handleSend` reads `getUserContextSystemText()` (a `$derived` that re-runs on every preference edit).
4. `streamChat(history, onToken, undefined, combinedSystem)` assembles the payload as `[{role:'system', content: combinedSystem}, ...history]`.
5. WebLLM accepts: one system at index 0.

## Validation
1. `npm run build` — must compile cleanly.
2. **Empty state:** Go straight to `/chat` (no `/preferences` visit). Send "Wsup". Expect a response, not the WebLLM error.
3. **Full edit:** Visit `/preferences`, pick an archetype + tags + budget + a note. Go to `/chat`, send "Plan me a weekend in Barbados." Expect a tailored response that references at least one picked attribute.
4. **Live updates:** Edit `budget` on `/preferences` (different value) without reloading the chat tab — refresh chat input, send another message. Expect the next response to reflect the new budget.
5. **No double-system:** In DevTools console, temporarily log `payload` at `engine.svelte.js:124` and confirm `payload.length === 1 + history.length`, with `payload[0].role === 'system'` and `payload[1].role !== 'system'`.

## Risks / notes
- `SYSTEM_PROMPT` is currently module-local in `engine.svelte.js:6-11`. Exporting it to the chat page is a small surface widening; acceptable here.
- Two near-identical exports on `contextPrompt.svelte.js` (`getUserContextMessage` and `getUserContextSystemText`): the message getter is no longer used by the chat page but is kept for symmetry and possible future introspection UI.
- If the prompt grows substantially (>2 KB) consider folding into a single string template rather than building via concatenation; out of scope for now.

## Out of scope
- Any further restructuring of the engine API.
- Token budgeting across the combined system message.
- Persistent storage of preferences / multi-user identity.
