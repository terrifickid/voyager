# Clear Communication Standard — Principles, Patterns & Self-Check (for Kilo)

> **Who this is for:** the Kilo code-assistant agent. Every rule here is a
> hard requirement for any prose you generate — chat replies, README files,
> code comments, docstrings, commit messages, PR descriptions, error
> messages returned to users, AI responses, documentation pages.
>
> **The contract — read this first.** This standard is **canonical, not
> aspirational**. Generated prose must match the structure below in _both_
> principle **and** actual implementation — the same seven criteria, the
> same level labels, the same acceptance rubric. It is **extensible**, not
> optional: add new failure modes and pitfalls as you discover them, but the
> _seven criteria themselves_ do not change.
>
> **Foundation:** the canonical spec lives in
> **`/home/tk/communications/clear_communication_rubric.json`** (the
> machine-readable rubric) and **`clear_communication_rubric.md`** (the
> human-readable companion). This rule file is the _agent-facing digest_ of
> those two — same content, same weights, same pitfalls — rewritten as
> imperative rules a coding agent can apply while generating prose.
>
> **Source research:** the seven criteria are derived from Shannon–Weaver
> (1948), Grice (1975), Jakobson (1960), Schramm–Osgood (1954), Miller
> (1956) + Sweller (1988), the US Plain Language movement (Plain Writing
> Act 2010 + PLAIN), and WCAG 2.2 Principle 3. Full citations and rationale
> in `/home/tk/communications/00_INDEX.md`.

---

## Part 0 — Acceptance rubric (definition of done)

Before you consider generated prose complete, every row must be TRUE.
Score each criterion 1–4 (Excellent / Good / Developing / Poor). The
aggregate weighted score must be ≥ 3.0; no criterion may score 1.

| #   | Criterion            | Weight | Pass condition (≥3, "Good")                                                                                                                                       |
| --- | -------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | Function declaration | 0.10   | Reader can identify the message's function (referential, conative, metalingual, phatic, emotive, poetic) within the first 1–2 sentences.                          |
| C2  | Quantity             | 0.18   | Every sentence carries unique information; no two paragraphs make the same point; no required information is missing.                                             |
| C3  | Quality              | 0.18   | Every factual claim is sourced, self-evident, or explicitly framed as opinion/inference. No fabricated numbers. No false claims the writer should know are wrong. |
| C4  | Manner               | 0.20   | Average sentence < 20 words; jargon defined at first use; pronouns unambiguous; one main idea per sentence; vocabulary matches audience.                          |
| C5  | Relation             | 0.10   | Every paragraph serves the declared function. Tangents absent or explicitly bracketed ("aside:", "note:"). Tangential context < 10% of total length.              |
| C6  | Structure            | 0.14   | Headings accurately preview content; one idea per paragraph; parallel list structure; conclusion/CTA findable in < 10 seconds.                                    |
| C7  | Cognitive load       | 0.10   | ≤ 2–3 new (undefined) terms per paragraph; lists/tables for parallel items; conclusion front-loaded so the reader can off-load the main idea early.               |

**Scoring rule:** aggregate = Σ (level × weight). ≥ 3.0 = pass, 2.0–3.0 =
revise, < 2.0 = rewrite. Any single criterion at 1 = automatic fail,
regardless of aggregate.

---

## Part 1 — The seven principles (non-negotiable)

These are the _why_. The patterns in Part 2 are the _how_.

1. **Function first.** Name what the message is and what the reader should
   do with it (if anything) before saying anything else. Jakobson: every
   message has one dominant function; the writer must declare it.
2. **Quantity — no more, no less.** Cut any sentence whose content appears
   earlier. Add any sentence whose absence leaves the reader unable to act.
   Grice: "Make your contribution as informative as is required, and no
   more informative than is required."
3. **Quality — sourced or flagged.** Every factual claim cites a source,
   is self-evident, or is labeled as opinion/inference. Numbers match
   sources. Grice: "Do not say what you believe to be false."
4. **Manner — say it simply.** Use the audience's vocabulary. Define
   jargon at first use, then use the short form. One main idea per
   sentence. Subject–verb–object order. Grice: "Avoid obscurity, avoid
   ambiguity, be brief, be orderly."
5. **Relation — every paragraph earns its place.** If a paragraph doesn't
   serve the named function, cut it or bracket it as "aside:".
6. **Structure — predictable and skimmable.** Headings accurately preview
   content. One idea per paragraph. Lists for parallel items; prose for
   connected reasoning. Conclusion findable.
7. **Cognitive load — respect working memory.** Limit new (undefined)
   terms to 2–3 per paragraph. Use lists/tables for parallel or dense
   content. Front-load the conclusion. Miller (1956): ~7±2 chunks max;
   Cowan (2001): ~4±1 for novel information.

---

## Part 2 — Canonical patterns (how to write each)

