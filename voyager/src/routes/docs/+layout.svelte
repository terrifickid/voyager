<script>
	import { page } from '$app/state';
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
		{ slug: '/docs/sdk-surface', title: 'SDK surface', eyebrow: 'SDK', desc: 'The fourteen verbs, grouped by area.' },
		{ slug: '/docs/nostr-primitives', title: 'Nostr primitives', eyebrow: 'SDK', desc: 'Events, kinds, and NIPs the SDK speaks.' },
		{ slug: '/docs/how-voyager-pay-works', title: 'How Voyager Pay works', eyebrow: 'Protocol', desc: 'Custody-free, identity-free Lightning rail over signed Nostr events.' },
		{ slug: '/docs/how-price-discovery-works', title: 'How price discovery works', eyebrow: 'Protocol', desc: 'How a federation of Mostro nodes produces the prices a customer sees.' },
		{ slug: '/docs/how-voyager-pay-extends', title: 'How Voyager Pay extends', eyebrow: 'Protocol', desc: 'New vendor kinds ship by publishing a v-tag convention. No protocol change.' },
		{ slug: '/docs/rfc', title: 'Protocol RFC', eyebrow: 'Protocol', desc: 'The canonical spec: event kinds, tag grammar, state machines, JSON-Schema.' },
		{ slug: '/docs/security-model', title: 'Security model', eyebrow: 'Security', desc: 'Keys, no custody, no telemetry, and the user-brings-the-key boundary.' }
	];

	const sections = [
		{ label: 'Start here', items: [lessons[0]] },
		{ label: 'SDK', items: [lessons[1], lessons[2]] },
		{ label: 'Protocol', items: [lessons[3], lessons[4], lessons[5], lessons[6]] },
		{ label: 'Security', items: [lessons[7]] }
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
												? 'font-weight: 600; text-decoration: underline;'
												: ''}
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
	.docs-prose :global(h1) {
		scroll-margin-top: 5rem;
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-size: 2.5rem;
		line-height: 1.05;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--register-text);
		margin-top: 1rem;
	}
	.docs-prose :global(h2) {
		scroll-margin-top: 5rem;
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-size: 1.375rem;
		line-height: 1.25;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--register-text);
		margin-top: 2rem;
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
		border-radius: 24px;
		background: var(--register-card);
		padding: 1rem 1.25rem;
		overflow-x: auto;
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 13px;
		line-height: 1.6;
		color: var(--register-text);
		border: 0;
		box-shadow: none;
	}
	.docs-prose :global(pre code) {
		background: transparent;
		padding: 0;
		border-radius: 0;
		color: inherit;
		font-weight: inherit;
	}
	.docs-prose :global(a) {
		color: var(--register-text);
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-thickness: 1.5px;
	}
	.docs-prose :global(a:hover) {
		color: var(--heritage-amber);
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
	.docs-prose :global(details) {
		margin-top: 2rem;
		border: 1px solid var(--register-hair);
		border-radius: 18px;
		background: var(--register-ground);
		padding: 0.5rem 1.25rem;
	}
	.docs-prose :global(details[open]) {
		padding-bottom: 1.5rem;
	}
	.docs-prose :global(details summary) {
		cursor: pointer;
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-size: 1.25rem;
		line-height: 1.3;
		font-weight: 600;
		color: var(--register-text);
		padding: 0.75rem 0;
		list-style: none;
	}
	.docs-prose :global(details summary::-webkit-details-marker) {
		display: none;
	}
	.docs-prose :global(details summary::before) {
		content: '+';
		display: inline-block;
		width: 1.25rem;
		color: var(--register-muted);
		font-family: var(--font-mono, ui-monospace, monospace);
	}
	.docs-prose :global(details[open] summary::before) {
		content: '−';
	}
	.docs-prose :global(.appendix-summary) {
		font-size: 0.95rem;
		font-weight: 400;
		color: var(--register-muted);
		margin-top: 0.25rem;
	}
	.docs-prose :global(.rfc-meta-strip) {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 0.75rem 1.25rem;
		margin-top: 1.5rem;
		padding: 1rem 1.25rem;
		border-radius: 18px;
		background: var(--register-card);
		font-size: 0.8125rem;
		line-height: 1.4;
	}
	.docs-prose :global(.rfc-meta-strip > div) {
		display: flex;
		flex-direction: column;
	}
	.docs-prose :global(.rfc-meta-strip dt) {
		font-family: var(--font-mono, ui-monospace, monospace);
		color: var(--register-muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		font-size: 0.6875rem;
	}
	.docs-prose :global(.rfc-meta-strip dd) {
		color: var(--register-text);
		font-weight: 500;
		margin-top: 0.25rem;
		margin-left: 0;
	}
	.docs-prose :global(.rfc-footer) {
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--register-hair);
		color: var(--register-muted);
		font-size: 0.875rem;
	}
	.docs-prose :global(.rfc-footer a) {
		color: var(--register-text);
	}
	.docs-prose :global(pre.ascii) {
		line-height: 1.35;
		white-space: pre;
	}
</style>
