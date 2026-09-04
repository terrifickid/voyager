<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 */
	/** @type {{ slug: string, code: string, title: string, body: string, href: string, register?: Register }} */
	let { slug, code, title, body, href, register = 'carnival-poster' } = $props();
</script>

<a
	{href}
	class="group flex flex-col gap-4 rounded-[32px] bg-[var(--register-card)] p-8 transition-colors hover:bg-[var(--register-hair)]"
	data-register={register}
	data-slug={slug}
>
	<div class="flex items-center justify-between">
		<span class="eyebrow">{code}</span>
		<span class="font-mono text-[12px] text-[var(--register-muted)]">live</span>
	</div>
	<h2 class="font-display text-[36px] leading-[1.05] text-[var(--register-text)]">{title}</h2>
	<p class="text-[15px] leading-relaxed text-[var(--register-muted)]">
		{body}
	</p>
	<span class="mt-2 inline-flex items-center gap-1 text-[14px] font-semibold text-[var(--register-text)]">
		Open {title}
		<span aria-hidden="true" class="text-[1.05em] leading-none transition-transform group-hover:translate-x-0.5">›</span>
	</span>
</a>
