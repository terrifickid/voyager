<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex min-h-screen flex-col bg-bone-50 text-ink-2">
	<Header />
	<main class="flex-1">
		<Breadcrumbs />
		{@render children()}
	</main>
	<Footer />
</div>
