<script>
	import { page } from '$app/state';

	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 */

	const ROOT = { label: 'Voyager', href: '/' };

	const SHORT_LABELS = {
		stack: 'Stack',
		projects: 'Projects',
		network: 'Network',
		build: 'Build',
		'use-cases': 'Use cases',
		principles: 'Principles',
		'trip-planner': 'Trip Planner',
		'voyager-pay': 'Voyager Pay',
		plan: 'Plan a trip',
		preferences: 'Preferences',
		docs: 'Docs'
	};

	/** @type {{ register?: Register }} */
	let { register = 'perk' } = $props();

	function humanize(seg) {
		return seg
			.split('-')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' | ');
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

<div data-register={register} class="breadcrumb-bar">
	<nav aria-label="Breadcrumb" class="mx-auto max-w-6xl px-6 pt-4">
		<ol class="breadcrumb-list flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px]">
			{#each crumbs as crumb, i (crumb.href)}
				{#if i > 0}
					<li aria-hidden="true" class="breadcrumb-sep text-[1.05em] leading-none">›</li>
				{/if}
				<li>
					{#if crumb.isLast}
						<span aria-current="page" class="breadcrumb-current">{crumb.label}</span>
					{:else}
						<a href={crumb.href} class="breadcrumb-link transition-colors">{crumb.label}</a>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
</div>

<style>
	.breadcrumb-bar {
		background-color: var(--register-ground);
		color: var(--register-muted);
	}
	.breadcrumb-sep {
		color: var(--register-muted);
	}
	.breadcrumb-current {
		color: var(--register-text);
	}
	.breadcrumb-link {
		color: var(--register-muted);
	}
	.breadcrumb-link:hover {
		color: var(--register-text);
	}
</style>
