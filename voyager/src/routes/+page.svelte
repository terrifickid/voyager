<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import HeroMockup from '$lib/components/HeroMockup.svelte';
	import BrandRow from '$lib/components/BrandRow.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import PersonaCard from '$lib/components/PersonaCard.svelte';
	import QuoteCard from '$lib/components/QuoteCard.svelte';
	import RampQuoteAggregator from '$lib/components/RampQuoteAggregator.svelte';
</script>

<svelte:head>
	<title>Voyager — Plan trips you'll actually want to take</title>
</svelte:head>

<!-- 1. Top ribbon -->
<div class="w-full" style="background: var(--lime); color: var(--lime-ink);">
	<div class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-2.5 text-[13px] font-medium">
		<span>Local-first AI travel planning — runs in your browser, no API key.</span>
		<a href="/plan" class="inline-flex items-center gap-1 underline underline-offset-2 decoration-[1.5px] font-semibold">
			See how
			<span aria-hidden="true" class="text-[1.05em] leading-none">›</span>
		</a>
	</div>
</div>

<!-- 2. Hero -->
<section class="mx-auto max-w-6xl px-6 pt-24 pb-28 lg:pt-32 lg:pb-36">
	<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
		<div class="flex flex-col gap-8">
			<span class="eyebrow">Local-first AI travel</span>
			<h1 class="font-display text-[56px] sm:text-[72px] lg:text-[92px] text-ink">
				Plan trips<br />you'll actually<br />want to take.
			</h1>
			<p class="max-w-xl text-lg leading-relaxed text-ink-2">
				Voyager is a local-first AI trip planner. Tell it where you're going and how you travel — it builds a day-by-day itinerary using real places, your personality, and your budget. Save, share, edit.
			</p>
			<div class="flex flex-wrap items-center gap-3">
				<Cta variant="primary" href="/plan">Plan a trip</Cta>
				<Cta variant="secondary" href="#how">See how it works</Cta>
			</div>
			<p class="text-sm text-muted">
				Runs on WebGPU in your browser. No account, no API key.
			</p>
		</div>
		<div class="lg:pl-6">
			<HeroMockup />
		</div>
	</div>
</section>

<!-- 3. Brand row -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<BrandRow />
</section>

<!-- 4. One sentence value -->
<section id="how" class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] bg-bone-100 p-10 sm:p-14">
		<SectionHeader
			eyebrow="How it works"
			title="One prompt. One honest itinerary."
			lede="Type where, when, and who's coming. Voyager reads your travel personality and builds a real day-by-day plan — with places, transit, and time-of-day anchors — in your browser."
		/>
		<div class="mt-8">
			<Cta variant="secondary" href="/plan">Try it now</Cta>
		</div>
	</div>
</section>

<!-- 5. Tabs row (Travel / Stay / Share) -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="Built around how you plan"
		title="Travel. Stay. Share."
		lede="Three things every trip needs, handled in one place."
	/>
	<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
		<FeatureCard
			icon="plane"
			tone="sky"
			eyebrow="Travel"
			title="Real day-by-day itineraries"
			body="Hour-by-hour plans built from real places, local transit, and time-of-day anchors. No filler, no template copy."
		/>
		<FeatureCard
			icon="bed"
			tone="coral"
			eyebrow="Stay"
			title="Neighborhoods, not pins"
			body="Voyager picks where to base you, then walks outward. Sleep near what you'll actually do."
		/>
		<FeatureCard
			icon="share"
			tone="rose"
			eyebrow="Share"
			title="Send a link, get opinions"
			body="Share the itinerary with your co-travelers as a clean read-only page. Edit on the fly."
		/>
	</div>
</section>

