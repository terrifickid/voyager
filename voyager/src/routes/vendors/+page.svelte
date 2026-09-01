<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>For vendors — Voyager</title>
</svelte:head>

<!-- Hero -->
<section class="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">For merchants</span>
		<h1 class="font-display text-[44px] sm:text-[56px] lg:text-[64px] text-ink max-w-4xl leading-[1.02]">
			Open protocol. Federated. Uncensorable.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-ink-2">
			Sell anything that has a price — physical goods, stays, services, digital downloads, experiences. No platform sits between you and the buyer, and the marketplace is designed so attacking it is a bad business. The protocol has no politics. It has math.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/docs">Start selling</Cta>
			<Cta variant="secondary" href="/pay">Read the protocol</Cta>
		</div>
	</div>
</section>

<!-- Three audiences (vendor perspective) -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="map-pin" tone="sky" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">For independent sellers</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				A single operator listing physical goods, a craftsperson, a market stall. One nostr key, one signed listing, every agent host that connects to Voyager MCP sees it.
			</p>
			<div class="mt-2">
				<Cta variant="tertiary" href="#what-you-can-sell">What you can sell</Cta>
			</div>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="bed" tone="violet" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">For service businesses</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Stays, tours, guides, consulting hours, digital downloads. The same wire format carries them. Add your own fields under a custom namespace without forking the protocol.
			</p>
			<div class="mt-2">
				<Cta variant="tertiary" href="#what-you-can-sell">What you can sell</Cta>
			</div>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="globe" tone="coral" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">For anyone, anywhere</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Pseudonymous at the protocol layer, cross-border by default, no KYC tier to satisfy. The keys you hold are the identity your customers remember.
			</p>
			<div class="mt-2">
				<Cta variant="tertiary" href="#why-fair">Why the marketplace is fair</Cta>
			</div>
		</article>
	</div>
</section>

<!-- In-page TOC -->
<nav class="mx-auto max-w-6xl px-6 pb-16" aria-label="On this page">
	<ul class="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
		<li><a href="#what-you-can-sell" class="text-ink underline underline-offset-4 decoration-[1.5px]">What you can sell</a></li>
		<li><a href="#why-fair" class="text-ink underline underline-offset-4 decoration-[1.5px]">Why the marketplace is fair</a></li>
		<li><a href="#mcp" class="text-ink underline underline-offset-4 decoration-[1.5px]">MCP — list once, appear everywhere</a></li>
		<li><a href="#how-it-works" class="text-ink underline underline-offset-4 decoration-[1.5px]">How listing works</a></li>
		<li><a href="#what-you-keep" class="text-ink underline underline-offset-4 decoration-[1.5px]">What you keep</a></li>
	</ul>
</nav>

<!-- §1 What you can sell -->
<section id="what-you-can-sell" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="What you can sell"
		title="Anything with a price."
		lede="Listings are signed events on nostr. A reserved v tag namespace carries your category — the convention ships the schema, you fill in the fields."
	/>
	<div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="map-pin" tone="sky" size={28} />
			<span class="eyebrow">voyager.listing.v1</span>
			<h3 class="font-display text-xl text-ink leading-tight">Physical goods</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Snapper, sandals, hardware. Ship weight, pickup, courier — all in the same event shape. The relay doesn't care what's in the box.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="bed" tone="violet" size={28} />
			<span class="eyebrow">voyager.accommodation.v1</span>
			<h3 class="font-display text-xl text-ink leading-tight">Stays & experiences</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Rooms, rentals, weeks. Add check-in, check-out, capacity, group size without changing the wire format.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="sparkle" tone="rose" size={28} />
			<span class="eyebrow">voyager.service.v1</span>
			<h3 class="font-display text-xl text-ink leading-tight">Services & digital</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Hours, deliverables, downloads. The same kind:30402 event carries your rate, your scope, your deliverable URI.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="compass" tone="coral" size={28} />
			<span class="eyebrow">Custom namespace</span>
			<h3 class="font-display text-xl text-ink leading-tight">Anything with a price</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Invent your own v tag under your namespace. The protocol guarantees event structure and forwarding — your semantics ride on top without forking anything.
			</p>
		</article>
	</div>
