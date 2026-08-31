# How to Build a Rubric from Examples

A repeatable procedure for taking one or more example artifacts — documents,
images, code, responses, designs — and extracting the ruleset that produced
them, so you can evaluate or generate more artifacts like them.

Methodology synthesized from four sources (see `/home/tk/rubric/research/`):

1. **Auto-Rubric** (arXiv:2510.17314, 2025) — Propose-Evaluate-Revise loop +
   information-theoretic aggregation into "Theme-Tips" hierarchies. The core
   machine method.
2. **Berkeley GSI** rubric-creation guide — holistic vs. analytic trade-offs,
   sort-into-stacks technique for calibrating levels from real work.
3. **UCD "Designing Grading & Feedback Rubrics"** — criteria/standards/
   descriptors framework, descriptor-writing order, criteria quality rules.
4. **Material 3 design-tokens** — reference→semantic→component tiers, the
   vocabulary for turning visual artifacts into named, reusable rules.

Cross-cutting principle from all four: **you don't invent the rubric, you
discover it from examples** — specifically from _contrast_ (good vs. bad,
preferred vs. rejected) and _recurrence_ (what shows up across many good ones).
With a single example you infer; with contrasts you can validate.

---

## 0. Definitions

- **Criteria** — the independent dimensions you judge on (Structure, Tone,
  Visual hierarchy, Factual accuracy...). Rules for good criteria (UCD/JCU):
  _Observable_ (you can point at it), _describing qualities not components_
  ("organization" not "has a paragraph 2"), _complete_ (everything you care
  about is covered), _distinct_ (no double-jeopardy overlap), _few_ (5–9 max).
- **Standards / Levels** — the scale per criterion. Prefer an **even number
  (4 or 6)**; with odd numbers the middle becomes a catch-all. Can be numeric
  (1–4) or named (Novice/Apprentice/Practitioner/Expert).
- **Descriptors** — what each level looks like _per criterion_. This is the
  part that makes the rubric objective.
- **Rubric types**:
  - _Analytic_ — criteria × levels grid. Best for generation, feedback,
    diagnostic use. **Default for this workflow.**
  - _Holistic_ — one scale, all criteria at once. Best for quick sorting and
    for calibration passes.
  - _Single-point_ — only the "meets" descriptor per criterion; annotate how
    work deviates above/below. Best when the goal is generation from a spec.

---

## 1. Inputs — what you can start from

Listed from strongest signal to weakest:

| Input                       | Example                                | What you can extract directly                                                          |
| --------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------- |
| **Contrast set**            | good doc + bad doc, or A chosen over B | Everything: criteria, level boundaries, weights                                        |
| **Graded set**              | artifacts at known quality levels      | Criteria + descriptors per level (the best case)                                       |
| **Classified set**          | pass/fail, published/rejected          | Criteria + the threshold level                                                         |
| **One exemplar**            | a single "gold" artifact               | Inferred criteria + the "excellent" descriptors. Weakest — overfits to the one example |
| **Negative examples alone** | "here are 10 things that failed"       | Pitfall/red-flag list. Not a rubric by itself                                          |

**Rule:** never build from a lone example if you can get a second one, even
one deliberately-broken version of the same artifact. Contrast is what turns
guesses into criteria.

For **images**, run a vision analysis first to convert the image into its
objective description (layout regions, palette hex values, type scale,
spacing, density, channel/state of the artifact) — then treat that text as
the artifact. See §4.

---

## 2. The pipeline

```
COLLECT  → ANALYZE  → CONTRAST  → DRAFT  → CALIBRATE  → VALIDATE  → FREEZE
inputs     decompose   find what    analytic   sort real    test on     version the
           into dims   distinguishes grid      artifacts  new art.    schema
                       good from             into stacks
                       bad
```

### Step 1 — COLLECT.

Gather 3–10 artifacts. Ideal mix: some clearly-good, some clearly-bad, some
borderline. Label any known-quality metadata (published? graded? chosen?).

### Step 2 — ANALYZE (decompose into observable dimensions).

For each artifact, answer in plain language: _what are all the things I can
check about this without asking anyone?_ Work through three lenses:

