<script>
	import Cta from '$lib/components/Cta.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>Security by design — Voyager Pay · open rails</title>
</svelte:head>

<!-- §1 Foundation -->
<RegisterSection register="carnival-poster">
<section class="mx-auto max-w-6xl px-6 pt-20 pb-20 lg:pt-28">
	<SectionHeader
		eyebrow="Foundation"
		title="Money on Bitcoin. Messages on Nostr. No one in the middle."
		lede="Voyager Pay isn't a platform that runs on trust. It's three open networks stitched together — and the design does the policing."
	/>

	<div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<span class="eyebrow">Bitcoin</span>
			<p class="text-sm leading-relaxed text-[var(--register-muted)]">
				A public ledger the whole world keeps identical. Changing history costs more than anything you'd take from it.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<span class="eyebrow">Lightning</span>
			<p class="text-sm leading-relaxed text-[var(--register-muted)]">
				Fast payments stacked on that ledger, sealed with one-way locks only the recipient can open.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<span class="eyebrow">Nostr</span>
			<p class="text-sm leading-relaxed text-[var(--register-muted)]">
				An open message network where your signature is the receipt. No relay owns your identity.
			</p>
		</article>
	</div>

	<div class="mt-8 rounded-[28px] bg-[var(--register-card)] p-6 sm:p-8">
		<p class="text-sm leading-relaxed text-[var(--register-muted)]">
			Three structural properties: <strong class="text-[var(--register-text)]">Dispersion</strong> spread across many operators · <strong class="text-[var(--register-text)]">Opacity</strong> because your order is sealed, not plain · <strong class="text-[var(--register-text)]">Binding</strong> because the design doesn't let anyone rewrite history.
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
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<Icon name="lock" tone="ink" size={28} />
			<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">Your money stays yours.</h3>
			<p class="text-sm leading-relaxed text-[var(--register-muted)]">
				No custodian ever holds a balance in your name. Settlement is atomic with the network: a Lightning hold-invoice (a HODL) either releases the sats to the vendor, or refunds them to you. There is no escrow account in a company's books — settlement is atomic with the network, not with an operator.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<Icon name="bolt" tone="ink" size={28} />
			<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">You finish the trade.</h3>
			<p class="text-sm leading-relaxed text-[var(--register-muted)]">
				HODL atomicity means the moment you pay fiat off-protocol and the vendor attests to receipt, the network releases the sats. No operator sits on the funds during a review. The settlement is atomic — the protocol either releases the funds or returns them.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<Icon name="chat" tone="ink" size={28} />
			<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">You pick your own platform.</h3>
			<p class="text-sm leading-relaxed text-[var(--register-muted)]">
				Keys are pseudonymous. There is no KYC tier at the protocol layer. The federation means your wallet queries the next node, then the next, then the next. The protocol is the product. No single company owns it.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<Icon name="compass" tone="ink" size={28} />
			<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">Your wallet, your choice.</h3>
			<p class="text-sm leading-relaxed text-[var(--register-muted)]">
				Wallets connect via NWC (Nostr Wallet Connect, a standard for talking to a remote wallet over Nostr). The URI is one-time-paste, budget-scoped, and revocable. No wallet is privileged by the protocol. You sign with your key, not with an account.
			</p>
		</article>
	</div>
</section>


</RegisterSection>
