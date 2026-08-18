# Simplify Preferences Page Display

## Problem
`src/lib/components/TravelFormPrefs.svelte` ships a ~200-line scoped `<style>` block with hard-coded custom CSS (`color: #1a1a1a`, `#666`, `#e3e3e3`, etc.). The site shell in `src/routes/+layout.svelte` renders on `bg-slate-950` with `text-slate-100`, but `.wrap { color: #1a1a1a }` overrides inheritance — so labels, help text, archetype descriptions, tag pills, budget buttons, and trait names render near-black on near-black and are illegible. The component also looks "complicated" because every section is wrapped in a heavy `<fieldset>` box with a duplicated `<legend>` + `<p class="help">` header, and there's a `<details>` block dumping live JSON for debugging. The user wants Tailwind CSS used instead of the custom scoped styles.

## Goal
Make the Preferences page legible, visually simpler, and consistent with the rest of the app — using **Tailwind utility classes only**, with no scoped `<style>` block. **No functional changes**: same props, same `CONFIG`, same `$state`/`$derived`/`$effect` logic, same `onchange` payload, same `bind:group`/`bind:value` wiring, same config-driven rendering.

## Decisions
- **Drop the scoped `<style>` block entirely.** Replace all custom CSS with Tailwind utility classes inline in the markup. Tailwind is already loaded globally via `./layout.css` in `+layout.svelte`, so no config changes are needed.
- **Hide native radio/checkbox inputs with `class="hidden"`** (replacing `.arch input { display: none }` / `.tag input { display: none }` from the old CSS).
- **Remove the `<details>` JSON debug panel** from the rendered output. The `snapshot` `$derived` and the `$effect` that calls `onchange` stay intact — the snapshot is only emitted via the callback, not displayed.
- **Keep all five sections** (Archetype, Tag groups, Budget, Note, Live personality), but **drop the `<fieldset>` boxes**. Each section becomes: a small heading (`<h2>`), an optional muted help line, then the controls. Sections separated by spacing, not borders.
- **Color palette** uses the project's existing slate scale so it sits on `bg-slate-950` cleanly:
  - Default text: `text-slate-100`
  - Muted help / descriptions: `text-slate-400`
  - Borders / tracks: `border-slate-700`, `bg-slate-700`, `bg-slate-800`
  - Selected state: `bg-blue-600 border-blue-600 text-white` (archetypes, tags, budget buttons)
  - Positive trait fill: `bg-emerald-500`; negative: `bg-amber-500` (better contrast on dark than red)
  - Personality panel surface: `bg-slate-900 border border-slate-800`
- **Out of scope**: changes to `CONFIG`, props/`onchange`, scoring math, route file, header link, and the pre-existing Svelte 5 `state_referenced_locally` warnings about `config.emptyState` (those are in the untouched `<script>`).

## Affected files
- `voyager/src/lib/components/TravelFormPrefs.svelte` — only the markup and removal of the `<style>` block. The `<script>` is untouched.

## Implementation steps
1. **Remove** the entire `<style>...</style>` block from `TravelFormPrefs.svelte`.
2. **Remove** the `<details><summary>State + payload (live JSON)</summary><pre>{JSON.stringify(snapshot, null, 2)}</pre></details>` block from the markup. The `snapshot` variable in the script is still defined and still emitted via `onchange`.
3. **Restyle the root `<main class="wrap">`** to `<main class="max-w-2xl mx-auto flex flex-col gap-8 text-slate-100">` (replaces `.wrap` rules: max-width 720 → `max-w-2xl`, dark text).
4. **Header section** — `<header>` becomes a simple stack:
   ```
   <header class="flex flex-col gap-1">
     <h1 class="text-2xl font-semibold">{config.title}</h1>
     <p class="text-slate-400">{config.subtitle}</p>
   </header>
   ```
