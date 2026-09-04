# Plan — Consolidate to one `/projects/ai` (Voyager AI)

## Goal

- Remove the standalone `/projects/ai-pay` (Voyager Pay AI Assist) route.
- Remove the standalone `/projects/nostr-ai` (In-browser Nostr AI) route.
- Rename `/projects/ai` from "Unified AI showcase" to **Voyager AI**. Keep the route path `/projects/ai`; only the visible copy changes.
- Update `/projects` overview: drop the two deleted cards, rename the remaining one, and refresh the showcase count copy.
- Keep the AI-assist injection on `/projects/voyager-pay` (uses `<PayAiAssistCard variant="compact" />`). Per user decision — it's an enhancement to voyager-pay, not a standalone project.
- Keep all reusable component code (`PayAiAssistCard`, `NostrAiAgent`, `NostrAiSearch`, `NostrAiWrite`, `NostrAiEmbed`, `AiTraceStream`, `RelayChip`) and all fixture JSON — they're still used by the unified page and the voyager-pay injection.
- Register scheme unchanged (`carnival-poster` site-wide). Same Node-style import paths. No new dependencies.

## Tasks

1. **Delete route directories**
   - `voyager/src/routes/projects/ai-pay/` (entire dir)
   - `voyager/src/routes/projects/nostr-ai/` (entire dir)

2. **Edit `/projects/ai/+page.svelte` — rename to Voyager AI**
   - `<svelte:head><title>` → `"Voyager AI — One agent across the five primitives"` (drop "Unified AI showcase").
   - Hero `eyebrow` → keep `// voyager-ai · the toolkit's intelligence layer` (already correct).
   - Hero h1 → keep `"One agent across the five primitives."` (already correct).
   - Final CTA h2 → replace `"Showcases, not products."` with something Voyager-AI–specific, e.g. `"Voyager AI. The intelligence layer your wallet and your relays share."` (TBD — pick a tight line).
   - Note in the page that Pay and Nostr mockups used to live on standalone routes — remove the now-stale copy line: `"Same component, also available as its own showcase at /projects/ai-pay."` (since that route no longer exists). Replace with something like `"Both surfaces live here, on the only Voyager AI showcase."`
   - Add the missing route label/intent: this is now THE single Voyager AI showcase.

3. **Edit `/projects/+page.svelte` — drop two cards, rename one**
   - Remove the two `<a>` cards for `/projects/ai-pay` and `/projects/nostr-ai`.
   - The remaining `voyager-ai` card: change the eyebrow from `voyager-ai` to a tighter label, and the h2 from `"Unified AI showcase"` → `"Voyager AI"`. The card copy becomes a tighter description, e.g. `"The intelligence layer across Identity, Payments, Ramp, Messaging, and Discovery. Search relays, sign listings, and parse payments — in your browser."`.
   - Top intro copy: keep `Voyager-the-business ships 5 showcases…` updated to `…ships 3 showcases…` (or whatever the new count is: Trip Planner + Voyager Pay + Voyager AI = 3). The 3-up grid stays; the two deleted cells become empty space — consider switching back to `md:grid-cols-2 lg:grid-cols-3` so the layout still looks clean with only three cards. **Decision: use the same 3-column grid; the third column is left empty.** Alternative: collapse to 2-col. Pick at execution time based on visual balance.
   - The "Two more showcase apps, ready to ship" opportunity section is unchanged — those are still opportunity cards (`voyager-stage`, `voyager-market`).

4. **Do NOT touch** `/projects/voyager-pay/+page.svelte`
   - The `<PayAiAssistCard variant="compact" />` injection between how-it-flows and the ramp stays. It's a localized enhancement of voyager-pay and the user explicitly chose to keep it.

5. **Do NOT touch** any reusable component or fixture JSON
   - `PayAiAssistCard.svelte`, `NostrAiAgent.svelte`, `NostrAiSearch.svelte`, `NostrAiWrite.svelte`, `NostrAiEmbed.svelte`, `AiTraceStream.svelte`, `RelayChip.svelte` — all still used.
   - `aiIntents.json`, `aiMarketplace.json`, `aiEmbedSnippet.json`, `aiRelays.json` — all still used.
   - `mostroNodes.json` — still used by PayAiAssistCard's Mostro ranking.

## Files affected

```
voyager/src/routes/projects/ai-pay/                DELETE (entire dir)
voyager/src/routes/projects/nostr-ai/              DELETE (entire dir)
voyager/src/routes/projects/ai/+page.svelte        EDIT (rename, drop stale cross-link)
voyager/src/routes/projects/+page.svelte           EDIT (drop two cards, rename one, update count copy)
```

## Files explicitly NOT affected

- `/projects/voyager-pay/+page.svelte` — injection stays.
- Any `src/lib/components/*.svelte` AI component — keep all.
- Any `src/lib/data/ai*.json` — keep all.

## Risks & decisions

- **Stale internal links**: nothing on the live site links to `/projects/ai-pay` or `/projects/nostr-ai` outside of the two places we're editing (the route files themselves + the `/projects` overview cards). No `Header`/`Footer`/TOC references these routes. After deletion there will be no 404-causing anchors.
- **"5 showcases" → "3 showcases"**: the original count-3 plan added two new showcases; we're now consolidating to one net new showcase (the unified Voyager AI), so the count is trip-planner + voyager-pay + voyager-ai = 3.
- **Grid layout**: with three cards in a `md:grid-cols-2 lg:grid-cols-3` grid, all three slots are filled exactly. This is the cleanest outcome and avoids a deliberate empty cell.
- **Page rename semantics**: only the user-facing label changes; the route stays `/projects/ai`. No redirects needed (no historical `/projects/ai` was ever `unified-ai`).
- **Standalone `/projects/ai-pay` content**: the showcase content there (hero, parse demo, privacy grid, F=3 O=3 B=3 mini-explainer) is not migrated into `/projects/ai` — the unified page already carries a `<PayAiAssistCard variant="full" />` block. We do NOT duplicate the privacy grid or the F=3 O=3 B=3 mini-explainer into the unified page.

## Validation

- `npm run build` from `/workspaces/voyager/voyager` — clean.
- `grep -rE "bg-(bone|ink)|text-(ink|bone|muted)" src/routes/projects/ai/+page.svelte src/routes/projects/+page.svelte` — no hardcoded color classes.
- Internal navigation: `/projects → /projects/ai → CTA → /projects` round-trip works; no broken in-page anchors.
- No component import lines reference the deleted routes.
