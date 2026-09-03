<script>
	/**
	 * @typedef {'civic-ocean' | 'editorial' | 'rasta' | 'carnival-poster' | 'heritage-sepia'} Register
	 */
	/** @type {{ register: Register, tag?: 'div' | 'section', class?: string, children?: import('svelte').Snippet }} */
	let { register, tag = 'div', class: extra = '', children } = $props();
</script>

<svelte:element this={tag} data-register={register} class="register-section {extra}">
	{#if children}{@render children()}{/if}
</svelte:element>