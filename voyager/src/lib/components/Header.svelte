<script>
	import { page } from '$app/state';

	function isActive(path, exact = false) {
		const current = page.url.pathname;
		if (exact) return current === path;
		return current === path || current.startsWith(path + '/');
	}

	const links = [
		{ href: '/', label: 'Home', exact: true },
		{ href: '/chat', label: 'Chat', exact: false },
		{ href: '/preferences', label: 'Preferences', exact: true }
	];
</script>

<header class="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
	<nav class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
		<a href="/" class="text-lg font-semibold text-slate-100 hover:text-white">Voyager</a>
		<ul class="flex items-center gap-1">
			{#each links as link (link.href)}
				{@const active = isActive(link.href, link.exact)}
				<li>
					<a
						href={link.href}
						class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors {active
							? 'bg-slate-800 text-white'
							: 'text-slate-300 hover:bg-slate-800/60 hover:text-white'}"
						aria-current={active ? 'page' : undefined}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>