<script>
	/** @type {{ value: string, label: string }} */
	let { value, label } = $props();
</script>

<div class="flex flex-col gap-2">
	<span class="font-display text-[56px] sm:text-[80px] lg:text-[96px] leading-[0.95] text-bone-50">
		{value}
	</span>
	<span class="text-[11px] font-semibold tracking-[0.14em] uppercase text-bone-50/70">
		{label}
	</span>
</div>