</section>

<!-- §2 Why fair -->
<section id="why-fair" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<SectionHeader
			eyebrow="Why the marketplace is fair"
			title="Fair by construction."
			lede="The design refuses the failure modes that make platforms capturable. Three properties hold at the protocol layer — not as policy, as math."
		/>
		<ol class="mt-10 flex flex-col gap-5">
			<li class="flex gap-5 rounded-[28px] bg-bone-200 p-6">
				<span class="font-display text-3xl text-ink leading-none">1</span>
				<div class="flex flex-col gap-2">
					<h3 class="font-display text-xl text-ink leading-tight">Operators compete.</h3>
					<p class="text-[15px] leading-relaxed text-ink-2">
						Mostro nodes compete on rate, fee, and reputation. You pick the one your buyer uses. No house takes a cut on the match — the protocol never holds funds and never sets a price.
					</p>
				</div>
			</li>
			<li class="flex gap-5 rounded-[28px] bg-bone-200 p-6">
				<span class="font-display text-3xl text-ink leading-none">2</span>
				<div class="flex flex-col gap-2">
					<h3 class="font-display text-xl text-ink leading-tight">No one can deplatform you.</h3>
					<p class="text-[15px] leading-relaxed text-ink-2">
						Listings live on public relays. Take one relay down and four more still have them. The relay set is a federation, not a tenant.
					</p>
				</div>
			</li>
			<li class="flex gap-5 rounded-[28px] bg-bone-200 p-6">
				<span class="font-display text-3xl text-ink leading-none">3</span>
				<div class="flex flex-col gap-2">
					<h3 class="font-display text-xl text-ink leading-tight">Attacking it is a bad business.</h3>
					<p class="text-[15px] leading-relaxed text-ink-2">
						The same EROI rubric Voyager Pay was built against means a capturable marketplace isn't the marketplace you'll get. The attacker's cost runs structurally higher than the loot.
					</p>
				</div>
			</li>
		</ol>
		<p class="mt-10 max-w-2xl text-lg leading-relaxed text-ink-2">
			The protocol has no politics. It has math.
		</p>
	</div>
</section>

