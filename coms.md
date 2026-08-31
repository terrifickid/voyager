{
"rubric_id": "clear-communication",
"version": "0.1",
"class": "clear written communication (prose, documents, interfaces, AI responses)",
"intended_use": "evaluate | generate",
"scope_notes": "Lean scope (7 source files). Built from Shannon-Weaver, Grice, Jakobson, Schramm-Osgood, Cognitive Load (Miller/Sweller), Plain Language (US Federal), WCAG 2.2 Understandable. Not validated on held-out artifacts; treat as v0.1.",
"criteria": [
{
"id": "C1",
"name": "Function declaration",
"what_it_checks": "The reader can identify what kind of message this is (informational, instructional, expressive, phatic, definitional, rhetorical) within the first 1-2 sentences.",
"observable": "Within first 100 words: explicit purpose statement OR recognizable genre markers (imperative verb + action = conative; definition pattern = metalingual; declarative about world = referential).",
"weight": 0.10,
"source": ["Jakobson 1960", "WCAG 3.2.3"],
"levels": [
{"score": 4, "label": "Excellent", "descriptor": "Function is named or made unmistakable in the first sentence; the reader never has to guess whether to read for action, information, or entertainment."},
{"score": 3, "label": "Good", "descriptor": "Function is recognizable from the opening without being explicitly named; reader infers correctly."},
{"score": 2, "label": "Developing", "descriptor": "Function becomes clear only after the reader processes 1-2 paragraphs; some risk of misallocation of attention."},
{"score": 1, "label": "Poor", "descriptor": "Function is ambiguous or mis-signalled; reader likely to interpret the message under the wrong register."}
],
"generation_rule": "Lead with a sentence that names what the message is and what the reader should do with it (if anything).",
"pitfalls": [
"Burying a directive inside descriptive prose",
"Starting with context the reader does not yet need",
"Genre confusion: a how-to that reads like an essay"
]
},
{
"id": "C2",
"name": "Quantity (informational fit)",
"what_it_checks": "The amount of information matches what the reader needs to act or understand — neither too little nor too much.",
"observable": "Counted: each paragraph carries information the reader cannot get elsewhere in the message; no two paragraphs make the same point; no required information is missing.",
"weight": 0.18,
"source": ["Grice 1975 — Quantity maxim", "Shannon-Weaver redundancy concept"],
"levels": [
{"score": 4, "label": "Excellent", "descriptor": "Every sentence carries weight; no padding, no missing prerequisites. Reader cannot remove a sentence without losing something."},
{"score": 3, "label": "Good", "descriptor": "Minor redundancy (<15% of content restates earlier points) or minor gaps (1-2 implied steps)."},
{"score": 2, "label": "Developing", "descriptor": "Noticeable padding OR noticeable gaps; reader can compensate but with effort."},
{"score": 1, "label": "Poor", "descriptor": "Heavy redundancy (restating the same point >2x) or missing information the reader cannot reconstruct (unexplained jargon, dropped references)."}
],
"generation_rule": "Cut any sentence whose content appears earlier. Add any sentence whose absence leaves the reader unable to act or understand.",
"pitfalls": [
"Repeating the thesis in the introduction, conclusion, and topic sentences",
"Omitting a step because 'it's obvious'",
"Hedging by restating the same claim in weaker language"
]
},
{
"id": "C3",
"name": "Quality (truth + evidence)",
"what_it_checks": "Every claim is accurate and either evidentially supported or appropriately framed as opinion/speculation.",
"observable": "Counted: factual claims either cite a source or are framed as belief/hypothesis; no statements the writer should know are false; numbers match sources.",
"weight": 0.18,
"source": ["Grice 1975 — Quality maxim", "Plain Language — PLAIN"],
"levels": [
{"score": 4, "label": "Excellent", "descriptor": "All factual claims are correct and either sourced or self-evident; speculation is explicitly labeled; no false implications."},
{"score": 3, "label": "Good", "descriptor": "Factual claims are accurate; one or two lack explicit sourcing but are reasonable inferences."},
{"score": 2, "label": "Developing", "descriptor": "Some unsupported claims that the reader cannot verify, OR one factual error, OR hedging where certainty was warranted."},
{"score": 1, "label": "Poor", "descriptor": "Multiple factual errors, fabricated numbers, or claims presented as fact that the writer should know are wrong."}
],
"generation_rule": "Every factual claim: (a) cite a source, (b) mark as opinion/inference, or (c) remove it.",
"pitfalls": [
"Unsourced statistics",
"Confident claims about contested topics presented as settled",
"Sycophantic agreement with the reader's framing when evidence is mixed"
]
},
{
"id": "C4",
"name": "Manner (clarity of expression)",
"what_it_checks": "The words and sentence structures the writer chose can be decoded by the intended reader without ambiguity.",
"observable": "Counted: average sentence length <20 words (plain-language target); jargon is defined at first use; pronouns have unambiguous referents; one main idea per sentence.",
"weight": 0.20,
"source": ["Grice 1975 — Manner maxim", "PLAIN", "WCAG 3.1.3-3.1.5"],
"levels": [
{"score": 4, "label": "Excellent", "descriptor": "Vocabulary matches audience; all jargon defined; all pronouns unambiguous; sentences average <20 words; no passive-voice chains that obscure the actor."},
{"score": 3, "label": "Good", "descriptor": "1-3 jargon terms undefined (but inferable) OR 1-2 ambiguous pronouns OR a few sentences >30 words."},
{"score": 2, "label": "Developing", "descriptor": "Multiple undefined terms OR multiple ambiguous references OR consistent long sentences that force re-reading."},
{"score": 1, "label": "Poor", "descriptor": "Vocabulary mismatched to audience (e.g., academic register for general reader), hidden verbs ('conduct an investigation of'), or sentences the reader must read twice."}
],
"generation_rule": "Use the simplest word that carries the meaning. Define jargon at first use, then use it. One main idea per sentence. Subject-verb-object order.",
"pitfalls": [
"Latinate vocabulary where Anglo-Saxon will do ('utilize' vs 'use')",
"Nominalizations that hide the verb ('make a determination' vs 'decide')",
"Pronouns with multiple possible referents"
]
},
{
"id": "C5",
"name": "Relation (relevance)",
"what_it_checks": "Every part of the message bears on the declared function and audience; digressions are absent or clearly marked.",
"observable": "Counted: no off-topic paragraphs OR every digression is flagged as such (e.g., 'an aside: ...'). Tangential context <10% of total length.",
"weight": 0.10,
"source": ["Grice 1975 — Relation maxim"],
"levels": [
{"score": 4, "label": "Excellent", "descriptor": "Every paragraph directly serves the message's function; tangents are absent or explicitly bracketed."},
{"score": 3, "label": "Good", "descriptor": "One or two brief tangents that don't impede the reader's progress."},
{"score": 2, "label": "Developing", "descriptor": "Multiple paragraphs that require the reader to bridge back to the main argument."},
{"score": 1, "label": "Poor", "descriptor": "Substantial off-topic content; the reader must hold the main thread in working memory across long stretches of irrelevant material."}
],
"generation_rule": "If a paragraph doesn't serve the function named in C1, cut it or flag it as 'aside.'",
"pitfalls": [
"Extended autobiographical or anecdotal preambles",
"Meta-commentary about the message itself ('In this section, we will...')",
"Tangents triggered by association rather than necessity"
]
},
{
"id": "C6",
"name": "Structure & navigational predictability",
"what_it_checks": "The reader can locate any part of the message, know how far they have to go, and predict where to find what they need.",
"observable": "Counted: headings match the body's actual organization; one idea per paragraph; lists are used for parallel items; the conclusion or call-to-action is findable; navigation patterns are consistent across sections.",
"weight": 0.14,
"source": ["Schramm 1954", "WCAG 3.2.3-3.2.4", "Cognitive Load Theory"],
"levels": [
{"score": 4, "label": "Excellent", "descriptor": "Headings accurately preview content; paragraph boundaries align with idea boundaries; lists parallel in structure; conclusion/CTA discoverable in <10 seconds."},
{"score": 3, "label": "Good", "descriptor": "Structure mostly predictable; one or two headings that overpromise or under-deliver."},
{"score": 2, "label": "Developing", "descriptor": "Headings missing, misleading, or inconsistent; long unbroken paragraphs (300+ words); lists mixed with prose unpredictably."},
{"score": 1, "label": "Poor", "descriptor": "No headings or headings that contradict the body; wall-of-text layout; reader cannot skim and cannot predict where to find what they need."}
],
"generation_rule": "One heading per major idea. One paragraph per sub-idea. Parallel structure within lists. Conclusion/CTA findable without reading the whole message.",
"pitfalls": [
"Decorative headings that don't match content",
"Sections of unequal length with no reason",
"Conclusion that introduces new material instead of synthesizing"
]
},
{
"id": "C7",
"name": "Working-memory load (extraneous load minimization)",
"what_it_checks": "The message respects the reader's working-memory limits — number of new chunks held simultaneously stays small.",
"observable": "Counted: at most 2-3 new (undefined) terms per paragraph; no paragraph requires holding more than ~4 prior concepts; chunking aids (lists, tables, headings) used where parallel items appear.",
"weight": 0.10,
"source": ["Miller 1956", "Sweller 1988", "PLAIN"],
"levels": [
{"score": 4, "label": "Excellent", "descriptor": "Reader never has to hold more than 3-4 unfamiliar items at once; chunking aids present where needed; new vocabulary defined immediately."},
{"score": 3, "label": "Good", "descriptor": "Occasional dense paragraphs (4-5 new items at once) that the reader can parse with effort."},
{"score": 2, "label": "Developing", "descriptor": "Multiple paragraphs requiring the reader to hold 5+ unfamiliar items simultaneously; no chunking aids."},
{"score": 1, "label": "Poor", "descriptor": "Systematic working-memory overload — long sentences with multiple new concepts, nested clauses, no visual grouping; reader cannot parse without re-reading."}
],
"generation_rule": "Limit new (undefined) terms to 2-3 per paragraph. Use lists and tables for parallel items. Front-load the conclusion so the reader can off-load the main idea early.",
"pitfalls": [
"Acronym stacks: 'The QMS RPO coordinates with the ERM BCP for...'",
"Long compound sentences with embedded definitions",
"Tables or lists avoided because prose 'flows better'"
]
}
],
"Theme_Tips_summary": [
{
"theme": "Function first — name what the message is",
"tips": [
"Lead with a one-sentence statement of what the reader should know or do",
"If the message has multiple functions, name them in order",
"Match the opening register to the function (imperative for conative; declarative for referential)"
]
},
{
"theme": "Quantity — say enough, no more, no less",
"tips": [
"Cut any sentence that repeats earlier content",
"Add any sentence whose absence leaves the reader unable to act",
"Hedging is not the same as adding information; don't multiply weak restatements"
]
},
{
"theme": "Quality — sourced or flagged",
"tips": [
"Cite a source for every factual claim, or label it as inference/opinion",
"Numerical claims: double-check before publication",
"If you're not sure, say so explicitly — readers recover from uncertainty faster than from false confidence"
]
},
{
"theme": "Manner — say it in the simplest words that carry the meaning",
"tips": [
"Use the audience's vocabulary; define jargon at first use, then use the short form",
"One main idea per sentence; subject-verb-object order",
"Active voice by default; passive only when the actor is unknown or unimportant"
]
},
{
"theme": "Relation — every paragraph earns its place",
"tips": [
"If a paragraph doesn't serve the named function, cut it or bracket it as an aside",
"Tangents are okay if they are flagged",
"Don't let associative connections drag the message off-target"
]
},
{
"theme": "Structure — predictable and skimmable",
"tips": [
"Headings accurately preview the content beneath them",
"One idea per paragraph; one paragraph per idea",
"Lists for parallel items; prose for connected reasoning",
"Conclusion findable without reading the whole message"
]
},
{
"theme": "Cognitive load — respect working-memory limits",
"tips": [
"2-3 new (undefined) terms per paragraph, maximum",
"Front-load the conclusion so the reader can off-load the main idea early",
"Use tables, lists, and chunking aids for parallel or dense content",
"Re-state a key concept in different words if the reader is likely to lose it"
]
}
],
"scoring_notes": {
"scale": "4-level (Excellent / Good / Developing / Poor)",
"rationale": "Even number; odd levels produce a catch-all middle. Mirrors UCD guidance.",
"weighting": "Weights sum to 1.00 (C2+C3+C4 are the highest-impact criteria; C1, C5, C7 are supportive). Provisional — set by the rubric author; revise after validation on held-out artifacts.",
"weight_sum_check": "0.10 + 0.18 + 0.18 + 0.20 + 0.10 + 0.14 + 0.10",
"weight_sum_actual": 1.00
},
"validation_status": {
"calibrated_on_held_out": false,
"tested_on_generated": false,
"next_step": "Step 5 (CALIBRATE) per rubric-authoring pipeline: gut-sort 5-10 real artifacts, score with this rubric, find disagreements, revise."
},
"source_map": {
"C1": ["Jakobson 1960", "WCAG 3.2.3"],
"C2": ["Grice 1975 — Quantity", "Shannon-Weaver redundancy"],
"C3": ["Grice 1975 — Quality", "PLAIN"],
"C4": ["Grice 1975 — Manner", "PLAIN", "WCAG 3.1.3-3.1.5"],
"C5": ["Grice 1975 — Relation"],
"C6": ["Schramm 1954", "WCAG 3.2.3-3.2.4", "Cognitive Load Theory"],
"C7": ["Miller 1956", "Sweller 1988", "PLAIN"]
}
}