Each pattern corresponds to one or more criteria. The field names
(function, audience, vocabulary) and the structural moves are canonical;
extend the _catalog_ of patterns as new use cases appear, not the
_structure_.

### Pattern A — Lead with the function (C1)

```
❌ WRONG: "In light of recent developments in the regulatory landscape
   surrounding data privacy, organizations have increasingly found
   themselves needing to consider..."

✅ RIGHT: "This document explains how to comply with the new data privacy
   regulation. Read it if you handle customer data."
```

Rules: name the function (referential, conative, metalingual) in the first
sentence. State what the reader should do (read, do, decide) if applicable.

### Pattern B — One sentence, one idea (C4, C7)

```
� WRONG: "The system, which was originally designed to handle simple
   transactions but has since evolved through numerous iterations to
   accommodate increasingly complex multi-party workflows involving
   external APIs, now requires..."

✅ RIGHT: "The system now handles multi-party workflows. To set one up:"
```

Rules: average sentence < 20 words. Split compound sentences. One subject,
one verb, one idea. If a sentence needs > 30 words, split it.

### Pattern C — Front-load the conclusion (C2, C6, C7)

```
❌ WRONG: "After extensive analysis of the available options, taking into
   consideration factors including cost, performance, and maintainability,
   the team has reached the conclusion that..."

✅ RIGHT: "We chose PostgreSQL. Here's why: [bullet list]"
```

Rules: the main conclusion/finding/answer goes in the first or second
sentence. The rest is justification. Reader can stop reading after the
first sentence and still know the answer.

### Pattern D — Source or flag every claim (C3)

```
❌ WRONG: "Studies show that 80% of users prefer this approach."

✅ RIGHT:
  - "According to the 2024 NN/g study (n=1,247), 80% of users prefer
    this approach."
  - "In my experience, most users prefer this approach."
  - "Users often prefer this approach." (no number, no false precision)
```

Rules: every factual claim — (a) cite a source with date and sample size
where relevant, (b) mark as opinion/inference ("in my experience",
"arguably", "I think"), or (c) remove it. Never invent numbers, names, or
quotes.

### Pattern E — Define jargon at first use (C4, C7)

```
❌ WRONG: "The RPO coordinates with the ERM BCP for QMS compliance."

✅ RIGHT: "The Recovery Point Objective (RPO) is how much data we can
   afford to lose. It must align with our Business Continuity Plan (BCP)
   to meet QMS (Quality Management System) compliance."
```

Rules: at first use, expand the acronym and add a one-sentence definition
in parentheses. Use the short form thereafter. Limit new acronyms to
2–3 per paragraph.

### Pattern F — Lists for parallel items, prose for connected reasoning (C6, C7)

```
❌ WRONG: "The system supports authentication via password, via OAuth
   token, via biometric verification, and via hardware key, and all of
   these methods are configured in the settings panel where you can
   choose which one to use..."

✅ RIGHT:
  "The system supports four authentication methods:
   - Password
   - OAuth token
   - Biometric (fingerprint, face)
   - Hardware key (YubiKey, etc.)

   Configure any of them in Settings → Security."
```

Rules: 3+ parallel items → list. Mixed or connected reasoning → prose.
Never mix the two unpredictably.

### Pattern G — Bracket tangents explicitly (C5)

```
❌ WRONG: "The deployment script... [3 paragraphs about the author's
   promotion to senior engineer] ...returns a status code."

✅ RIGHT:
  "The deployment script returns a status code.

   Aside: I rewrote this script last quarter after the old one broke in
   production. That experience is why I'm particular about idempotency
   here — but the original point is the status code behavior."
```

Rules: tangents are okay if flagged. Anything not serving the declared
function either gets cut or gets wrapped in "Aside:" / "Note:" / "Off-topic:".
Target: tangential context < 10% of total length.

### Pattern H — Headings preview content accurately (C6)

```
❌ WRONG:
  # Overview              [body is a 600-word essay]
  # Technical Details     [body is two paragraphs of philosophy]
  # Conclusion            [body introduces three new concepts]

✅ RIGHT:
  # What this document covers       [3-bullet summary]
  # How to deploy the service       [steps 1-5]
  # How to roll back                [steps 1-3]
  # When to contact the on-call     [criteria + contact path]
```

Rules: a heading is a _promise_ about the content beneath it. If the
heading overpromises or under-delivers, fix the heading. Skim the headings
alone — a reader should be able to predict what each section contains.

### Pattern I — Active voice by default (C4)

```
❌ WRONG: "An investigation was conducted by the team and a determination
   was made that the bug had been introduced by a recent refactor."

✅ RIGHT: "The team investigated and determined that a recent refactor
   introduced the bug."
```

