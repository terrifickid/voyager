<script>
	import { page } from '$app/state';
	import Cta from './Cta.svelte';

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

<header class="sticky top-0 z-50 bg-bone-100/90 backdrop-blur">
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<a href="/" class="font-display text-2xl text-ink">Voyager</a>
		<ul class="hidden items-center gap-8 md:flex">
			{#each links as link (link.href)}
				{@const active = isActive(link.href, link.exact)}
				<li>
					<a
						href={link.href}
						class="text-[15px] font-medium text-ink-2 hover:text-ink {active
							? 'text-ink underline underline-offset-[6px] decoration-[1.5px]'
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
