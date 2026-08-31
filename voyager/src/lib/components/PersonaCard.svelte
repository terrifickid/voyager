<script>
	import Icon from './Icon.svelte';
	import Cta from './Cta.svelte';

	/** @type {{ icon: string, tone?: 'violet' | 'coral' | 'sky' | 'rose', eyebrow: string, title: string, body: string, ctaLabel: string, ctaHref: string }} */
	let { icon, tone = 'violet', eyebrow, title, body, ctaLabel, ctaHref } = $props();
</script>

<article class="flex flex-col gap-4 rounded-[28px] bg-bone-200 p-7">
	<Icon name={icon} {tone} size={32} />
	<span class="eyebrow">{eyebrow}</span>
	<h3 class="font-display text-[28px] text-ink leading-[1.05]">{title}</h3>
	<p class="text-[15px] leading-relaxed text-ink-2">{body}</p>
	<div class="mt-2">
		<Cta variant="secondary" href={ctaHref}>{ctaLabel}</Cta>
	</div>
</article>