- **Structure** — what parts are present, order, proportions, completeness.
- **Surface** — style, tone, typography, palette, formatting, mechanics.
- **Substance** — accuracy, relevance, depth, evidence, actionability.

Write each observation as an _observable, binary-ish statement_ about the
artifact: "has a summary ≤3 sentences at top", "body text contrast ≥ 4.5:1",
"every claim cites a source". These raw observations are candidate criteria.

### Step 3 — CONTRAST (the key step).

Put the best artifact beside the worst. Ask: _what is different — and which of
those differences actually explain why one is better?_ (Auto-Rubric's core
move.) Discard differences that are incidental (length alone, topic) and keep
differences that are _decision-relevant_. With graded/labeled sets, note which
differences track the known quality ordering.

If using an LLM for this (recommended with many artifacts), this is the
**Propose** step of the loop. Prompt shape:

> You are an expert rubric writer. Generate self-contained evaluation
> criteria for distinguishing the better artifact from the worse. Each
> criterion must be self-contained (a non-expert can apply it without the
> original artifacts). Cover: correctness/completeness, structure, style,
> common pitfalls. ≤ 9 criteria.
>
> ## Artifacts labeled by quality
>
> {artifact_good} … {artifact_bad}
>
> ## Which is better, and why (your own notes if any)
>
> {critic}

### Step 4 — DRAFT the analytic grid.

Consolidate the candidate criteria: merge near-duplicates (same dimension
rephrased), split compound criteria (two checks hiding in one sentence), drop
unobservable or taste-only ones. Target **5–9 criteria**.

For each criterion, write descriptors in this order (UCD): first the **top
level** (what does excellent look like, concretely), then the **bottom**
(unacceptable), then the middles. Descriptors must differ in observable ways —
never "good X" vs "very good X", always "X is present and consistent" vs "X is
present but inconsistent between sections".

Assign **weights** — but only from contrast evidence: a difference that flips
good↔bad on its own gets high weight; a difference that co-occurs with others
gets lower. If you have no contrast evidence, leave weights equal and mark
them provisional.

Group the grid into the **Theme-Tips** shape for portability:
`Theme` (the criterion, one line, necessary for ALL artifacts of this class)
→ `Tips` (specific, checkable bullets — the level descriptors as do/don't
rules, and class-specific pitfalls).

### Step 5 — CALIBRATE (sort-into-stacks).

Take more real artifacts (not the ones you designed from). Using only a
holistic gut sort, rank them. Then apply the draft rubric analytically to the
same set. Compare the two orderings:

- Where they **agree** — the rubric captures your taste. Good.
- Where they **disagree** — find the artifact, identify what you reacted to
  that the rubric missed or over-weighted, and revise. This is the
  **Evaluate→Revise** step of the loop. Repeat until disagreements are
  rare/justified.

### Step 6 — VALIDATE.

Test on artifacts you did NOT use during construction:

- _Known-good_ artifact must score high.
- _Known-bad_ must score low.
- Apply it to a _generated_ attempt (the real point of the rubric) — the
  rubric must discriminate, i.e. give actionable, different scores on
  different attempts.
  A rubric that gives everything the same score, or that a generator can max
  out by keyword-stuffing, is broken — back to Step 3.

### Step 7 — FREEZE the schema, version it.

Save the rubric in the canonical schema (§3) with a version number. Rubrics
drift with taste and with generator exploit-arms-races; re-run Step 5–6
periodically.

---

## 3. Output schema (canonical)

Store as JSON (machine) or a markdown table (human). This schema is sized so
the same rubric can drive evaluation AND generation.

