# Lesson: Why Rubrics Work, and How to Build Ones That Work

A companion to RUBRIC_FROM_EXAMPLES.md. That file is the procedure; this one
is the reasoning, so you can adapt the procedure when your situation doesn't
match the textbook case.

## 1. What a rubric actually is

A rubric is a **compressed expert**. An expert says "this one is good, that
one is bad" and can't always tell you why. A rubric forces the reasoning out
of the expert's head and onto paper, in a form a non-expert (or an LLM, or a
junior teammate, or you in six months) can run.

Every rubric has exactly three parts:

1. **Criteria** — WHAT you look at. The dimensions. "Structure", "tone",
   "browser support".
2. **Levels** — the scale. How good can it be, how bad. 1–4,
   novice-to-expert, pass/conditional/fail.
3. **Descriptors** — the observable facts that place a work at a given level
   on a given criterion. Not "good structure" but "intro states purpose, each
   section has one idea, transitions reference the previous section".

The descriptor is where rubrics live or die. A criterion with no
discriminating descriptors is a topic heading, not a rule.

## 2. The insight that makes rubric-building possible: contrast

Ask an expert "what makes a good landing page?" and you get abstractions:
clarity, focus, punchiness. Useless.

Show the expert two landing pages — one shipped, one rejected — and ask "why
did this one win?" and you get specifics: "the winner says what the product
IS in the first 7 words; the loser makes you scroll three screens of brand
soup before you know." THAT is a criterion. And it implies a descriptor: "a
reader can state what the product is after reading the hero."

So the engine of rubric-building is not thinking hard about quality in the
abstract. It is:

> **Find pairs (or sets) of artifacts that differ in a known way. Ask what
> explains the difference. Keep only the explanations you can point at.**

This is what the Auto-Rubric paper automates: it takes preference pairs
(this answer was chosen over that one), prompts a model to propose criteria
from the pair, TESTS whether those criteria actually predict the choice, and
revises until they do. Then it takes all the criteria mined from many pairs
and throws away the redundant ones.

You do the same loop by hand. The machine just does it faster and over more
data.

## 3. The two failure shapes of wasted rubrics

Learn these two shapes and you can debug any rubric:

**Shape 1: Topic list.** Criteria with no observable test. "Clarity",
"professionalism", "visual appeal". Two judges will disagree. A generator
will declare victory. Nothing was specified.

Fix: every criterion must come with what_it_checks and observable — a fact
you can point to in the artifact. "Body text contrast ≥ 4.5:1", "every claim
has a citation", "hero answers what-is-it in ≤ 20 words".

**Shape 2: Component checklist.** "Has an intro, has three body paragraphs,
has a conclusion." Anyone can hit the shape and produce garbage.

Fix: swap components for the QUALITIES they serve. "Has an intro" becomes
"reader is oriented to purpose and roadmap within two sentences". The
component might still be the usual way to get it, but the rubric allows
another route to the same quality — and punishes a formally-present intro
that fails to orient.

## 4. The full loop, with the why

```
COLLECT → ANALYZE → CONTRAST → DRAFT → CALIBRATE → VALIDATE → FREEZE
```

Why each step exists:

- COLLECT more than one artifact because one example only tells you what
  THAT artifact is. What generalizes comes from variation.
- ANALYZE into observable statements because invisible qualities can't be
  taught, checked, or generated.
- CONTRAST good against bad because that's where the _decision-relevant_
  criteria come from — not every difference matters, only differences that
  track judgments.
- DRAFT a grid because writing forces you to spot overlaps (double-jeopardy:
  two criteria punishing one flaw) and gaps.
- CALIBRATE by sorting fresh artifacts twice — once by gut, once by rubric —
  because the disagreements between the two orderings are EXACTLY the places
  where your rubric is wrong. This is Evaluate→Revise in the Auto-Rubric loop.
- VALIDATE on new artifacts because a rubric tuned on its own training set
  overfits. The gold-plated test: give the rubric to someone (or an LLM) who
  has NOT seen your examples and see if they rank the same way you do.
- FREEZE with a version because rubrics drift and generators learn to game
  them; you want to know when the rubric changed and why.

Notice: the loop is not linear. Step 5 sends you back to Step 3. Step 6 sends
you back to Step 4. That's expected — the Auto-Rubric paper runs the revise
loop up to several times per pair.

## 5. Best practices, stated as rules with reasons

**Keep to 5–9 criteria.** More dimensions than that and judges stop being
able to hold them all, weights confuse, and scores cluster. (Auto-Rubric's
top set? Five themes. Educational best practice: five to nine.) If you have
twelve would-be criteria, group them into themes with sub-tips.

**Use an even number of levels — 4 or 6.** With three or five, the middle is
a catch-all and every judge migrates there when unsure. Four forces a call.

