<script>
	import { page } from '$app/state';
	import Cta from './Cta.svelte';

	/**
	 * @typedef {'civic-ocean' | 'editorial' | 'rasta' | 'carnival-poster' | 'heritage-sepia'} Register
	 */
	/** @type {{ register?: Register }} */
	let { register = 'civic-ocean' } = $props();

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
		{ href: '/docs', label: 'Docs' }
	];
</script>

<header class="site-header" data-register={register}>
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<a href="/" class="site-header__wordmark font-display text-2xl">Voyager</a>
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

	[data-register='civic-ocean'].site-header {
		--site-header-bg: rgba(233, 230, 221, 0.9);
		--site-header-text: var(--ink);
	}

	[data-register='editorial'].site-header {
		--site-header-bg: var(--bone-50);
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

	.site-header__wordmark {
		color: var(--site-header-text);
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