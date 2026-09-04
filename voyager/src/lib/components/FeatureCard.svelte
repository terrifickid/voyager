<script>
	import Icon from './Icon.svelte';

	/** @type {{ icon: string, tone?: 'violet' | 'coral' | 'sky' | 'rose', eyebrow: string, title: string, body: string }} */
	let { icon, tone = 'violet', eyebrow, title, body } = $props();
</script>

<article class="flex flex-col gap-4 rounded-[28px] p-7" style="background-color: var(--register-card);">
	<Icon name={icon} {tone} size={32} />
	<span class="eyebrow">{eyebrow}</span>
	<h3 class="font-display text-[28px] text-[var(--register-text)] leading-[1.05]">{title}</h3>
	<p class="text-[15px] leading-relaxed text-[var(--register-muted)]">{body}</p>
</article>
