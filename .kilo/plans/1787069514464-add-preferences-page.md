# Add Preferences Page

## Decisions
- Add a file-based SvelteKit route at `src/routes/preferences/+page.svelte` so `/preferences` renders `TravelFormPrefs.svelte`.
- Add a Preferences link to the shared header navigation, using exact route matching so only `/preferences` is marked active.
- Keep the preferences form self-contained: import it from `$lib/components/TravelFormPrefs.svelte`, render it without a submit handler, and preserve its existing live behavior.
- Use the existing page conventions: a `Preferences — Voyager` document title and the root layout's spacing/global styling.
- No persistence, server load, API changes, or modifications to the form are required by the request; the page only exposes the existing component.

## Implementation steps
1. Create `src/routes/preferences/+page.svelte` with the Preferences title/head metadata and `<TravelFormPrefs />`.
2. Add `{ href: '/preferences', label: 'Preferences', exact: true }` to `src/lib/components/Header.svelte` links.
3. Verify the route compiles and the header link is present/active on `/preferences`.

## Validation
- Run `npm run build` from `voyager/` to validate SvelteKit compilation.
- Run `npx svelte-kit sync` if needed for generated route types.
- No lint, typecheck, or test script is defined in `package.json`; report that limitation if validation is run.
