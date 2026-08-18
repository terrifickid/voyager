# M7 — Implement Places Client

## Goal
Replace `searchPlaces` stub with a thin client that POSTs to `/api/places/search` and normalizes the response into a clean `Place[]` shape.

## Files Touched
- `src/lib/agent/placesClient.js` (only)

## Preconditions
M6 passed.

## Changes

Replace `src/lib/agent/placesClient.js` with:

```js
export async function searchPlaces(query) {
  if (typeof query !== 'string' || query.trim().length === 0) return [];
  try {
    const res = await fetch('/api/places/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query.trim() })
    });
    if (!res.ok) return [];
    const data = await res.json();
    const places = Array.isArray(data?.places) ? data.places : [];
    return places.map((p) => ({
      id: p.id ?? null,
      name: p.displayName?.text ?? p.displayName ?? '',
      address: p.formattedAddress ?? '',
      rating: typeof p.rating === 'number' ? p.rating : null,
      location: p.location ?? null,
      priceLevel: p.priceLevel ?? null
    }));
  } catch {
    return [];
  }
}
```

## Validation Gate

1. `npm run dev` boots.
2. With `GOOGLE_PLACES_API_KEY` valid in `.env`:
   ```js
   import('/src/lib/agent/placesClient.js').then(m => m.searchPlaces('coffee in Tokyo').then(console.log));
   ```
   Output: array of objects each having keys `name`, `address`, `rating`, `id`, `location`, `priceLevel`. May be empty array if Google returns nothing or key invalid.
3. `m.searchPlaces('')` returns `[]`.
4. `m.searchPlaces(null)` returns `[]`.
5. `m.searchPlaces('   ')` returns `[]`.

## Rollback
Revert `src/lib/agent/placesClient.js` to its M3 stub.

## Commit Message
`M7: implement searchPlaces client wrapping /api/places/search`

## Pass Criteria
Gate items 1–5 pass (item 2 may legitimately return `[]` in environments without an API key). Proceed to M8.