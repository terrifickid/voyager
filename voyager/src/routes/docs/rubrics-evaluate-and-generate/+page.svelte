<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>How rubrics evaluate and generate — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 3 — For the curious</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		How rubrics evaluate and generate.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		The same rubric runs in two directions. As a judge, it scores attempts. As a generation rule, it tells a model how to write the next attempt. Both directions share one schema. That is the payoff.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 id="the-loop">The Propose → Evaluate → Revise loop</h2>
		<p>
			Auto-Rubric, the paper this methodology rests on, runs a tight loop. The machine shows a model a contrast pair, this artifact chosen over that one. It prompts the model to propose criteria that explain the choice. It evaluates whether those criteria actually predict the preference on a held-out pair. It revises the criteria until they do.
		</p>
		<p>
			Hand-built rubrics follow the same loop. Slower, with more examples you can see.
		</p>

		<h2 id="the-rubric-schema">The rubric schema</h2>
		<p>
			Every criterion carries four fields beyond its levels. <code>observable</code> is the fact a judge can point at. <code>generation_rule</code> is the instruction a model follows when writing a new attempt. <code>pitfalls</code> are the ways a generator might hit the descriptor without doing the real work. The full schema is documented in <code>Documentation/thingrubric.md</code> §3.
		</p>
		<p>
			The same criteria also roll up into a <code>Theme-Tips</code> summary. One line per theme. Do and do-not bullets as the tips. Theme-Tips is the form most useful for generation prompts. Short. Checkable. Portable.
		</p>

		<h2 id="voyagers-two-rubrics">Voyager's two concrete rubrics</h2>
		<p>
			Voyager runs the same rubric pattern twice. First, as a judge. <code>src/lib/ramp/rankQuotes.js</code> is a deterministic stand-in for the spec's §7.4 ranking rubric. Given a Mostro node's fee, reputation, and live rate, it produces a score from zero to one. That is the evaluator direction. It rates candidates so the wallet can pick the best three.
		</p>
		<p>
			Second, as a generation rule. The itinerary rubric, built with the same three-part shape, scores the draft day-by-day plan against your preferences and the candidate place dataset. The Theme-Tips summary of that rubric is what the in-browser model reads as instructions when it drafts or revises your plan. Same criteria. Two directions. No schema duplication.
		</p>

		<div class="rounded-[24px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">Why this matters in practice</p>
			<p class="mt-2">
				When the rubric is round-trippable, your evaluator and your generator cannot drift apart. The generator is scored against the exact criteria the evaluator will judge it by. The classic failure — "the model produces things that look fine but score poorly against our rubric" — becomes a rubric-design problem. You add a pitfall, sharpen a descriptor, or split a compound criterion. The loop closes.
			</p>
		</div>

		<p>
			Two directions. One schema. One source of truth. The next lessons move from rubrics into Voyager Pay. Same shape of thinking, applied to a money-moving protocol.
		</p>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">How Voyager Pay works</h3>
			<p class="mt-2 text-sm text-ink-2">Five invariants, three layers, seven steps from request to settlement.</p>
		</div>
		<Cta variant="primary" href="/docs/how-voyager-pay-works">Continue</Cta>
	</div>
</section>
