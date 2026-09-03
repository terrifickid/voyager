<script>
	import Icon from './Icon.svelte';
	import FooterBars from './FooterBars.svelte';

	const columns = [
		{
			title: 'STACK/',
			links: [
				{ label: 'Identity', href: '/stack/identity' },
				{ label: 'Payments', href: '/stack/payments' },
				{ label: 'Fiat ramp', href: '/stack/ramp' },
				{ label: 'Messaging', href: '/stack/messaging' },
				{ label: 'Discovery', href: '/stack/discovery' }
			]
		},
		{
			title: 'PROJECTS/',
			links: [
				{ label: 'Trip Planner', href: '/projects/trip-planner' },
				{ label: 'Voyager Pay', href: '/projects/voyager-pay' },
				{ label: 'For vendors', href: '/projects/voyager-pay/vendors' },
				{ label: 'All projects', href: '/projects' }
			]
		},
		{
			title: 'BUILD/',
			links: [
				{ label: 'Start building', href: '/build' },
				{ label: 'Builder economics', href: '/build#economics' },
				{ label: 'Regulatory posture', href: '/build#regulatory' },
				{ label: 'Join the alpha', href: '/build#join-alpha' }
			]
		},
		{
			title: 'LEARN/',
			links: [
				{ label: 'Use cases', href: '/use-cases' },
				{ label: 'Documentation', href: '/docs' },
				{ label: 'What EROI is', href: '/docs/what-is-eroi' },
				{ label: 'Why systems get captured', href: '/docs/why-systems-get-captured' }
			]
		},
		{
			title: 'NETWORK/',
			links: [
				{ label: 'Mostro nodes', href: '/network' },
				{ label: 'Run a node', href: '/projects/voyager-pay/node' },
				{ label: 'Relays', href: '/network#relays' },
				{ label: 'Indexer', href: '/network#indexer' }
			]
		},
		{
			title: 'ABOUT/',
			links: [
				{ label: 'Principles', href: '/principles' },
				{ label: 'Docs', href: '/docs' },
				{ label: 'Contact', href: '/principles' },
				{ label: 'Terms & privacy', href: '/principles' }
			]
		}
	];
</script>

<footer class="bg-bone-100 pt-20 pb-10">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
			<div class="flex flex-col gap-5">
				<a href="/" class="font-display text-2xl text-ink">Voyager</a>
				<p class="max-w-xs text-[15px] leading-relaxed text-ink-2">
					An open toolkit for building Caribbean-first apps. Five primitives, one SDK, no platform in the middle.
				</p>
				<div class="flex items-center gap-2">
					<button
						type="button"
						class="inline-flex items-center gap-2 rounded-pill bg-bone-200 px-4 py-2 text-sm font-semibold text-ink"
					>
						<Icon name="globe" tone="ink-2" size={16} />
						English
						<span aria-hidden="true" class="text-[1.05em] leading-none">⌄</span>
					</button>
				</div>
			</div>

			{#each columns as col (col.title)}
				<nav class="flex flex-col gap-4" aria-label={col.title.replace('/', '')}>
					<p class="eyebrow">{col.title}</p>
					<ul class="flex flex-col gap-3">
						{#each col.links as link (link.label)}
							<li>
								<a href={link.href} class="inline-flex items-center gap-2 text-[15px] text-ink-2 hover:text-ink">
									<span aria-hidden="true" class="inline-block h-[6px] w-[6px] bg-lime"></span>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			{/each}
		</div>

		<div class="mt-16 flex flex-col gap-3 border-t border-bone-200 pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
			<p>© {new Date().getFullYear()} Voyager. Demo build.</p>
			<p>Open rails, no custody. Users hold their own keys.</p>
		</div>

		<div class="mt-8">
			<FooterBars />
		</div>
	</div>
</footer>
