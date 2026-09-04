<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>Documentation — Voyager · Caribbean-first spec</title>
</svelte:head>

<section class="pt-4 pb-12">
	<p class="eyebrow">Overview</p>
	<h1 class="mt-3 font-display" id="overview" style="color: var(--register-text);">
		Read the spec behind Voyager.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed" style="color: var(--register-on-dark-soft);">
		Voyager is a toolkit. These pages walk through the ideas, the rails, and the design moves in plain words. Pick the path that fits you, or read top-to-bottom. The primitives live on the stack pages; this section is for the spec.
	</p>
	<div class="mt-8">
		<Cta variant="primary" href="/docs/how-voyager-plans">Start with how Voyager plans</Cta>
	</div>
</section>

<section class="pb-16">
	<div class="flex flex-col gap-10">
		<!-- Path 1: For builders shipping the showcase apps -->
		<div class="flex flex-col gap-4">
			<p class="eyebrow">For builders shipping the showcase apps</p>
			<h2 id="for-travelers" style="color: var(--register-text);">How Voyager plans your trip in your browser.</h2>
			<a
				href="/docs/how-voyager-plans"
				class="rounded-[24px] bg-[var(--register-card)] p-6 hover:bg-[var(--register-card)] transition-colors"
			>
				<span class="eyebrow">For builders shipping the showcase apps</span>
				<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">How Voyager plans your trip in your browser</h3>
				<p class="mt-2 text-[var(--register-muted)]">A regular web app, a model running in your tab, and a rubric that ranks real places.</p>
			</a>
		</div>

		<!-- Path 2: For the curious (rubrics) -->
		<div class="flex flex-col gap-4">
			<p class="eyebrow">For the curious</p>
			<h2 id="for-the-curious" style="color: var(--register-text);">What a rubric is, and how it drives the model.</h2>
			<div class="flex flex-col gap-3">
				<a
					href="/docs/what-is-a-rubric"
					class="rounded-[24px] bg-[var(--register-card)] p-6 hover:bg-[var(--register-card)] transition-colors"
				>
					<span class="eyebrow">For the curious</span>
					<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">What a rubric is</h3>
					<p class="mt-2 text-[var(--register-muted)]">A small document a model can read. Criteria, levels, examples.</p>
				</a>
				<a
					href="/docs/rubrics-evaluate-and-generate"
					class="rounded-[24px] bg-[var(--register-card)] p-6 hover:bg-[var(--register-card)] transition-colors"
				>
					<span class="eyebrow">For the curious</span>
					<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">How rubrics evaluate and generate</h3>
					<p class="mt-2 text-[var(--register-muted)]">The same rubric runs two ways: as a judge, and as a generation rule.</p>
				</a>
			</div>
		</div>

		<!-- Path 2.5: For AI-curious builders -->
		<div class="flex flex-col gap-4">
			<p class="eyebrow">For AI-curious builders</p>
			<h2 id="for-ai-curious" style="color: var(--register-text);">How the in-browser AI agent fits.</h2>
			<a
				href="/projects/ai"
				class="rounded-[24px] bg-[var(--register-card)] p-6 hover:bg-[var(--register-card)] transition-colors"
			>
				<span class="eyebrow">Showcase</span>
				<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">Voyager AI — One agent across the five primitives</h3>
				<p class="mt-2 text-[var(--register-muted)]">A walkable view of the in-browser agent: intent parsing for Voyager Pay, search/write/embed for Nostr, and the data boundary at every primitive.</p>
			</a>
		</div>

		<!-- Path 3: For the protocol-curious -->
		<div class="flex flex-col gap-4">
			<p class="eyebrow">For the protocol-curious</p>
			<h2 id="for-the-protocol-curious" style="color: var(--register-text);">How Voyager Pay works, and why the design holds.</h2>
			<div class="flex flex-col gap-3">
				<a
					href="/docs/how-voyager-pay-works"
					class="rounded-[24px] bg-[var(--register-card)] p-6 hover:bg-[var(--register-card)] transition-colors"
				>
					<span class="eyebrow">For the protocol-curious</span>
					<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">How Voyager Pay works</h3>
					<p class="mt-2 text-[var(--register-muted)]">Five invariants, three layers, seven steps from request to settlement.</p>
				</a>
				<a
					href="/docs/what-is-eroi"
					class="rounded-[24px] bg-[var(--register-card)] p-6 hover:bg-[var(--register-card)] transition-colors"
				>
					<span class="eyebrow">For the protocol-curious</span>
					<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">What EROI is</h3>
					<p class="mt-2 text-[var(--register-muted)]">Model extraction as an economic problem and most design choices follow.</p>
				</a>
				<a
					href="/docs/why-systems-get-captured"
					class="rounded-[24px] bg-[var(--register-card)] p-6 hover:bg-[var(--register-card)] transition-colors"
				>
					<span class="eyebrow">For the protocol-curious</span>
					<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">Why a capturable system invites capture</h3>
					<p class="mt-2 text-[var(--register-muted)]">Concentrated, visible, separable value is an open invitation.</p>
				</a>
				<a
					href="/docs/voyager-pay-eroi-audit"
					class="rounded-[24px] bg-[var(--register-card)] p-6 hover:bg-[var(--register-card)] transition-colors"
				>
					<span class="eyebrow">For the protocol-curious</span>
					<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">How Voyager Pay satisfies the EROI rubric</h3>
					<p class="mt-2 text-[var(--register-muted)]">Which design move raises which property, and the score profile that comes out.</p>
				</a>
				<a
					href="/docs/how-price-discovery-works"
					class="rounded-[24px] bg-[var(--register-card)] p-6 hover:bg-[var(--register-card)] transition-colors"
				>
					<span class="eyebrow text-[var(--register-muted)]">Inserted</span>
					<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">How price discovery works on Voyager Pay</h3>
					<p class="mt-2 text-[var(--register-muted)]">The §7.4 rubric and why fees trend toward cost-plus-margin.</p>
				</a>
				<a
					href="/docs/how-voyager-pay-extends"
					class="rounded-[24px] bg-[var(--register-card)] p-6 hover:bg-[var(--register-card)] transition-colors"
				>
					<span class="eyebrow">For the protocol-curious</span>
					<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">How Voyager Pay extends</h3>
					<p class="mt-2 text-[var(--register-muted)]">A substrate, a tag prefix, and a convention document — any vendor kind can ship.</p>
				</a>
			</div>
		</div>

		<div class="mt-4">
			<a href="/docs/how-voyager-plans" class="inline-flex items-center gap-1 underline underline-offset-4 decoration-[1.5px] font-semibold" style="color: var(--heritage-amber);">
				Read in order
				<span aria-hidden="true" class="text-[1.05em] leading-none">›</span>
			</a>
		</div>
	</div>
</section>