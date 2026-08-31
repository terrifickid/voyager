<script>
	import { page } from '$app/state';

	const ROOT = { label: 'Voyager', href: '/' };

	const SHORT_LABELS = {
		plan: 'Plan',
		preferences: 'Preferences',
		docs: 'Docs',
		pay: 'Voyager Pay'
	};

	function humanize(seg) {
		return seg
			.split('-')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
	}

	function labelFor(seg) {
		return SHORT_LABELS[seg] ?? humanize(seg);
	}

	function buildCrumbs(pathname) {
		const segs = pathname.split('/').filter(Boolean);
		const trail = segs.map((s, i, arr) => {
			const path = '/' + segs.slice(0, i + 1).join('/');
			return { label: labelFor(s), href: path, isLast: i === arr.length - 1 };
		});
		const isHome = pathname === '/' || pathname === '';
		const rootCrumb = { ...ROOT, isLast: isHome };
		if (isHome) return [rootCrumb];
		return [rootCrumb, ...trail];
	}

	const crumbs = $derived(buildCrumbs(page.url.pathname));
</script>

<nav aria-label="Breadcrumb" class="mx-auto max-w-6xl px-6 pt-4">
	<ol class="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-muted">
		{#each crumbs as crumb, i (crumb.href)}
			{#if i > 0}
				<li aria-hidden="true" class="text-[1.05em] leading-none text-bone-400">›</li>
			{/if}
			<li>
				{#if crumb.isLast}
					<span aria-current="page" class="text-ink">{crumb.label}</span>
				{:else}
					<a href={crumb.href} class="hover:text-ink transition-colors">{crumb.label}</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
