<script>
	/** @type {{ id: string, code: string, title: string, body: string, href: string }} */
	let { id, code, title, body, href } = $props();
</script>

<a
	{id}
	href={href}
	class="group flex flex-col gap-3 rounded-[24px] bg-bone-100 p-6 transition-colors hover:bg-bone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bone-50"
>
	<span class="font-mono text-[12px] text-muted">{code}</span>
	<h3 class="font-display text-xl leading-[1.1] text-ink">{title}</h3>
	<p class="text-[14px] leading-relaxed text-ink-2">{body}</p>
	<span class="mt-1 inline-flex items-center gap-1 text-[13px] font-semibold text-ink">
		Open
		<span aria-hidden="true" class="text-[1.05em] leading-none transition-transform group-hover:translate-x-0.5">›</span>
	</span>
</a>
