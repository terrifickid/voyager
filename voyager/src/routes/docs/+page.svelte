<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>Documentation — Voyager</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Documentation</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		Read the spec behind Voyager.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Voyager rests on a few ideas. These pages walk through them in plain words. Start at the top, or jump straight to the lesson you want.
	</p>
	<div class="mt-8">
		<Cta variant="primary" href="/docs/how-voyager-plans">Start with Lesson 1</Cta>
	</div>
</section>

<section class="pb-16">
	<div class="flex flex-col gap-4">
		<a
			href="/docs/how-voyager-plans"
			class="rounded-[28px] bg-bone-100 p-6 hover:bg-bone-200 transition-colors"
		>
			<span class="eyebrow">Lesson 1</span>
			<h3 class="mt-2 font-display text-2xl text-ink">How Voyager plans your trip in your browser</h3>
			<p class="mt-2 text-ink-2">A regular web app, a model running in your tab, and a rubric that ranks real places.</p>
		</a>
		<a
			href="/docs/what-is-a-rubric"
			class="rounded-[28px] bg-bone-100 p-6 hover:bg-bone-200 transition-colors"
		>
			<span class="eyebrow">Lesson 2</span>
			<h3 class="mt-2 font-display text-2xl text-ink">What a rubric is</h3>
			<p class="mt-2 text-ink-2">A rubric is a small document a model can read. It lists criteria, levels, and examples for each level.</p>
		</a>
		<a
			href="/docs/rubrics-evaluate-and-generate"
			class="rounded-[28px] bg-bone-100 p-6 hover:bg-bone-200 transition-colors"
		>
			<span class="eyebrow">Lesson 3</span>
			<h3 class="mt-2 font-display text-2xl text-ink">How rubrics evaluate and generate</h3>
			<p class="mt-2 text-ink-2">The same rubric runs two ways. As a judge, it scores attempts. As a generation rule, it shapes what the model writes.</p>
		</a>
		<a
			href="/docs/how-voyager-pay-works"
			class="rounded-[28px] bg-bone-100 p-6 hover:bg-bone-200 transition-colors"
		>
			<span class="eyebrow">Lesson 4</span>
			<h3 class="mt-2 font-display text-2xl text-ink">How Voyager Pay works</h3>
			<p class="mt-2 text-ink-2">Five design invariants, three layers, and a seven-step payment flow from request to settlement.</p>
		</a>
		<a
			href="/docs/what-is-eroi"
			class="rounded-[28px] bg-bone-100 p-6 hover:bg-bone-200 transition-colors"
		>
			<span class="eyebrow">Lesson 5</span>
			<h3 class="mt-2 font-display text-2xl text-ink">What EROI is</h3>
			<p class="mt-2 text-ink-2">Energy Return On Investment is a ratio used for oil wells. Voyager applies it to attackers instead. Three knobs and one formula.</p>
		</a>
		<a
			href="/docs/why-systems-get-captured"
			class="rounded-[28px] bg-bone-100 p-6 hover:bg-bone-200 transition-colors"
		>
			<span class="eyebrow">Lesson 6</span>
			<h3 class="mt-2 font-display text-2xl text-ink">Why a capturable system invites capture</h3>
			<p class="mt-2 text-ink-2">Concentrated, visible, separable value is an open invitation. The structural answer is to make the crime not worth the squeeze.</p>
		</a>
		<a
			href="/docs/voyager-pay-eroi-audit"
			class="rounded-[28px] bg-bone-100 p-6 hover:bg-bone-200 transition-colors"
		>
			<span class="eyebrow">Lesson 7</span>
			<h3 class="mt-2 font-display text-2xl text-ink">How Voyager Pay satisfies the EROI rubric</h3>
			<p class="mt-2 text-ink-2">Which design move raises which knob, and the score profile that comes out the other side.</p>
		</a>
		<a
			href="/docs/what-can-still-go-wrong"
			class="rounded-[28px] bg-bone-100 p-6 hover:bg-bone-200 transition-colors"
		>
			<span class="eyebrow">Lesson 8</span>
			<h3 class="mt-2 font-display text-2xl text-ink">What can still go wrong</h3>
			<p class="mt-2 text-ink-2">Four residual risks, and the structural mitigations Voyager Pay leans on.</p>
		</a>
	</div>
</section>