# Clear Communication Rubric — Human-Readable Version

Companion to `clear_communication_rubric.json` (the machine-readable spec).
The JSON is self-contained — a non-expert can apply it without seeing this
file. This document explains the _why_ behind each criterion and shows how
the seven research sources in `/home/tk/communications/` map onto it.

**Version:** 0.1
**Status:** Drafted from 7 canonical sources; **NOT yet calibrated** on held-
out artifacts. Treat as provisional. Per rubric-authoring Step 5 (CALIBRATE):
gut-sort 5–10 real artifacts, score with this rubric, find disagreements,
revise.

---

## Source → criterion map

| Source                            | Contributes to                                          |
| --------------------------------- | ------------------------------------------------------- |
| Shannon–Weaver (1948)             | C2 (redundancy as feature, not bug)                     |
| Grice (1975) — 4 maxims           | C2 (Quantity), C3 (Quality), C4 (Manner), C5 (Relation) |
| Jakobson (1960) — 6 functions     | C1 (Function declaration)                               |
| Schramm–Osgood (1954)             | C6 (Structure & predictability)                         |
| Miller (1956) + Sweller (1988)    | C7 (Cognitive load)                                     |
| Plain Language Act (2010) + PLAIN | C3, C4, C7 (operational rules)                          |
| WCAG 2.2 Understandable           | C1, C4, C6 (testable success criteria)                  |

