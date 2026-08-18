# User store + preferences integration

## Goal
Add a reactive Svelte user store whose `user.preferences` is automatically updated whenever the user edits values in `TravelFormPrefs.svelte`. Persistence (Redis / Upstash) is explicitly deferred — no network or auth code in this change.

## Decisions (confirmed)
- **Store style:** Svelte 5 rune class (`$state` + `$derived`), one singleton exported from a `.svelte.js` module.
- **Location:** `src/lib/stores/user.svelte.js`, imported directly where needed.
- **Shape:** Mirror the existing `TravelFormPrefs` snapshot, i.e.
  `user.preferences = { form: { archetype, tags, budget, note }, personality: {...}, type: { id, label, icon } | null }`.
- **Persistence:** deferred — no Upstash client, no API route, no `+page.server.js` work in this plan.

## Affected files
- `src/lib/stores/user.svelte.js` (new)
- `src/lib/components/TravelFormPrefs.svelte` (edit)
- `src/routes/+layout.svelte` (no functional change; just leave as-is — store is module-scoped)

## Implementation

### 1. Create `src/lib/stores/user.svelte.js`
```js
class UserStore {
  id = $state(null);
  email = $state(null);
  name = $state(null);
  preferences = $state({
    form: { archetype: null, tags: [], budget: 3, note: '' },
    personality: { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0 },
    type: null,
  });

  // Deeply reactive: assigning to a child node (e.g. user.preferences.form.budget = 4)
  // triggers any $derived or $effect that read `user.preferences` (Svelte 5 deep proxy).
  setPreferences(snapshot) { this.preferences = snapshot; }
  patchPreferencesForm(partial) { Object.assign(this.preferences.form, partial); }
  clear() { this.id = null; this.email = null; this.name = null; /* preferences reset later */ }
}

export const user = new UserStore();
```
Notes:
- `$state` properties on a class instance become deeply reactive proxies in Svelte 5 — edits to `user.preferences.form.budget` re-run any `$derived`/`$effect` that touched them.
- Singleton export avoids context plumbing for now; trivial to swap to `setContext` later.

### 2. Edit `src/lib/components/TravelFormPrefs.svelte`
- Import the store: `import { user } from '$lib/stores/user.svelte.js';`
- Remove the local `let form = $state({...})`.
- Replace local form with a `$derived` view onto the store so existing `bind:group={form.archetype}` / `bind:value={form.note}` continue to work, by binding to a writable proxy of `user.preferences.form`:
  - Simplest correct approach: keep a local `let form = $state({...emptyState})` ONLY as a mirror, and on every snapshot effect write the snapshot back to `user.preferences`.
  - Recommended (cleaner, single source of truth):
    1. Initialize once: `if (!user.preferences.form.archetype && user.preferences.form.tags.length === 0) user.preferences.form = { archetype: null, tags: [], budget: 3, note: '' };` — actually since the store defaults already match `CONFIG.emptyState`, no init needed.
    2. Change every `form.x` reference in the template and handlers to `user.preferences.form.x`:
       - `bind:group={form.archetype}` → `bind:group={user.preferences.form.archetype}`
       - `bind:group={form.tags}` → `bind:group={user.preferences.form.tags}`
       - `form.budget === level` → `user.preferences.form.budget === level`
       - `form.budget = level` → `user.preferences.form.budget = level`
       - `bind:value={form.note}` → `bind:value={user.preferences.form.note}`
    3. Replace `const form = $state({...})` with a local alias for readability:
       `const form = $derived(user.preferences.form);`
       Then all computed values (`computePersonality(form)`, `nearestType(...)`, `snapshot`, `hasSignal`) keep their existing code unchanged.
    4. Keep the existing `$effect(() => onchange?.(snapshot))`, but additionally push the snapshot into the store:
       ```js
       $effect(() => {
         user.setPreferences(snapshot);
         onchange?.(snapshot);
       });
       ```
- Because `form` is now `$derived(user.preferences.form)`, every nested edit (typing in `note`, toggling a tag, changing `budget`) recomputes `snapshot`, which writes back to `user.preferences` — fulfilling the "computation that saves preferences into user.preferences" requirement.

### 3. (No-op) `src/routes/+layout.svelte`
Leave untouched. The store is a module singleton; importing it in any component (including `TravelFormPrefs`) gives the same instance.

## Reactivity proof (why this works)
- In Svelte 5, `$state` on a class field is wrapped in a deep proxy. Reading `user.preferences.form.budget` inside an effect subscribes to that exact property; mutating it re-runs the effect.
- `$derived(user.preferences.form)` re-reads through the proxy, so the derived value stays in sync with nested changes.
- `user.setPreferences(snapshot)` reassigns the top-level `preferences` reference; any consumer that read `user.preferences.personality` will re-run.

## Out of scope (deferred)
- Redis / Upstash client init and key naming.
- API endpoint (`+server.js`) to load/save the user blob.
- Auth integration with `@auth/sveltekit` (identity needed to key the Redis record).
- Login-time hydration of `user` from Redis.

## Validation
1. `cd voyager && npm run dev` (or `npm run build`) — must compile cleanly under Svelte 5.
2. Open `/preferences`, change archetype, toggle tags, change budget, type into note. In DevTools console run:
   ```js
   import('/src/lib/stores/user.svelte.js').then(m => {
     const { user } = m;
     console.log(user.preferences); // should update on every keystroke / click
   });
   ```
   Expected: each edit is reflected synchronously in the logged object, including nested `form.budget`, `form.tags`, etc.
3. Add another component (e.g. `+page.svelte`) that reads `user.preferences.type.label` and confirm it updates live while you edit the form.
4. Lint/build pass: `npm run build`.

## Open questions
None blocking. When persistence is picked up later, the only API the store needs to expose is already present: `user.preferences` (read) and `setPreferences` / `patchPreferencesForm` (write).