<script>
	import Cta from '$lib/components/Cta.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
</script>

<svelte:head>
	<title>How Voyager Pay extends — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-10">
	<span class="eyebrow">Lesson 9</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		How Voyager Pay extends.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Voyager Pay works for any marketplace. New vendor kinds — physical goods, stays, experiences, services, digital goods — ship by publishing a convention on a reserved <strong class="text-ink">v tag</strong> (a reserved tag prefix that carries convention-specific fields). The protocol does not change.
	</p>
</section>

<nav class="pb-10" aria-label="On this page">
	<ul class="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
		<li><a href="#substrate" class="text-ink underline underline-offset-4 decoration-[1.5px]">Substrate</a></li>
		<li><a href="#conventions" class="text-ink underline underline-offset-4 decoration-[1.5px]">Conventions</a></li>
		<li><a href="#v-tag" class="text-ink underline underline-offset-4 decoration-[1.5px]">The v tag</a></li>
		<li><a href="#examples" class="text-ink underline underline-offset-4 decoration-[1.5px]">Examples</a></li>
		<li><a href="#how-to-add" class="text-ink underline underline-offset-4 decoration-[1.5px]">How to add one</a></li>
		<li><a href="#out-of-scope" class="text-ink underline underline-offset-4 decoration-[1.5px]">Out of scope</a></li>
	</ul>
</nav>

<section id="substrate" class="pb-10 scroll-mt-20">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink">The substrate is fixed.</h2>
		<p>
			The protocol guarantees event structure and forwarding integrity. It does not guarantee event semantics. The three substrate promises:
		</p>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li>Events are signed and replaceable by <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">pubkey + d</code> — the vendor's public key plus a stable listing identifier.</li>
			<li>Relays forward unknown events per <a href="https://github.com/nostr-protocol/nips/blob/master/01.md" class="underline underline-offset-4">NIP-01</a> (the basic Nostr event spec). A relay does not need to understand your tags to store them.</li>
			<li>Clients ignore unknown tags. A wallet that does not recognise a tag prefix skips it. Nothing breaks.</li>
		</ul>
		<p>
			Those three guarantees are the floor. Every convention in the next section rides on top.
		</p>
	</div>
</section>

<section id="conventions" class="pb-10 scroll-mt-20">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink">Conventions are extensible.</h2>
		<p>
			A convention is a short document that defines one vendor sub-namespace. Conventions ride alongside the required fields, never inside them. The listing stays a listing — the convention just adds the fields a particular vendor kind needs.
		</p>
		<div class="rounded-[28px] bg-bone-100 p-6">
			<p class="eyebrow">A listing event</p>
			<pre class="mt-3 overflow-x-auto rounded-[20px] bg-bone-200 p-4 text-[14px] leading-relaxed text-ink"><code>kind: 30402
tags:
  ["d", "&lt;uuid&gt;"]
  ["title", "Fresh whole snapper"]
  ["price", "42000", "sats"]
  ["v", "voyager.listing.v1",      "duration_minutes", "120"]
  ["v", "voyager.accommodation.v1","check_in",        "2026-12-01"]
  ["v", "voyager.accommodation.v1","check_out",       "2026-12-08"]
  ["v", "voyager.tour.v1",         "group_size",      "8"]
  ["v", "voyager.tour.v1",         "meeting_point",   "Negril Lighthouse"]</code></pre>
		</div>
		<p>
			The required fields are <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">d</code>, <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">title</code>, and <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">price</code>. Everything else rides on <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">v</code> tags. A listing can carry any number of them, from any number of conventions, without conflict.
		</p>
	</div>
</section>

<section id="v-tag" class="pb-10 scroll-mt-20">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink">The v tag.</h2>
		<p>
			A v tag is just a normal Nostr tag whose first element is the literal string <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">v</code>. The second element names the convention. The remaining elements are key and value pairs in that convention's order.
		</p>
		<div class="rounded-[28px] bg-bone-100 p-6">
			<p class="eyebrow">Shape</p>
			<pre class="mt-3 overflow-x-auto rounded-[20px] bg-bone-200 p-4 text-[14px] leading-relaxed text-ink"><code>["v", "&lt;convention-namespace&gt;", "&lt;key-1&gt;", "&lt;value-1&gt;", "&lt;key-2&gt;", "&lt;value-2&gt;", ...]</code></pre>
		</div>
		<p>
			<strong class="text-ink">Plain English:</strong> a v tag is a labelled key-value list scoped to one convention. A client that does not recognise the convention namespace ignores the whole tag. Nothing else changes.
		</p>
		<p>
			<strong class="text-ink">The rule, in one sentence:</strong> the first element of the tag's value identifies the convention; remaining elements are alternating keys and values defined by that convention's spec.
		</p>
	</div>
</section>

<section id="examples" class="pb-10 scroll-mt-20">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink">What you can ship.</h2>
		<p>
			The same listing shape carries every vendor kind. The four below are illustrative, not exhaustive. New conventions can declare any field they need.
		</p>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
	</div>
</section>

<section id="how-to-add" class="pb-10 scroll-mt-20">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink">How to add a new convention.</h2>
		<p>
			No protocol change is needed. Anyone can ship a new vendor kind by following four steps.
		</p>
		<ol class="list-decimal pl-5 flex flex-col gap-2">
			<li><span class="font-display text-ink">Name the namespace.</span> Pick a stable id like <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">voyager.&lt;kind&gt;.v1</code>. The version suffix lets you evolve without breaking old events.</li>
			<li><span class="font-display text-ink">Define the fields.</span> One paragraph per field: the key, the value type, and what it means. Keep the list short.</li>
			<li><span class="font-display text-ink">Publish the spec.</span> Put the document at a stable URL. Anyone can read it; clients adopt it at their own pace.</li>
			<li><span class="font-display text-ink">Reference it from your stall.</span> Add the convention id to your stall event (kind:30017) so clients know which conventions you use. Relays from any year forward it.</li>
		</ol>
		<p>
			That is the whole loop. No coordination with other client teams. No protocol amendment. No permission.
		</p>
	</div>
</section>

<section id="out-of-scope" class="pb-10 scroll-mt-20">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink">Out of scope.</h2>
		<p>
			Conventions can describe vendor semantics. They cannot change the substrate. The following are not part of the extensibility story:
		</p>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li>Defining new event kinds. New kinds are a protocol change.</li>
			<li>Altering the required fields (<code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">d</code>, <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">title</code>, <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">price</code>).</li>
			<li>Asking Voyager. Conventions are open. Ship yours without us.</li>
		</ul>
		<p class="text-sm text-muted">
			Per the Voyager Tags Thesis.
		</p>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">End of the docs</span>
			<h3 class="mt-2 font-display text-xl text-ink">That is the whole spec.</h3>
			<p class="mt-2 text-sm text-ink-2">Back to the overview to jump to any lesson again.</p>
		</div>
		<Cta variant="primary" href="/docs">Back to docs overview</Cta>
	</div>
</section>