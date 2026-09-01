<script>
	let { contentEl } = $props();

	let headings = $state([]);
	let activeId = $state('');

	$effect(() => {
		if (!contentEl) return;
		const found = Array.from(contentEl.querySelectorAll('h2, h3'))
			.filter((h) => h.id)
			.map((h) => ({
				id: h.id,
				text: h.textContent.trim(),
				level: h.tagName === 'H2' ? 2 : 3
			}));
		headings = found;

		if (found.length === 0) return;
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting);
				if (visible.length > 0) activeId = visible[0].target.id;
			},
			{ rootMargin: '-80px 0px -70% 0px', threshold: 0 }
		);
		found.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	});
</script>

{#if headings.length > 0}
	<nav aria-label="On this page">
		<h2 class="text-xs font-semibold tracking-wider uppercase text-ink">On this page</h2>
		<ul class="mt-3 flex flex-col gap-2 border-l border-bone-200 text-sm text-ink-2">
			{#each headings as h (h.id)}
				<li
					class="-ml-px border-l border-transparent pl-3 {activeId === h.id
						? 'border-ink'
						: ''}"
				>
					<a
						href={`#${h.id}`}
						aria-current={activeId === h.id ? 'location' : undefined}
						class="block {h.level === 3
							? 'pl-3'
							: ''} hover:text-ink {activeId === h.id ? 'text-ink font-medium' : ''}"
					>
						{h.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	nav {
		font-size: 0.8125rem;
	}
</style>
