# Add Personality Graph to Final Itinerary View

## Goal

Show the existing personality graph (currently only visible on `/preferences`) at the top of the final itinerary on `/plan`, so users immediately see the traveler type their trip was generated for.

## Decisions

- **Reuse approach:** Extract a new `PersonalityGraph.svelte` component from the "Live personality" section of `TravelFormPrefs.svelte`. The new component reads `user.preferences.personality` and `user.preferences.type` directly from the user store (so it does not need `config` / `form` inputs).
- **Placement & visual:** Render at the top of the itinerary view, inside the existing `<section class:hidden={!submitted}>` in `src/routes/plan/+page.svelte`, immediately after the header `<header>` and before the trip-concept `<article>`. Use the compact card style from `TravelFormPrefs` (rounded `bg-bone-100` panel, eyebrow "Personality", closest type line, slim 5-trait rows with numeric value).
- **Empty state:** When the user has no archetype and no tags, render the same empty hint as `TravelFormPrefs`: "Pick an archetype or a few tags — your type appears here in real time." No silent hide.
- **Data flow:** The store already keeps `preferences.personality` and `preferences.type` up to date via `TravelFormPrefs`'s snapshot effect, so the new component needs no props and no extra wiring.

## Affected files

- `voyager/src/lib/components/TravelFormPrefs.svelte` — remove the inline `<section class="...Live personality...">` and its helpers (`computePersonality`, `nearestType`, `fillStyle`); replace with `<PersonalityGraph />` so the preferences page is unchanged.
- `voyager/src/lib/components/PersonalityGraph.svelte` — **new**. Renders the same visual, reads from the store.
- `voyager/src/routes/plan/+page.svelte` — import `PersonalityGraph` and render it at the top of the itinerary view.

No store changes, no API changes, no layout changes, no stylesheet changes.

## Implementation steps

1. **Create `voyager/src/lib/components/PersonalityGraph.svelte`.**
   - `<script>`: import `user` from `$lib/stores/user.svelte.js`; import `config` shape (the `traits` list and archetype `options`) by re-importing `TravelFormPrefs`'s exported constants if available, **or** by importing the constants from a new tiny `voyager/src/lib/preferences/config.js` if extracting constants is cleaner. **Preferred:** add `export const CONFIG = {…}` from `TravelFormPrefs.svelte` (it is already declared `CONFIG` at module scope) and import it here. If module-scope export isn't worth the churn, copy the `traits` list (5 entries) and the `nearestType` helper into a new sibling file `voyager/src/lib/personality.js` and import from there.
   - Derive: `personality = $derived(user.preferences.personality)`, `type = $derived(user.preferences.type)`, `hasSignal = $derived((user.preferences.form.archetype != null) || (user.preferences.form.tags.length > 0))`.
   - Mark the `<section>` exactly as in `TravelFormPrefs.svelte` lines 511–541, including the center-divider line and `fillStyle(personality[t.key])` bar.
   - Empty branch (`{:else}`) renders the existing hint copy verbatim.

2. **Refactor `voyager/src/lib/components/TravelFormPrefs.svelte`.**
   - Remove the inline "Live personality" `<section>` (lines ~511–541).
   - Remove now-unused helpers `computePersonality`, `nearestType`, `fillStyle` only if they are no longer referenced elsewhere in the file. (`computePersonality` and `nearestType` are still used by the local `personality`/`type` `$derived`s, so they stay; `fillStyle` moves out with the markup.)
   - Import `PersonalityGraph` and place it in the same spot the inline section used to occupy (so the preferences page renders identically).

3. **Wire `voyager/src/routes/plan/+page.svelte`.**
   - Add `import PersonalityGraph from '$lib/components/PersonalityGraph.svelte';` to the `<script>` block.
   - In the itinerary `<section class:hidden={!submitted}>`, immediately after the closing `</header>` (line ~109) and before the loading branch (`{#if loading}` at line ~111), insert:
     ```svelte
     <PersonalityGraph />
     ```
   - No other markup changes.

## Risks & mitigations

- **Risk:** New component imports a large `CONFIG` object via a side-channel. **Mitigation:** keep `PersonalityGraph.svelte` dependent only on the 5-trait `traits` list and the archetype `options` for `nearestType`. If we cannot cleanly export them, put them in `voyager/src/lib/personality.js` rather than reaching into `TravelFormPrefs.svelte` internals.
- **Risk:** Stale `personality` value if the user lands on `/plan` before ever visiting `/preferences`. **Mitigation:** empty-state hint covers it; the store defaults to zero vectors, `hasSignal` is false, so we render the existing hint.
- **Risk:** SSR crash repeating the `globalThis.addEventListener` class of bug. **Mitigation:** the new component reads `user.preferences.*` only — no browser globals, no scheduler hooks, no `window` references. No mitigation needed; flag if the user store has SSR caveats (it does not, based on prior fixes).
- **Risk:** Visual drift between preferences and plan views. **Mitigation:** identical markup + identical helpers (or shared util). Visually review both pages after the change.

## Validation

1. `pnpm check` (or whatever the repo uses — confirm `package.json` `scripts.check`; fall back to `node --check` on the touched `.svelte` files via Svelte's CLI if no script is found) runs clean.
2. Manual: visit `/preferences`, pick an archetype + 2 tags → confirm Live personality still renders identically (no regression).
3. Manual: visit `/plan`, submit the wizard → confirm a "Personality" card appears at the top of the itinerary with the same closest-type + trait bars + numeric values shown on `/preferences`.
4. Manual: clear preferences (or open in a fresh session) and land on `/plan` → confirm the empty-state hint shows in the card.
5. Manual: switch back to `/plan` wizard via "Edit my answers", change preferences, resubmit → confirm the card updates to the new values.

## Out of scope

- Changing how `personality` is computed or which traits are tracked.
- Persisting preferences across sessions (already handled elsewhere).
- Animations, transitions, or new copy beyond the existing hint.
- A "back to preferences" link from the itinerary card.
- Mobile-specific layout tweaks beyond what the existing styles already do.

## Open questions

None. All design decisions resolved.
