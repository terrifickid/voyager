# Kilo Clear Communication Rule

All prose you generate — replies, docs, comments, errors, commits, PRs — must follow these rules.

1. State the point in the first sentence. Tell the reader what the message is and what they should do with it. Do not warm up with context.

2. Put the answer first. The main conclusion, fix, or decision goes in sentence 1 or 2. Everything after that is supporting detail. The reader should be able to stop after the first sentence and know the answer.

3. One sentence, one idea. Keep sentences under 20 words on average. Split compound sentences. Use subject-verb-object order. If a sentence is over 30 words, break it in two.

4. Use active voice. The subject should perform the verb. Only use passive voice when the actor is unknown or unimportant.

5. Define jargon and acronyms at first use. Write the full term, then put the short form in parentheses. Use the short form after that. Do not introduce more than 2 or 3 new acronyms in any paragraph.

6. Source every factual claim. Cite the source with a date. If you cannot cite a source, flag it as opinion or inference ("in my experience", "I think", "arguably"). Never invent statistics, names, dates, or quotes.

7. Use lists for parallel items. If you have 3 or more similar things, use a bullet list. Use prose for connected reasoning or narrative. Do not mix the two unpredictably.

8. Keep paragraphs short. Under 150 words. Introduce one concept at a time. Show code or commands directly; do not describe them in prose when a code block is clearer.

9. Headings must describe what is underneath them. A reader skimming only the headings should be able to predict the content of each section. Do not write decorative headings.

10. Mark tangents explicitly. If something is off-topic, label it "Aside:", "Note:", or "Off-topic:". Keep tangential content under 10 percent of the total length. If it does not serve the main point, cut it.

11. Use consistent vocabulary. Pick one term for each concept and stick with it. Do not switch between "user", "customer", and "member" in the same document.

12. Do not use meta-commentary. Never write "In this section, we will discuss..." Just discuss it.

13. Do not bury directives in descriptive prose. Write "Do X." Do not write "It is important to note that the reader should consider doing X."

14. Do not front-load context before the answer. Never start with "After careful analysis..." for multiple paragraphs before stating the actual finding.

15. Do not use inflated vocabulary. Use "use" not "utilize". Use "start" not "commence". Use "help" not "facilitate". Use "decide" not "make a determination".

16. Do not use ambiguous pronouns. If "it", "they", or "this" could refer to more than one thing, repeat the noun.

17. Do not write conclusions that introduce new material. A conclusion synthesizes what came before. New content belongs earlier or in a follow-up.

18. Do not write decorative headings that contradict the body beneath them.

19. Do not write commit messages that require reading the diff to understand. "Fix stuff" and "WIP" are unacceptable. A commit message must say what changed, why, and where the proof is (test or doc reference).

20. Do not write code-only error messages for users. A user-facing error must say what happened, why, and what to do next. Error codes belong in logs, not user messages.

21. Comments answer why, not what. The code already says what it does. If a comment is longer than the code, it probably belongs in a docstring. Keep comments to one sentence and match the vocabulary of the surrounding code.

22. Do not agree sycophantically when evidence is mixed. If the evidence is ambiguous, say so. Do not write "You're absolutely right that..." when the facts are unclear.

23. Before finishing, check your work. Can the reader identify the message's purpose in the first 1-2 sentences? Does every sentence carry unique information? Is every claim sourced or flagged? Is the average sentence under 20 words? Does every paragraph serve the main point? Are headings accurate? Are there 2-3 or fewer new undefined terms per paragraph? Is the vocabulary consistent throughout? Read it as the intended reader. Would you have to re-read anything?

For poetry, legal argument, technical academic prose, jokes, code comments, and user-facing error messages, relax or tighten these rules as follows:

- Poetry: suspend all rules.
- Legal argument: jargon is the audience's vocabulary, so the jargon rule relaxes.
- Technical academic prose: technical vocabulary and longer sentences are acceptable.
- Jokes and satire: tangents are allowed for setup.
- Code comments: tighten quantity. A long comment usually means the code needs refactoring.
- User-facing errors: tighten function, quantity, and manner. Must be unambiguous and immediately actionable.
