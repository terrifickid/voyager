# Fix: `PayCheckoutCard` effect loop + log spam

## Root cause (one paragraph)

`src/lib/components/PayCheckoutCard.svelte:31-73` writes `provider` from inside an `$effect` that also reads `provider` on line 49. Combined with `rankQuotes()` returning fresh objects on every derivation, the effect re-runs forever → `effect_update_depth_exceeded`. The `JOB_START` debug log fires on every iteration, which is the "spam" you're seeing.

## Change

**File:** `voyager/src/lib/components/PayCheckoutCard.svelte`

1. Add `import { untrack } from 'svelte';` to the script block.
2. Inside the `$effect`, wrap the `provider?.node?.name` read in `untrack(...)` so writing `provider` doesn't re-trigger the effect.
3. Change the guard from `next !== provider` to `next.node.name !== untrackedName` (compare by node name, not object identity, since `rankQuotes` returns fresh objects).
4. Delete the `componentLog.debug({ type: EVENT.JOB_START, step: 'paycard:reconcile-provider' }, 'Reconciling provider')` line at the top of the effect — it's the spam and is now redundant.

Keep everything else from the previous plan: the `try/catch` around the effect body, the `RENDER_ERROR` log on throw, the `USER_ACTION` auto-select info log, the global `window.onerror`/`onunhandledrejection` handlers in `+layout.svelte`, and the `EVENT.USER_ACTION` / `EVENT.RENDER_ERROR` vocab additions.

## Validation

- `cd voyager && npm run build` — no new warnings.
- Open `/`, click each currency — exactly **one** `paycard:auto-select-provider` info log per click (only when the auto-pick actually changes the node). No `effect_update_depth_exceeded` in console.
- Click a provider — no reconcile log fires.
- `grep -RIn "console\\.\\(log\\|warn\\|error\\)" voyager/src/lib/components/PayCheckoutCard.svelte voyager/src/routes/+layout.svelte` returns nothing.

## Done = no loop, no spam debug, existing logs still work.
