<script>
	import { page } from '$app/state';
	import Cta from '$lib/components/Cta.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';

	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 */
	/** @type {{ register?: Register, children?: import('svelte').Snippet }} */
	let { register = 'carnival-poster', children } = $props();

	let contentEl = $state(null);

	const lessons = [
		{ slug: '/docs', title: 'Overview', eyebrow: 'Start here', desc: 'What this section covers and the recommended reading order.' },
		{ slug: '/docs/how-voyager-plans', title: 'How Voyager plans your trip in your browser', eyebrow: 'Lesson 1', desc: 'Local-first AI, WebGPU, prompt assembly, and rubric-ranked places.' },
		{ slug: '/docs/what-is-a-rubric', title: 'What a rubric is', eyebrow: 'Lesson 2', desc: 'Criteria, levels, descriptors — and why contrast is the engine.' },
		{ slug: '/docs/rubrics-evaluate-and-generate', title: 'How rubrics evaluate and generate', eyebrow: 'Lesson 3', desc: 'The same rubric as a judge and as a generation rule.' },
		{ slug: '/docs/how-voyager-pay-works', title: 'How Voyager Pay works', eyebrow: 'Lesson 4', desc: 'Five invariants, three layers, seven steps from request to settlement.' },
		{ slug: '/docs/what-is-eroi', title: 'What EROI is', eyebrow: 'Lesson 5', desc: 'A security rubric: how much it costs to extract value from a system, set against how much the extracted value is worth.' },
		{ slug: '/docs/why-systems-get-captured', title: 'Why a capturable system invites capture', eyebrow: 'Lesson 6', desc: 'Concentrated, visible, separable value is an open invitation.' },
		{ slug: '/docs/voyager-pay-eroi-audit', title: 'How Voyager Pay satisfies the EROI rubric', eyebrow: 'Lesson 7', desc: 'Dispersion, information, coupling — the audit table and the score profile.' },
		{ slug: '/docs/how-price-discovery-works', title: 'How price discovery works on Voyager Pay', eyebrow: 'Inserted after Lesson 8', desc: 'The §7.4 rubric, why the 0.6 / 0.2 / 0.2 weights bias toward honest operators, and why fees trend toward cost-plus-margin.' },
		{ slug: '/docs/how-voyager-pay-extends', title: 'How Voyager Pay extends', eyebrow: 'Lesson 9', desc: 'A substrate, a tag prefix, and a convention document — why any vendor kind can ship without amending the protocol.' }
	];

	const sections = [
		{ label: 'Overview', items: [lessons[0]] },
		{ label: 'The trip planner', items: [lessons[1]] },
		{ label: 'Rubrics & generation', items: [lessons[2], lessons[3]] },
		{ label: 'Voyager Pay & EROI', items: lessons.slice(4) }
	];

	function isActive(slug) {
		const current = page.url.pathname;
		if (slug === '/docs') return current === '/docs';
		return current === slug || current.startsWith(slug + '/');
	}
</script>

<div class="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-12 md:pt-14">
	<RegisterSection {register}>
	<div
		class="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_minmax(0,1fr)_200px] lg:gap-x-10"
	>
		<aside class="md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-5rem)] md:overflow-y-auto">
			<p class="eyebrow mb-6">Documentation</p>
			<nav>
				<ul class="flex flex-col gap-y-5">
					{#each sections as section (section.label)}
						<li>
							<p class="eyebrow mb-2">{section.label}</p>
							<ul class="flex flex-col gap-y-1">
								{#each section.items as lesson (lesson.slug)}
									{@const active = isActive(lesson.slug)}
									<li>
										<a
											href={lesson.slug}
											aria-current={active ? 'page' : undefined}
											class="block text-[15px] leading-snug py-1.5 hover:underline underline-offset-[6px] decoration-[1.5px]"
											style={active
												? 'font-weight: 600; color: var(--rasta-gold); text-decoration: underline;'
												: 'color: var(--register-on-dark-soft);'}
										>
											{lesson.title}
										</a>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</nav>
			<div class="mt-8 hidden md:block">
				<Cta variant="tertiary" href="/docs">Back to overview</Cta>
			</div>
		</aside>
		<article bind:this={contentEl} class="min-w-0 docs-prose max-w-prose lg:py-2">
			{@render children()}
		</article>
		<div class="hidden lg:block">
			<div class="sticky top-20">
				<TableOfContents {contentEl} />
			</div>
		</div>
	</div>
	</RegisterSection>
</div>

<style>
	.docs-prose {
		color: var(--register-on-dark-soft);
	}
	.docs-prose :global(*) {
		color: inherit;
	}
	.docs-prose :global(h1) {
		scroll-margin-top: 5rem;
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-size: clamp(2rem, 4vw + 1rem, 2.75rem);
		line-height: 1.1;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--register-text);
	}
	.docs-prose :global(h2) {
		scroll-margin-top: 5rem;
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-size: 1.5rem;
		line-height: 1.25;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--register-text);
		margin-top: 2.5rem;
	}
	.docs-prose :global(h2:first-of-type) {
		margin-top: 1.5rem;
	}
	.docs-prose :global(h3) {
		scroll-margin-top: 5rem;
		font-size: 1.125rem;
		line-height: 1.3;
		font-weight: 600;
		letter-spacing: -0.005em;
		color: var(--register-text);
		margin-top: 1.75rem;
	}
	.docs-prose :global(p) {
		font-size: 1rem;
		line-height: 1.65;
		color: var(--register-on-dark-soft);
		margin-top: 1rem;
	}
	.docs-prose :global(p:first-of-type) {
		margin-top: 0;
	}
	.docs-prose :global(strong) {
		color: var(--register-text);
		font-weight: 600;
	}
	.docs-prose :global(ul),
	.docs-prose :global(ol) {
		margin-top: 1rem;
		padding-left: 1.5rem;
		color: var(--register-on-dark-soft);
	}
	.docs-prose :global(ul) {
		list-style-type: disc;
	}
	.docs-prose :global(ol) {
		list-style-type: decimal;
	}
	.docs-prose :global(li) {
		margin-top: 0.5rem;
		line-height: 1.6;
		padding-left: 0.375rem;
	}
	.docs-prose :global(li::marker) {
		color: var(--register-muted);
	}
	.docs-prose :global(code) {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--register-text);
		background: var(--register-card);
		padding: 1px 6px;
		border-radius: 6px;
	}
	.docs-prose :global(pre) {
		margin-top: 1.25rem;
		border-radius: 20px;
		background: var(--register-card);
		padding: 1rem 1.25rem;
		overflow-x: auto;
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 13px;
		line-height: 1.6;
		color: var(--register-text);
	}
	.docs-prose :global(pre code) {
		background: transparent;
		padding: 0;
		border-radius: 0;
		color: inherit;
		font-weight: inherit;
	}
	.docs-prose :global(table) {
		margin-top: 1rem;
		width: 100%;
		font-size: 0.875rem;
		color: var(--register-on-dark-soft);
		border-collapse: collapse;
	}
	.docs-prose :global(thead) {
		color: var(--register-text);
		font-weight: 500;
		text-align: left;
	}
	.docs-prose :global(th),
	.docs-prose :global(td) {
		padding: 0.5rem 1rem 0.5rem 0;
		vertical-align: top;
	}
	.docs-prose :global(tbody tr) {
		border-top: 1px solid var(--register-hair);
	}
</style>
