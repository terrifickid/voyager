# Google Places Search — Server Route

## Goal

Take the natural-language Google Places API (New) `places:searchText` example from `/workspaces/voyager/placesSearchExample` and turn it into a single SvelteKit `+server.js` POST endpoint at `/api/places/search`. The Google API key must never reach the browser. Nothing else — no separate function module, no frontend, no UI.

## Why one file

Per the user's instruction: this is the only place we'll use it. A standalone `lib/server/places/search.js` module is unnecessary, so the route and the Google call live together in the single `+server.js` file. Key is loaded from `$env/static/private` inside that same file.

## Files to add

```
voyager/src/routes/api/places/search/+server.js
voyager/.env.example
```

## Decisions (resolved)

| Question | Answer |
|---|---|
| Where it lives | `voyager/src/routes/api/places/search/+server.js` |
| Key loading | `$env/static/private` (`GOOGLE_PLACES_API_KEY`) |
| HTTP method | POST |
| Input | JSON `{ query: string }` |
| Output | JSON `{ places: [...] }` |
| Errors | Non-OK from Google → 500 with body in message; missing/empty query → 400 |

## Implementation

```js
// voyager/src/routes/api/places/search/+server.js
import { json, error } from '@sveltejs/kit';
import { GOOGLE_PLACES_API_KEY } from '$env/static/private';

const ENDPOINT = 'https://places.googleapis.com/v1/places:searchText';
const FIELD_MASK = 'places.displayName,places.formattedAddress,places.rating';

export async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    error(400, 'invalid JSON body');
  }

  const query = body?.query;
  if (!query || typeof query !== 'string' || !query.trim()) {
    error(400, 'query required');
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-Api-FieldMask': FIELD_MASK
    },
    body: JSON.stringify({
      textQuery: query.trim(),
      maxResultCount: 5
    })
  });

  if (!response.ok) {
    const text = await response.text();
    error(500, `Places API ${response.status}: ${text}`);
  }

  const data = await response.json();
  return json({ places: data.places ?? [] });
}
```

## `.env.example`

```
GOOGLE_PLACES_API_KEY=replace-me
```

(`.env` is already gitignored via `voyager/.gitignore`.)

## Validation Steps

1. `cd voyager && echo "GOOGLE_PLACES_API_KEY=<real-key>" > .env`.
2. `npm run dev`.
3. `curl -X POST http://localhost:5173/api/places/search -H 'Content-Type: application/json' -d '{"query":"hotels near the beach in barbados"}'` → `{"places":[...]}`.
4. `curl -X POST ... -d '{}'` → 400 `query required`.
5. Bad key → 500 with `Places API 403: ...`.
6. `npx svelte-check` → 0 errors, 0 warnings.
7. `npm run build && grep -r GOOGLE_PLACES_API_KEY .svelte-kit/output/client` → empty.

## Risks

- `$env/static/private` reads at startup — key rotation needs restart.
- Field mask tight on purpose; widening raises per-request cost.

## Out of Scope

- Separate `lib/server/places/search.js` module, UI, store, chat-page wiring, caching, retry, rate limiting, auth.