```json
{
  "rubric_id": "landing-page-copy",
  "version": "0.1",
  "class": "landing page hero copy",
  "intended_use": "generate | evaluate",
  "criteria": [
    {
      "id": "C1",
      "name": "Value proposition clarity",
      "what_it_checks": "Reader can state what the product is and who it is for after the hero",
      "observable": "Single ≤20-word statement present above the fold, product-  and audience-named",
      "weight": 0.25,
      "levels": [
        {
          "score": 4,
          "label": "Excellent",
          "descriptor": "One unambiguous ≤20-word statement naming product + audience, no jargon"
        },
        {
          "score": 3,
          "label": "Good",
          "descriptor": "Statement present but vague or slightly long"
        },
        {
          "score": 2,
          "label": "Developing",
          "descriptor": "Multiple competing statements or jargon"
        },
        {
          "score": 1,
          "label": "Poor",
          "descriptor": "No discernible value statement above the fold"
        }
      ],
      "generation_rule": "Write exactly one sub-20-word statement that names the product and the audience; no buzzwords",
      "pitfalls": [
        "feature list misquerading as value prop",
        "clever-but-empty tagline"
      ]
    }
  ],
  "Theme_Tips_summary": [
    {
      "theme": "Clarity of value + audience",
      "tips": ["one statement, ≤20 words", "name the audience explicitly"]
    }
  ]
}
```

Three golden-rule requirements, from Auto-Rubric's structuring prompt:

- Every criterion is **self-contained** — a non-expert can apply it without
  seeing the source examples.
- Every descriptor describes **independent, non-contradictory** dimension.
- The whole set is internally consistent — judging by it produces a stable
  ordering across all your held-out examples.

---

## 4. Modality adapters

The pipeline is identical; only Step 1–2 differ.

### Images / UI screenshots

Convert vision → text first. Extract, in this fixed order (the Material
design-token taxonomy):

1. **Reference tokens** — raw values: palette hexes, type sizes/weights,
   spacing scale (4/8pt grid?), radii, shadows, elevation.
2. **Semantic tokens** — their roles: which hex is primary/surface/error;
   which type size is title/body/caption.
3. **Component patterns** — recurring shapes: cards, buttons, nav, their
   composition rules and states.
4. **Layout** — grid, alignment, density, whitespace budget, focal hierarchy
   (where the eye lands first).
   Then contrast best-vs-worst screenshots on exactly these four axes.

### Documents / prose

Observable axes (NN/g-flavored; see usability-ux-library if front-end):
purpose-fit, structure (headings/chunking/scannability), tone register,
sentence/paragraph length distribution, evidence density, terminology
consistency, completeness vs. the artifact's own intent.

### Code

Readability (naming, function length, comment ratio), structure (module
boundaries, patterns used), correctness signals (tests, types, error
handling), idiom (framework conventions, stdlib usage).

### AI responses (pairwise preferences)

Classic Auto-Rubric: factual accuracy, prompt-adherence (incl. format/count
demands), clarity & organization, comprehension depth, narrative/contextual
fidelity, common-pitfall avoidance. These five themes recur across nearly all
open-ended response rubrics — start from them and specialize.

---

## 5. Failure modes (check your rubric against these)

- **Component-as-criterion** ("has an introduction") → replace with the
  quality the component serves ("orients the reader to purpose & roadmap").
- **Double jeopardy** — two criteria penalize the same flaw → merge them.
- **Tautological levels** ("excellent clarity" / "good clarity") → rewrite as
  observable differences.
- **Length/form proxies** ("≥ 500 words", "uses bold") — legal rules but weak
  criteria; keep them as tips, not criteria.
- **Over-fitting to one example** — if any criterion only makes sense for the
  seed artifact, generalize or drop it (test on new artifacts!).
- **Odd number of levels with a catch-all middle** → use 4 or 6 levels.
- **Gaming surface** — criteria a generator can satisfy mechanically without
  doing the real work. Add a contrast-test step (Step 6) to catch these.
- **Unbounded rubric** — > 9 criteria or > 6 levels collapses reliability.
  Merge into a Theme with Tips.

---

## 6. Minimal worked path (30 minutes, one exemplar pair)

1. Put the good and bad artifact side by side. 10 min: list every observable
   difference. (~15–25 items)
2. 10 min: strike incidental differences; group the rest into 5–7 themes;
   write each as a criterion with top/bottom descriptors.
3. 10 min: fill middle level(s), add `generation_rule` per criterion, save as
   schema v0.1 with both source artifacts linked under the criterion's
   `evidence`.

Validate on one new artifact before trusting it.
