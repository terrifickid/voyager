<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import PayAiAssistCard from '$lib/components/PayAiAssistCard.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>Voyager Pay AI Assist — Type it. The agent parses it.</title>
</svelte:head>

<RegisterSection register="carnival-poster">

<section class="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// voyager-pay · ai assist</span>
		<h1 class="font-display text-[44px] sm:text-[56px] lg:text-[64px] text-[var(--register-text)] max-w-4xl leading-[1.02]">
			Type it. The agent parses it.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-[var(--register-muted)]">
			You don't need a form. You need a sentence. The local agent extracts payee, amount, currency,
			and memo, then asks a federation of Mostro nodes which one will do this trade fairest. It
			watches your history and flags anomalies before you sign.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/projects/ai">Try the unified AI page</Cta>
			<Cta variant="secondary" href="/docs/voyager-pay-ai-spec">Read the spec</Cta>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// how the agent parses"
		title="From sentence to signed flow."
		lede="Every step is deterministic, every step is in your browser, every step is auditable."
	/>
	<div class="mt-10">
		<PayAiAssistCard register="carnival-poster" variant="full" />
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// what it does · what it does not"
		title="Privacy guarantees."
		lede="Same agent, explicit guarantees. The line is drawn at extraction — the agent maps a sentence to a Nostr event, then stops."
	/>
	<div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<Icon name="check" tone="cyan" size={28} />
			<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">What it does</h3>
			<ul class="flex flex-col gap-2 text-sm leading-relaxed text-[var(--register-muted)]">
				<li>Extract payee / amount / currency / memo</li>
				<li>Pick the cheapest credible Mostro node</li>
				<li>Compare new payments against your last 90 days</li>
				<li>Suggest a 5-second pause when an anomaly fires</li>
			</ul>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<Icon name="lock" tone="gold" size={28} />
			<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">What it does NOT do</h3>
			<ul class="flex flex-col gap-2 text-sm leading-relaxed text-[var(--register-muted)]">
				<li>Send your prompt to a server</li>
				<li>Score counterparties you don't know</li>
				<li>Override your signed intent</li>
				<li>Hold your keys</li>
			</ul>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<Icon name="compass" tone="magenta" size={28} />
			<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">Where it runs</h3>
			<ul class="flex flex-col gap-2 text-sm leading-relaxed text-[var(--register-muted)]">
				<li>In your browser (WebLLM / WASM, scripted here)</li>
				<li>On fixtures — no real nodes touched</li>
				<li>Open to inspect in devtools</li>
				<li>Swap-able: any model that speaks JSON wins</li>
			</ul>
		</article>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] bg-[var(--register-card)] p-10 sm:p-16 text-center border border-[var(--register-hair)]">
		<h2 class="font-display text-[36px] sm:text-[48px] lg:text-[56px] text-[var(--register-text)] max-w-3xl mx-auto leading-[1.05]">
			The agent is a parser. The protocol is the product.
		</h2>
		<p class="mt-6 max-w-xl mx-auto text-lg text-[var(--register-muted)]">
			Same wire format. Same Mostro federation. Just a friendlier mouth.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<Cta variant="primary" href="/projects">See the source</Cta>
			<Cta variant="secondary" href="/docs/voyager-pay-sdk-spec">Read the SDK spec</Cta>
		</div>
	</div>
</section>

</RegisterSection>
