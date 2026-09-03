<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia'} Register
	 */
	/** @type {{ register: Register, tag?: 'div' | 'section', class?: string, children?: import('svelte').Snippet }} */
	let { register, tag = 'div', class: extra = '', children } = $props();
</script>

<svelte:element this={tag} data-register={register} class="register-section {extra}">
	{#if children}{@render children()}{/if}
</svelte:element>