5. **Form panel** — wrap each former `<fieldset>` in `<section class="flex flex-col gap-3">`. Drop `<fieldset>`/`<legend>`/`<p class="help">` duplication. Each section heading becomes a single `<h2 class="text-sm font-semibold uppercase tracking-wide text-slate-300">{label}</h2>` and optional help is `<p class="text-sm text-slate-400 -mt-2">{help}</p>`.
6. **Archetype radios** — each `<label class="arch">` becomes:
   ```
   <label class="flex items-center gap-3 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-500 {form.archetype === opt.id ? 'bg-blue-600/15 border-blue-500' : ''}">
     <input type="radio" name="archetype" value={opt.id} bind:group={form.archetype} class="hidden" />
     <span class="text-2xl">{opt.icon}</span>
     <span class="flex flex-col">
       <strong class="font-medium text-slate-100">{opt.label}</strong>
       <small class="text-sm text-slate-400">{opt.description}</small>
     </span>
   </label>
   ```
   Container: `<div class="grid grid-cols-1 gap-2">` (single column for readability; can become `sm:grid-cols-2` if visual space allows).
7. **Tag pills** — `<label class="tag">` becomes:
   ```
   <label class="px-3 py-1.5 rounded-full border text-sm cursor-pointer transition-colors
                   border-slate-700 text-slate-200 hover:border-slate-500
                   {form.tags.includes(opt.id) ? 'bg-blue-600 border-blue-600 text-white' : ''}">
     <input type="checkbox" value={opt.id} bind:group={form.tags} class="hidden" />
     <span>{opt.label}</span>
   </label>
   ```
   Container: `<div class="flex flex-wrap gap-2">`.
8. **Budget buttons** — `<button class="budget-btn">` becomes:
   ```
   <button type="button"
     class="flex-1 py-2 rounded-lg border text-lg tracking-widest transition-colors cursor-pointer
            border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-500
            {form.budget === level ? 'bg-blue-600 border-blue-600 text-white' : ''}"
     onclick={() => { form.budget = level; }}>
     {"$".repeat(level)}
   </button>
   ```
9. **Note textarea** — keep bind, restyle:
   ```
   <textarea bind:value={form.note} placeholder={noteField.placeholder}
     maxlength={noteField.maxLength} rows="3"
     class="w-full p-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 resize-y"></textarea>
   ```
10. **Live personality panel** — restyle the existing `<section class="personality">`:
    ```
    <section class="flex flex-col gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-300">Live personality</h2>
      {#if hasSignal}
        <p class="text-slate-200">Closest type: <strong class="font-semibold">{type.icon} {type.label}</strong></p>
        <div class="flex flex-col gap-2">
          {#each config.scoring.traits as t (t.key)}
            <div class="flex items-center gap-3 text-sm">
              <span class="w-40 shrink-0 text-slate-400">{t.display}</span>
              <span class="relative flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                <span class="absolute left-1/2 top-0 bottom-0 w-px bg-slate-500"></span>
                <span class="absolute top-0 bottom-0 {personality[t.key] < 0 ? 'bg-amber-500' : 'bg-emerald-500'} rounded-full"
                      style={fillStyle(personality[t.key])}></span>
              </span>
              <span class="w-12 text-right font-mono tabular-nums text-slate-300">{personality[t.key].toFixed(2)}</span>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-slate-400">Pick an archetype or a few tags — your type appears here in real time.</p>
      {/if}
    </section>
    ```
    The inline `style={fillStyle(...)}` (computed in `<script>`) stays as-is — Tailwind can't express dynamic percent offsets cleanly.
11. **Verify no stray references** to removed class names (`wrap`, `panel`, `arch`, `tag`, `budget`, `personality`, `traits`, `trait`, `tname`, `track`, `fill`, `score`, `muted`, `help`) remain in either the markup or the (now deleted) `<style>`.
12. **Build** — `npm run build` from `voyager/`. Expect the same pre-existing `state_referenced_locally` warnings from the unchanged script; no new warnings.

## Validation
- `npm run build` from `voyager/` succeeds.
- Manually (or via dev server `npm run dev`) on `/preferences`:
  - All headings, labels, help text, archetype descriptions, tag pill labels, and budget button text are legible on the dark `bg-slate-950` background.
  - Selecting an archetype, toggling tags, clicking a budget level, and typing in the note still update the Live personality panel and the live `type` label in real time (functional parity check — confirms nothing was lost in the markup rewrite).
  - No `<details>` debug JSON block is rendered.
  - Inspecting the page shows no `<style>` block in the component (confirms Tailwind-only).
- Report the pre-existing `state_referenced_locally` Svelte 5 warnings — they remain and are explicitly out of scope.