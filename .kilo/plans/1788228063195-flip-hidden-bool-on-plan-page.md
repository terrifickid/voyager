# Plan: fix /plan page showing empty itinerary, hiding the wizard

## What broke

After the last implementation pass, `/plan` always renders the **empty submitted-state section** ("Your itinerary" / "Nothing yet") instead of the wizard. The user sees:

```
› Plan › Your trip › Your itinerary › Edit my answers
Demo build. Generated from local fixtures on your device.
Nothing yet. Answer the prompts and submit to see your plan.
```

No form, no wizard. The "Edit my answers" button is also live even though the user never submitted.

## Root cause

In `/workspaces/voyager/voyager/src/routes/plan/+page.svelte` lines 93–97, the previous edit replaced the `{#if !submitted}` / `{:else}` toggle with two siblings:

```svelte
<div class="…" class:hidden={!submitted}>
  <PlanTripWizard {onFinish} hidden={!submitted} />
</div>

<section class="…" class:hidden={submitted}>
  … itinerary content …
</section>
```

`submitted` is initialized to `false`, so:

1. The wizard wrapper has `class:hidden` → it gets Tailwind's `display:none` (`.hidden` = `display:none`). **The wizard is hidden.**
2. The itinerary `<section>` is **not** hidden, because `class:hidden={submitted}` evaluates to `class:hidden={false}`.

So the user sees the itinerary section on first visit, and never the wizard. The wizard *is* mounted (which is the whole point of the previous fix), but it's `display:none`.

The wrapper `<div class="mx-auto max-w-6xl …">` has `class:hidden={!submitted}` — that's what hides it. Same bug class on both wrappers: `class:hidden={false}` strips the `hidden` class, which is the correct behaviour, but `class:hidden={true}` adds it. With `submitted = false`, the wizard wrapper *gets* `.hidden`. So the wizard is hidden from the very first render and the user can never interact with it.

## What needs to change

Flip the visibility logic so the wizard is visible when `submitted === false`:

- Wizard wrapper: `class:hidden={submitted}` (hidden only after submit).
- Itinerary section: `class:hidden={!submitted}` (hidden until submit).

Also pass `hidden={submitted}` (instead of `hidden={!submitted}`) to `<PlanTripWizard>`, so the wizard's own `class:hidden` on its root `<div>` matches the parent wrapper — both apply the `hidden` class when the user has submitted and is viewing the itinerary. That keeps the wizard fully hidden in two places (parent + child) after submit, which is what we want.

The wizard component already implements `class:hidden` on its root `<div>` based on its `hidden` prop (added in the previous pass at `voyager/src/lib/components/PlanTripWizard.svelte:11`, root div ~line 416). No change needed there.

## Affected files

- `voyager/src/routes/plan/+page.svelte` lines 93–97 — two `class:hidden` expressions and one `hidden` prop value, all flipped.

## Edit details

```svelte
<div class="mx-auto max-w-6xl px-6 pt-16 pb-24" class:hidden={submitted}>
  <PlanTripWizard {onFinish} hidden={submitted} />
</div>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-24 flex flex-col gap-12" class:hidden={!submitted}>
```

That's the entire fix.

## Validation

1. `cd /workspaces/voyager/voyager && npm run build` — must compile cleanly.
2. Hard-reload `/plan` (Cmd-Shift-R). Expect: wizard form visible on first visit; "Your itinerary" section hidden.
3. Fill the wizard → Finish. Expect: wizard hides, itinerary section appears with concept + days.
4. Click "Edit my answers". Expect: wizard reappears, itinerary section hides. **Crucially: wizard state should be preserved** (this was the whole point of removing the unmount/remount). Verify by editing a field and finishing again — no `reportAllChanges` / `startTime` crash in devtools.
5. Open devtools console. Confirm exactly one `plan:mount` breadcrumb per navigation (not per submit/edit cycle), and zero `RENDER_GUARD` / `EFFECT_LOOP` warnings.

## Out of scope

- The `$effect` in `PlanTripWizard` that seeds `draft` from the user store still fires once on mount and writes into `draft` properties. That is intentional (it's the deferred seed) and not part of this bug.
- Any other route. The same `class:hidden` antipattern does not exist elsewhere (grep-verified during the previous pass).
