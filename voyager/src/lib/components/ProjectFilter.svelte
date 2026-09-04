<script>
	import ProjectCard from './ProjectCard.svelte';

	let { items, categories, register = 'carnival-poster' } = $props();

	const LABELS = {
		all: 'All',
		ai: 'AI',
		payments: 'Payments',
		marketplace: 'Marketplace',
		concierge: 'Concierge',
		logistics: 'Logistics',
		social: 'Social'
	};

	let search = $state('');
	let active = $state('all');

	let visible = $derived(
		items.filter((item) => {
			const matchesCategory = active === 'all' || item.category === active;
			const needle = search.trim().toLowerCase();
			if (needle === '') return matchesCategory;
			const haystack = [item.title, item.body, ...(item.tags ?? [])].join(' ').toLowerCase();
			return matchesCategory && haystack.includes(needle);
		})
	);
</script>

<div class="flex flex-col gap-6">
	<div class="flex flex-col gap-4">
		<label class="sr-only" for="project-filter-search">Search apps</label>
		<input
			id="project-filter-search"
			type="search"
			placeholder="Search apps"
			bind:value={search}
			class="w-full rounded-pill px-5 py-3 text-[15px] leading-none text-[var(--register-text)] placeholder:text-[var(--register-muted)] outline-none transition-colors focus:ring-2 focus:ring-offset-2"
			style="background-color: var(--register-card); border: 1.5px solid var(--register-hair);"
		/>

		<div class="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
			{#each categories as cat (cat)}
				{@const isActive = active === cat}
				<button
					type="button"
					onclick={() => (active = cat)}
					aria-pressed={isActive}
					class="inline-flex items-center rounded-pill px-4 py-2 text-[13px] font-semibold leading-none transition-colors"
					style={isActive
						? 'background-color: var(--register-accent); color: var(--register-accent-ink); border: 1.5px solid var(--register-accent);'
						: 'background-color: var(--register-card); color: var(--register-text); border: 1.5px solid var(--register-hair);'}
				>
					{LABELS[cat] ?? cat}
				</button>
			{/each}
		</div>
	</div>

	{#if visible.length === 0}
		<p class="text-[15px] text-[var(--register-muted)]">No apps match that filter.</p>
	{:else}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each visible as item (item.slug)}
				<ProjectCard
					slug={item.slug}
					code={item.code}
					title={item.title}
					body={item.body}
					href={item.href}
					{register}
				/>
			{/each}
		</div>
	{/if}
</div>
