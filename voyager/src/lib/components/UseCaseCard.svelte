<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 */
	/** @type {{ id: string, code: string, title: string, body: string, href: string, register?: Register }} */
	let { id, code, title, body, href, register = 'perk' } = $props();
</script>

<a
	{id}
	href={href}
	data-register={register}
	class="group flex flex-col gap-3 rounded-[24px] p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
	style="background-color: var(--register-card); color: var(--register-text);"
>
	<span class="font-mono text-[12px]" style="color: var(--register-muted);">{code}</span>
	<h3 class="font-display text-xl leading-[1.1]" style="color: var(--register-text);">{title}</h3>
	<p class="text-[14px] leading-relaxed" style="color: var(--register-on-dark-soft);">{body}</p>
	<span class="mt-1 inline-flex items-center gap-1 text-[13px] font-semibold" style="color: var(--carnival-cyan);">
		Open
		<span aria-hidden="true" class="text-[1.05em] leading-none transition-transform group-hover:translate-x-0.5">›</span>
	</span>
</a>
