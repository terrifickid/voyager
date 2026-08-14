# WebLLM Integration Plan (Voyager SvelteKit App)

## Goal
Add WebLLM to the SvelteKit app at `/workspaces/voyager/voyager` so users can chat with a local in-browser LLM.
- `Home` landing page at `/`.
- `Chat` page at `/chat` powered by WebLLM.
- Model: `Qwen2.5-1.5B-Instruct-q4f16_1-MLC` (prebuilt, ~1.6 GB VRAM).
- Universal `Header` with navbar linking Home and Chat, present on every route.

## Resolved Decisions
- **Package**: `@mlc-ai/web-llm@^0.2.84` already in `dependencies`. No install step.
- **Model id**: `Qwen2.5-1.5B-Instruct-q4f16_1-MLC` (from upstream `prebuiltAppConfig`).
- **Cross-origin isolation**: Global `Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp` via `src/hooks.server.js`. Enables `SharedArrayBuffer` for multi-threaded WASM perf. Hugging Face model/wasm assets already serve appropriate CORP/CORS. If a future third-party asset fails, flip `Cross-Origin-Embedder-Policy` to `credentialless` (one-line change).
- **Chat v1 scope**: Textarea + Send + scrollable message list + streaming tokens + init/progress UI + Clear. No persistence, no Stop/Regenerate.
- **Engine placement**: Module-scope singleton in `src/lib/webllm/engine.svelte.js`, initialized lazily on first chat-page mount. One engine instance per page-load (full reload re-initializes). Workers are created by `@mlc-ai/web-llm` internally.
- **SSR safety**: WebLLM is client-only. Use `import { browser } from '$app/environment'` guards and dynamic `await import('@mlc-ai/web-llm')` so the module is never evaluated during SSR.
- **Routing API**: SvelteKit 2.63 supports `import { page } from '$app/state'` (a rune). Use it for active-link styling in the header.
- **Auth**: Untouched. `@auth/sveltekit` stays as-is.

## File-Level Changes

All paths relative to `voyager/`.

### 1. `src/hooks.server.js` (new)
Export a `handle` that sets COOP/COEP on every response:
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`
Return the `event.resolve(...)` response with headers applied. No other hooks needed.

### 2. `src/lib/webllm/engine.svelte.js` (new)
Module that owns the WebLLM lifecycle. Uses Svelte 5 runes (`$state`).

```js
// pseudo-shape (not final code)
import { browser } from '$app/environment';

const MODEL = 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC';

export const webllm = $state({
  status: 'idle',            // 'idle' | 'initializing' | 'ready' | 'generating' | 'error'
  progress: { text: '', percent: 0 },
  error: null,
  engine: null,
});

let initPromise = null;

export async function initEngine() {
  if (!browser) return;
  if (webllm.status === 'ready') return;
  if (initPromise) return initPromise;
  webllm.status = 'initializing';
  initPromise = (async () => {
    try {
      const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
      webllm.engine = await CreateMLCEngine(MODEL, {
        initProgressCallback: (rep) => {
          webllm.progress = { text: rep.text ?? '', percent: rep.progress ?? 0 };
        },
      });
      webllm.status = 'ready';
    } catch (err) {
      webllm.error = String(err?.message ?? err);
      webllm.status = 'error';
      initPromise = null; // allow retry
    }
  })();
  return initPromise;
}

export async function streamChat(messages, onToken, signal) {
  if (!browser || !webllm.engine) throw new Error('Engine not ready');
  webllm.status = 'generating';
  try {
    const iter = await webllm.engine.chat.completions.create({
      messages,
      stream: true,
      // signal: stream cancellation is via AbortController on the request in newer web-llm
    });
    for await (const chunk of iter) {
      if (signal?.aborted) break;
      const token = chunk?.choices?.[0]?.delta?.content ?? '';
      if (token) onToken(token);
    }
  } finally {
    webllm.status = webllm.status === 'error' ? 'error' : 'ready';
  }
}

