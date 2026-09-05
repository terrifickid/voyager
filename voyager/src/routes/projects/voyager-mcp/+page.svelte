<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>Voyager MCP — A read lens for AI agents over Nostr</title>
</svelte:head>

<RegisterSection register="carnival-poster">

<section class="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// voyager-mcp · an mcp server for nostr</span>
		<h1 class="font-display text-[44px] sm:text-[56px] lg:text-[64px] text-[var(--register-text)] max-w-4xl leading-[1.02]">
			An MCP server so AI can consume the Nostr kind directory.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-[var(--register-muted)]">
			Voyager MCP is a stateless read lens that exposes signed Nostr listings, stalls, ramp quotes, and gift-wrapped messages as MCP resources. Any agent host that connects — Claude Desktop, ChatGPT, an IDE plugin, a custom agent — sees the same signed events the SDK sees. No central catalogue. No platform tax.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="#any-marketplace">See what ships</Cta>
			<Cta variant="secondary" href="#mcp">See how agents see it</Cta>
		</div>
	</div>
</section>

<section id="any-marketplace" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<div class="rounded-[32px] bg-[var(--register-card)] p-8 sm:p-12">
		<SectionHeader
			eyebrow="// any vendor kind"
			title="Built for any marketplace."
			lede="The protocol guarantees event structure and forwarding. Vendor semantics ride on a reserved tag prefix (a v tag), so new kinds never amend the wire format."
		/>
		<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
			<FeatureCard
				icon="map-pin"
				tone="cyan"
				eyebrow="voyager.listing.v1"
				title="Physical goods"
				body="Snapper, sandals, hardware. Ship weight, pickup, courier in the same event shape."
			/>
			<FeatureCard
				icon="bed"
				tone="magenta"
				eyebrow="voyager.accommodation.v1"
				title="Stays"
				body="Rooms, rentals, weeks. Add check_in, check_out, capacity without changing the protocol."
			/>
			<FeatureCard
				icon="compass"
				tone="magenta"
				eyebrow="voyager.tour.v1"
				title="Experiences"
				body="Tours, tastings, guides. Add group_size, meeting_point, duration_minutes in the same listing."
			/>
			<FeatureCard
				icon="sparkle"
				tone="gold"
				eyebrow="voyager.consulting.v1"
				title="Services & digital"
				body="Hours, deliverables, digital downloads. The same wire format carries them."
			/>
		</div>
		<p class="mt-10 max-w-2xl text-base leading-relaxed text-[var(--register-muted)]">
			A single signed <code class="font-mono text-[var(--register-text)]">kind:30402</code> carries physical goods, stays, experiences, services, and digital downloads. Voyager MCP exposes them all as agent-discoverable resources. The wire format does not change.
		</p>
		<div class="mt-6">
			<Cta variant="secondary" href="/docs/how-voyager-pay-extends">Read the extensibility spec</Cta>
		</div>
	</div>
</section>