<!-- 6. Voyager Pay band -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] bg-bone-100 p-10 sm:p-14">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
			<div class="flex flex-col gap-5">
				<span class="eyebrow">Voyager Pay</span>
				<h2 class="font-display text-[40px] sm:text-[52px] lg:text-[64px] text-ink leading-[1.02]">
					Money that moves like a Nostr note.
				</h2>
				<p class="max-w-md text-lg leading-relaxed text-ink-2">
					An open payments protocol layered on Nostr and Lightning. Voyager ships one of the
					competing Mostro nodes — tuned for the Caribbean. Try the ranking widget below.
				</p>
				<div class="flex flex-wrap items-center gap-3">
					<Cta variant="primary" href="/pay">Open Voyager Pay</Cta>
					<Cta variant="tertiary" href="/pay#ramp">Skip to the ramp</Cta>
				</div>
			</div>
			<div>
				<RampQuoteAggregator />
			</div>
		</div>
	</div>
</section>

<!-- 7. Benefits grid -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="Why Voyager"
		title="Designed like a great trip."
		lede="Every screen earns its keep. No clutter, no upsell, no infinite scroll."
	/>
	<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
		<FeatureCard
			icon="chat"
			tone="violet"
			eyebrow="Conversational"
			title="Talk like a person"
			body="No checkboxes for vibes. Describe how you travel in a sentence — Voyager translates it into a real plan."
		/>
		<FeatureCard
			icon="calendar"
			tone="sky"
			eyebrow="Day-by-day"
			title="An itinerary you can follow"
			body="Each day is anchored by a theme, with morning / afternoon / evening slots that respect how a city actually moves."
		/>
		<FeatureCard
			icon="map-pin"
			tone="coral"
			eyebrow="Real places"
			title="Local data, not guesses"
			body="Voyager pulls from a local places fixture and ranks by fit, ratings, and proximity — no LLM hallucination on addresses."
		/>
		<FeatureCard
			icon="save"
			tone="rose"
			eyebrow="Save & share"
			title="Keep your trip"
			body="Save trips to your device, edit on the fly, share a read-only link with whoever's coming."
		/>
	</div>
</section>

<!-- 8. Personas -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="Built for"
		title="Whoever you travel with."
	/>
	<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
		<PersonaCard
			icon="compass"
			tone="violet"
			eyebrow="Weekend explorers"
			title="Two days, no itinerary"
			body="A fast, opinionated plan for short breaks — anchor, neighborhood, one reservation worth booking ahead."
			ctaLabel="Plan a weekend"
			ctaHref="/plan"
		/>
		<PersonaCard
			icon="leaf"
			tone="sky"
			eyebrow="Family trips"
			title="Everyone's a different traveler"
			body="Voyager blends kids' pacing, kid-friendly food stops, and one longer anchor for the adults each day."
			ctaLabel="Plan with kids"
			ctaHref="/plan"
		/>
		<PersonaCard
			icon="sparkle"
			tone="coral"
			eyebrow="Group trips"
			title="Six people, six preferences"
			body="Average the group's vibe, then surface one anchor activity that holds the day together."
			ctaLabel="Plan with friends"
			ctaHref="/plan"
		/>
	</div>
</section>

<!-- 9. Testimonials -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="From the road"
		title="Trips people actually took."
	/>
	<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
		<QuoteCard
			quote="It built a Kyoto plan that respected my hatred of 10am queues. The first café was open at 7."
			attribution="Lena K."
			role="Designer, slow traveler"
		/>
		<QuoteCard
			quote="I shared the link with my parents, edited the one museum they cared about, and we were off."
			attribution="Marcus T."
			role="Engineer, family trips"
		/>
	</div>
</section>

<!-- 10. Final CTA band -->
<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-bone-100 p-10 sm:p-16 text-center">
		<h2 class="font-display text-[40px] sm:text-[56px] lg:text-[72px] text-ink max-w-3xl mx-auto leading-[1.02]">
			Stop planning the trip. Start taking it.
		</h2>
		<p class="mt-6 max-w-xl mx-auto text-lg text-ink-2">
			Open Voyager, answer seven prompts, get a plan you can actually use — in your browser.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<Cta variant="primary" href="/plan">Plan a trip</Cta>
			<Cta variant="secondary" href="/preferences">Set preferences</Cta>
		</div>
	</div>
</section>
