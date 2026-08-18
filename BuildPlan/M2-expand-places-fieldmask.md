# M2 — Expand Google Places FieldMask

## Goal
Widen the `X-Goog-Api-FieldMask` header on the existing places search endpoint so we get `id`, `location`, and `priceLevel` alongside the existing fields.

## Files Touched
- `src/routes/api/places/search/+server.js` (only)

## Preconditions
M1 passed.

## Changes

In `src/routes/api/places/search/+server.js`, replace the existing `X-Goog-Api-FieldMask` value with:

```
places.displayName,places.formattedAddress,places.rating,places.id,places.location,places.priceLevel
```

Everything else in the file stays the same.

## Validation Gate

1. `npm run dev` still boots.
2. With a valid `GOOGLE_PLACES_API_KEY` in `.env`:
   ```
   curl -X POST http://localhost:5173/api/places/search \
     -H 'Content-Type: application/json' \
     -d '{"query":"coffee in Tokyo"}'
   ```
3. Response JSON has `places[*]` where each place includes `displayName`, `formattedAddress`, `rating`, `id`, `location`, `priceLevel`.
4. (If the API key is missing or invalid, the endpoint still returns the same shape as before — `{places: []}` — and does not crash the app.)

## Rollback
Revert the FieldMask string to the original.

## Commit Message
`M2: expand places search FieldMask with id, location, priceLevel`

## Pass Criteria
Gate items 1–3 succeed (or gate item 4 is acceptable in environments without a Google key). Proceed to M3.