<!-- §3 MCP — list once, appear everywhere -->
<section id="mcp" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
			<SectionHeader
				eyebrow="MCP"
				title="List once, appear everywhere."
				lede="AI agents are becoming a primary buyer-side surface. Voyager MCP turns every signed listing into an agent-discoverable resource — automatically."
			/>
			<figure class="mcp-figure">
				<svg
					class="mcp-svg"
					viewBox="0 0 520 360"
					width="100%"
					role="img"
					aria-labelledby="mcp-title mcp-desc"
				>
					<title id="mcp-title">Voyager MCP syndication topology</title>
					<desc id="mcp-desc">
						A vendor listing on the left feeds into the voyager-mcp hub in the center,
						which radiates outward to four agent hosts: an IDE plugin at the top, Claude
						Desktop at the upper right, ChatGPT at the lower right, and a custom agent at
						the bottom.
					</desc>

					<!-- vendor → voyager-mcp (solid) -->
					<line x1="60" y1="200" x2="246" y2="200" class="mcp-link mcp-link--solid" />

					<!-- voyager-mcp → 4 agent hosts (dashed, animated) -->
					<line x1="274" y1="200" x2="260" y2="72" class="mcp-link" />
					<line x1="274" y1="200" x2="466" y2="100" class="mcp-link" />
					<line x1="274" y1="200" x2="466" y2="300" class="mcp-link" />
					<line x1="274" y1="200" x2="260" y2="328" class="mcp-link" />

					<!-- vendor node -->
					<g>
						<circle cx="60" cy="200" r="10" fill="var(--ink)" />
						<text x="60" y="232" class="mcp-label" text-anchor="middle">your listing</text>
						<text x="60" y="170" class="mcp-sublabel" text-anchor="middle">kind:30402</text>
					</g>

					<!-- voyager-mcp hub (slightly larger) -->
					<g>
						<circle cx="260" cy="200" r="14" fill="var(--pastel-sky)" stroke="var(--ink)" stroke-width="1.5" />
						<circle cx="260" cy="200" r="20" fill="none" stroke="var(--ink)" stroke-width="1" opacity="0.25" />
						<text x="260" y="238" class="mcp-label" text-anchor="middle">voyager-mcp</text>
						<text x="260" y="170" class="mcp-sublabel" text-anchor="middle">stateless read lens</text>
					</g>

					<!-- 4 agent hosts -->
					<g class="mcp-node">
						<circle cx="260" cy="60" r="10" fill="var(--pastel-rose)" stroke="var(--ink)" stroke-width="1.5" />
						<text x="260" y="42" class="mcp-label" text-anchor="middle">custom agent</text>
					</g>
					<g class="mcp-node">
						<circle cx="470" cy="100" r="10" fill="var(--pastel-violet)" stroke="var(--ink)" stroke-width="1.5" />
						<text x="470" y="82" class="mcp-label" text-anchor="middle">Claude Desktop</text>
					</g>
					<g class="mcp-node">
						<circle cx="470" cy="300" r="10" fill="var(--pastel-coral)" stroke="var(--ink)" stroke-width="1.5" />
						<text x="470" y="322" class="mcp-label" text-anchor="middle">IDE plugin</text>
					</g>
					<g class="mcp-node">
						<circle cx="490" cy="220" r="10" fill="var(--pastel-sky)" stroke="var(--ink)" stroke-width="1.5" />
						<text x="528" y="224" class="mcp-label" text-anchor="start">ChatGPT</text>
					</g>
				</svg>
				<figcaption class="mt-4 text-[13px] leading-snug text-muted lg:text-left text-center">
					One signed event. Four agent surfaces. Every new MCP host inherits it.
				</figcaption>
			</figure>
		</div>
		<p class="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2">
			Publish a single kind:30402 and voyager-mcp fans it out to every agent host on the
			network — today, and every host that connects tomorrow.
		</p>
		<div class="mt-10 rounded-[28px] bg-bone-200 p-6">
			<span class="eyebrow">How it works</span>
			<p class="mt-3 text-[15px] leading-relaxed text-ink-2">
				voyager-mcp subscribes to kind:30402, kind:30017, and kind:38383 across the public relay set, builds an in-memory projection, and exposes search, quote, and order tools to any compliant agent host. Anyone can run an instance — the canonical one is free to use, rate-limited, and the protocol doesn't gatekeep specialized or vendor-hosted deployments. See the full strategy and implementation paper at <code class="font-mono text-ink">MCP.md</code> in the repo.
			</p>
		</div>
		<div class="mt-8">
			<Cta variant="secondary" href="/docs/how-voyager-pay-extends">Read the convention-side spec</Cta>
		</div>
	</div>
</section>

<!-- §4 How listing works -->
<section id="how-it-works" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="How listing works"
		title="Three steps. No approval."
		lede="Plain English from key to agent discovery. Every step is a signed event or a relay hop."
	/>
	<div class="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="save" tone="sky" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">1. Publish</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Sign a kind:30402 event with your nostr key. Title, price, category tags, your fields — all on a single signed event you control.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="share" tone="violet" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">2. Relay</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				The event lands on the public relay set within seconds. The relays are a federation — your listing fans out to whichever ones accept your pubkey policy.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="bolt" tone="coral" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">3. Discover</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				voyager-mcp and every compatible agent host see it. Search, quote, compare, initiate order — all from a single signed event you published once.
			</p>
		</article>
	</div>
	<p class="mt-10 max-w-2xl text-lg leading-relaxed text-ink-2">
		No approval step. No review queue. No platform in the middle.
	</p>
</section>