The seven criteria are essentially the union of these sources, deduplicated.

---

## The seven criteria

### C1 — Function declaration (weight 0.10)

_What Jakobson calls: which of the six functions is this message performing?_

The reader should be able to tell within the first 1–2 sentences what kind
of message this is: is it telling them something (referential), asking them
to do something (conative), explaining a word (metalingual), maintaining
contact (phatic), expressing feelings (emotive), or being valued for its
form (poetic)? If they can't tell, they'll read it under the wrong register
and almost certainly misunderstand.

This criterion is the _front door_ of the rubric — if it fails, every
later criterion becomes harder to satisfy because the reader's attention
is misallocated.

### C2 — Quantity: informational fit (weight 0.18)

_What Grice calls: "Make your contribution as informative as is required,
and no more informative than is required."_

Two failure modes here:

- **Too little:** the reader can't act or understand because prerequisites
  are missing.
- **Too much:** the message carries padding, restatement, or tangential
  context that the reader has to wade through to find the substance.

Plain-language movement's strongest finding: government documents regularly
fail Quantity by a factor of 2–3x (you can cut a third of the words without
losing any information).

### C3 — Quality: truth + evidence (weight 0.18)

_What Grice calls: "Do not say what you believe to be false. Do not say
that for which you lack adequate evidence."_

