<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import HeroMockup from '$lib/components/HeroMockup.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import PersonaCard from '$lib/components/PersonaCard.svelte';
	import QuoteCard from '$lib/components/QuoteCard.svelte';
	import PayCheckoutCard from '$lib/components/PayCheckoutCard.svelte';
	import Icon from '$lib/components/Icon.svelte';

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
	<title>Voyager — Plan trips you'll actually want to take</title>
</svelte:head>

<!-- 1. Top ribbon -->
<div class="w-full" style="background: var(--lime); color: var(--lime-ink);">
	<div class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-2.5 text-[13px] font-medium">
		<span>
			<span class="font-semibold">Voyager Live</span> — our project submission for the
			<span class="font-semibold">FutureCarribean buildathon</span>.
		</span>
		<a href="/docs" class="inline-flex items-center gap-1 underline underline-offset-2 decoration-[1.5px] font-semibold">
			Read the docs
			<span aria-hidden="true" class="text-[1.05em] leading-none">›</span>
		</a>
	</div>
</div>

<!-- 2. Hero -->
<section class="mx-auto max-w-6xl px-6 pt-20 pb-20 lg:pt-28 lg:pb-28">
	<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
		<div class="flex flex-col gap-8">
			<span class="eyebrow">Plan your trip · Pay for it safely</span>
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
				<Cta variant="primary" href="/plan">Plan a trip</Cta>
				<Cta variant="secondary" href="/pay">How payments work</Cta>
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
		lede="Real trips from real travelers. Built to fit, not to flex."
	/>
	<div class="mt-12 -mx-6 sm:-mx-10 overflow-hidden marquee-fade">
		<div class="marquee">
			<div class="marquee__track" aria-label="What travelers said">
				<!-- set A -->
				{#each REVIEWS as r}
					<div class="marquee__item">
						<QuoteCard quote={r.quote} attribution={r.attribution} role={r.role} />
					</div>
				{/each}
				<!-- set B (must be identical to set A for seamless loop) -->
				{#each REVIEWS as r}
					<div class="marquee__item">
						<QuoteCard quote={r.quote} attribution={r.attribution} role={r.role} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- 7. Voyager Pay band -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
			<div class="flex flex-col gap-5">
				<span class="eyebrow">Voyager Pay — built in</span>
				<h2 class="font-display text-[32px] sm:text-[40px] lg:text-[48px] text-ink leading-[1.05]">
					Pay the way you actually pay.
				</h2>
				<p class="max-w-md text-base leading-relaxed text-ink-2">
					Pick a currency. See the best rate. Tap a vendor, hit Pay. No app to install.
				</p>
				<div class="mt-2">
					<Cta variant="primary" href="/pay">Open Voyager Pay</Cta>
				</div>
			</div>

			<PayCheckoutCard />
		</div>
	</div>
</section>

<!-- 8. Built for any marketplace -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="Built for any marketplace"
		title="Voyager Pay sells anything."
		lede="One protocol. Any vendor kind. Physical goods, stays, experiences, services, digital goods — and whatever comes next."
	/>
	<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
		<FeatureCard
			icon="map-pin"
			tone="sky"
			eyebrow="voyager.listing.v1"
			title="Physical goods"
			body="Snapper, sandals, hardware. Ship weight, pickup, courier in the same event shape."
		/>
		<FeatureCard
			icon="bed"
			tone="coral"
			eyebrow="voyager.accommodation.v1"
			title="Stays"
			body="Rooms, rentals, weeks. Add check_in, check_out, capacity without changing the protocol."
		/>
		<FeatureCard
			icon="compass"
			tone="rose"
			eyebrow="voyager.tour.v1"
			title="Experiences"
			body="Tours, tastings, guides. Add group_size, meeting_point, duration_minutes in the same listing."
		/>
		<FeatureCard
			icon="sparkle"
			tone="violet"
			eyebrow="voyager.consulting.v1"
			title="Services & digital"
			body="Hours, deliverables, digital downloads. The same wire format carries them."
		/>
	</div>
	<div class="mt-10 flex justify-center">
		<Cta variant="primary" href="/docs/how-voyager-pay-extends">See how a new vendor kind ships</Cta>
	</div>
</section>

<!-- 8b. MCP — list once, appear everywhere -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="MCP"
		title="List once, appear everywhere."
		lede="A single signed event fans out to every vendor kind on Voyager Pay — and to every agent host that connects through voyager-mcp."
	/>

	<!-- Tonal card (C6) -->
	<div class="home-mcp-card mt-12 rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">

			<!-- Left: terminal mock (C5 product surface) -->
			<figure class="home-mcp-mock">
				<div class="home-mcp-mock__bar">
					<span class="home-mcp-mock__dot" style="--c:var(--pastel-coral)"></span>
					<span class="home-mcp-mock__dot" style="--c:var(--pastel-sky)"></span>
					<span class="home-mcp-mock__dot" style="--c:var(--pastel-rose)"></span>
					<span class="home-mcp-mock__title">mcp › claude desktop</span>
				</div>
			<pre class="home-mcp-mock__body" aria-hidden="true">
<span class="t-muted">$</span> mcp.call("voyager.search", &#123;"near":"kyoto","when":"apr"&#125;)
<span class="t-ink">&#123;</span>
  <span class="t-key">"kind"</span>: <span class="t-str">30402</span>,
  <span class="t-key">"matches"</span>: <span class="t-ink">[</span>
    <span class="t-str">"fushimi-inari · early entry · 90 min"</span>,
    <span class="t-str">"nishiki market · tasting loop"</span>,
    <span class="t-str">"kiyomizu-dera · sunset · 60 min"</span>
  <span class="t-ink">]</span>
<span class="t-ink">&#125;</span>
			</pre>
				<figcaption class="mt-4 text-[13px] leading-snug text-muted">
					What an agent sees: a single signed event, indexed and queryable.
				</figcaption>
			</figure>

			<!-- Right: re-tinted diagram (single accent hub, ink edges) -->
			<figure class="home-mcp-figure">
				<svg class="home-mcp-svg" viewBox="0 0 520 360" width="100%"
					 role="img" aria-labelledby="home-mcp-title home-mcp-desc">
					<title id="home-mcp-title">A single event fans out to every agent host</title>
					<desc id="home-mcp-desc">
						A listing node on the left feeds a voyager-mcp hub in the center,
						which radiates to four labelled agent surfaces: Claude Desktop,
						ChatGPT, an IDE plugin, and a custom agent.
					</desc>

					<!-- listing → voyager-mcp (solid) -->
					<line x1="60" y1="200" x2="246" y2="200" class="home-mcp-link home-mcp-link--solid"/>

					<!-- voyager-mcp → 4 hosts (dashed, animated) -->
					<line x1="274" y1="200" x2="466" y2="100" class="home-mcp-link"/>
					<line x1="274" y1="200" x2="466" y2="300" class="home-mcp-link"/>
					<line x1="274" y1="200" x2="60"  y2="300" class="home-mcp-link"/>
					<line x1="274" y1="200" x2="60"  y2="100" class="home-mcp-link"/>

					<!-- listing node (ink) -->
					<g>
						<circle cx="60" cy="200" r="10" fill="var(--ink)"/>
						<text x="60" y="232" class="home-mcp-label" text-anchor="middle">your listing</text>
						<text x="60" y="170" class="home-mcp-sublabel" text-anchor="middle">kind:30402</text>
					</g>

					<!-- voyager-mcp hub (sky only — single accent) -->
					<g>
						<circle cx="260" cy="200" r="20" fill="none" stroke="var(--ink)" stroke-width="1" opacity="0.25"/>
						<circle cx="260" cy="200" r="14" fill="var(--pastel-sky)" stroke="var(--ink)" stroke-width="1.5"/>
						<text x="260" y="238" class="home-mcp-label" text-anchor="middle">voyager-mcp</text>
						<text x="260" y="170" class="home-mcp-sublabel" text-anchor="middle">read lens</text>
					</g>

					<!-- 4 hosts: ink-filled, no pastel circles (C7) -->
					<g class="home-mcp-node" style="animation-delay:0s">
						<circle cx="470" cy="100" r="10" fill="var(--bone-50)" stroke="var(--ink)" stroke-width="1.5"/>
						<text x="470" y="82"  class="home-mcp-label" text-anchor="middle">Claude Desktop</text>
					</g>
					<g class="home-mcp-node" style="animation-delay:.6s">
						<circle cx="470" cy="300" r="10" fill="var(--bone-50)" stroke="var(--ink)" stroke-width="1.5"/>
						<text x="470" y="322" class="home-mcp-label" text-anchor="middle">ChatGPT</text>
					</g>
					<g class="home-mcp-node" style="animation-delay:1.2s">
						<circle cx="60"  cy="300" r="10" fill="var(--bone-50)" stroke="var(--ink)" stroke-width="1.5"/>
						<text x="60"  y="282" class="home-mcp-label" text-anchor="middle">IDE plugin</text>
					</g>
					<g class="home-mcp-node" style="animation-delay:1.8s">
						<circle cx="60"  cy="100" r="10" fill="var(--bone-50)" stroke="var(--ink)" stroke-width="1.5"/>
						<text x="60"  y="82"  class="home-mcp-label" text-anchor="middle">custom agent</text>
					</g>
				</svg>
				<figcaption class="mt-4 text-[13px] leading-snug text-muted lg:text-left text-center">
					One event. Four agent surfaces. Every new MCP host inherits it.
				</figcaption>
			</figure>
		</div>

		<!-- C9 pastel icon taxonomy: 4 surfaces named below -->
		<ul class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
			<li class="home-mcp-tile">
				<Icon name="chat" tone="violet" size={28}/>
				<span class="eyebrow">Claude Desktop</span>
			</li>
			<li class="home-mcp-tile">
				<Icon name="sparkle" tone="coral" size={28}/>
				<span class="eyebrow">ChatGPT</span>
			</li>
			<li class="home-mcp-tile">
				<Icon name="bolt" tone="sky" size={28}/>
				<span class="eyebrow">IDE plugin</span>
			</li>
			<li class="home-mcp-tile">
				<Icon name="globe" tone="rose" size={28}/>
				<span class="eyebrow">custom agent</span>
			</li>
		</ul>
	</div>

	<!-- Blurb stays below the card, centered (unchanged) -->
	<p class="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-ink-2 text-center">
		Publish a single kind:30402 and it fans out to every vendor kind on
		Voyager Pay. The same listing also reaches agent hosts through
		<a href="/vendors#mcp" class="underline underline-offset-2 decoration-[1.5px] font-semibold text-ink">voyager-mcp</a>
		— so any AI surface that connects sees it too.
	</p>
</section>

<!-- 9. Documentation band (closer) -->
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
		gap: 1.5rem; /* gap-6 */
		padding-inline: 0.75rem; /* half of gap, so edges don't kiss the viewport */
		animation: marquee-ltr 60s linear infinite;
		will-change: transform;
	}
	.marquee__item {
		flex: 0 0 auto;
		width: 360px; /* readable card width on mobile */
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
	.home-mcp-figure {
		max-width: 28rem;
		margin-left: auto;
		margin-right: auto;
	}
	@media (min-width: 1024px) {
		.home-mcp-figure {
			margin-left: 0;
			margin-right: 0;
		}
	}
	.home-mcp-svg {
		display: block;
		overflow: visible;
	}
	.home-mcp-label {
		font-family: var(--font-sans, system-ui, sans-serif);
		font-size: 13px;
		font-weight: 500;
		fill: var(--ink);
	}
	.home-mcp-sublabel {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		fill: var(--ink);
		opacity: 0.7;
	}
	.home-mcp-link {
		stroke: var(--ink);
		stroke-width: 1.5;
		stroke-dasharray: 6 6;
		animation: home-mcp-travel 1.6s linear infinite;
	}
	.home-mcp-link--solid {
		stroke-dasharray: 0;
		animation: none;
	}
	.home-mcp-node {
		animation: home-mcp-pulse 2.4s ease-in-out infinite;
		transform-origin: center;
	}
	@keyframes home-mcp-travel {
		to {
			stroke-dashoffset: -24;
		}
	}
	@keyframes home-mcp-pulse {
		50% {
			opacity: 0.65;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.home-mcp-link {
			animation: none;
		}
		.home-mcp-node {
			animation: none;
		}
	}
	.home-mcp-card {
		/* tonal-step card; matches the section-7/9 bone-100 pattern (C6) */
	}
	.home-mcp-mock {
		border-radius: 24px;
		background: var(--bone-200);
		padding: 0;
		overflow: hidden;
		border: 0;
		box-shadow: none;
	}
	.home-mcp-mock__bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		border-bottom: 0;
		background: var(--bone-300);
	}
	.home-mcp-mock__dot {
		width: 10px;
		height: 10px;
		border-radius: 999px;
		background: var(--c, var(--ink));
		display: inline-block;
	}
	.home-mcp-mock__title {
		margin-left: 8px;
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 12px;
		color: var(--ink-2);
	}
	.home-mcp-mock__body {
		margin: 0;
		padding: 18px 20px;
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 13px;
		line-height: 1.55;
		color: var(--ink);
		white-space: pre;
		overflow-x: auto;
		background: var(--bone-50);
	}
	.home-mcp-mock__body :global(.t-muted) {
		color: var(--muted);
	}
	.home-mcp-mock__body :global(.t-ink) {
		color: var(--ink);
	}
	.home-mcp-mock__body :global(.t-key) {
		color: var(--ink-2);
	}
	.home-mcp-mock__body :global(.t-str) {
		color: var(--ink-2);
	}
	.home-mcp-tile {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		padding: 18px;
		border-radius: 24px;
		background: var(--bone-200);
	}
</style>
