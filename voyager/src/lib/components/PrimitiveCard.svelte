<script>
	import Icon from './Icon.svelte';
	import Divider from './Divider.svelte';

	/** @type {{ id: string, code: string, title: string, body: string, icon: string, href: string }} */
	let { id, code, title, body, icon, href } = $props();
</script>

<a
	{id}
	href={href}
	class="group flex flex-col gap-4 rounded-[28px] bg-bone-100 p-7 transition-colors hover:bg-bone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bone-50"
>
	<Icon name={icon} tone="ink" size={28} />
	<span class="font-mono text-[12px] text-muted">{code}</span>
	<h3 class="font-display text-[26px] leading-[1.05] text-ink">{title}</h3>
	<Divider />
	<p class="text-[15px] leading-relaxed text-ink-2">{body}</p>
	<span class="inline-flex items-center gap-1 text-[14px] font-semibold text-ink">
		Read more
		<span aria-hidden="true" class="text-[1.05em] leading-none transition-transform group-hover:translate-x-0.5">›</span>
	</span>
</a>
