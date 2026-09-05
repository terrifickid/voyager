<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 */
	/** @type {{ register?: Register }} */
	let { register = 'perk' } = $props();

	import Icon from './Icon.svelte';

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
				{ label: 'Voyager AI', href: '/projects/ai' },
				{ label: 'Voyager Pay', href: '/projects/voyager-pay' },
				{ label: 'Voyager MCP', href: '/projects/voyager-mcp' }
			]
		},
		{
			title: 'BUILD/',
			links: [
				{ label: 'Start building', href: '/build' },
				{ label: 'Economics', href: '/build#economics' },
				{ label: 'Posture', href: '/build#regulatory' },
				{ label: 'Join the alpha', href: '/build#join-alpha' }
			]
		},
		{
			title: 'LEARN/',
			links: [
				{ label: 'Use cases', href: '/use-cases' },
				{ label: 'Documentation', href: '/docs' }
			]
		},
		{
			title: 'NETWORK/',
			links: [
				{ label: 'Mostro nodes', href: '/network' },
				{ label: 'Run a node', href: '/network/node' },
				{ label: 'Security model', href: '/network/security' },
				{ label: 'Principles', href: '/principles' }
			]
		}
	];
</script>

<footer class="site-footer" data-register={register}>
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
			<div class="flex flex-col gap-5">
				<a href="/" class="site-footer__wordmark font-display text-2xl">Voyager</a>
				<p class="site-footer__lede max-w-xs text-[15px] leading-relaxed">
					An open toolkit for the region's apps. Five primitives, one SDK, no platform in the middle.
				</p>
				<div class="flex items-center gap-2">
					<button
						type="button"
						class="site-footer__lang inline-flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-semibold"
					>
						<Icon name="globe" tone="ink-2" size={16} />
						English
						<span aria-hidden="true" class="text-[1.05em] leading-none">⌄</span>
					</button>
				</div>
			</div>

			{#each columns as col (col.title)}
				<nav class="flex flex-col gap-4" aria-label={col.title.replace('/', '')}>
					<p class="site-footer__eyebrow eyebrow">{col.title}</p>
					<ul class="flex flex-col gap-3">
						{#each col.links as link (link.label)}
							<li>
								<a href={link.href} class="site-footer__link inline-flex items-center gap-2 text-[15px]">
									<span aria-hidden="true" class="site-footer__bullet inline-block h-[6px] w-[6px]"></span>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			{/each}
		</div>

		<div class="mt-16 flex flex-col gap-3 site-footer__rule border-t pt-6 text-sm md:flex-row md:items-center md:justify-between">
			<p>© {new Date().getFullYear()} Voyager. Demo build.</p>
			<p>Open rails, no custody. Users hold their own keys.</p>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		background-color: var(--site-footer-bg);
		color: var(--site-footer-text);
		padding-top: 5rem;
		padding-bottom: 2.5rem;
	}

	[data-register='perk'].site-footer {
		--site-footer-bg: var(--bone-100);
		--site-footer-text: var(--ink);
		--site-footer-lede: var(--ink-2);
		--site-footer-link: var(--ink-2);
		--site-footer-link-hover: var(--ink);
		--site-footer-bullet: var(--lime);
		--site-footer-lang-bg: var(--bone-200);
		--site-footer-rule: var(--bone-200);
		--site-footer-rule-text: var(--muted);
		--site-footer-eyebrow: var(--muted);
	}

	[data-register='rasta'].site-footer {
		--site-footer-bg: var(--rasta-ground);
		--site-footer-text: var(--bone-50);
		--site-footer-lede: rgba(241, 239, 233, 0.78);
		--site-footer-link: rgba(241, 239, 233, 0.78);
		--site-footer-link-hover: var(--rasta-gold);
		--site-footer-bullet: var(--rasta-gold);
		--site-footer-lang-bg: rgba(241, 239, 233, 0.08);
		--site-footer-rule: rgba(241, 239, 233, 0.18);
		--site-footer-rule-text: rgba(241, 239, 233, 0.6);
		--site-footer-eyebrow: var(--rasta-gold);
	}

	[data-register='carnival-poster'].site-footer {
		--site-footer-bg: var(--carnival-ground);
		--site-footer-text: var(--bone-50);
		--site-footer-lede: rgba(241, 239, 233, 0.82);
		--site-footer-link: rgba(241, 239, 233, 0.82);
		--site-footer-link-hover: var(--carnival-cyan);
		--site-footer-bullet: var(--carnival-cyan);
		--site-footer-lang-bg: rgba(241, 239, 233, 0.08);
		--site-footer-rule: rgba(241, 239, 233, 0.2);
		--site-footer-rule-text: rgba(241, 239, 233, 0.6);
		--site-footer-eyebrow: var(--carnival-cyan);
	}

	[data-register='heritage-sepia'].site-footer {
		--site-footer-bg: var(--heritage-ground);
		--site-footer-text: var(--bone-50);
		--site-footer-lede: rgba(241, 239, 233, 0.78);
		--site-footer-link: rgba(241, 239, 233, 0.78);
		--site-footer-link-hover: var(--heritage-amber);
		--site-footer-bullet: var(--heritage-amber);
		--site-footer-lang-bg: rgba(241, 239, 233, 0.06);
		--site-footer-rule: rgba(241, 239, 233, 0.18);
		--site-footer-rule-text: rgba(241, 239, 233, 0.6);
		--site-footer-eyebrow: var(--heritage-amber);
	}

	[data-register='carnival-poster-white'].site-footer {
		--site-footer-bg: var(--carnival-white-card);
		--site-footer-text: var(--ink);
		--site-footer-lede: var(--ink-2);
		--site-footer-link: var(--ink-2);
		--site-footer-link-hover: var(--carnival-magenta);
		--site-footer-bullet: var(--carnival-cyan);
		--site-footer-lang-bg: rgba(20, 20, 15, 0.06);
		--site-footer-rule: rgba(20, 20, 15, 0.10);
		--site-footer-rule-text: var(--muted);
		--site-footer-eyebrow: var(--carnival-magenta);
	}

	[data-register='ocean'].site-footer {
		--site-footer-bg: var(--ocean-ground);
		--site-footer-text: var(--bone-50);
		--site-footer-lede: rgba(241, 239, 233, 0.82);
		--site-footer-link: rgba(241, 239, 233, 0.82);
		--site-footer-link-hover: var(--ocean-gold);
		--site-footer-bullet: var(--ocean-gold);
		--site-footer-lang-bg: rgba(241, 239, 233, 0.08);
		--site-footer-rule: rgba(241, 239, 233, 0.2);
		--site-footer-rule-text: rgba(241, 239, 233, 0.6);
		--site-footer-eyebrow: var(--ocean-gold);
	}

	[data-register='windies'].site-footer {
		--site-footer-bg: var(--windies-ground);
		--site-footer-text: var(--bone-50);
		--site-footer-lede: rgba(241, 239, 233, 0.78);
		--site-footer-link: rgba(241, 239, 233, 0.78);
		--site-footer-link-hover: var(--windies-gold);
		--site-footer-bullet: var(--windies-gold);
		--site-footer-lang-bg: rgba(241, 239, 233, 0.08);
		--site-footer-rule: rgba(241, 239, 233, 0.18);
		--site-footer-rule-text: rgba(241, 239, 233, 0.6);
		--site-footer-eyebrow: var(--windies-gold);
	}

	[data-register='gold-cream'].site-footer {
		--site-footer-bg: var(--goldcream-card);
		--site-footer-text: var(--ink);
		--site-footer-lede: var(--ink-2);
		--site-footer-link: var(--ink-2);
		--site-footer-link-hover: var(--goldcream-gold-ink);
		--site-footer-bullet: var(--goldcream-gold);
		--site-footer-lang-bg: rgba(58, 50, 10, 0.06);
		--site-footer-rule: rgba(58, 50, 10, 0.12);
		--site-footer-rule-text: #6E6E58;
		--site-footer-eyebrow: var(--goldcream-gold-ink);
	}

	[data-register='caribana'].site-footer {
		--site-footer-bg: var(--caribana-ground);
		--site-footer-text: var(--bone-50);
		--site-footer-lede: rgba(241, 239, 233, 0.82);
		--site-footer-link: rgba(241, 239, 233, 0.82);
		--site-footer-link-hover: var(--caribana-magenta);
		--site-footer-bullet: var(--caribana-magenta);
		--site-footer-lang-bg: rgba(241, 239, 233, 0.08);
		--site-footer-rule: rgba(241, 239, 233, 0.18);
		--site-footer-rule-text: rgba(241, 239, 233, 0.6);
		--site-footer-eyebrow: var(--caribana-violet);
	}

	[data-register='editorial'].site-footer {
		--site-footer-bg: var(--bone-100);
		--site-footer-text: var(--ink);
		--site-footer-lede: var(--ink-2);
		--site-footer-link: var(--ink-2);
		--site-footer-link-hover: var(--ink);
		--site-footer-bullet: var(--ink);
		--site-footer-lang-bg: var(--bone-200);
		--site-footer-rule: var(--bone-200);
		--site-footer-rule-text: var(--muted);
		--site-footer-eyebrow: var(--muted);
	}

	[data-register='monochrome-caribbean'].site-footer {
		--site-footer-bg: var(--mc-ground-warm);
		--site-footer-text: var(--mc-text);
		--site-footer-lede: var(--mc-muted);
		--site-footer-link: var(--mc-muted);
		--site-footer-link-hover: var(--mc-text);
		--site-footer-bullet: var(--mc-text);
		--site-footer-lang-bg: var(--mc-ground-soft);
		--site-footer-rule: var(--mc-ground-soft);
		--site-footer-rule-text: var(--mc-muted);
		--site-footer-eyebrow: var(--mc-text);
	}

	[data-register='trinidad'].site-footer {
		--site-footer-bg: var(--trinidad-red-deep);
		--site-footer-text: var(--trinidad-cream);
		--site-footer-lede: rgba(244, 232, 213, 0.85);
		--site-footer-link: rgba(244, 232, 213, 0.85);
		--site-footer-link-hover: var(--trinidad-gold);
		--site-footer-bullet: var(--trinidad-gold);
		--site-footer-lang-bg: rgba(10, 10, 10, 0.18);
		--site-footer-rule: rgba(10, 10, 10, 0.22);
		--site-footer-rule-text: rgba(244, 232, 213, 0.65);
		--site-footer-eyebrow: var(--trinidad-gold);
	}

	[data-register='orange-sun'].site-footer {
		--site-footer-bg: var(--orange-sun-deep);
		--site-footer-text: var(--orange-cream);
		--site-footer-lede: rgba(244, 232, 213, 0.88);
		--site-footer-link: rgba(244, 232, 213, 0.88);
		--site-footer-link-hover: var(--orange-yellow);
		--site-footer-bullet: var(--orange-yellow);
		--site-footer-lang-bg: rgba(0, 123, 255, 0.22);
		--site-footer-rule: rgba(0, 123, 255, 0.28);
		--site-footer-rule-text: rgba(244, 232, 213, 0.7);
		--site-footer-eyebrow: var(--orange-yellow);
	}

	[data-register='neo'].site-footer {
		--site-footer-bg: var(--neo-base-deep);
		--site-footer-text: var(--neo-cream);
		--site-footer-lede: rgba(244, 232, 213, 0.88);
		--site-footer-link: rgba(244, 232, 213, 0.88);
		--site-footer-link-hover: var(--neo-yellow);
		--site-footer-bullet: var(--neo-yellow);
		--site-footer-lang-bg: rgba(0, 123, 255, 0.22);
		--site-footer-rule: rgba(0, 123, 255, 0.28);
		--site-footer-rule-text: rgba(244, 232, 213, 0.7);
		--site-footer-eyebrow: var(--neo-yellow);
	}

	[data-register='tiffany'].site-footer {
		--site-footer-bg: var(--tiffany-blue-pale);
		--site-footer-text: var(--tiffany-ink);
		--site-footer-lede: rgba(0, 43, 92, 0.75);
		--site-footer-link: rgba(0, 43, 92, 0.75);
		--site-footer-link-hover: var(--tiffany-blue-deep);
		--site-footer-bullet: var(--tiffany-blue);
		--site-footer-lang-bg: rgba(10, 186, 181, 0.12);
		--site-footer-rule: rgba(0, 43, 92, 0.18);
		--site-footer-rule-text: rgba(0, 43, 92, 0.6);
		--site-footer-eyebrow: var(--tiffany-blue-deep);
	}

	[data-register='maroon-nights'].site-footer {
		--site-footer-bg: var(--mn-black);
		--site-footer-text: var(--mn-cream);
		--site-footer-lede: rgba(244, 232, 213, 0.82);
		--site-footer-link: rgba(244, 232, 213, 0.82);
		--site-footer-link-hover: var(--mn-gold);
		--site-footer-bullet: var(--mn-gold);
		--site-footer-lang-bg: rgba(244, 232, 213, 0.08);
		--site-footer-rule: rgba(244, 232, 213, 0.18);
		--site-footer-rule-text: rgba(244, 232, 213, 0.6);
		--site-footer-eyebrow: var(--mn-gold);
	}

	[data-register='civic-ocean'].site-footer {
		--site-footer-bg: var(--civic-ocean-ground);
		--site-footer-text: var(--civic-ocean-white);
		--site-footer-lede: rgba(250, 250, 247, 0.82);
		--site-footer-link: rgba(250, 250, 247, 0.82);
		--site-footer-link-hover: var(--civic-ocean-gold);
		--site-footer-bullet: var(--civic-ocean-gold);
		--site-footer-lang-bg: rgba(250, 250, 247, 0.08);
		--site-footer-rule: rgba(250, 250, 247, 0.2);
		--site-footer-rule-text: rgba(250, 250, 247, 0.6);
		--site-footer-eyebrow: var(--civic-ocean-gold);
	}

	[data-register='festival-poster'].site-footer {
		--site-footer-bg: var(--festival-black);
		--site-footer-text: var(--bone-50);
		--site-footer-lede: rgba(241, 239, 233, 0.82);
		--site-footer-link: rgba(241, 239, 233, 0.82);
		--site-footer-link-hover: var(--festival-yellow);
		--site-footer-bullet: var(--festival-cyan);
		--site-footer-lang-bg: rgba(241, 239, 233, 0.08);
		--site-footer-rule: rgba(241, 239, 233, 0.18);
		--site-footer-rule-text: rgba(241, 239, 233, 0.6);
		--site-footer-eyebrow: var(--festival-yellow);
	}

	.site-footer__wordmark {
		color: var(--site-footer-text);
	}

	.site-footer__lede {
		color: var(--site-footer-lede);
	}

	.site-footer__eyebrow {
		color: var(--site-footer-eyebrow) !important;
	}

	.site-footer__link {
		color: var(--site-footer-link);
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.site-footer__link:hover {
		color: var(--site-footer-link-hover);
	}

	.site-footer__bullet {
		background-color: var(--site-footer-bullet);
	}

	.site-footer__lang {
		background-color: var(--site-footer-lang-bg);
		color: var(--site-footer-text);
	}

	.site-footer__rule {
		border-color: var(--site-footer-rule);
		color: var(--site-footer-rule-text);
	}
</style>