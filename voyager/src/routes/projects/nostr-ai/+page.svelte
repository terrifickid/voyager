<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import NostrAiAgent from '$lib/components/NostrAiAgent.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>Nostr AI — In-browser agent</title>
</svelte:head>

<RegisterSection register="carnival-poster">

<section class="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// nostr-ai · in-browser agent</span>
		<h1 class="font-display text-[44px] sm:text-[56px] lg:text-[64px] text-[var(--register-text)] max-w-4xl leading-[1.02]">
			Reads relays. Writes you.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-[var(--register-muted)]">
			A Nostr client with a local model bolted on. Search the federation, compose and sign a listing, or
			embed the agent in any existing site. The browser does the work — keys, ranking, and reasoning
			never leave the device.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/projects/ai">Try unified AI showcase</Cta>
			<Cta variant="secondary" href="/docs/nostr-ai-spec">Read the spec</Cta>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// search the federation"
		title="A natural-language front-end for Nostr REQ."
		lede="Below is the Search surface. Toggle to Write or Embed inside the agent shell."
	/>
	<div class="mt-10">
		<NostrAiAgent register="carnival-poster" defaultTab="search" />
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-20">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<span class="eyebrow">Why in-browser</span>
			<ul class="flex flex-col gap-3 text-[15px] leading-relaxed text-[var(--register-muted)]">
				<li><span class="font-display text-[var(--register-text)]">No server.</span> Search, ranking, and signing run on the visitor's device. There is no agent backend to fund, scale, or compromise.</li>
				<li><span class="font-display text-[var(--register-text)]">No telemetry.</span> The prompt never leaves. Only the typed Nostr event crosses the network.</li>
				<li><span class="font-display text-[var(--register-text)]">Any device.</span> WASM compiles on phones. WASM substitutes when WebGPU isn't there.</li>
			</ul>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<span class="eyebrow">What stays on your device</span>
			<ul class="flex flex-col gap-3 text-[15px] leading-relaxed text-[var(--register-muted)]">
				<li>nsec — never logged, never exfiltrated, never reused.</li>
				<li>filter construction · you see the REQ JSON before it leaves.</li>
				<li>ranking weights · the rubric lives in your browser, signed with the model.</li>
			</ul>
		</article>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// write & publish"
		title="Compose. Sign. Fan out to three relays."
		lede="The agent composes the listing, you sign it locally, and three relays ACK in parallel."
	/>
	<div class="mt-10">
		<NostrAiAgent register="carnival-poster" defaultTab="write" />
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="// embed anywhere"
		title="A drop-in script tag for any existing site."
		lede="Hotels, blogs, and B&Bs paste one tag. The visitor's browser pulls in ranked Nostr content."
	/>
	<div class="mt-10">
		<NostrAiAgent register="carnival-poster" defaultTab="embed" />
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-[var(--register-card)] p-10 sm:p-16 text-center border border-[var(--register-hair)]">
		<h2 class="font-display text-[36px] sm:text-[48px] lg:text-[56px] text-[var(--register-text)] max-w-3xl mx-auto leading-[1.05]">
			Agents belong to the people running them.
		</h2>
		<p class="mt-6 max-w-xl mx-auto text-lg text-[var(--register-muted)]">
			Nostr AI is a reference client, not a service. Build your own. Swap the model. Keep the keys.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<Cta variant="primary" href="/docs/nostr-ai-sdk">See the source</Cta>
			<Cta variant="secondary" href="/projects/ai">Open unified AI page</Cta>
		</div>
	</div>
</section>

</RegisterSection>
