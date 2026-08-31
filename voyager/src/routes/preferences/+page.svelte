<script>
	import TravelFormPrefs from '$lib/components/TravelFormPrefs.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
</script>

<svelte:head>
	<title>Preferences — Voyager</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-24">
	<SectionHeader
		eyebrow="Your travel fingerprint"
		title="Tell us how you travel."
		lede="These answers shape every itinerary Voyager builds for you. Edit them any time."
	/>
	<div class="mt-12">
		<TravelFormPrefs />
	</div>
</section>
