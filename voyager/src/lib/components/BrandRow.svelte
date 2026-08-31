<script>
	const marks = ['Atelier', 'Northwind', 'Saltline', 'Fieldnote', 'Vista Co.', 'Halo Travel'];
</script>

<section class="flex flex-col gap-6">
	<p class="eyebrow text-center">Loved by travelers who hate planning trips</p>
	<ul class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
		{#each marks as m (m)}
			<li
				class="font-display text-[20px] tracking-tight"
				style="color: var(--muted);"
			>{m}</li>
		{/each}
	</ul>
</section>