Every factual claim needs one of: a source, an explicit hedge ("I think",
"arguably", "in my experience"), or removal. Numbers must match their
sources. Speculation must be labeled.

This is where AI-generated text most often fails — confident claims with
no backing. PLAIN's quality criterion in operational form.

### C4 — Manner: clarity of expression (weight 0.20)

_What Grice calls: "Avoid obscurity, avoid ambiguity, be brief, be orderly."_

This is the rubric's workhorse criterion and the one plain-language
guidance is most concentrated on:

- Short sentences (< 20 words average)
- Vocabulary matched to the audience
- Jargon defined at first use, then used
- One main idea per sentence
- Pronouns with unambiguous referents
- Active voice by default

### C5 — Relation: relevance (weight 0.10)

_What Grice calls: "Be relevant."_

Every paragraph must serve the message's declared function (C1). Tangents
are okay only if explicitly bracketed ("an aside: ...").

A common failure: the writer's associative chains are not the reader's
needs. The writer goes on a tangent because it reminded them of something;
the reader is left trying to recover the main thread.

### C6 — Structure & navigational predictability (weight 0.14)

_What Schramm calls: the conditions for successful communication (seen,
attended, understood). What WCAG calls: Consistent Navigation (3.2.3),
Consistent Identification (3.2.4)._