Rules: subject performs the verb. Passive voice only when (a) the actor is
unknown or unimportant, (b) you genuinely want to hide the actor (rare),
or (c) the action is the topic and the actor is the grammatical subject.

### Pattern J — Chunked, low-load paragraphs (C7)

```
❌ WRONG: [single 300-word paragraph with 7 new concepts and 4 acronyms]

✅ RIGHT:
  "Authentication is required for all API calls.

   Three things to configure:
   - An API key (generate one in Settings → API)
   - A redirect URL (must match your app's domain)
   - The scopes your app needs (read-only or read-write)

   Once configured, requests include the key in the Authorization header:
   `Authorization: Bearer <your-key>`"
```

Rules: paragraphs < 150 words. New concepts introduced one at a time.
List parallel items. Show, don't describe, when a code/command is involved.

### Pattern K — User-facing error messages (C1, C2, C3, C4)

```
❌ WRONG: "Error: validation failure (code 0x4A2F)"

✅ RIGHT: "We couldn't save your changes. The email address is missing
   the @ symbol. Fix it and try again."
```

Rules: error messages must (a) say what happened in plain language,
(b) say why, (c) say what to do next. Never log a code-only message to
the user; codes are for logs (see the kilo logging standard). The user
needs to know _what_ and _what now_, not _which code_.

### Pattern L — Code comments and docstrings (C4, C5)

```
❌ WRONG:
  // iterate through the array and increment counter for each item that
  // satisfies the predicate, then return the counter if non-zero
  for (const x of arr) if (p(x)) c++;

✅ RIGHT:
  // Count items matching the predicate. Returns 0 if none.
  for (const x of arr) if (p(x)) c++;
```

Rules: comments answer _why_, not _what_ (the code says what). One
sentence. Same vocabulary as the surrounding code. If the comment is
longer than the code, it usually belongs in a docstring instead.

### Pattern M — Commit messages and PR descriptions (C1, C2, C3)

```
❌ WRONG:
  "fix stuff"

✅ RIGHT (commit):
  "Fix NPE in payment retry when customer has no saved card

  The retry loop assumed customer.cards[0] existed. Add a guard that
  surfaces the missing-card error from the original attempt instead of
  dereferencing null. Covered by test in payments.spec.ts:412."

✅ RIGHT (PR description):
  "What: Fix NPE in payment retry path
  Why: Customer with no saved card crashed the retry loop on second attempt
  How: Early-return on missing card; reuse the existing missing-card error
  Test: New unit test in payments.spec.ts:412
  Risk: Low — adds an early return, no change to happy path"
```

Rules: a commit message has three jobs — say what changed, say why, point
at the proof (test, doc). A PR description adds _risk_ and _test_. Never
write a commit message that requires the diff to understand.

---

## Part 3 — Naming conventions (canonical vocabulary)

When extending the catalog, reuse these terms. Consistency beats the
specific spelling — but pick once and reuse everywhere.

| Term       | Definition                                                             |
| ---------- | ---------------------------------------------------------------------- |
| Function   | One of: referential, conative, metalingual, phatic, emotive, poetic    |
| Audience   | The intended reader (general adult, technical expert, executive, etc.) |
| Vocabulary | The set of words the audience already knows                            |
| Jargon     | A word not in the audience's vocabulary                                |
| Chunk      | A meaningful unit the reader already has a schema for (Miller 1956)    |
| Tangent    | Content that does not serve the declared function                      |
| Aside      | A flagged tangent, clearly marked as such                              |

---

## Part 4 — Anti-patterns (never do these)

