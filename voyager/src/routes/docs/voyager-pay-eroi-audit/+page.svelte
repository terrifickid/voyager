<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>How Voyager Pay satisfies the EROI rubric — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 7</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		How Voyager Pay satisfies the EROI rubric.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Every choice in Voyager Pay's design is a pull on one of the three knobs. Here is the audit:
		which design move raises which knob, and what the resulting score profile is.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink mt-4">Fan-out — 3 / 3</h2>
		<p>
			<strong class="text-ink">Find and hold cost are pushed up by dispersion.</strong> Anyone
			can run a node; anyone can run a relay. The bootstrap spec ships with at least four
			independent relay operators, and the Mostro network is a federation of competing market
			makers — no single operator is a single point of failure. Wallets are interchangeable and
			most users will use NWC-scoped connections, each of which is a small bounded instance
			rather than a global credential. Vendor-side data storage means there is no central
			listing server holding everyone's order book.
		</p>
		<p>
			The result: an attacker who wants to compromise "the system" has to compromise N
			independent things in N different jurisdictions, run by N different operators. That
			budget is structurally larger than the budget to compromise one custodian.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">Opacity — 3 / 3</h2>
		<p>
			<strong class="text-ink">Find and reach cost are pushed up by what isn't published.</strong>
			Order messages use NIP-17 gift-wrapped DMs: relays see nothing identifying about who is
			talking to whom, only that encrypted blobs are moving. There is no KYC tier inside the
			protocol — keys are pseudonymous and reputation is keyed to a pubkey, not a person. The
			Lightning chain is opaque to fiat-side observers; the sats leg is a public ledger, but the
			fiat leg is private by default.
		</p>
		<p>
			The result: an attacker who wants to identify counterparties has to break NIP-17 first,
			not the relay. And there is no single place where identity is asserted to begin with.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">Binding — 3 / 3</h2>
		<p>
			<strong class="text-ink">Move cost is pushed up by detachment cost.</strong> Every
			meaningful action needs a local key — no shared session token, no admin override, no
			"platform reset". HODL invoices make settlement atomic with the network: the Mostro node
			cannot take the sats without delivering the fiat, because releasing the HODL is what
			releases the sats. NWC scopes are budget-bounded and revocable — losing one does not lose
			the wallet.
		</p>
		<p>
			The result: stolen credentials are revocable, captured sats cannot be moved without
			fiat-side delivery, and the worst-case exposure of a compromised node is bounded to the
			HODL amount — not the customer balance.
		</p>

		<div class="rounded-[28px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">Score profile</p>
			<p class="mt-2 font-display text-2xl text-ink">Fan-out 3 · Opacity 3 · Binding 3</p>
			<p class="mt-2">
				That profile matches the rubric ceiling. Each score would have to drop before the
				system becomes structurally capturable: Fan-out below 2 means a small number of nodes
				holds a disproportionate share of liquidity. Opacity below 2 means an attacker can
				identify counterparties cheaply. Binding below 2 means a successful breach translates
				directly into movable loot. None of those are where Voyager Pay sits today.
			</p>
		</div>

		<p>
			Profile (3, 3, 3) doesn't mean "nothing can go wrong". It means the structural costs are
			high enough that most attackers move on. The next lesson is where this matters most:
			what's still risky anyway.
		</p>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">What can still go wrong</h3>
			<p class="mt-2 text-sm text-ink-2">Honest enumeration of the four residual risks and the structural mitigations Voyager Pay leans on.</p>
		</div>
		<Cta variant="primary" href="/docs/what-can-still-go-wrong">Continue</Cta>
	</div>
</section>
