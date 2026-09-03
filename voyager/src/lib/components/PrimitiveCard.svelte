<script>
	import Icon from './Icon.svelte';
	import Divider from './Divider.svelte';

	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia'} Register
	 */
	/** @type {{ id: string, code: string, title: string, body: string, icon: string, href: string, register?: Register }} */
	let { id, code, title, body, icon, href, register = 'perk' } = $props();
</script>

<a
	{id}
	{href}
	data-register={register}
	class="group flex flex-col gap-4 rounded-[28px] p-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
	style="background-color: var(--register-card); color: var(--register-text);"
>
	<Icon name={icon} tone="ink" size={28} />
	<span class="font-mono text-[12px]" style="color: var(--register-muted);">{code}</span>
	<h3 class="font-display text-[26px] leading-[1.05]" style="color: var(--register-text);">{title}</h3>
	<Divider />
	<p class="text-[15px] leading-relaxed" style="color: var(--register-on-dark-soft);">{body}</p>
	<span class="inline-flex items-center gap-1 text-[14px] font-semibold" style="color: var(--carnival-cyan);">
		Read more
		<span aria-hidden="true" class="text-[1.05em] leading-none transition-transform group-hover:translate-x-0.5">›</span>
	</span>
</a>
