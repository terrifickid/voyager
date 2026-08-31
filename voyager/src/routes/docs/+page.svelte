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
		Voyager is built on a small number of ideas. The pages in this section walk through them in order,
		starting with the easiest one and adding complexity as we go. Each page is short. Read them in
		order, or jump straight to the one you want.
	</p>
	<div class="mt-8">
		<Cta variant="primary" href="/docs/how-voyager-plans">Start with: How Voyager plans your trip in your browser</Cta>
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
			<p class="mt-2 text-ink-2">A compressed expert: criteria, levels, descriptors. And why contrast is the engine that builds one.</p>
		</a>
		<a
			href="/docs/rubrics-evaluate-and-generate"
			class="rounded-[28px] bg-bone-100 p-6 hover:bg-bone-200 transition-colors"
		>
			<span class="eyebrow">Lesson 3</span>
			<h3 class="mt-2 font-display text-2xl text-ink">How rubrics evaluate and generate</h3>
			<p class="mt-2 text-ink-2">The same rubric runs two ways — as a judge that scores attempts, and as a generation rule.</p>
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
			<p class="mt-2 text-ink-2">Energy Return On Investment, applied to attackers instead of oil wells. The three knobs and the formula.</p>
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
			<p class="mt-2 text-ink-2">Which design move raises which knob, and the resulting score profile (3, 3, 3).</p>
		</a>
		<a
			href="/docs/what-can-still-go-wrong"
			class="rounded-[28px] bg-bone-100 p-6 hover:bg-bone-200 transition-colors"
		>
			<span class="eyebrow">Lesson 8</span>
			<h3 class="mt-2 font-display text-2xl text-ink">What can still go wrong</h3>
			<p class="mt-2 text-ink-2">Honest enumeration of the four residual risks and the structural mitigations Voyager Pay leans on.</p>
		</a>
	</div>
</section>
