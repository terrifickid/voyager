<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import HeroMockup from '$lib/components/HeroMockup.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import PersonaCard from '$lib/components/PersonaCard.svelte';
	import QuoteCard from '$lib/components/QuoteCard.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import RoadMarchRibbon from '$lib/components/RoadMarchRibbon.svelte';

	const REVIEWS = [
		{
			quote: "It built a Kyoto plan that respected my hatred of 10am queues. The first café was open at 7.",
			attribution: "Lena K.",
			role: "Designer, slow traveler"
		},
		{
			quote: "I shared the link with my parents, edited the one museum they cared about, and we were off.",
			attribution: "Marcus T.",
			role: "Engineer, family trips"
		},
		{
			quote: "Lisbon in three days, no spreadsheet. It picked the tile museum over another rooftop and I trusted it.",
			attribution: "Priya R.",
			role: "Backend engineer, long weekends"
		},
		{
			quote: "I wanted empty streets in November. It gave me empty streets in November.",
			attribution: "Tomás A.",
			role: "Photographer, off-season"
		},
		{
			quote: "Six of us, three food dealbreakers, one ferry. The plan didn't flinch.",
			attribution: "Hana O.",
			role: "Product manager, group trips"
		},
		{
			quote: "I edited twice. That was the whole trip planning.",
			attribution: "Devon S.",
			role: "Solo, first time in Tokyo"
		},
		{
			quote: "I needed cafe wifi and a quiet block by 6pm. Both made it onto the day.",
			attribution: "Aïcha B.",
			role: "Founder, workcations"
		},
		{
			quote: "It cut the museum list down to one per kid. We did all of them.",
			attribution: "Felix W.",
			role: "Dad of two, short drives"
		}
	];
</script>

<svelte:head>
	<title>Trip Planner — Voyager · Caribbean-first showcase</title>
</svelte:head>

<RegisterSection register="carnival-poster">

<!-- Hero -->
<section class="mx-auto max-w-6xl px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
	<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
		<div class="flex flex-col gap-8">
			<span class="eyebrow">Trip Planner — a Voyager showcase app</span>
			<h1 class="font-display text-[56px] sm:text-[72px] lg:text-[92px] text-ink leading-[0.95]">
				Plan it.<br />Pay it.<br />Take the trip.
			</h1>
			<p class="max-w-xl text-lg leading-relaxed text-ink-2">
				Tell Voyager where you're going and how you travel. It builds a day-by-day plan from real places, your style, and your budget — right in your browser.
			</p>
			<p class="max-w-xl text-lg leading-relaxed text-ink-2">
				Ready to book? <span class="font-semibold text-ink">Voyager Pay</span> handles the money. It routes your booking to the vendors who actually deserve it — no middleman taking a cut or freezing the funds.
			</p>
			<div class="flex flex-wrap items-center gap-3">
				<Cta variant="primary" href="/projects/trip-planner/plan">Plan a trip</Cta>
				<Cta variant="secondary" href="/projects/voyager-pay">How payments work</Cta>
			</div>
		</div>
		<div class="lg:pl-6">
			<HeroMockup />
		</div>
	</div>
</section>

<!-- How it works -->
<section id="how" class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] bg-bone-100 p-10 sm:p-14">
		<SectionHeader
			eyebrow="How it works"
			title="Three steps. That's it."
			lede="Tell us about your trip. We'll build the plan. Then book it safely with Voyager Pay."
		/>
		<ol class="mt-12 flex flex-col gap-6">
			{#each [
				{ n: 1, t: 'Tell us about your trip.', b: 'Where you\'re going, when, and who\'s coming. A few quick questions and you\'re done.' },
				{ n: 2, t: 'We build your itinerary.', b: 'Our AI puts together a day-by-day plan using real places. Tweak anything you want.' },
				{ n: 3, t: 'Book it safely with Voyager Pay.', b: 'Pay through Voyager Pay and you\'re protected the whole way through. Good price, good experience, no surprises.' }
			] as step (step.n)}
				<li class="flex gap-5 rounded-[28px] bg-bone-200 p-6">
					<span class="font-display text-3xl text-ink leading-none">{step.n}</span>
					<div class="flex flex-col gap-2">
						<h3 class="font-display text-xl text-ink leading-tight">{step.t}</h3>
						<p class="text-[15px] leading-relaxed text-ink-2">{step.b}</p>
					</div>
				</li>
			{/each}
		</ol>
		<div class="mt-10">
			<Cta variant="secondary" href="/projects/trip-planner/plan">Try it now</Cta>
		</div>
	</div>
</section>

