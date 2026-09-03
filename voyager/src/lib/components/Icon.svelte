<script>
	/**
	 * @typedef {'violet' | 'coral' | 'sky' | 'rose' | 'ink'} Tone
	 */
	/** @type {{ name: string, tone?: Tone, class?: string, size?: number }} */
	let { name, tone = 'violet', class: extra = '', size = 28 } = $props();

	const toneFill = {
		violet: 'var(--pastel-violet)',
		coral: 'var(--pastel-coral)',
		sky: 'var(--pastel-sky)',
		rose: 'var(--pastel-rose)',
		ink: 'var(--register-text)'
	};
</script>

<span
	class="inline-flex shrink-0 items-center justify-center {extra}"
	style="width:{size}px;height:{size}px;color:{toneFill[tone]}"
	aria-hidden="true"
>
	{#if name === 'map-pin'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M12 2c-4.4 0-8 3.5-8 7.8 0 5.6 7.2 12 7.5 12.2.3.2.7.2 1 0 .3-.2 7.5-6.6 7.5-12.2C20 5.5 16.4 2 12 2zm0 10.7a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8z"/></svg>
	{:else if name === 'calendar'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm-2 8h14v10H5V10z"/></svg>
	{:else if name === 'sparkle'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M12 2 13.8 8.2 20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2zm7 11 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3zM6 14l.8 2.2L9 17l-2.2.8L6 20l-.8-2.2L3 17l2.2-.8L6 14z"/></svg>
	{:else if name === 'compass'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 7.7 6H17a5 5 0 0 0-4.9-4 5 5 0 0 0-4.9 4H4.3A8 8 0 0 1 12 4zm-6.2 8h2.4l1.2 3.6L12 13l2.6 2.6L16.2 12h2.4a8 8 0 0 1-13.4 0 8 8 0 0 1-.4 0z"/></svg>
	{:else if name === 'leaf'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M20 2S8 2 4 8s-2 12 4 14c4 1 9-2 11-7 2-5 1-13 1-13zm-2.5 3.6c-1 5.4-3.7 11-8 12.5-2.5.8-5 .2-6.3-1.7-1.2-1.7-1-4.4.8-7C5.7 6.4 10 4.4 17.5 5.6zM9 13.5c.6-.7 1.5-1 2.3-1 .4 0 .8.3.8.8 0 .3-.1.6-.3.8-.6.7-1.5 1-2.3 1-.4 0-.8-.3-.8-.8 0-.3.1-.5.3-.8z"/></svg>
	{:else if name === 'chat'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
	{:else if name === 'share'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M14 9V5l8 7-8 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z"/></svg>
	{:else if name === 'save'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M5 3h14a2 2 0 0 1 2 2v16l-9-4-9 4V5a2 2 0 0 1 2-2zm2 3v8l5-2 5 2V6H7z"/></svg>
	{:else if name === 'lock'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M6 10V8a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h1zm2 0h8V8a4 4 0 1 0-8 0v2zm4 4a2 2 0 0 0-1 3.7V20h2v-2.3a2 2 0 0 0-1-3.7z"/></svg>
	{:else if name === 'bolt'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg>
	{:else if name === 'globe'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2c1.2 0 2.7 1.6 3.6 4H8.4C9.3 5.6 10.8 4 12 4zM4 12c0-.7.1-1.4.3-2H8c-.1.7-.1 1.3-.1 2s0 1.3.1 2H4.3c-.2-.6-.3-1.3-.3-2zm1.7 4h2.6c.3 1.4.8 2.7 1.4 3.7A8 8 0 0 1 5.7 16zM8.4 10c-.1.7-.1 1.3-.1 2s0 1.3.1 2H6.1A8 8 0 0 1 5.7 12c0-1.4.1-1.7.4-2h2.3zm.3 4h6.6c.3 1.4.8 2.7 1.4 3.7A8 8 0 0 1 12 20c-1.2 0-2.7-1.6-3.6-4H8.7zm0-8c.9-2.4 2.4-4 3.6-4 1.4 0 2.8 1.6 3.6 4H8.7zm5 12c.6-1 1.1-2.3 1.4-3.7h2.6A8 8 0 0 1 13.7 18zm3.9-5.7H15.5c.1-.7.1-1.3.1-2s0-1.3-.1-2h2.1c.2.6.4 1.3.4 2s-.2 1.4-.4 2z"/></svg>
	{:else if name === 'check'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M9.5 17.5 4 12l1.4-1.4 4.1 4.1 9.1-9.1L20 7l-10.5 10.5z"/></svg>
	{:else if name === 'plane'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5L21 16z"/></svg>
	{:else if name === 'bed'}
		<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M2 7v13h2v-3h16v3h2v-9a4 4 0 0 0-4-4H8V5H2v2zm6 2h10a2 2 0 0 1 2 2v4H6V9h2z"/></svg>
	{/if}
</span>
