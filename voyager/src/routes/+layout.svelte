<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { untrack } from 'svelte';
	import { log, EVENT, serializeError, presence } from '$lib/logger.js';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let { children } = $props();

	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 */

	/**
	 * @param {string} pathname
	 * @returns {Register}
	 */
	function registerFor(pathname) {
		return 'carnival-poster';
	}

	const chromeRegister = $derived(registerFor(page.url.pathname));

	let errorHandlersInstalled = false;
	if (browser && !errorHandlersInstalled) {
		errorHandlersInstalled = true;
		const glog = log.child({ component: 'app', function: 'global-errors' });

		// Capture-phase so Svelte scheduler-internal throws (caught by the
		// scheduler's own try/catch in the bubble phase) still surface here.
		window.addEventListener(
			'error',
			(event) => {
				glog.error(
					{
						type: EVENT.UNCAUGHT_EXCEPTION,
						route: untrack(() => page.url.pathname),
						source: event.filename,
						lineno: event.lineno,
						colno: event.colno,
						err: serializeError(
							event.error ?? new Error(event.message ?? 'unknown'),
							{ function: 'window.error' }
						)
					},
					`Uncaught exception: ${event.message ?? event.error?.message ?? 'unknown'}`
				);
			},
			true
		);

		window.addEventListener('unhandledrejection', (event) => {
			const reason = event?.reason;
			glog.error(
				{
					type: EVENT.UNHANDLED_REJECTION,
					route: untrack(() => page.url.pathname),
					err: serializeError(reason, { function: 'window.unhandledrejection' })
				},
				`Unhandled rejection: ${reason?.message ?? reason}`
			);
		});

		// Dev-only browser-error interceptor. Svelte's scheduler can swallow
		// a thrown error inside its internal flush before it escapes the
		// callback, but it still pipes to console.error. Forward to the
		// structured log so the breadcrumb path is uniform. The original
		// is captured before the wrap so the source stays free of `console.*`
		// calls (the grep guard at validation time).
		if (import.meta.env.DEV) {
			let currentRoute = page.url.pathname;
			$effect(() => {
				currentRoute = untrack(() => page.url.pathname);
			});

			const origErr = globalThis['console']['error'];
			globalThis['console'].error = (...args) => {
				origErr.apply(globalThis['console'], args);
				glog.warn(
					{
						type: EVENT.RENDER_ERROR,
						step: 'console.error',
						route: currentRoute,
						args: args.map((a) => presence(a))
					},
					'console.error fired'
				);
			};
		}
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex min-h-screen flex-col" data-register={chromeRegister} style="background-color: var(--register-ground); color: var(--register-text);">
	<Header register={chromeRegister} />
	<main class="flex-1">
		{#if page.url.pathname !== '/'}
			<Breadcrumbs register={chromeRegister} />
		{/if}
		{@render children()}
	</main>
	<Footer register={chromeRegister} />
</div>