<!-- Travel. Stay. Share. -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="What you get"
		title="Travel. Stay. Share."
		lede="Three things every trip needs. One tool handles all of them."
	/>
	<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
		<FeatureCard
			icon="plane"
			tone="sky"
			eyebrow="Travel"
			title="Real day-by-day itineraries"
			body="Hour-by-hour plans built from real places and local transit. No filler copy. No templated days."
		/>
		<FeatureCard
			icon="bed"
			tone="coral"
			eyebrow="Stay"
			title="Neighborhoods, not pins"
			body="Voyager picks a base neighborhood, then walks outward. You sleep near what you'll do."
		/>
		<FeatureCard
			icon="share"
			tone="rose"
			eyebrow="Share"
			title="Send a link, get opinions"
			body="Share the itinerary with your co-travelers as a clean read-only page. Edit as you go."
		/>
	</div>
</section>

<!-- Who it's for -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="Who it's for"
		title="Whoever you travel with."
		lede="Same engine, different shape. Pick the trip you're actually planning."
	/>
	<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
		<PersonaCard
			icon="compass"
			tone="violet"
			eyebrow="Weekend explorers"
			title="Two days, no itinerary"
			body="You walk in with a city and a window. You walk out with one anchor, one neighborhood, and the one reservation worth booking ahead."
			ctaLabel="Plan a weekend"
			ctaHref="/projects/trip-planner/plan"
		/>
		<PersonaCard
			icon="leaf"
			tone="sky"
			eyebrow="Family trips"
			title="Everyone's a different traveler"
			body="Your day bends around kids' | pacing and food stops, with one longer anchor for the adults. The plan respects both."
			ctaLabel="Plan with kids"
			ctaHref="/projects/trip-planner/plan"
		/>
		<PersonaCard
			icon="sparkle"
			tone="coral"
			eyebrow="Group trips"
			title="Six people, six preferences"
			body="The plan averages the group's vibe, then surfaces the one anchor activity that holds the day together."
			ctaLabel="Plan with friends"
			ctaHref="/projects/trip-planner/plan"
		/>
	</div>
</section>

<!-- Testimonials -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="From the road"
		title="Trips people actually took."
		lede="Real trips from real travelers. Built to fit, not to flex."
	/>
	<div class="mt-12 -mx-6 sm:-mx-10 overflow-hidden marquee-fade">
		<div class="marquee">
			<div class="marquee__track" aria-label="What travelers said">
				{#each REVIEWS as r}
					<div class="marquee__item">
						<QuoteCard quote={r.quote} attribution={r.attribution} role={r.role} />
					</div>
				{/each}
				{#each REVIEWS as r}
					<div class="marquee__item">
						<QuoteCard quote={r.quote} attribution={r.attribution} role={r.role} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Final CTA -->
<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-bone-100 p-10 sm:p-16 text-center">
		<h2 class="font-display text-[40px] sm:text-[56px] lg:text-[72px] text-ink max-w-3xl mx-auto leading-[1.02]">
			Stop planning the trip. Start taking it.
		</h2>
		<p class="mt-6 max-w-xl mx-auto text-lg text-ink-2">
			Open Voyager. Answer seven prompts. Get a plan you can use, in your browser.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<Cta variant="primary" href="/projects/trip-planner/plan">Plan a trip</Cta>
			<Cta variant="secondary" href="/projects/trip-planner/preferences">Set your preferences</Cta>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<RoadMarchRibbon
		register="carnival-poster"
		eyebrow="Road march · trip planner milestones"
		winners={[
			{ year: '2024', name: 'concierge alpha', note: 'first itinerary build, in-browser' },
			{ year: '2025', name: 'Caribbean place-graph', note: 'Jamaica → Barbados seeded' },
			{ year: '2026', name: 'Voyager Pay wired', note: 'plan → pay in one flow' }
		]}
	/>
</section>
</RegisterSection>

<style>
	.marquee {
		display: flex;
		width: max-content;
	}
	.marquee-fade {
		mask-image: linear-gradient(
			to right,
			transparent 0,
			#000 5rem,
			#000 calc(100% - 5rem),
			transparent 100%
		);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0,
			#000 5rem,
			#000 calc(100% - 5rem),
			transparent 100%
		);
	}
	.marquee__track {
		display: flex;
		gap: 1.5rem;
		padding-inline: 0.75rem;
		animation: marquee-ltr 60s linear infinite;
		will-change: transform;
	}
	.marquee__item {
		flex: 0 0 auto;
		width: 360px;
	}
	@media (min-width: 768px) {
		.marquee__item {
			width: 420px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.marquee__track {
			animation: none;
			transform: none;
		}
	}
	@keyframes marquee-ltr {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
