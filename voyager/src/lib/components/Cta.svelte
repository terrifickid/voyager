<script>
	/**
	 * @typedef {'primary' | 'secondary' | 'tertiary'} Variant
	 */
	/** @type {{ variant?: Variant, href?: string, type?: 'button' | 'submit', onclick?: (e: MouseEvent) => void, disabled?: boolean, class?: string, children?: import('svelte').Snippet }} */
	let { variant = 'primary', href = undefined, type = 'button', onclick = undefined, disabled = false, class: extra = '', children = undefined } = $props();

	const basePill =
		'inline-flex items-center gap-2 rounded-pill px-5 py-3 text-[15px] font-semibold leading-none transition-colors';
	const primaryCls =
		'bg-lime text-lime-ink hover:bg-bone-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bone-50';
	const secondaryCls =
		'bg-transparent text-ink border-[1.5px] border-ink hover:bg-ink hover:text-bone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bone-50';
	const tertiaryCls =
		'inline-flex items-center gap-1.5 text-ink underline underline-offset-4 decoration-[1.5px] hover:text-ink-2';

	const variantCls = $derived(
		variant === 'primary'
			? primaryCls
			: variant === 'secondary'
				? secondaryCls
				: tertiaryCls
	);

	const sizeCls = $derived(variant === 'tertiary' ? '' : basePill);
</script>

{#if href}
	<a {href} class="{sizeCls} {variantCls} {extra}">
		{#if children}{@render children()}{/if}
		<span aria-hidden="true" class={variant === 'tertiary' ? 'text-[1.1em] leading-none' : 'text-[1.05em] leading-none -mr-0.5'}>›</span>
	</a>
{:else}
	<button
		{type}
		{disabled}
		{onclick}
		class="{sizeCls} {variantCls} disabled:cursor-not-allowed disabled:opacity-50 {extra}"
	>
		{#if children}{@render children()}{/if}
		<span aria-hidden="true" class={variant === 'tertiary' ? 'text-[1.1em] leading-none' : 'text-[1.05em] leading-none -mr-0.5'}>›</span>
	</button>
{/if}
