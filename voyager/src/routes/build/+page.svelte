<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import HeritageLineage from '$lib/components/HeritageLineage.svelte';

	const LINEAGE = [
		{ label: 'mento', note: 'pre-reggae · 1950s' },
		{ label: 'ska', note: '1960s' },
		{ label: 'rocksteady', note: 'mid 1960s' },
		{ label: 'reggae', note: 'late 1960s→' }
	];
</script>

<svelte:head>
	<title>Start building — Voyager · Caribbean-first rails</title>
</svelte:head>

<RegisterSection register="carnival-poster">

<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// start building</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] text-[var(--register-text)] leading-[0.95] max-w-4xl">
			Ship the first Caribbean app that doesn't need a US bank.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-[var(--register-text)]">
			The SDK is open source. The protocol is the product. Voyager-the-business never sits between you and your users.
		</p>
	</div>
</section>

<!-- SDK get-started -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// the SDK"
		title="Get started in five lines."
		lede="A Stripe-shaped surface, Nostr underneath. The SDK hides the keys, the wire format, and the relay fan-out."
	/>
	<div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
		<figure class="rounded-[24px] bg-[var(--register-ground)] border border-[var(--register-hair)] overflow-hidden">
			<div class="flex items-center gap-2 px-5 py-3 border-b border-[var(--register-hair)]">
				<span class="h-2.5 w-2.5 rounded-full" style="background: var(--heritage-amber);"></span>
				<span class="h-2.5 w-2.5 rounded-full" style="background: var(--heritage-sepia);"></span>
				<span class="h-2.5 w-2.5 rounded-full" style="background: var(--heritage-rust);"></span>
				<span class="ml-2 font-mono text-[12px] text-[var(--register-muted)]">your-app.ts</span>
			</div>
			<pre class="m-0 px-6 py-5 font-mono text-[13px] leading-[1.6] text-[var(--register-text)] bg-[var(--register-card)] overflow-x-auto"><span class="text-[var(--register-muted)]">// install: npm i @voyager/sdk</span>
<span class="text-[var(--register-text)]">import</span> &#123; voyager &#125; <span class="text-[var(--register-text)]">from</span> <span style="color: var(--register-accent)">"@voyager/sdk"</span>;

