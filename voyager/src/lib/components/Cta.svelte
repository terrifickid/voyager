<script>
	/**
	 * @typedef {'primary' | 'secondary' | 'tertiary'} Variant
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster'} Register
	 */
	/** @type {{ variant?: Variant, register?: Register, href?: string, type?: 'button' | 'submit', onclick?: (e: MouseEvent) => void, disabled?: boolean, class?: string, children?: import('svelte').Snippet }} */
	let {
		variant = 'primary',
		register = 'perk',
		href = undefined,
		type = 'button',
		onclick = undefined,
		disabled = false,
		class: extra = '',
		children = undefined
	} = $props();

	const basePill =
		'inline-flex items-center gap-2 rounded-pill px-5 py-3 text-[15px] font-semibold leading-none transition-colors';

	const primaryCls =
		'cta-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
	const secondaryCls =
		'cta-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
	const tertiaryCls = 'cta-tertiary';

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

<style>
	.cta-primary {
		background-color: var(--register-accent);
		color: var(--register-accent-ink);
	}
	.cta-primary:hover {
		/* Registers without a hover token keep the old dimmed-accent behavior */
		background-color: var(
			--register-accent-hover,
			color-mix(in srgb, var(--register-accent) 92%, black)
		);
	}

	.cta-secondary {
		background-color: transparent;
		color: var(--register-text);
		border: 1.5px solid var(--register-text);
	}
	.cta-secondary:hover {
		background-color: var(--register-text);
		color: var(--register-ground);
	}

	.cta-tertiary {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--register-text);
		text-decoration: underline;
		text-underline-offset: 4px;
		text-decoration-thickness: 1.5px;
	}
	.cta-tertiary:hover {
		color: var(--register-muted);
	}
</style>