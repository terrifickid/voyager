<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>What a rubric is — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 2</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		What a rubric is.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		A rubric is a compressed expert. An expert can tell good from bad but can't always say why. A
		rubric forces the reasoning onto paper in a form anyone — or any model — can run.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<p>
			A rubric has exactly three parts. Knowing them by name is the whole game.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">The three parts</h2>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li>
				<span class="font-display text-ink">Criteria</span> — what you look at. The independent
				dimensions of judgment: structure, tone, factual accuracy, opening hours respected.
			</li>
			<li>
				<span class="font-display text-ink">Levels</span> — the scale per criterion. How good can
				it be, how bad. Numeric (1–4) or named (novice → expert).
			</li>
			<li>
				<span class="font-display text-ink">Descriptors</span> — what each level looks like, on
				that criterion. The descriptor is the part that turns a topic heading into a rule you can
				apply or generate against.
			</li>
		</ul>

		<h2 class="font-display text-2xl text-ink mt-4">The observable-not-opinion rule</h2>
		<p>
			A criterion that doesn't come with an observable test is a topic heading, not a rule. Two
			judges will disagree about "clarity". They won't disagree about "the hero answers what the
			product is in ≤ 20 words". The descriptors must be facts you can point at in the artifact.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">Why contrast is the engine</h2>
		<p>
			You can't build a useful rubric from a single example. One artifact tells you what that
			artifact is; what generalizes comes from variation. Put a known-good artifact beside a
			known-bad one and ask what explains the difference. Keep only the differences you can point
			at and that track the judgment. That's the move that turns expert intuition into reusable
			rules. It's also what the Auto-Rubric paper automates: propose criteria from preference
			pairs, test whether they predict the choice, revise until they do.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">Two failure shapes to recognize</h2>
		<p>
			<strong class="text-ink">Shape 1 — Topic list.</strong> Criteria with no observable test.
			"Clarity", "professionalism", "visual appeal". Two judges will disagree. A generator will
			declare victory. Nothing was specified.
		</p>
		<p>
			<strong class="text-ink">Shape 2 — Component checklist.</strong> "Has an intro, has three
			body paragraphs, has a conclusion." Anyone can hit the shape and produce garbage. The fix is
			to swap components for the qualities they serve: "has an intro" becomes "reader is oriented
			to purpose and roadmap within two sentences". The component might still be the usual way to
			get there, but the rubric allows another route.
		</p>

		<div class="rounded-[28px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">Worked example — two landing-page heroes</p>
			<p class="mt-2">
				Hero A opens with "The CRM for small teams that hate CRMs". Hero B opens with
				"Welcome to our platform. We are excited to help you on your journey". Both are short;
				both are technically sentences. Side by side, the difference you can point at is the
				first: a reader of A knows the product and the audience in seven words; a reader of B
				knows nothing. That difference is one criterion. Its descriptor is "single ≤ 20-word
				statement naming product + audience present above the fold". Now you have one rule that
				both a human and a model can run.
			</p>
		</div>

		<p>
			Once you have three to nine criteria written this way, you have something you can both
			evaluate with and generate from. That's the topic of the next lesson.
		</p>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">How rubrics evaluate and generate</h3>
			<p class="mt-2 text-sm text-ink-2">The same rubric as a judge and as a generation rule — and where Voyager uses both.</p>
		</div>
		<Cta variant="primary" href="/docs/rubrics-evaluate-and-generate">Continue</Cta>
	</div>
</section>
