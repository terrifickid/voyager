# Plan: Documentation section, footer + menu link, doc blurbs on Home & Pay

## Goal

1. Add a fully written Documentation section at `/docs` with a sidebar of lessons covering Voyager's construction, rubrics (incl. generation use), Voyager Pay design, EROI, and security/incentive analysis.
2. Add a Documentation link to the footer (`Resources` column) and the main menu (`Header.svelte`).
3. Add a short blurb + CTA on the Home page (small band near the final CTA) and on the Pay page (link in the existing `Read the spec` CTA + a `Documentation` link in the EROI defense band).

## Decisions locked in with the user

- **Route structure**: `/docs` SvelteKit route with a sidebar listing lessons; each lesson is its own `/docs/<slug>` page.
- **Authoring format**: Svelte components with hand-written Tailwind markup matching the rest of the site (no mdsvex, no raw markdown files).
- **Content depth**: Full prose for every lesson, written in this work item. Structure simple → complex per lesson, but each lesson is complete.
- **Blurb placement**: Home — new band before the final CTA. Pay — change hero `Read the spec` → `Documentation` and add a `Documentation` link in the EROI defense band.

## Lesson outline (all written as Svelte pages in this PR)

Listed simple → complex. Each lesson has: eyebrow, one-paragraph plain-English intro, the body, and a "Next up" link to the next lesson. Sidebar highlights the current lesson.