<span class="text-[var(--register-text)]">const</span> me = <span class="text-[var(--register-text)]">await</span> voyager.identity.create();
<span class="text-[var(--register-text)]">const</span> invoice = <span class="text-[var(--register-text)]">await</span> voyager.pay.invoice(bolt11);
<span class="text-[var(--register-text)]">const</span> quotes  = <span class="text-[var(--register-text)]">await</span> voyager.pay.quote(<span style="color: var(--register-accent)">"JMD"</span>, <span style="color: var(--register-accent)">5000</span>);
<span class="text-[var(--register-text)]">await</span> voyager.listing.create(&#123; kind: <span style="color: var(--register-accent)">30402</span>, title, region &#125;);
<span class="text-[var(--register-text)]">await</span> voyager.dm.send(toNpub, &#123; orderId, terms &#125;);</pre>
		</figure>
		<div class="flex flex-col gap-4 rounded-[28px] bg-[var(--register-card)] p-7">
			<span class="eyebrow">What you get</span>
			<ul class="flex flex-col gap-3 text-[15px] text-[var(--register-muted)]">
				<li>Identity, payments, ramp, messaging, and discovery in one package.</li>
				<li>MIT or Apache license. No royalty, no telemetry, no required attribution.</li>
				<li>TypeScript today. Python and Go when there's demand.</li>
				<li>Host a web app, a Node service, or a serverless function. No daemon required.</li>
			</ul>
		</div>
	</div>
</section>

<!-- SDK / What's inside -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="grid grid-cols-1 lg:grid-cols-2 rounded-[28px] overflow-hidden">
		<div class="p-8 sm:p-12 flex flex-col gap-5 bg-[var(--register-ground)]">
			<span class="eyebrow">// the SDK</span>
			<h2 class="font-display text-[36px] sm:text-[44px] leading-[1.05] max-w-md text-[var(--register-text)]">Stripe-shaped surface.</h2>
			<p class="text-[15px] leading-relaxed text-[var(--register-muted)] max-w-md">A handful of well-named calls. The SDK hides the keys, the wire format, and the relay fan-out. MIT or Apache. No telemetry. No required attribution.</p>
		</div>
		<div class="p-8 sm:p-12 flex flex-col gap-5" style="background-color: var(--register-accent); color: var(--register-accent-ink);">
			<span class="eyebrow" style="--register-eyebrow: var(--register-accent-ink); opacity: 0.7">// what's inside</span>
			<h2 class="font-display text-[36px] sm:text-[44px] leading-[1.05] max-w-md" style="color: var(--register-accent-ink)">Five primitives, ten calls.</h2>
			<p class="text-[15px] leading-relaxed max-w-md" style="color: var(--register-accent-ink)">identity.create, pay.invoice, pay.quote, listing.create, dm.send, dm.read — that is most of what builders need. The rest is configuration, not new API.</p>
			<div class="mt-2">
				<Cta variant="primary" href="/docs" class="bg-ink! text-bone-50! hover:bg-ink-2!">Read the docs</Cta>
			</div>
		</div>
	</div>
</section>

<!-- Economics -->
<section id="economics" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="Builder economics"
		title="What we charge for, and what we don't."
		lede="Voyager-the-business has no protocol-critical revenue. The protocol survives without us."
	/>
	<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-7">
			<span class="eyebrow">We charge for</span>
			<ul class="flex flex-col gap-3 text-[15px] text-[var(--register-muted)]">
				<li><span class="font-display text-[var(--register-text)]">Hosted indexer.</span> Free tier + paid SLA for apps that need higher rate limits and webhooks.</li>
				<li><span class="font-display text-[var(--register-text)]">Reference Mostro node.</span> 0.3% fee on Caribbean rail trades. Competitive with regional alternatives.</li>
				<li><span class="font-display text-[var(--register-text)]">Premium SDK features.</span> Pre-indexed discovery, hosted webhooks, app-builder support contracts.</li>
				<li><span class="font-display text-[var(--register-text)]">Implementation services.</span> Help for builders who want to ship their first app on the toolkit.</li>
			</ul>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-7">
			<span class="eyebrow">We don't charge for</span>
			<ul class="flex flex-col gap-3 text-[15px] text-[var(--register-muted)]">
				<li>Lightning routing fees. That's the routing nodes' | business.</li>
				<li>A cut of every app's commerce. We are not a platform tax.</li>
				<li>User data. We have no user data; users own their keys.</li>
				<li>Proprietary lock-in via identity. Nostr keys are interoperable with hundreds of apps.</li>
			</ul>
		</article>
	</div>
</section>

<!-- Regulatory posture -->
<section id="regulatory" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="Regulatory posture"
		title="We're not a money services business. Neither are you, by default."
		lede="The protocol doesn't see fiat, hold funds, or run KYC. Apps that touch fiat take on their own posture. Voyager ships a checklist so builders know what to think about."
	/>
	<div class="mt-10 flex flex-col gap-4 rounded-[28px] bg-[var(--register-card)] p-8 text-[15px] leading-relaxed text-[var(--register-muted)]">
		<p>
			<span class="font-display text-[var(--register-text)]">No custody.</span> The protocol never holds funds. Settlement either completes atomically or it does not happen.
		</p>
		<p>
			<span class="font-display text-[var(--register-text)]">No wallet custody.</span> Users bring their own (Alby, Mutiny, Phoenix, Breez, Zeus). Voyager operates no custodial balance.
		</p>
		<p>
			<span class="font-display text-[var(--register-text)]">No identity dossier.</span> KYC is the optional responsibility of whoever touches fiat. The protocol layer doesn't see it, doesn't store it, doesn't require it.
		</p>
		<p>
			<span class="font-display text-[var(--register-text)]">Apps carry their own posture.</span> The SDK ships with a regulatory checklist naming the touch points (MSB, data protection, voluntary KYC). It is not legal advice.
		</p>
	</div>
</section>

<!-- Join the alpha -->
<section id="join-alpha" class="mx-auto max-w-6xl px-6 pb-32 scroll-mt-20">
		<div class="rounded-[32px] bg-[var(--register-accent)] text-[var(--register-accent-ink)] p-10 sm:p-16 text-center border border-[var(--heritage-rust)]/40">
			<span class="eyebrow" style="--register-eyebrow: var(--register-accent-ink); opacity: 0.7">// join the alpha</span>
			<h2 class="mt-4 font-display text-[40px] sm:text-[52px] lg:text-[64px] max-w-3xl mx-auto leading-[1.02]" style="color: var(--register-accent-ink)">
				Ship on the toolkit. We'll help you ship.
			</h2>
			<p class="mt-6 max-w-xl mx-auto text-lg" style="color: var(--register-accent-ink); opacity: 0.8">
				Two Caribbean builder teams TBD — one Jamaica, one Trinidad — selected by what use case they want to ship, not by technical prestige. Diaspora developers welcome.
			</p>
			<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
				<Cta variant="primary" href="mailto:hello@voyager.example?subject=Alpha%20build" class="bg-ink! text-bone-50! hover:bg-ink-2!">Email the alpha team</Cta>
				<Cta variant="secondary" href="/principles" class="border-ink! text-ink! hover:bg-ink! hover:text-[var(--register-accent)]!">Read the principles</Cta>
			</div>
		</div>
	</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<HeritageLineage
		eyebrow="We ship what we build — a Caribbean sequence"
		stages={LINEAGE}
		caption="mento → ska → rocksteady → reggae. Each one built on the last, not against it. Voyager builds on the same sequence."
	/>
</section>
</RegisterSection>