**Write descriptors top-down: excellent first, then unacceptable, then the
middle.** Excellent is usually easiest to picture. The endpoints anchor the
scale; middles are interpolations. (UCD's order.)

**Descriptors must differ observably.** "Clear and compelling" vs "clear" is
not a difference. "Claim stated in the first sentence" vs "claim implied but
never stated" is.

**Criteria should describe qualities, not parts.** See Shape 2 above.

**Weight only from evidence.** If you have contrast data, let it set weights:
the difference that flips good↔bad on its own gets the high weight. No
contrast data? Equal weights, marked provisional. NEVER fake precision —
0.27 of "clarity" with no basis is false rigor.

**Keep the two representations: grid and theme-tips.** Grid for careful
evaluation. Theme-tips (one-line theme + do/don't bullets) for generation
and for quick reference — this is the Auto-Rubric final schema, and it
round-trips: the tips ARE the generation rules.

**Store the examples WITH the rubric.** Every criterion should cite the
artifact(s) it was mined from. When you later disagree with the rubric, you
can see whether the rubric forgot something or the world changed.

**Validate by adversarial generation.** Once you have the rubric, try to
make an artifact that scores HIGH but is BAD. If you can do it, note HOW —
that how is a missing criterion or a weak descriptor. Add it, version the
rubric. This single exercise is worth more than hours of staring at the grid.

## 6. Modality notes (the short reasoning version)

Everything above is artifact-agnostic; modality only changes HOW you make the
artifact observable.

- **Images/UI:** run vision analysis first; extract tokens in the Material
  order (raw values → roles → component patterns → layout). Contrast pairs
  of screenshots on those axes. "Modern", "clean" are topic-list criteria;
  "8pt spacing grid, one accent hue, primary action uses filled-primary token"
  are observable.
- **Documents:** the NN/g axes (purpose-fit, structure/scannability, tone,
  evidence density, completeness-for-intent) are a vetted starting criterion
  set. Then specialize to your doc type via contrast.
- **Code:** readability, structure, correctness-signals, idiom. Contrast a
  merged PR with a rejected one on the same task if you can get it — gold.
- **AI responses:** the five recurring themes across the Auto-Rubric pair data
  are accuracy, instruction-following (incl. FORMAT and QUANTITY demands),
  clarity/organization, depth, contextual fidelity. Start there.

## 7. A short paragraph you can hand someone

> A rubric is three things: what you look at, the scale, and the observable
> facts that put a work at each point on the scale. Build it by putting good
> and bad examples side by side and asking "what explains the difference that
> I can point at?" Keep 5–9 criteria, use 4 levels, write descriptors from
> excellent down, weights only if you have evidence for them. Test it: rank a
> fresh pile by gut and by rubric — every disagreement teaches you what the
> rubric missed. Then try to BUILD something that scores high but is bad;
> however you succeed is where the rubric is weak. Fix, version, repeat.

## 8. Further reading (local)

- research/auto-rubric.txt — the Auto-Rubric paper. Read the Abstract, §3.2
  (the Propose-Evaluate-Revise loop), Appendix H (prompt templates).
- research/berkeley.txt — work through the physics + sociology examples end
  to end; watching the criteria is the best way to internalize this lesson.
- research/ucd.pdf / ucd.txt — Appendix 1 is the 6-step checklist version.
- research/oppida.txt — seven steps with more on scales and teaching a rubric.
  tk@cloudshell:~/rubric$ ls -la
  total 56
  drwxrwxr-x 6 tk tk 4096 Aug 31 04:41 .
  drwxr-x--- 23 tk tk 4096 Aug 31 05:16 ..
  drwxrwxr-x 2 tk tk 4096 Aug 31 01:35 distilled
  -rw------- 1 tk tk 9009 Aug 31 01:29 LESSON.md
  -rw------- 1 tk tk 1082 Aug 31 01:29 README.md
  drwxrwxr-x 2 tk tk 4096 Aug 31 01:25 research
  -rw------- 1 tk tk 13012 Aug 31 01:27 RUBRIC_FROM_EXAMPLES.md
  drwxrwxr-x 2 tk tk 4096 Aug 31 05:10 rubrics
  drwxrwxr-x 2 tk tk 4096 Aug 31 01:27 templates
  tk@cloudshell:~/rubric$ cat README.md

# Rubric — extracting rulesets from examples

Goal: from example artifacts (docs, images, code, responses) derive a rubric /
ruleset that can evaluate or generate more artifacts like them.

## Files

- RUBRIC_FROM_EXAMPLES.md — the method (7-step pipeline, schema, modality
  adapters, failure modes, worked path). Start here.
- LESSON.md — the reasoning: why rubrics work, why contrast is the engine,
  common failure shapes, best practices as rules-with-reasons.
- templates/rubric_schema.json — canonical rubric schema (JSON Schema).
- research/ — sources the method is synthesized from, local copies:
  - auto-rubric.txt — Auto-Rubric (arXiv:2510.17314) + prompt templates
  - berkeley.txt — GSI rubric-creation guide (holistic vs analytic)
  - ucd.txt + ucd.pdf — Designing Grading & Feedback Rubrics
  - oppida.txt — 7-step rubric design

## Core idea

You don't invent the rubric — you discover it from _contrast_ (good vs. bad)
and _recurrence_ (what good artifacts share). COLLECT → ANALYZE → CONTRAST →
DRAFT → CALIBRATE → VALIDATE → FREEZE.
