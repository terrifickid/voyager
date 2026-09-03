<script>
	import Cta from '$lib/components/Cta.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>Security by design — Voyager Pay · Caribbean-first</title>
</svelte:head>

<!-- §1 Foundation -->
<RegisterSection register="civic-ocean">
<section class="mx-auto max-w-6xl px-6 pt-20 pb-20 lg:pt-28">
	<SectionHeader
		eyebrow="Foundation"
		title="Money on Bitcoin. Messages on Nostr. No one in the middle."
		lede="Voyager Pay isn't a platform that runs on trust. It's three open networks stitched together — and the design does the policing."
	/>

	<div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<span class="eyebrow">Bitcoin</span>
			<p class="text-sm leading-relaxed text-ink-2">
				A public ledger the whole world keeps identical. Changing history costs more than anything you'd take from it.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<span class="eyebrow">Lightning</span>
			<p class="text-sm leading-relaxed text-ink-2">
				Fast payments stacked on that ledger, sealed with one-way locks only the recipient can open.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<span class="eyebrow">Nostr</span>
			<p class="text-sm leading-relaxed text-ink-2">
				An open message network where your signature is the receipt. No relay owns your identity.
			</p>
		</article>
	</div>

	<div class="mt-8 rounded-[28px] bg-bone-100 p-6 sm:p-8">
		<p class="text-sm leading-relaxed text-ink-2">
			Three structural properties: <strong class="text-ink">Dispersion</strong> spread across many operators · <strong class="text-ink">Opacity</strong> because your order is sealed, not plain · <strong class="text-ink">Binding</strong> because the design doesn't let anyone rewrite history.
		</p>
	</div>
</section>

<!-- Four outcomes -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="Outcomes"
		title="Four things that follow from the pillars."
		lede="Each outcome names the structural property of the protocol that delivers it. No marketing. No hand-waving."
	/>
	<div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="lock" tone="coral" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">Your money stays yours.</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				No custodian ever holds a balance in your name. Settlement is atomic with the network: a Lightning hold-invoice (a HODL) either releases the sats to the vendor, or refunds them to you. There is no escrow account in a company's books — settlement is atomic with the network, not with an operator.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="bolt" tone="sky" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">You finish the trade.</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				HODL atomicity means the moment you pay fiat off-protocol and the vendor attests to receipt, the network releases the sats. No operator sits on the funds during a review. The settlement is atomic — the protocol either releases the funds or returns them.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="chat" tone="violet" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">You pick your own platform.</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Keys are pseudonymous. There is no KYC tier at the protocol layer. The federation means your wallet queries the next node, then the next, then the next. The protocol is the product. No single company owns it.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="compass" tone="rose" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">Your wallet, your choice.</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Wallets connect via NWC (Nostr Wallet Connect, a standard for talking to a remote wallet over Nostr). The URI is one-time-paste, budget-scoped, and revocable. No wallet is privileged by the protocol. You sign with your key, not with an account.
			</p>
		</article>
	</div>
</section>

<!-- Honest limits + next-up CTA nested -->
<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-bone-200 p-8 sm:p-12">
		<span class="eyebrow">Honest limits</span>
		<ul class="mt-6 flex flex-col gap-3 text-ink-2">
			<li>Today, Voyager Pay is a spec, a demo widget, and a Caribbean-tuned reference node. The outcomes above describe the structural properties of the protocol, not the state of a shipped product.</li>
			<li>Dispute resolution is per-node and reputation-weighted. The spec does not impose arbitration.</li>
			<li>Four honest limits remain. The full EROI audit lists them and the mitigations each one leans on.</li>
		</ul>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/docs/voyager-pay-eroi-audit">Read the EROI audit</Cta>
			<Cta variant="secondary" href="/projects/voyager-pay#extends">See the open design</Cta>
		</div>

		<div class="mt-12 flex flex-col gap-6 rounded-[28px] bg-bone-100 p-8 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<span class="eyebrow">Next up</span>
				<h3 class="mt-2 font-display text-xl text-ink">Fair pricing — why a federation charges less.</h3>
				<p class="mt-2 text-sm text-ink-2">Competition on rate, fee, and reputation, not rent extraction.</p>
			</div>
			<Cta variant="primary" href="/projects/voyager-pay/pricing">Continue</Cta>
		</div>
	</div>
</section>
</RegisterSection>
