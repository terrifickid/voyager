# Inject user preferences into the chat LLM payload

## Goal
Make the WebLLM chat assistant aware of the user's travel preferences by injecting a structured JSON block as a system message in every chat request. The preferences come from the `user` store (`src/lib/stores/user.svelte.js`) that the previous step made reactive. When the user has not meaningfully edited any preference, the store reflects that with `null`/empty values and the chat receives a "no preferences yet" notice instead of fake defaults.

## Decisions (confirmed)
- **Format:** Structured JSON block (compact, one system message).
- **Empty-state semantics:** The store treats unset preferences as `null`/`[]` — no fake defaults like `budget: 3` or `note: ''`. The form renders this faithfully (no preselected budget button, empty textarea).
- **Empty-state behavior:** When the snapshot is fully empty (every field is `null`/`[]`/`''`), inject a short prose system message ("User has not set preferences yet…") instead of the JSON block.
- **Location:** Chat page composes the payload. Engine stays user-agnostic.
- **No engine changes.** `streamChat` already accepts arbitrary `messages` — its signature does not change.
- **Base `SYSTEM_PROMPT` stays untouched.** Preferences ride as a *second* system message at index 1.

## Affected files
- `src/lib/stores/user.svelte.js` (edit) — change initial `preferences.form` defaults to: `archetype: null, tags: [], budget: null, note: null`.
- `src/lib/components/TravelFormPrefs.svelte` (edit) — initialize `form` to mirror the new null-defaulted store; render null state faithfully (no preselected budget button; empty textarea).
- `src/lib/preferences/contextPrompt.svelte.js` (new) — pure builder: `user.preferences` → system message.
- `src/routes/chat/+page.svelte` (edit) — import builder, pass `userContextMessage` into `streamChat`.

## Implementation

### 1. Edit `src/lib/stores/user.svelte.js`
Change the initial `preferences.form` so unset fields are `null`/`[]`:
```js
preferences = $state({
  form: { archetype: null, tags: [], budget: null, note: null },
  personality: { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0 },
  type: null,
});
```
Note: `personality` and `type` are still computed from `form`, so they remain derived. The all-zeros personality is the natural empty state for those.

### 2. Edit `src/lib/components/TravelFormPrefs.svelte`
Two changes:

**a. Initialize the local `form` from the store's null defaults (which now match):**
```js
const form = user.preferences.form;
```
No change needed here — the alias already points at the store's proxy, which now has `budget: null` and `note: null`.

**b. Render the null state faithfully:**
- Budget buttons: `aria-pressed={form.budget === level}` and the highlight class `{form.budget === level ? '...' : 'bg-slate-800'}` already work correctly when `budget === null` — no button is highlighted. Verify the `'bg-slate-800'` fallback stays on all buttons when `budget === null`.
- Textarea: `bind:value={form.note}` works whether `note` is `null` or `''` (Svelte coerces). The `<textarea>` will render empty in both cases.
- Live personality panel: the existing `hasSignal` derived already gates on `form.archetype != null || form.tags.length > 0`. With null defaults, this still works correctly and shows the "Pick an archetype or a few tags…" prompt when nothing is set.

No template restructuring needed beyond confirming the existing branches render correctly for `null`/`''`.

### 3. Create `src/lib/preferences/contextPrompt.svelte.js`
```js
import { user } from '$lib/stores/user.svelte.js';

const NO_SIGNAL = 'User has not set travel preferences yet. ' +
  'Gently encourage them to set their preferences to receive tailored recommendations.';

function isEmptyForm(f) {
  return (
    f.archetype == null &&
    f.tags.length === 0 &&
    f.budget == null &&
    (f.note == null || f.note.trim() === '')
  );
}

export const userContextMessage = $derived.by(() => {
  const p = user.preferences;
  if (isEmptyForm(p.form)) {
    return { role: 'system', content: NO_SIGNAL };
  }
  const payload = {
    form: {
      archetype: p.form.archetype,
      tags: [...p.form.tags],
      budget: p.form.budget,
      note: p.form.note
    },
    personality: { ...p.personality },
    type: p.type ? { id: p.type.id, label: p.type.label, icon: p.type.icon } : null
  };
  return {
    role: 'system',
    content: 'User travel preferences (JSON):\n```json\n' + JSON.stringify(payload) + '\n```'
  };
});
```
Notes:
- `.svelte.js` extension is required so `$derived.by` is parsed.
- Reads go through the `$state` proxy — the derived re-runs whenever any nested field changes.
- `isEmptyForm` checks every field, so a note-only edit (e.g. "I hate crowds") flips the gate to inject the JSON; a budget-only edit (e.g. budget = 1) does the same.
- Returns `{ role, content }` so the chat page splices it in like any other message.

