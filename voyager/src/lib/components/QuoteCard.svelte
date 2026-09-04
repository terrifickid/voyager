<script>
	/** @type {{ quote: string, attribution: string, role: string }} */
	let { quote, attribution, role } = $props();
</script>

<figure class="flex flex-col gap-5 rounded-[28px] bg-[var(--register-card)] p-7">
	<svg width="28" height="22" viewBox="0 0 28 22" fill="currentColor" aria-hidden="true" style="color: var(--ink);">
		<path d="M0 22V12C0 5.4 4.6.5 11 0v4c-3.5.7-6 3.6-6 7h6v11H0zm16 0V12c0-6.6 4.6-11.5 11-12v4c-3.5.7-6 3.6-6 7h6v11H16z"/>
	</svg>
	<blockquote class="font-display text-[22px] leading-[1.2] text-[var(--register-text)]">
		{quote}
	</blockquote>
	<figcaption class="text-sm text-[var(--register-muted)]">
		<span class="font-semibold text-[var(--register-muted)]">{attribution}</span> · {role}
	</figcaption>
</figure>