<section id="mcp" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="// mcp"
		title="List once. Appear in every agent."
		lede="AI agents are becoming a primary buyer-side surface. Voyager MCP turns every signed listing into an agent-discoverable resource — automatically."
	/>

	<div class="market-mcp-card mt-12 rounded-[32px] bg-[var(--register-card)] p-8 sm:p-12">
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">

			<figure class="market-mcp-mock">
				<div class="market-mcp-mock__bar">
					<span class="market-mcp-mock__dot" style="--c:var(--pastel-coral)"></span>
					<span class="market-mcp-mock__dot" style="--c:var(--pastel-sky)"></span>
					<span class="market-mcp-mock__dot" style="--c:var(--pastel-rose)"></span>
					<span class="market-mcp-mock__title">mcp › claude desktop</span>
				</div>
				<pre class="market-mcp-mock__body" aria-hidden="true"><span class="t-muted">$</span> mcp.call("voyager.search", &#123;"near":"kyoto","when":"apr"&#125;)
<span class="t-ink">&#123;</span>
  <span class="t-key">"kind"</span>: <span class="t-str">30402</span>,
  <span class="t-key">"matches"</span>: <span class="t-ink">[</span>
    <span class="t-str">"fushimi-inari · early entry · 90 min"</span>,
    <span class="t-str">"nishiki market · tasting loop"</span>,
    <span class="t-str">"kiyomizu-dera · sunset · 60 min"</span>
  <span class="t-ink">]</span>
<span class="t-ink">&#125;</span></pre>
				<figcaption class="mt-4 text-[13px] leading-snug text-[var(--register-muted)]">
					What an agent sees: a single signed event, indexed and queryable.
				</figcaption>
			</figure>

			<figure class="market-mcp-figure">
				<svg class="market-mcp-svg" viewBox="0 0 520 360" width="100%"
					 role="img" aria-labelledby="market-mcp-title market-mcp-desc">
					<title id="market-mcp-title">A single event fans out to every agent host</title>
					<desc id="market-mcp-desc">
						A listing node on the left feeds a voyager-mcp hub in the center,
						which radiates to four labelled agent surfaces.
					</desc>

					<line x1="60" y1="200" x2="246" y2="200" class="market-mcp-link market-mcp-link--solid"/>
					<line x1="274" y1="200" x2="466" y2="100" class="market-mcp-link"/>
					<line x1="274" y1="200" x2="466" y2="300" class="market-mcp-link"/>
					<line x1="274" y1="200" x2="60"  y2="300" class="market-mcp-link"/>
					<line x1="274" y1="200" x2="60"  y2="100" class="market-mcp-link"/>

					<g>
						<circle cx="60" cy="200" r="10" fill="var(--ink)"/>
						<text x="60" y="232" class="market-mcp-label" text-anchor="middle">your listing</text>
						<text x="60" y="170" class="market-mcp-sublabel" text-anchor="middle">kind:30402</text>
					</g>

					<g>
						<circle cx="260" cy="200" r="20" fill="none" stroke="var(--ink)" stroke-width="1" opacity="0.25"/>
						<circle cx="260" cy="200" r="14" fill="var(--pastel-sky)" stroke="var(--ink)" stroke-width="1.5"/>
						<text x="260" y="238" class="market-mcp-label" text-anchor="middle">voyager-mcp</text>
						<text x="260" y="170" class="market-mcp-sublabel" text-anchor="middle">read lens</text>
					</g>

					<g class="market-mcp-node" style="animation-delay:0s">
						<circle cx="470" cy="100" r="10" fill="var(--register-card)" stroke="var(--register-text)" stroke-width="1.5"/>
						<text x="470" y="82"  class="market-mcp-label" text-anchor="middle">Claude Desktop</text>
					</g>
					<g class="market-mcp-node" style="animation-delay:.6s">
						<circle cx="470" cy="300" r="10" fill="var(--register-card)" stroke="var(--register-text)" stroke-width="1.5"/>
						<text x="470" y="322" class="market-mcp-label" text-anchor="middle">ChatGPT</text>
					</g>
					<g class="market-mcp-node" style="animation-delay:1.2s">
						<circle cx="60"  cy="300" r="10" fill="var(--register-card)" stroke="var(--register-text)" stroke-width="1.5"/>
						<text x="60"  y="282" class="market-mcp-label" text-anchor="middle">IDE plugin</text>
					</g>
					<g class="market-mcp-node" style="animation-delay:1.8s">
						<circle cx="60"  cy="100" r="10" fill="var(--register-card)" stroke="var(--register-text)" stroke-width="1.5"/>
						<text x="60"  y="82"  class="market-mcp-label" text-anchor="middle">custom agent</text>
					</g>
				</svg>
				<figcaption class="mt-4 text-[13px] leading-snug text-[var(--register-muted)] lg:text-left text-center">
					One event. Four agent surfaces. Every new MCP host inherits it.
				</figcaption>
			</figure>
		</div>

		<ul class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
			<li class="market-mcp-tile">
				<Icon name="chat" tone="gold" size={28}/>
				<span class="eyebrow">Claude Desktop</span>
			</li>
			<li class="market-mcp-tile">
				<Icon name="sparkle" tone="magenta" size={28}/>
				<span class="eyebrow">ChatGPT</span>
			</li>
			<li class="market-mcp-tile">
				<Icon name="bolt" tone="cyan" size={28}/>
				<span class="eyebrow">IDE plugin</span>
			</li>
			<li class="market-mcp-tile">
				<Icon name="globe" tone="magenta" size={28}/>
				<span class="eyebrow">custom agent</span>
			</li>
		</ul>
	</div>

	<p class="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-[var(--register-muted)] text-center">
		Publish a single <code class="font-mono text-[var(--register-text)]">kind:30402</code> and it fans out to every vendor kind on
		the open rail. The same listing also reaches agent hosts through
		<a href="/docs/how-voyager-pay-extends" class="underline underline-offset-2 decoration-[1.5px] font-semibold text-[var(--register-text)]">voyager-mcp</a>
		— so any AI surface that connects sees it too.
	</p>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-[var(--register-card)] p-10 sm:p-16 text-center">
		<h2 class="font-display text-[40px] sm:text-[52px] lg:text-[64px] text-[var(--register-text)] max-w-3xl mx-auto leading-[1.02]">
			A marketplace that reads the open rail.
		</h2>
		<p class="mt-6 max-w-xl mx-auto text-lg text-[var(--register-muted)]">
			Voyager MCP is a read lens over the SDK. Listings, stalls, ramp quotes, and DMs stay where they belong — on the rail, signed by their authors.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<Cta variant="primary" href="/build">Read the SDK quick start</Cta>
			<Cta variant="secondary" href="/docs/sdk-surface">See the verb reference</Cta>
		</div>
	</div>
</section>

</RegisterSection>

<style>
	.market-mcp-figure {
		max-width: 28rem;
		margin-left: auto;
		margin-right: auto;
	}
	@media (min-width: 1024px) {
		.market-mcp-figure {
			margin-left: 0;
			margin-right: 0;
		}
	}
	.market-mcp-svg {
		display: block;
		overflow: visible;
	}
	.market-mcp-label {
		font-family: var(--font-sans, system-ui, sans-serif);
		font-size: 13px;
		font-weight: 500;
		fill: var(--register-text);
	}
	.market-mcp-sublabel {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		fill: var(--register-muted);
		opacity: 0.9;
	}
	.market-mcp-link {
		stroke: var(--register-muted);
		stroke-width: 1.5;
		stroke-dasharray: 6 6;
		animation: market-mcp-travel 1.6s linear infinite;
	}
	.market-mcp-link--solid {
		stroke-dasharray: 0;
		animation: none;
	}
	.market-mcp-node {
		animation: market-mcp-pulse 2.4s ease-in-out infinite;
		transform-origin: center;
	}
	@keyframes market-mcp-travel {
		to {
			stroke-dashoffset: -24;
		}
	}
	@keyframes market-mcp-pulse {
		50% {
			opacity: 0.65;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.market-mcp-link {
			animation: none;
		}
		.market-mcp-node {
			animation: none;
		}
	}
	.market-mcp-mock {
		border-radius: 24px;
		background: var(--register-card);
		padding: 0;
		overflow: hidden;
		border: 0;
		box-shadow: none;
	}
	.market-mcp-mock__bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		border-bottom: 0;
		background: var(--register-card);
	}
	.market-mcp-mock__dot {
		width: 10px;
		height: 10px;
		border-radius: 999px;
		background: var(--c, var(--register-text));
		display: inline-block;
	}
	.market-mcp-mock__title {
		margin-left: 8px;
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 12px;
		color: var(--register-muted);
	}
	.market-mcp-mock__body {
		margin: 0;
		padding: 18px 20px;
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 13px;
		line-height: 1.55;
		color: var(--register-text);
		white-space: pre;
		overflow-x: auto;
		background: var(--register-ground);
	}
	.market-mcp-mock__body :global(.t-muted) {
		color: var(--register-muted);
	}
	.market-mcp-mock__body :global(.t-ink) {
		color: var(--register-text);
	}
	.market-mcp-mock__body :global(.t-key) {
		color: var(--register-muted);
	}
	.market-mcp-mock__body :global(.t-str) {
		color: var(--register-muted);
	}
	.market-mcp-tile {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		padding: 18px;
		border-radius: 24px;
		background: var(--register-card);
	}
</style>
