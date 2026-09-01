<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { log, EVENT, serializeError } from '$lib/logger.js';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let { children } = $props();

	let errorHandlersInstalled = false;
	if (browser && !errorHandlersInstalled) {
		errorHandlersInstalled = true;
		const glog = log.child({ component: 'app', function: 'global-errors' });
		window.onerror = (message, source, lineno, colno, error) => {
			glog.error(
				{
					type: EVENT.UNCAUGHT_EXCEPTION,
					route: page.url.pathname,
					source,
					lineno,
					colno,
					err: serializeError(error ?? new Error(String(message)), { function: 'window.onerror' })
				},
				`Uncaught exception: ${message}`
			);
		};
		window.onunhandledrejection = (event) => {
			const reason = event?.reason;
			glog.error(
				{
					type: EVENT.UNHANDLED_REJECTION,
					route: page.url.pathname,
					err: serializeError(reason, { function: 'window.onunhandledrejection' })
				},
				`Unhandled rejection: ${reason?.message ?? reason}`
			);
		};
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex min-h-screen flex-col bg-bone-50 text-ink-2">
	<Header />
	<main class="flex-1">
		{#if page.url.pathname !== '/'}
			<Breadcrumbs />
		{/if}
		{@render children()}
	</main>
	<Footer />
</div>
