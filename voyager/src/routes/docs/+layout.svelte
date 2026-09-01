<script>
	import { page } from '$app/state';
	import Cta from '$lib/components/Cta.svelte';

	let { children } = $props();

	const lessons = [
		{ slug: '/docs', title: 'Overview', eyebrow: 'Start here', desc: 'What this section covers and the recommended reading order.' },
		{ slug: '/docs/how-voyager-plans', title: 'How Voyager plans your trip in your browser', eyebrow: 'Lesson 1', desc: 'Local-first AI, WebGPU, prompt assembly, and rubric-ranked places.' },
		{ slug: '/docs/what-is-a-rubric', title: 'What a rubric is', eyebrow: 'Lesson 2', desc: 'Criteria, levels, descriptors — and why contrast is the engine.' },
		{ slug: '/docs/rubrics-evaluate-and-generate', title: 'How rubrics evaluate and generate', eyebrow: 'Lesson 3', desc: 'The same rubric as a judge and as a generation rule.' },
		{ slug: '/docs/how-voyager-pay-works', title: 'How Voyager Pay works', eyebrow: 'Lesson 4', desc: 'Five invariants, three layers, seven steps from request to settlement.' },
		{ slug: '/docs/what-is-eroi', title: 'What EROI is', eyebrow: 'Lesson 5', desc: 'A security rubric: how much an attacker gets back for the effort they spend.' },
		{ slug: '/docs/why-systems-get-captured', title: 'Why a capturable system invites capture', eyebrow: 'Lesson 6', desc: 'Concentrated, visible, separable value is an open invitation.' },
		{ slug: '/docs/voyager-pay-eroi-audit', title: 'How Voyager Pay satisfies the EROI rubric', eyebrow: 'Lesson 7', desc: 'Dispersion, information, coupling — the audit table and the score profile.' },
		{ slug: '/docs/how-voyager-pay-extends', title: 'How Voyager Pay extends', eyebrow: 'Lesson 9', desc: 'A substrate, a tag prefix, and a convention document — why any vendor kind can ship without amending the protocol.' }
	];

	function isActive(slug) {
		const current = page.url.pathname;
		if (slug === '/docs') return current === '/docs';
		return current === slug || current.startsWith(slug + '/');
	}
</script>

<div class="mx-auto max-w-6xl px-6 pt-10 pb-6 md:pt-14">
	<div class="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr]">
		<aside class="md:sticky md:top-24 md:self-start">
			<p class="eyebrow mb-4">Documentation</p>
			<nav>
				<ul class="flex flex-row flex-wrap gap-x-5 gap-y-2 md:flex-col md:gap-y-1">
					{#each lessons as lesson (lesson.slug)}
						{@const active = isActive(lesson.slug)}
						<li>
							<a
								href={lesson.slug}
								aria-current={active ? 'page' : undefined}
								class="block text-[15px] leading-snug text-ink-2 hover:text-ink py-1 {active ? 'text-ink underline underline-offset-[6px] decoration-[1.5px]' : ''}"
							>
								<span class="block text-xs font-medium text-muted">{lesson.eyebrow}</span>
								<span class="block">{lesson.title}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
			<div class="mt-8 hidden md:block">
				<Cta variant="tertiary" href="/docs">Back to overview</Cta>
			</div>
		</aside>
		<div class="min-w-0">
			{@render children()}
		</div>
	</div>
</div>
