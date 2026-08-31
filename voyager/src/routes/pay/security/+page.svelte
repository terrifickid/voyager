<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>Security by design — Voyager Pay</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Voyager Pay</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] lg:text-[64px] text-ink leading-[1.02]">
		Secure by design.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Voyager Pay is built around two structural pillars: no custody, and a federated marketplace. Each pillar produces plain-English outcomes you can take to the bank — or across a border.
	</p>
</section>

<!-- Two-pillar headline -->
<section class="pb-16">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-100 p-8">
			<Icon name="lock" tone="sky" size={28} />
			<span class="eyebrow">Pillar 1</span>
			<h2 class="font-display text-2xl text-ink leading-tight">No custody</h2>
			<p class="text-[15px] leading-relaxed text-ink-2">
				The protocol never holds your funds. Settlement either completes atomically or it does not happen. There is no company in the middle that can be pressured, hacked, or seized.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-100 p-8">
			<Icon name="globe" tone="violet" size={28} />
			<span class="eyebrow">Pillar 2</span>
			<h2 class="font-display text-2xl text-ink leading-tight">Federated marketplace</h2>
			<p class="text-[15px] leading-relaxed text-ink-2">
				A federation of independent Mostro nodes competes on rate, fee, and reputation. No single operator sits in the middle. Anyone can run a node. The network survives any one operator leaving.
			</p>
		</article>
	</div>
</section>

<!-- Four outcomes -->
<section class="pb-20">
	<SectionHeader
		eyebrow="Outcomes"
		title="Four things that follow from the pillars."
		lede="Each outcome names the structural property of the protocol that delivers it. No marketing. No hand-waving."
	/>
	<div class="mt-12 flex flex-col gap-4">
		<article class="rounded-[28px] bg-bone-200 p-8">
			<div class="flex items-center gap-3">
				<Icon name="lock" tone="coral" size={28} />
				<h3 class="font-display text-2xl text-ink leading-tight">Your money can't be seized.</h3>
			</div>
			<p class="mt-4 text-[15px] leading-relaxed text-ink-2">
				No custodian ever holds a balance in your name. Settlement is atomic with the network: a Lightning hold-invoice (a HODL) either releases the sats to the vendor, or refunds them to you. There is no escrow account in a company's books for a court to freeze.
			</p>
		</article>
		<article class="rounded-[28px] bg-bone-200 p-8">
			<div class="flex items-center gap-3">
				<Icon name="bolt" tone="sky" size={28} />
				<h3 class="font-display text-2xl text-ink leading-tight">No one can freeze you.</h3>
			</div>
			<p class="mt-4 text-[15px] leading-relaxed text-ink-2">
				HODL atomicity means the moment you pay fiat off-protocol and the vendor attests to receipt, the network releases the sats. No operator sits on the funds during a "review" window. No platform can hold your money pending a decision.
			</p>
		</article>
		<article class="rounded-[28px] bg-bone-200 p-8">
			<div class="flex items-center gap-3">
				<Icon name="chat" tone="violet" size={28} />
				<h3 class="font-display text-2xl text-ink leading-tight">No platform can deplatform you.</h3>
			</div>
			<p class="mt-4 text-[15px] leading-relaxed text-ink-2">
				Keys are pseudonymous. There is no KYC tier at the protocol layer. The federation means any single operator that refuses you can be routed around — your wallet queries the next node, then the next. The protocol is the product. No single company owns it.
			</p>
		</article>
		<article class="rounded-[28px] bg-bone-200 p-8">
			<div class="flex items-center gap-3">
				<Icon name="compass" tone="rose" size={28} />
				<h3 class="font-display text-2xl text-ink leading-tight">You can switch wallets in a minute.</h3>
			</div>
			<p class="mt-4 text-[15px] leading-relaxed text-ink-2">
				Wallets connect via NWC (Nostr Wallet Connect, a standard for talking to a remote wallet over Nostr). The URI is one-time-paste, budget-scoped, and revocable. No wallet is privileged by the protocol. You sign with your key, not with an account.
			</p>
		</article>
	</div>
</section>

<!-- Honest limits -->
<section class="pb-16">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<span class="eyebrow">Honest limits</span>
		<ul class="mt-6 flex flex-col gap-3 text-ink-2">
			<li>Today, Voyager Pay is a spec, a demo widget, and a Caribbean-tuned reference node. The outcomes above describe the structural properties of the protocol, not the state of a shipped product.</li>
			<li>Dispute resolution is per-node and reputation-weighted. The spec does not impose arbitration.</li>
			<li>Four residual risks remain. The full EROI audit lists them and the mitigations each one leans on.</li>
		</ul>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/docs/voyager-pay-eroi-audit">Read the EROI audit</Cta>
			<Cta variant="secondary" href="/pay#risks">See the risks</Cta>
		</div>
	</div>
</section>

<!-- Next-up CTA -->
<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">Fair pricing — why a federation charges less.</h3>
			<p class="mt-2 text-sm text-ink-2">Competition on rate, fee, and reputation, not rent extraction.</p>
		</div>
		<Cta variant="primary" href="/pay/pricing">Continue</Cta>
	</div>
</section>
