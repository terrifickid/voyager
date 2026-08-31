<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import HeroMockup from '$lib/components/HeroMockup.svelte';
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
		<span>Plan trips in your browser. No API key. No account.</span>
		<a href="/plan" class="inline-flex items-center gap-1 underline underline-offset-2 decoration-[1.5px] font-semibold">
			See how
			<span aria-hidden="true" class="text-[1.05em] leading-none">›</span>
		</a>
	</div>
</div>

<!-- 2. Hero -->
<section class="mx-auto max-w-6xl px-6 pt-20 pb-20 lg:pt-28 lg:pb-28">
	<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
		<div class="flex flex-col gap-8">
			<span class="eyebrow">Local-first AI travel</span>
			<h1 class="font-display text-[56px] sm:text-[72px] lg:text-[92px] text-ink">
				Plan trips<br />you'll actually<br />want to take.
			</h1>
			<p class="max-w-xl text-lg leading-relaxed text-ink-2">
				Plan a trip you can actually take, in your browser. Tell Voyager where you're going and how you travel. It builds a day-by-day plan from real places, your personality, and your budget.
			</p>
			<div class="flex flex-wrap items-center gap-3">
				<Cta variant="primary" href="/plan">Plan a trip</Cta>
				<Cta variant="secondary" href="#how">See how it works</Cta>
			</div>
		</div>
		<div class="lg:pl-6">
			<HeroMockup />
		</div>
	</div>
</section>

<!-- 3. How it works -->
<section id="how" class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] bg-bone-100 p-10 sm:p-14">
		<SectionHeader
			eyebrow="How it works"
			title="One prompt. One honest itinerary."
			lede="Three steps. Plain English. Nothing leaves your browser."
		/>
		<ol class="mt-12 flex flex-col gap-6">
			{#each [
				{ n: 1, t: 'Describe how you travel', b: 'A sentence about pace, food, and what you skip. Voyager turns it into a structured preference set.' },
				{ n: 2, t: 'Get a draft, grounded in real places', b: 'A small model in your tab drafts a day-by-day plan. A local places fixture ranks real candidates against each block.' },
				{ n: 3, t: 'Save it, share a link, edit as you go', b: 'Trips live on your device. Share a read-only link with whoever is coming. Edit a day and the next link already shows it.' }
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
			<Cta variant="secondary" href="/plan">Try it now</Cta>
		</div>
	</div>
</section>

<!-- 4. What you get (collapsed Travel/Stay/Share + Why Voyager) -->
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

<!-- 5. Who it's for -->
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
			ctaHref="/plan"
		/>
		<PersonaCard
			icon="leaf"
			tone="sky"
			eyebrow="Family trips"
			title="Everyone's a different traveler"
			body="Your day bends around kids' pacing and food stops, with one longer anchor for the adults. The plan respects both."
			ctaLabel="Plan with kids"
			ctaHref="/plan"
		/>
		<PersonaCard
			icon="sparkle"
			tone="coral"
			eyebrow="Group trips"
			title="Six people, six preferences"
			body="The plan averages the group's vibe, then surfaces the one anchor activity that holds the day together."
			ctaLabel="Plan with friends"
			ctaHref="/plan"
		/>
	</div>
</section>

<!-- 6. Testimonials -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="From the road"
		title="Trips people actually took."
		lede="Two travelers. Two itineraries. Both shaped to fit."
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

<!-- 7. Voyager Pay band (demoted, clearly labelled aside) -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
			<div class="flex flex-col gap-4">
				<span class="eyebrow">Voyager Pay — built in</span>
				<h2 class="font-display text-[32px] sm:text-[40px] lg:text-[48px] text-ink leading-[1.05]">
					A way to pay that does not need an account.
				</h2>
				<p class="max-w-md text-base leading-relaxed text-ink-2">
					Voyager ships with a payment layer that does not hold your money. If you want the technical detail, it lives on its own page. The ranking widget below is a demo of how a wallet picks a node.
				</p>
				<div>
					<Cta variant="tertiary" href="/pay">How Voyager Pay works</Cta>
				</div>
			</div>
			<div>
				<RampQuoteAggregator />
			</div>
		</div>
	</div>
</section>

<!-- 8. Documentation band (closer) -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<SectionHeader
			eyebrow="Documentation"
			title="Want the spec behind Voyager?"
			lede="Short lessons on how the planner works, what a rubric is, and how Voyager Pay's design holds up. Read in order, or jump to the lesson you want."
		/>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/docs">Read the docs</Cta>
		</div>
	</div>
</section>

<!-- 9. Final CTA band -->
<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-bone-100 p-10 sm:p-16 text-center">
		<h2 class="font-display text-[40px] sm:text-[56px] lg:text-[72px] text-ink max-w-3xl mx-auto leading-[1.02]">
			Stop planning the trip. Start taking it.
		</h2>
		<p class="mt-6 max-w-xl mx-auto text-lg text-ink-2">
			Open Voyager. Answer seven prompts. Get a plan you can use, in your browser.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<Cta variant="primary" href="/plan">Plan a trip</Cta>
			<Cta variant="secondary" href="/docs">Read the docs</Cta>
		</div>
	</div>
</section>
