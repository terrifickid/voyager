<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="min-h-screen bg-slate-950 text-slate-100">
	<Header />
	<main class="mx-auto max-w-5xl px-4 py-6">
		{@render children()}
	</main>
</div>