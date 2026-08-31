# M5 — Implement Engine Client Wrapper

## Goal
Wrap the existing `streamChat` so callers can run a single user prompt with a custom system message and get back the full concatenated response as a string.

## Files Touched
- `src/lib/agent/engineClient.js` (only)

## Preconditions
M4 passed.

## Changes

Replace `src/lib/agent/engineClient.js` with:

```js
import { streamChat, webllm } from '$lib/webllm/engine.svelte.js';

export async function runStructuredAgent(systemMsg, userMsg) {
  if (!webllm.engine || webllm.status !== 'ready') {
    throw new Error('runStructuredAgent: engine not ready');
  }
  if (typeof systemMsg !== 'string' || typeof userMsg !== 'string') {
    throw new Error('runStructuredAgent: systemMsg and userMsg must be strings');
  }
  let buf = '';
  await streamChat(
    [{ role: 'user', content: userMsg }],
    (token) => { buf += token; },
    undefined,
    systemMsg
  );
  return buf;
}
```

Do NOT modify `src/lib/webllm/engine.svelte.js`. This file is read-only as far as this milestone is concerned.

## Validation Gate

1. `npm run dev` boots.
2. With engine ready (`webllm.status === 'ready'`):
   ```js
   import('/src/lib/agent/engineClient.js').then(m =>
     m.runStructuredAgent(
       'You are a concise assistant. Reply with one short sentence and nothing else.',
       'Say hello in a friendly way.'
     ).then(s => console.log('OUT:', s))
   );
   ```
   Resolves to a non-empty string. Should be one short sentence.

3. With engine not ready (clear cache, reload page, run before engine finishes loading):
   ```js
   import('/src/lib/agent/engineClient.js').then(m => m.runStructuredAgent('x','y'))
   ```
   Rejects with `'runStructuredAgent: engine not ready'`.

4. Existing chat "Send" still works (no regression — `engine.svelte.js` is untouched).

## Rollback
Revert `src/lib/agent/engineClient.js` to its M3 stub.

## Commit Message
`M5: add runStructuredAgent wrapper around streamChat`

## Pass Criteria
Gate items 1–4 pass. Proceed to M6.