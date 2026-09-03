<script>
	/**
	 * @typedef {'civic-ocean' | 'editorial' | 'rasta' | 'carnival-poster' | 'heritage-sepia'} Register
	 */
	/** @type {{ register?: Register }} */
	let { register = 'civic-ocean' } = $props();

	import Icon from './Icon.svelte';
	import FooterBars from './FooterBars.svelte';

	const palettes = {
		'civic-ocean': ['var(--night-900)', 'var(--night-800)', 'transparent'],
		editorial: ['var(--ink)', 'var(--bone-300)', 'var(--bone-200)'],
		rasta: ['var(--rasta-red)', 'var(--rasta-gold)', 'var(--rasta-green)'],
		'carnival-poster': ['var(--carnival-cyan)', 'var(--carnival-magenta)', 'var(--carnival-gold)'],
		'heritage-sepia': ['var(--heritage-sepia)', 'var(--heritage-rust)', 'var(--heritage-amber)']
	};
	const bars = $derived(palettes[register] ?? palettes['civic-ocean']);

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

<footer class="site-footer" data-register={register}>
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
			<div class="flex flex-col gap-5">
				<a href="/" class="site-footer__wordmark font-display text-2xl">Voyager</a>
				<p class="site-footer__lede max-w-xs text-[15px] leading-relaxed">
					An open toolkit for building Caribbean-first apps. Five primitives, one SDK, no platform in the middle.
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

		<div class="mt-8">
			<FooterBars {bars} />
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

	[data-register='civic-ocean'].site-footer {
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

	[data-register='editorial'].site-footer {
		--site-footer-bg: var(--bone-50);
		--site-footer-text: var(--ink);
		--site-footer-lede: var(--ink-2);
		--site-footer-link: var(--ink-2);
		--site-footer-link-hover: var(--ink);
		--site-footer-bullet: var(--ink);
		--site-footer-lang-bg: var(--bone-200);
		--site-footer-rule: var(--bone-200);
		--site-footer-rule-text: var(--muted);
		--site-footer-eyebrow: var(--ink);
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