<!-- §5 What you keep -->
<section id="what-you-keep" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<SectionHeader
			eyebrow="What you keep"
			title="Three things no platform can take."
			lede="The protocol hands them to you by construction — not as a promise, as a property of the design."
		/>
		<ul class="mt-10 flex flex-col gap-5">
			<li class="flex gap-5 rounded-[28px] bg-bone-200 p-6">
				<Icon name="lock" tone="sky" size={28} />
				<div class="flex flex-col gap-2">
					<h3 class="font-display text-xl text-ink leading-tight">Your keys.</h3>
					<p class="text-[15px] leading-relaxed text-ink-2">
						You sign your own events. No one can revoke your listings, freeze your stall, or delete your history. The key is the storefront.
					</p>
				</div>
			</li>
			<li class="flex gap-5 rounded-[28px] bg-bone-200 p-6">
				<Icon name="check" tone="violet" size={28} />
				<div class="flex flex-col gap-2">
					<h3 class="font-display text-xl text-ink leading-tight">Your reputation.</h3>
					<p class="text-[15px] leading-relaxed text-ink-2">
						Endorsements and zaps are tied to your npub, not to a tenant ID. If you switch storefronts, your ratings follow the key.
					</p>
				</div>
			</li>
			<li class="flex gap-5 rounded-[28px] bg-bone-200 p-6">
				<Icon name="chat" tone="coral" size={28} />
				<div class="flex flex-col gap-2">
					<h3 class="font-display text-xl text-ink leading-tight">Your customers.</h3>
					<p class="text-[15px] leading-relaxed text-ink-2">
						No intermediary owns the buyer relationship. Order traffic is gift-wrapped (encrypted end-to-end) — only the two keys see it. Move cost is high because the loot won't move.
					</p>
				</div>
			</li>
		</ul>
	</div>
</section>

<!-- Final CTA -->
<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-bone-100 p-10 sm:p-16 text-center">
		<span class="eyebrow">Next step</span>
		<h2 class="mt-4 font-display text-[40px] sm:text-[52px] lg:text-[64px] text-ink max-w-3xl mx-auto leading-[1.02]">
			Start selling.
		</h2>
		<p class="mt-6 max-w-xl mx-auto text-lg text-ink-2">
			The convention-side spec walks through the v tag namespacing, the wire format, and a worked kind:30402 example you can sign and publish.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<Cta variant="primary" href="/docs/how-voyager-pay-extends">Continue</Cta>
			<Cta variant="secondary" href="/pay">Read the protocol</Cta>
		</div>
	</div>
</section>

<style>
	.mcp-figure {
		max-width: 28rem;
		margin-left: auto;
		margin-right: auto;
	}
	@media (min-width: 1024px) {
		.mcp-figure {
			margin-left: 0;
			margin-right: 0;
		}
	}
	.mcp-svg {
		display: block;
		overflow: visible;
	}
	.mcp-label {
		font-family: var(--font-sans, system-ui, sans-serif);
		font-size: 13px;
		font-weight: 500;
		fill: var(--ink);
	}
	.mcp-sublabel {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		fill: var(--ink);
		opacity: 0.7;
	}
	.mcp-link {
		stroke: var(--ink);
		stroke-width: 1.5;
		stroke-dasharray: 6 6;
		animation: mcp-travel 1.6s linear infinite;
	}
	.mcp-link--solid {
		stroke-dasharray: 0;
		animation: none;
	}
	.mcp-node {
		animation: mcp-pulse 2.4s ease-in-out infinite;
		transform-origin: center;
	}
	.mcp-node:nth-of-type(2) {
		animation-delay: 0.6s;
	}
	.mcp-node:nth-of-type(3) {
		animation-delay: 1.2s;
	}
	.mcp-node:nth-of-type(4) {
		animation-delay: 1.8s;
	}
	@keyframes mcp-travel {
		to {
			stroke-dashoffset: -24;
		}
	}
	@keyframes mcp-pulse {
		50% {
			opacity: 0.65;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.mcp-link {
			animation: none;
		}
		.mcp-node {
			animation: none;
		}
	}
</style>