1. **`/docs`** — Overview landing page. One sentence per lesson, reading order suggestion, "Start with: How Voyager plans your trip in your browser".
2. **`/docs/how-voyager-plans`** — *How Voyager plans your trip in your browser.* Plain English: Voyager is a local-first web app. WebGPU + WebLLM, no API key, the prompt assembly flow (preferences → context prompt → day schema), rubric-based ranking of place candidates. Lesson ends with "Next: What is a rubric?"
3. **`/docs/what-is-a-rubric`** — *What a rubric is.* Three parts (criteria, levels, descriptors), observable-not-opinion rule, why contrast is the engine. Draws on `Documentation/lesson.md` §1–3. Lesson ends with "Next: How rubrics evaluate and generate".
4. **`/docs/rubrics-evaluate-and-generate`** — *How rubrics evaluate and generate.* The same rubric is run two ways: as a judge (rank attempts) and as a generation rule (the `generation_rule` per criterion, the Theme-Tips summary, Auto-Rubric's Propose→Evaluate→Revise loop). Voyager uses this: the rank-quotes rubric in `lib/ramp/rankQuotes.js` scores Mostro nodes; the itinerary rubric scores candidate day plans. Lesson ends with "Next: How Voyager Pay works".
5. **`/docs/how-voyager-pay-works`** — *Voyager Pay in plain English.* The five design invariants from `routes/pay/+page.svelte` (no custody, no identity, symmetric counterparties, outlives the operator, Lightning for settlement). The three layers (wallets, reference clients, wire format) and how a payment flows in 7 steps. Lesson ends with "Next: What is EROI".
6. **`/docs/what-is-eroi`** — *EROI in plain English.* Energy Return On Investment applied to attackers, not oil wells. `extractor_EROI = deliverable_surplus / capture_cost`. The three knobs (Fan-out, Opacity, Binding) and what each one does to the formula. Lesson ends with "Next: Why any capturable system invites capture".
7. **`/docs/why-systems-get-captured`** — *Why a capturable system invites capture, and how reducing EROI makes the crime not worth the squeeze.* The natural-incentive argument: any system that concentrates value in one place and is visible/seizable produces an EROI ≥ 1 attacker budget; defenders lose the economics war. The structural answer is to push the extractor's EROI below 1 by raising find / reach / hold / move cost, not by adding alarms after the fact. Concrete analogies (cash in a vault vs. cash spread across many low-denomination wallets; bearer bond vs. relationship-bound contract). Lesson ends with "Next: Voyager Pay's EROI audit".
8. **`/docs/voyager-pay-eroi-audit`** — *How Voyager Pay satisfies the EROI rubric.* Walks the `routes/pay/+page.svelte` §11 EROI defense mapping and the spec's §11 table: Fan-out via relay + Mostro federation; Opacity via NIP-17 gift-wrapped DMs and pseudonymous keypairs; Binding via HODL invoices and atomic settlement. Score profile (3, 3, 3) and what each knob's score would have to drop to before the system becomes capturable. Lesson ends with "Next: What's still risky".
9. **`/docs/what-can-still-go-wrong`** — *Threat shake-out: what can still go wrong.* The residual risks table from `routes/pay/+page.svelte` §12 (fiat rail reversal, sybil reputation, relay capture, operator rug), each explained in one short paragraph with the structural mitigation and the honest limits. The "out of scope" list (identity, arbitration, FX). Lesson ends with "Back to overview".

## File-level changes

### New files (all under `voyager/src/routes/docs/`)

```
docs/+layout.svelte            # Sidebar + content wrapper; reuses tokens/layout.css
docs/+page.svelte              # Overview landing — eyebrow "Documentation", intro, lesson list with descriptions
docs/how-voyager-plans/+page.svelte
docs/what-is-a-rubric/+page.svelte
docs/rubrics-evaluate-and-generate/+page.svelte
docs/how-voyager-pay-works/+page.svelte
docs/what-is-eroi/+page.svelte
docs/why-systems-get-captured/+page.svelte
docs/voyager-pay-eroi-audit/+page.svelte
docs/what-can-still-go-wrong/+page.svelte
```

Optional shared component (only if the lesson list is reused on the overview and sidebar):
```
src/lib/components/DocLessonList.svelte
```

### Edited files

- `voyager/src/lib/components/Header.svelte`
  - Add `{ href: '/docs', label: 'Docs', exact: true }` to the `links` array (last entry).
- `voyager/src/lib/components/Footer.svelte`
  - Add `{ label: 'Documentation', href: '/docs' }` as the first link in the existing `Resources` column.
- `voyager/src/routes/+page.svelte` (Home)
  - Insert a new `<section>` between section 9 (Testimonials) and section 10 (Final CTA). Same `mx-auto max-w-6xl px-6 pb-24` wrapper, rounded-32 bone-100 surface. Eyebrow "Documentation", h2 "Read the spec behind Voyager Pay.", 1-paragraph blurb explaining docs cover the protocol, the rubrics, and the EROI reasoning. Two `<Cta>`s: primary to `/docs`, secondary to `/docs/how-voyager-pay-works`.
- `voyager/src/routes/pay/+page.svelte` (Pay)
  - In the hero (around line 26): change the existing `<Cta variant="secondary" href="#how">Read the spec</Cta>` to `<Cta variant="secondary" href="/docs">Documentation</Cta>`. Keep `<Cta variant="primary" href="#ramp">See the ramp</Cta>`.
  - In the EROI defense band (§11, around line 192): add a small inline link below the lede, e.g. `<a href="/docs/voyager-pay-eroi-audit" class="...">Read the full EROI audit ›</a>`, styled with the tertiary underline grammar from `Cta.svelte`.

### Reused, unchanged

- `lib/components/Cta.svelte` — variants `primary | secondary | tertiary` already match the brand.
- `lib/components/SectionHeader.svelte`, `lib/components/Icon.svelte` — reuse for lesson page headers and feature-style cards.
- `lib/styles/tokens.css` — bone / lime / ink tokens already in use.
- `Documentation/readme.md`, `lesson.md`, `thingrubric.md`, `rubricsmore.md`, `vp.md` — *source material only*. No edits to these files; lessons are written fresh in Svelte so the site is self-contained.

## Lesson page structure (template each lesson follows)

```
<section class="mx-auto max-w-3xl px-6 pt-20 pb-12">  <!-- title block -->
  <span class="eyebrow">{section eyebrow}</span>
  <h1 class="font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">{title}</h1>
  <p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{plain-English intro, one paragraph}</p>
</section>

<section class="mx-auto max-w-3xl px-6 pb-16">
  <div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
    <!-- lesson body: 4–8 short prose blocks + at most one inline example card -->
    <!-- use h2 (font-display text-2xl text-ink mt-6) for in-lesson section breaks -->
    <!-- callouts reuse the rounded-28 bone-100 surface pattern -->
  </div>
</section>

<section class="mx-auto max-w-3xl px-6 pb-32">
  <div class="rounded-[28px] bg-bone-100 p-8 flex items-center justify-between gap-6">
    <div>
      <span class="eyebrow">Next up</span>
      <h3 class="mt-2 font-display text-xl text-ink">{next lesson title}</h3>
      <p class="mt-2 text-sm text-ink-2">{next lesson one-liner}</p>
    </div>
    <Cta variant="primary" href={nextSlug}>Continue</Cta>
  </div>
</section>
```

`docs/+layout.svelte` will render a sticky left sidebar on `md+` viewports with the 9 lessons listed in order, current lesson highlighted with the same underline grammar as `Header.svelte`. On mobile, the sidebar collapses to a top-of-page lesson list.

## Writing guidelines (apply to every lesson)

- Plain English first sentence. No jargon before it's defined.
- Each lesson opens with a one-paragraph summary a non-engineer can read.
- All new terms are defined in the lesson they first appear in.
- Each lesson ends with one "Next up" card pointing to the next lesson in reading order.
- Source-of-truth pointers (e.g. "The full rubric is in `lib/ramp/rankQuotes.js`", "The audit table is in `routes/pay/+page.svelte` §11") are referenced inline so the docs are auditable from the site.

## Lesson content drafts (full prose to write)

The lesson body text below is the actual prose to be placed in each `.svelte` file. Tone matches the existing marketing copy: bone-warm, declarative, no hype.

### Overview `/docs`

> Voyager is built on a small number of ideas. The pages in this section walk through them in order, starting with the easiest one and adding complexity as we go. Each page is short. Read them in order, or jump straight to the one you want.
>
> **Start here:** *How Voyager plans your trip in your browser.*

Then a list of the nine lessons with a one-sentence description each.

### Lesson 1 — How Voyager plans your trip in your browser

Plain-English intro: Voyager is a regular web app that runs a small AI model directly inside your browser tab. There is no server holding your trip, no account to sign in to, and no API key to buy. You describe the trip; Voyager assembles a prompt from your preferences, asks the in-browser model to draft a day-by-day plan, and then ranks real places from a local data set against that draft.

Body covers: WebGPU + WebLLM (`src/lib/webllm/engine.svelte.js`), the preference context (`src/lib/preferences/contextPrompt.svelte.js`), the day schema (`/workspaces/voyager/daySchema`), place fixtures (`src/lib/agent/fixtures/places.json`), and the rubric that ranks place candidates. Closes with: "The rubric that ranks places is the same shape as the one we'll meet in the next lesson."

### Lesson 2 — What a rubric is

Plain-English intro: A rubric is a compressed expert. An expert can tell good from bad but can't always say why. A rubric forces the reasoning onto paper in a form anyone — or any model — can run.

Body covers: three parts (criteria / levels / descriptors), the observable-not-opinion rule, why you need contrast (good vs. bad examples) to discover criteria, and the two failure shapes (topic lists, component checklists). Short worked example using two landing-page heroes.

### Lesson 3 — How rubrics evaluate and generate

Plain-English intro: A rubric isn't just a checklist. The same rubric runs two ways: as a judge that scores attempts, and as a generation rule that tells a model how to write the next attempt. Both directions use the same `generation_rule` and `Theme-Tips` summary.

Body covers: the Auto-Rubric Propose→Evaluate→Revise loop, the rubric schema from `thingrubric.md` §3 (criteria with levels, observable, generation_rule, pitfalls), and Voyager's two concrete rubrics: the Mostro-node-ranking rubric in `src/lib/ramp/rankQuotes.js` (evaluator use) and the itinerary-quality rubric used when scoring generated day plans (generator use, via the Theme-Tips summary).

### Lesson 4 — How Voyager Pay works

Plain-English intro: Voyager Pay is an open protocol for sending money online. There is no company in the middle of a payment. There is no account to lose, no platform to deplatform you, and no KYC step at the protocol layer.

Body covers the five invariants (no custody, no identity required, customer↔vendor symmetry, protocol outlives us, payments are Lightning), the three layers (wallets / reference clients / wire format — Nostr), the seven-step payment flow (open wallet → sign order → HODL → pay fiat → confirm → settle → reputation), and the Mostro federation.

### Lesson 5 — What EROI is

Plain-English intro: EROI stands for Energy Return On Investment. We don't use it for oil wells. We use it for attackers: how much an extractor gets back for the effort they put in to take something from your system.

Body covers: `extractor_EROI = deliverable_surplus / capture_cost`, the four costs (find, reach, hold, move), and the three structural knobs — Fan-out (disperse the value), Opacity (don't advertise it), Binding (make it lose value when detached). Target profile: ≥2 on each knob on every asset class.

### Lesson 6 — Why a capturable system invites capture

Plain-English intro: Concentrated, visible, separable value is an open invitation. The moment a system has all three — the loot is in one place, an outsider can see it, and they can walk off with it — there is an EROI ≥ 1 budget waiting to be spent. The natural incentive creates the opportunity for exploitation; the only durable answer is to make the crime not worth the squeeze.

Body covers the natural-incentive argument, two analogies (cash in a vault vs. cash spread across many small wallets; a bearer bond vs. a relationship-bound contract), and the structural-vs-alarm distinction. Closes: "This is why we apply EROI as a design rubric, not as a list of threats to patch."

### Lesson 7 — How Voyager Pay satisfies the EROI rubric

Plain-English intro: Every choice in Voyager Pay's design is a pull on one of the three knobs. Here is the audit table: which design move raises which knob, and what the resulting score profile is.

Body walks the `routes/pay/+page.svelte` §11 mapping:
- Fan-out (3/3): many relays (≥4 in bootstrap), many Mostro nodes (federation), many wallets (NWC-scoped), vendor-side data storage (no central listing server).
- Opacity (3/3): NIP-17 gift-wrapped DMs (relays see nothing identifying), no KYC inside protocol, Lightning chain opaque to fiat observers.
- Binding (3/3): every meaningful action needs a local key; HODL invoices make settlement atomic with the network so the arbiter can't take sats without delivering fiat; NWC scopes are budget-bounded and revocable.
Then: "Profile (3,3,3) matches the rubric ceiling. The next lesson is where this matters most — what's still risky anyway."

### Lesson 8 — What can still go wrong

Plain-English intro: Honest enumeration. EROI < 1 against most attackers doesn't mean EROI < 1 against all of them. Here are the four residual risks and the structural mitigations Voyager Pay leans on.

Body covers, one short paragraph each: fiat rail reversal (short HODL windows + reputation-weighted limits), sybil reputation (tie reputation to a node pubkey that has settled real volume), relay capture (protocol is relay-agnostic; events republish across N operators), operator rug (HODL + short settlement cycles — worst case exposure is bounded to the sats amount). Closes with the explicit out-of-scope list: identity, arbitration, FX beyond per-node quotes, production front-end UX.

## Risks / things to watch during implementation

- **Lesson length**: keep each lesson under ~600 words of prose so the sidebar reading order stays a real reading order. If a lesson runs long, split it.
- **No editing of source markdown**: the source files under `/workspaces/voyager/Documentation/` and `vp.md` are source material only — never edited by this PR.
- **Don't break the existing pay page hero**: the `Read the spec` CTA in the pay hero currently points to `#how` (the seven-step flow on the same page). Replacing it with `/docs` is intentional — the seven-step flow stays on the page, and `Documentation` becomes the external reference. Confirm with the user if they instead want `Read the spec` kept and a new `Documentation` CTA added beside it. (Default per their answer: change the label.)
- **Sticky sidebar on small screens**: sidebar must collapse to a top-of-page lesson list on `< md` viewports. The existing layout uses Tailwind's `md:` prefix; same pattern applies.
- **No new dependencies**: the existing Tailwind + tokens + components are sufficient. No mdsvex, no MD parser.

## Out of scope (explicitly)

- Search, table-of-contents jump links, deep-linking to lesson sections.
- Code-block syntax highlighting on lesson pages (none needed for v1 prose).
- A `/docs` print stylesheet.
- Auto-generation from the markdown sources under `/workspaces/voyager/Documentation/`. Lessons are authored directly in Svelte to match the site's design language.
- Editing or moving the source files `Documentation/*.md` or `vp.md`.

## Validation

- `npm run dev` (per `voyager/package.json`): home and pay pages render with the new band / link; nav and footer show Documentation; `/docs` and each `/docs/<slug>` page renders without console errors.
- Manual click-through of every nav link and every "Next up" CTA to verify routes resolve.
- Sidebar lesson list reflects the current lesson with the same underline grammar as `Header.svelte`.