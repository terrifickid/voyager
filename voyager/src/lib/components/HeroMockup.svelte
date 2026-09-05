<script>
	import concept from '$lib/agent/fixtures/concept.json';
	import day from '$lib/agent/fixtures/day.json';
	import places from '$lib/agent/fixtures/places.json';

	const slots = day.slots.slice(0, 2);
	const featuredPlace = places[1];
	const slotLabels = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' };
	const regionLabel = 'Barbados';
</script>

<div class="relative w-full max-w-[440px] mx-auto" style="transform: rotate(-3deg);">
	<div
		class="absolute inset-0 -z-10 translate-x-6 translate-y-8 rounded-[44px]"
		style="background: var(--register-card);"
		aria-hidden="true"
	></div>

	<div
		class="relative rounded-[44px] p-3"
		style="background: var(--register-card); box-shadow: 0 28px 60px -28px rgba(20,20,15,0.35);"
	>
		<div class="rounded-[36px] overflow-hidden bg-bone-50">
			<div class="flex items-center justify-between px-5 pt-4 pb-2">
				<div class="flex items-center gap-1.5">
					<span class="h-2 w-2 rounded-full" style="background: var(--bone-300);"></span>
					<span class="h-2 w-2 rounded-full" style="background: var(--bone-300);"></span>
					<span class="h-2 w-2 rounded-full" style="background: var(--bone-300);"></span>
				</div>
				<span class="text-[10px] font-semibold text-[var(--register-muted)]">Voyager</span>
				<span class="text-[10px] text-[var(--register-muted)]">9:41</span>
			</div>

			<div class="px-5 pt-3 pb-5 flex flex-col gap-4">
				<div class="flex items-center justify-between">
					<span class="eyebrow">Your trip · Day 1</span>
					<span
						class="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[10px] font-semibold"
						style="background: var(--lime); color: var(--lime-ink);"
					>
						<span class="h-1.5 w-1.5 rounded-full" style="background: var(--ink);"></span>
						Today
					</span>
				</div>

				<div>
					<h3 class="font-display text-[22px] text-[var(--register-text)] leading-[1.05]">{concept.title}</h3>
					<p class="mt-1.5 text-[12px] text-[var(--register-muted)] leading-snug">{concept.summary}</p>
				</div>

				<div class="flex flex-col gap-2">
					{#each slots as slot (slot.label)}
						<div class="rounded-2xl bg-[var(--register-card)] p-3">
							<div class="flex items-center justify-between">
								<span class="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--register-muted)]">
									{slotLabels[slot.label] ?? slot.label}
								</span>
								<span class="text-[10px] text-[var(--register-muted)]">{regionLabel}</span>
							</div>
							<div class="mt-1.5 flex flex-col gap-1.5">
								{#if slot.eat}
									<div class="flex items-baseline justify-between gap-2">
										<span class="text-[12px] font-semibold text-[var(--register-text)]">{slot.eat.name}</span>
										<span class="text-[10px] text-[var(--register-muted)]">Eat</span>
									</div>
								{/if}
								{#if slot.do}
									<div class="flex items-baseline justify-between gap-2">
										<span class="text-[12px] font-semibold text-[var(--register-text)]">{slot.do.name}</span>
										<span class="text-[10px] text-[var(--register-muted)]">Do</span>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>

				{#if featuredPlace}
					<div class="rounded-2xl bg-[var(--register-card)] p-3">
						<div class="flex items-baseline justify-between gap-2">
							<span class="text-[12px] font-semibold text-[var(--register-text)]">{featuredPlace.name}</span>
							<span class="text-[10px] text-[var(--register-muted)]">
								{'★'.repeat(Math.round(featuredPlace.rating))}
							</span>
						</div>
						<p class="mt-0.5 text-[10px] text-[var(--register-muted)]">{featuredPlace.kind} · {featuredPlace.address}</p>
						<div class="mt-2 flex flex-wrap gap-1">
							{#each featuredPlace.tags as t (t)}
								<span
									class="rounded-pill bg-[var(--register-card)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[var(--register-muted)]"
								>
									{t}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
