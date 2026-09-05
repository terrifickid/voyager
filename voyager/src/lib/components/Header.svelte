<script>
	import { page } from '$app/state';
	import Cta from './Cta.svelte';
	import FooterBars from './FooterBars.svelte';

	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 */
	/** @type {{ register?: Register }} */
	let { register = 'perk' } = $props();

	function isActive(path, exact = false) {
		const current = page.url.pathname;
		if (exact) return current === path;
		return current === path || current.startsWith(path + '/');
	}

	const links = [
		{ href: '/stack', label: 'Stack' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/use-cases', label: 'Use cases' },
		{ href: '/network', label: 'Network' },
		{ href: '/build', label: 'Build' }
	];

	const palettes = {
		'perk': ['var(--night-900)', 'var(--night-800)', 'transparent'],
		rasta: ['var(--rasta-red)', 'var(--rasta-gold)', 'var(--rasta-green)'],
		'carnival-poster': ['var(--carnival-cyan)', 'var(--carnival-magenta)', 'var(--carnival-gold)'],
		'carnival-poster-white': ['var(--carnival-magenta)', 'var(--carnival-cyan)', 'var(--carnival-gold)'],
		ocean: ['var(--ocean-gold)', 'var(--night-800)', 'var(--teal-bright)'],
		windies: ['var(--windies-maroon)', 'var(--windies-gold)', 'var(--bone-50)'],
		'gold-cream': ['var(--goldcream-gold)', 'var(--ink)', 'var(--goldcream-card)'],
		caribana: ['var(--caribana-magenta)', 'var(--caribana-violet)', 'var(--bone-50)'],
		'heritage-sepia': ['var(--heritage-sepia)', 'var(--heritage-rust)', 'var(--heritage-amber)'],
		editorial: ['var(--ink)', 'var(--ink-2)', 'var(--muted)'],
		'civic-ocean': ['var(--civic-ocean-gold)', 'var(--civic-ocean-white)', 'var(--civic-ocean-gold-deep)'],
		'festival-poster': ['var(--festival-cyan)', 'var(--festival-yellow)', 'var(--festival-orange)'],
		'monochrome-caribbean': ['var(--mc-text)', 'var(--mc-ink-soft)', 'var(--mc-ground-soft)'],
		'trinidad': ['var(--trinidad-red)', 'var(--trinidad-gold)', 'var(--trinidad-green)'],
		'orange-sun': ['var(--orange-sun)', 'var(--orange-blue)', 'var(--orange-sun-deep)'],
		neo: ['var(--neo-base)', 'var(--neo-blue)', 'var(--neo-base-deep)'],
		tiffany: ['var(--tiffany-blue)', 'var(--tiffany-gold)', 'var(--tiffany-blue-deep)'],
		'maroon-nights': ['var(--mn-gold)', 'var(--mn-cream)', 'var(--mn-gold-warm)']
	};
	const bars = $derived(palettes[register] ?? palettes['perk']);

	const brandmarkHeights = [14, 20, 26, 18, 24, 16, 22, 28];
</script>

<header class="site-header" data-register={register}>
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<a href="/" class="site-header__brandmark flex items-center gap-3">
			<span class="site-header__brandmark-bars">
				<FooterBars {bars} heights={brandmarkHeights} barWidth={4} containerHeight={28} gap={3} />
			</span>
			<span class="site-header__wordmark font-display text-2xl">Voyager</span>
		</a>
		<ul class="hidden items-center gap-8 md:flex">
			{#each links as link (link.href)}
				{@const active = isActive(link.href, link.exact)}
				<li>
					<a
						href={link.href}
						class="site-header__link text-[15px] font-medium {active
							? 'is-active'
							: ''}"
						aria-current={active ? 'page' : undefined}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
		<Cta variant="primary" href="/build">Start building</Cta>
	</nav>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 50;
		background-color: var(--site-header-bg);
		color: var(--site-header-text);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
	}

	[data-register='perk'].site-header {
		--site-header-bg: rgba(233, 230, 221, 0.9);
		--site-header-text: var(--ink);
	}

	[data-register='rasta'].site-header {
		--site-header-bg: var(--rasta-ground);
		--site-header-text: var(--bone-50);
	}

	[data-register='carnival-poster'].site-header {
		--site-header-bg: var(--carnival-ground);
		--site-header-text: var(--bone-50);
	}

	[data-register='heritage-sepia'].site-header {
		--site-header-bg: var(--heritage-ground);
		--site-header-text: var(--bone-50);
	}

	[data-register='carnival-poster-white'].site-header {
		--site-header-bg: var(--carnival-white-ground);
		--site-header-text: var(--ink);
	}

	[data-register='ocean'].site-header {
		--site-header-bg: var(--ocean-ground);
		--site-header-text: var(--bone-50);
	}

	[data-register='windies'].site-header {
		--site-header-bg: var(--windies-ground);
		--site-header-text: var(--bone-50);
	}

	[data-register='gold-cream'].site-header {
		--site-header-bg: var(--goldcream-ground);
		--site-header-text: var(--ink);
	}

	[data-register='caribana'].site-header {
		--site-header-bg: var(--caribana-ground);
		--site-header-text: var(--bone-50);
	}

	[data-register='editorial'].site-header {
		--site-header-bg: rgba(241, 239, 233, 0.9);
		--site-header-text: var(--ink);
	}

	[data-register='monochrome-caribbean'].site-header {
		--site-header-bg: rgba(200, 200, 196, 0.92);
		--site-header-text: var(--mc-text);
	}

	[data-register='trinidad'].site-header {
		--site-header-bg: rgba(206, 17, 38, 0.94);
		--site-header-text: var(--trinidad-cream);
	}

	[data-register='orange-sun'].site-header {
		--site-header-bg: rgba(255, 105, 0, 0.94);
		--site-header-text: var(--orange-cream);
	}

	[data-register='neo'].site-header {
		--site-header-bg: rgba(255, 27, 107, 0.94);
		--site-header-text: var(--neo-cream);
	}

	[data-register='tiffany'].site-header {
		--site-header-bg: rgba(230, 247, 247, 0.92);
		--site-header-text: var(--tiffany-ink);
	}

	[data-register='maroon-nights'].site-header {
		--site-header-bg: rgba(0, 0, 0, 0.94);
		--site-header-text: var(--mn-cream);
	}

	[data-register='civic-ocean'].site-header {
		--site-header-bg: var(--civic-ocean-ground);
		--site-header-text: var(--civic-ocean-white);
	}

	[data-register='festival-poster'].site-header {
		--site-header-bg: var(--festival-black);
		--site-header-text: var(--bone-50);
	}

	.site-header__wordmark {
		color: var(--site-header-text);
	}

	.site-header__brandmark {
		text-decoration: none;
		color: var(--site-header-text);
	}

	.site-header__brandmark-bars {
		display: inline-flex;
		align-items: center;
		height: 28px;
	}

	.site-header__link {
		color: color-mix(in srgb, var(--site-header-text) 75%, transparent);
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.site-header__link:hover {
		color: var(--site-header-text);
	}

	.site-header__link.is-active {
		color: var(--site-header-text);
		text-decoration: underline;
		text-underline-offset: 6px;
		text-decoration-thickness: 1.5px;
	}
</style>