export function clearMessages() { /* page-local; lives in chat page, not here */ }
```
Notes:
- `@mlc-ai/web-llm`'s streaming API supports abort via the request `signal` (newer versions) or by breaking out of the `for await`. We pass an optional `signal` for future Stop support but do not surface a Stop button in v1.
- Cache: WebLLM caches weights in IndexedDB by model id; first load downloads, subsequent loads are near-instant.

### 3. `src/lib/components/Header.svelte` (new)
- Sticky top bar. Left: brand link to `/` ("Voyager"). Right: nav with `Home` (`/`) and `Chat` (`/chat`).
- Active link: import `page` from `$app/state`; compare `page.url.pathname`.
- Tailwind utility classes only.

### 4. `src/routes/+layout.svelte` (modify)
- Import `Header` from `$lib/components/Header.svelte`.
- Render `<Header />` once above `{@render children()}`.
- Keep existing `layout.css` import and favicon.

### 5. `src/routes/+page.svelte` (replace)
Home landing page. Static content. Sections:
- Hero: project name "Voyager", tagline ("Local-first AI chat in your browser").
- One paragraph explaining WebLLM + Qwen2.5 1.5B runs entirely on-device.
- CTA button linking to `/chat`.
- Tailwind utility layout; no client state.

### 6. `src/routes/chat/+page.svelte` (new)
Client-only chat UI using Svelte 5 runes.

State:
- `messages: { role: 'user' | 'assistant', content: string }[]` (rune)
- `input: string`
- Reads `webllm.status`, `webllm.progress`, `webllm.error` from the engine module.

Lifecycle:
- On mount (`$effect` with browser guard), call `initEngine()` if status is `idle` or `error`.

Render:
- If `status === 'initializing'`: progress block showing `progress.text` and a bar (`width: {percent}%`).
- If `status === 'error'`: show error message + retry button (calls `initEngine()` again).
- Otherwise: scrollable message list (auto-scroll to bottom in a `$effect` reacting to `messages.length` and last `content`).

Send handler:
- Guard: `status === 'ready'` and non-empty input.
- Append `{ role: 'user', content: input }` to `messages`; reset `input`; append placeholder `{ role: 'assistant', content: '' }`; remember its index `i`.
- Call `streamChat(messages.slice(0, i), (token) => { messages[i] = { ...messages[i], content: messages[i].content + token }; }, signal)`.
- Disable Send while `status === 'generating'` or `'initializing'`.

Clear button: `messages = []`. Engine stays ready.

Optional: a small note above the chat: "Runs locally in your browser via WebLLM. First load downloads ~1 GB; cached afterward."

### 7. No backend changes
- No server endpoints, no env vars, no DB. All inference is in-browser.

## Tailwind / Styling Notes
- `src/routes/layout.css` already imports Tailwind v4 + forms + typography. No new global CSS.
- Use utility classes in markup; bubbles styled with rounded background colors and alignment.

## Browser / Runtime Requirements (UI copy)
- Modern Chromium or Firefox with WebGPU enabled.
- If `navigator.gpu` is missing or `requestAdapter()` returns null, show a friendly fallback ("Your browser doesn't support WebGPU. Try the latest Chrome or Firefox.").
- First load downloads ~1 GB of weights + wasm runtime from Hugging Face; subsequent loads use browser cache (WebLLM IndexedDB cache).

## Risks & Mitigations
- **COEP `require-corp` may block a future third-party asset.** Mitigation: switch the COEP value to `credentialless` in `hooks.server.js` (one line) if needed. Document in `AGENTS.md` if it comes up.
- **Workers + HMR.** WebLLM spawns workers. The engine module holds the singleton; full reload re-initializes. No manual teardown in v1.
- **SSR.** `@mlc-ai/web-llm` references browser globals. Dynamic import + `browser` guard prevents SSR crash.
- **Large first download.** Show progress UI; mention cache in copy.
- **Send-during-stream race.** Send button is disabled while `status === 'generating'`, so users queue messages one at a time in v1.

## Validation Plan
1. `npm run dev` in `voyager/`. In DevTools → Network, confirm response headers include both COOP and COEP, and `self.crossOriginIsolated === true` in the console.
2. `/` — Header visible with Home/Chat links; Home link is active.
3. `/chat` — progress UI appears on first visit; subsequent visits show "ready" immediately (cache hit).
4. Send a message — assistant bubble streams tokens.
5. Click Clear — list empties; engine remains ready.
6. `npm run build` succeeds with no SSR import errors related to `@mlc-ai/web-llm`.

## Out of Scope (explicit)
- Conversation persistence (localStorage / DB).
- Stop / Regenerate controls.
- Model selector UI.
- Auth integration (`@auth/sveltekit` untouched).
- Mobile-specific layout polish beyond Tailwind defaults.
- Server-side proxies for model files (everything loads from Hugging Face CDN).