The reader must be able to:

- Locate any part of the message
- Know how far they have to go
- Predict where to find what they need
- Recover orientation if they skip around

Observable signals: accurate headings, one idea per paragraph, parallel
list structure, findable conclusion/CTA.

### C7 — Working-memory load (weight 0.10)

_What Miller (1956) and Sweller (1988) call: the cost of holding unfamiliar
chunks simultaneously._

Limit the number of new (undefined) terms per paragraph to 2–3. Use lists
and tables for parallel items. Front-load the conclusion so the reader can
off-load the main idea early.

A message can violate no other criterion and still fail C7 if it requires
the reader to hold 5+ unfamiliar concepts at once.

---

## Scale

4 levels (Excellent / Good / Developing / Poor). Even number per UCD
guidance — no catch-all middle.

| Level        | Meaning                                                          |
| ------------ | ---------------------------------------------------------------- |
| 4 Excellent  | A non-expert could apply the criterion and agree this is the top |
| 3 Good       | Minor flaws; reader compensates easily                           |
| 2 Developing | Notable flaws; reader compensates with effort                    |
| 1 Poor       | Fundamental flaws; reader cannot compensate                      |

## Weighting rationale

The provisional weights (sum = 1.00) reflect my judgment from the source
material, not measured contribution:

- **C2, C3, C4 are highest** (0.18, 0.18, 0.20). These are where the bulk
  of plain-language effort and Grice's maxims land.
- **C6 is mid** (0.14). Structure is necessary but rarely the sole
  failure mode.
- **C1, C5, C7 are supportive** (0.10 each). They enable the other
  criteria but a message can pass without them.

After Step 5 (calibrate on real artifacts), revise weights where the
rubric and gut-sort disagree.

---

## How to apply

### Evaluate existing prose

For each criterion C1–C7, read the artifact, decide which level (1–4) it
sits at, and weight by the criterion's weight. Aggregate = the weighted
sum. Score 3.0+ is "clear", 2.0–3.0 is "developing", <2.0 is "poor".

### Generate new prose

For each criterion, follow the `generation_rule` field in the JSON. The
Theme_Tips_summary in the JSON is the portable 2-pager.

### Both modes

Always read the `pitfalls` field — these are the failure modes the rubric
was specifically designed to catch.

---

## What's NOT in this rubric (and why)

- **Visual design / typography.** Handled in your visual-design rubric
  family. Clear communication in _what you say_ is what this rubric covers;
  clear communication in _how it looks_ is separate.
- **Audience-specific calibration.** This rubric assumes a general adult
  reader. For technical-audience writing, C4 (manner) and C7 (load) relax;
  for low-literacy audiences, they tighten.
- **Genre-specific rules.** Different genres (poetry, legal argument, jokes)
  intentionally violate several criteria. Apply the rubric only to the
  genres for which it is calibrated — informational, instructional,
  referential, conative prose.

---

## Next steps (per rubric-authoring pipeline)

1. **CALIBRATE** — gut-sort 5–10 real artifacts, score with this rubric,
   find disagreements, revise.
2. **VALIDATE** — test on held-out artifacts. Confirm known-good scores
   high, known-bad low.
3. **FREEZE** — when stable, set version 1.0. Re-validate periodically;
   rubrics drift.