### 4. Edit `src/routes/chat/+page.svelte`
- Add import:
  ```js
  import { userContextMessage } from '$lib/preferences/contextPrompt.svelte.js';
  ```
- In `handleSend` (currently around line 64-66), prepend the user context message to history:
  ```js
  const history = [userContextMessage, ...messages.slice(0, i).map((m) => ({ role: m.role, content: m.content }))];
  ```
  Final payload shape inside the engine: `[SYSTEM_PROMPT, userContextMessage, ...user+assistant turns]`.

## Why this works
- `$derived.by` subscribes to every `user.preferences.*` read inside it. Editing the form on `/preferences` re-derives the chat's context message automatically — no event bus, no `onchange`.
- `userContextMessage` is read fresh inside `handleSend`, so the message sent to the model always reflects the *current* preferences at the moment of send.
- `isEmptyForm` is the single source of truth for "no preferences yet" — budget-only, note-only, and tag-only edits all count as signal.
- The store stops carrying fake defaults. The form renders the empty state truthfully (no budget preselected, empty textarea, "Pick an archetype or a few tags…" prompt).

## Data flow
1. User on `/preferences` edits any field → `TravelFormPrefs.svelte` writes `user.preferences` via `user.setPreferences(snapshot)` (existing `$effect`).
2. User navigates to `/chat` and sends a message.
3. `handleSend` reads `userContextMessage` (a `$derived.by` that re-evaluated on the most recent preferences edit).
4. `streamChat(history, onToken)` is called with `[userContextMessage, ...trimmedHistory]`.
5. Engine prepends `SYSTEM_PROMPT` → final payload shape: `[SYSTEM_PROMPT, userContextMessage, ...user+assistant turns]`.
6. WebLLM/Qwen2.5-1.5B processes the two system messages as concatenated context.

## Validation
1. `cd voyager && npm run build` — must compile cleanly.
2. **Empty state:** Hard-reload, go straight to `/chat` (no `/preferences` visit), send a message. Confirm the payload contains the "no preferences yet" notice (DevTools console inspection or a temporary `console.log(payload)` at `engine.svelte.js:124`).
3. **Note-only edit:** On `/preferences`, type only in the note textarea. Send a chat message. Confirm JSON appears in the payload with `note` set and `archetype`/`tags`/`budget` all `null`.
4. **Budget-only edit:** On `/preferences`, click a budget button. Send a chat message. Confirm budget shows in the JSON.
5. **Full edit:** Set archetype + tags + budget + note. Confirm the JSON block lists all of them.
6. **Live updates:** After step 5, change the budget button and send another message — confirm the new budget is in the new payload without reloading.
7. **UI faithfulness:** With nothing set, confirm no budget button is highlighted and the textarea is empty.

## Out of scope
- Per-user identity / persistence (still deferred per the previous plan).
- Engine-level changes (logger, format, streaming).
- Any UI affordance to "view what the AI knows about me".
- Token-budgeting / truncation. Current payload is tiny (<1 KB); revisit if `form.note` grows or extra fields are added.

## Risks / notes
- Two system messages is well-supported by Qwen2.5; no template compatibility issue expected.
- The previous handover's discovery note about `setPreferences` overwriting the whole object is still accurate but unrelated here — the chat's derived read goes through the proxy on read, so reassignment of `preferences` is safe.
- Changing the store defaults to `budget: null` / `note: null` is a one-time migration. No persisted user data exists yet (Redis is deferred), so there's nothing to migrate.
- If `form.note` is `null`, `bind:value={form.note}` on the textarea will render as empty. Svelte handles this coercion at the bound boundary; no explicit conversion needed in the component.
