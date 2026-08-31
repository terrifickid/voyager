<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>How rubrics evaluate and generate — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 3</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		How rubrics evaluate and generate.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		A rubric isn't just a checklist. The same rubric runs two ways: as a judge that scores attempts,
		and as a generation rule that tells a model how to write the next attempt. Both directions use
		the same shape — and that round-trips.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink mt-4">The Propose → Evaluate → Revise loop</h2>
		<p>
			Auto-Rubric, the paper this whole methodology rests on, runs a tight loop. The machine shows
			a model a contrast pair (this artifact chosen over that one), prompts the model to propose
			criteria that explain the choice, evaluates whether those criteria actually predict the
			preference on a held-out pair, and revises the criteria until they do. Hand-built rubrics
			follow the same loop, just slower and over more examples you can see.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">The rubric schema</h2>
		<p>
			Every criterion in the canonical schema carries four fields beyond its levels:
			<code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">observable</code> (the fact a judge
			can point at), <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">generation_rule</code>
			(the instruction a model follows when writing a new attempt), and
			<code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">pitfalls</code> (the ways a
			generator might hit the descriptor without doing the real work). The full schema is documented
			in <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">Documentation/thingrubric.md</code> §3.
		</p>
		<p>
			The same set of criteria is also rolled up into a
			<code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">Theme-Tips</code> summary — one
			line per theme, do/don't bullets as the tips. The Theme-Tips shape is the form most useful
			for generation prompts: short, checkable, and portable.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">Voyager's two concrete rubrics</h2>
		<p>
			Voyager runs the same rubric pattern twice. First, as a judge:
			<code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">src/lib/ramp/rankQuotes.js</code>
			is a deterministic stand-in for the spec's §7.4 ranking rubric. Given a Mostro node's fee,
			reputation, and live rate, it produces a 0..1 score. That's the evaluator direction — it
			rates candidates so the wallet can pick the best three.
		</p>
		<p>
			Second, as a generation rule. The itinerary rubric — built with the same three-part shape —
			scoring the draft day-by-day plan against your preferences and the candidate place data set.
			The Theme-Tips summary of that rubric is what the in-browser model reads as instructions
			when it drafts or revises your plan. Same criteria, two directions, no schema duplication.
		</p>

		<div class="rounded-[28px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">Why this matters in practice</p>
			<p class="mt-2">
				When the rubric is round-trippable, your evaluator and your generator cannot drift
				apart. The generator is being scored against the exact criteria the evaluator will use
				to judge it. The classic failure — "the model produces things that look fine but score
				poorly against our rubric" — becomes a rubric-design problem, not a model problem. You
				add a pitfall, sharpen a descriptor, or split a compound criterion. The loop closes.
			</p>
		</div>

		<p>
			Two directions, one schema, one source of truth. That's the structural payoff. The next
			lessons move from rubrics into Voyager Pay — the same shape of thinking applied to a
			money-moving protocol instead of a day plan.
		</p>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">How Voyager Pay works</h3>
			<p class="mt-2 text-sm text-ink-2">Five invariants, three layers, seven steps from request to settlement.</p>
		</div>
		<Cta variant="primary" href="/docs/how-voyager-pay-works">Continue</Cta>
	</div>
</section>