1. ❌ **Burying a directive inside descriptive prose.** ("Note that the
   reader should..." instead of "Do X.")
2. ❌ **Front-loading context instead of the answer.** ("After careful
   analysis..." for three paragraphs before the actual finding.)
3. ❌ **Invented statistics.** ("Studies show 73% of users...") without a
   real source.
4. ❌ **Confident claims about contested topics.** ("Obviously the only
   correct approach is...")
5. ❌ **Latinate vocabulary where Anglo-Saxon works.** ("utilize" → "use";
   "facilitate" → "help"; "commence" → "start".)
6. � **Nominalizations that hide the verb.** ("make a determination" →
   "decide"; "conduct an investigation of" → "investigate".)
7. ❌ **Pronouns with multiple possible referents.** ("When the user
   clicks it and it loads, they see..." — what is "it"?)
8. ❌ **Tangents without "aside:" markers.** Off-topic paragraphs
   disguised as relevant.
9. ❌ **Decorative headings that contradict the body.**
10. ❌ **Conclusions that introduce new material.** The conclusion
    synthesizes; new content goes earlier or in a follow-up.
11. ❌ **Acronym stacks.** More than 2–3 new acronyms per paragraph; the
    reader cannot chunk them.
12. ❌ **Long compound sentences with embedded definitions.** Split them.
13. ❌ **User-facing error messages that are code-only.** ("Error 0x4A2F"
    without a human-readable explanation.)
14. ❌ **Commit messages that require the diff to interpret.** ("fix
    stuff", "WIP", "as discussed".)
15. ❌ **Inconsistent vocabulary across the same document.** Pick
    "user" or "customer" or "member" — not all three.
16. ❌ **Meta-commentary about the message itself.** ("In this section,
    we will discuss..." — just discuss it.)
17. ❌ **Sycophantic agreement with the reader's framing when evidence is
    mixed.** ("You're absolutely right that..." when the evidence is
    ambiguous.)

---

## Part 5 — Self-verification checklist (run before delivering)

Run through these before considering any prose artifact done.

1. **C1 — Function declared in first 1–2 sentences?** A reader can tell
   what kind of message this is without reading further.
2. **C2 — Every sentence carries unique information?** No padding; no
   missing prerequisites; no two paragraphs make the same point.
3. **C3 — Every factual claim sourced, self-evident, or flagged?** Search
   the artifact for numbers, names, dates — each is traceable or labeled.
4. **C4 — Vocabulary matches audience?** Sentences average < 20 words;
   jargon defined at first use; pronouns unambiguous; active voice.
5. **C5 — Every paragraph serves the function?** Tangents either cut or
   marked with "Aside:" / "Note:".
6. **C6 — Headings accurately preview content?** Skim the headings alone
   and the document's structure is predictable.
7. **C7 — Cognitive load bounded?** ≤ 2–3 new (undefined) terms per
   paragraph; lists/tables for parallel items; conclusion front-loadable.
8. **Consistency check** — same vocabulary for the same concept
   throughout? Same tense in parallel constructions?
9. **Audience check** — read it as the intended reader. Anything you'd
   have to re-read?
10. **Game-the-rubric check** — did you satisfy C4 (manner) by adding
    bullet points without actually improving the substance? Bullets are
    not a substitute for thinking.

---

## Part 6 — Genre-specific overrides (when this rule doesn't apply)

This standard is calibrated for informational, instructional, referential,
and conative prose. For these genres, _relax_ specific criteria:

| Genre                      | Override                                                                         |
| -------------------------- | -------------------------------------------------------------------------------- |
| Poetry                     | All criteria suspend. Poetic function is dominant.                               |
| Legal argument             | C4 (manner) relaxes: jargon is the audience's vocabulary.                        |
| Technical academic prose   | C4 + C7 relax: technical vocabulary assumed; longer sentences acceptable.        |
| Jokes, satire              | C5 (relation) suspends: the joke requires the tangential setup.                  |
| Code comments              | C2 (quantity) tightens: a long comment usually means the code needs refactoring. |
| User-facing error messages | C1 + C2 + C4 tighten: must be unambiguous and immediately actionable.            |

If you're writing in a genre not listed, default to the standard rules.

---

## Part 7 — Worked example: a clear response

**Scenario:** user asks an AI assistant for help debugging a TypeScript
build error.

```
❌ BEFORE (violates C1, C2, C4, C5):
   "It sounds like you're encountering an issue that many developers
   have reported when working with TypeScript configurations that
   involve custom path mappings, and while there are a number of
   potential causes ranging from tsconfig inheritance issues to
   moduleResolution conflicts, in my experience the most common
   culprit tends to be..."

✅ AFTER (passes all seven criteria):
   "Your error is from `baseUrl` vs `paths` mismatch. Two fixes:

   1. If you use `paths`, `baseUrl` must be set:
      {
        "compilerOptions": {
          "baseUrl": "./src",
          "paths": { "@/*": ["*"] }
        }
      }

   2. Or remove `paths` and use relative imports:
      import { foo } from './utils/foo';

   Which fits your project?"
```

The after-version: declares function in sentence 1 (conative — fix your
config), gives the answer immediately (front-loaded), provides two
options (parallel list, scoped chunks), asks which fits (clear next
action), and asks one question (no buried meta-commentary).

---

## Part 8 — Extending the catalog

When you encounter a prose genre or failure mode not covered here:

1. Add a new **Pattern** (Part 2) with a wrong/right example.
2. Add any new anti-patterns to Part 4.
3. Add any new acceptance criteria (Part 0) ONLY if you can articulate
   the _why_ (which source supports it) — the seven criteria are
   load-bearing; do not split them without strong evidence.
4. Update the source rubric JSON (`clear_communication_rubric.json`) so
   the human-readable spec and the agent-facing rule stay in sync.
5. Re-run Part 5 self-check on the existing corpus to confirm the
   addition doesn't regress previously-passing artifacts.

Do NOT modify the seven criteria themselves without first running the
CALIBRATE step (gut-sort 5–10 real artifacts, score with the rubric,
find disagreements, revise). The criteria are derived from the source
material — changing them means the rule no longer matches its
foundation.
