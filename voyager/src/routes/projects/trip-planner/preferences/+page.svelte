<script>
	import TravelFormPrefs from '$lib/components/TravelFormPrefs.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
</script>

<svelte:head>
	<title>Preferences — Voyager · Trip Planner · open rails</title>
</svelte:head>

<RegisterSection register="carnival-poster">
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
</RegisterSection>
