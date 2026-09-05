<script>
</script>

<svelte:head>
	<title>How Voyager Pay extends — Voyager docs</title>
</svelte:head>

<section>
	<span class="eyebrow">Protocol</span>
	<h1>How Voyager Pay extends.</h1>
	<p>Voyager Pay works for any marketplace. New vendor kinds — physical goods, stays, experiences, services, digital goods — ship by publishing a convention on a reserved <strong>v tag</strong> (a reserved tag prefix that carries convention-specific fields). The protocol does not change.</p>
</section>

<section>
	<h2 id="substrate">The substrate is fixed.</h2>
	<p>The protocol guarantees event structure and forwarding integrity. It does not guarantee event semantics. The three substrate promises:</p>
	<ul>
		<li>Events are signed and replaceable by <code class="font-mono">pubkey + d</code> — the vendor's public key plus a stable listing identifier.</li>
		<li>Relays forward unknown events per <a href="https://github.com/nostr-protocol/nips/blob/master/01.md">NIP-01</a> (the basic Nostr event spec). A relay does not need to understand your tags to store them.</li>
		<li>Clients ignore unknown tags. A wallet that does not recognise a tag prefix skips it. Nothing breaks.</li>
	</ul>
	<p>Those three guarantees are the floor. Every convention in the next section rides on top.</p>
</section>

<section>
	<h2 id="conventions">Conventions are extensible.</h2>
	<p>A convention is a short document that defines one vendor sub-namespace. Conventions ride alongside the required fields, never inside them. The listing stays a listing — the convention just adds the fields a particular vendor kind needs.</p>
	<pre><code>kind: 30402
tags:
  ["d", "&lt;uuid&gt;"]
  ["title", "Fresh whole snapper"]
  ["price", "42000", "sats"]
  ["v", "voyager.listing.v1",      "duration_minutes", "120"]
  ["v", "voyager.accommodation.v1","check_in",        "2026-12-01"]
  ["v", "voyager.accommodation.v1","check_out",       "2026-12-08"]
  ["v", "voyager.tour.v1",         "group_size",      "8"]
  ["v", "voyager.tour.v1",         "meeting_point",   "Negril Lighthouse"]</code></pre>
	<p>The required fields are <code class="font-mono">d</code>, <code class="font-mono">title</code>, and <code class="font-mono">price</code>. Everything else rides on <code class="font-mono">v</code> tags. A listing can carry any number of them, from any number of conventions, without conflict.</p>
</section>

<section>
	<h2 id="v-tag">The v tag.</h2>
	<p>A v tag is just a normal Nostr tag whose first element is the literal string <code class="font-mono">v</code>. The second element names the convention. The remaining elements are key and value pairs in that convention's order.</p>
	<pre><code>["v", "&lt;convention-namespace&gt;", "&lt;key-1&gt;", "&lt;value-1&gt;", "&lt;key-2&gt;", "&lt;value-2&gt;", ...]</code></pre>
	<p><strong>Plain English:</strong> a v tag is a labelled key-value list scoped to one convention. A client that does not recognise the convention namespace ignores the whole tag. Nothing else changes.</p>
	<p><strong>The rule, in one sentence:</strong> the first element of the tag's value identifies the convention; remaining elements are alternating keys and values defined by that convention's spec.</p>
</section>

<section>
	<h2 id="what-you-can-ship">What you can ship.</h2>
	<p>The same listing shape carries every vendor kind. The four below are illustrative, not exhaustive. New conventions can declare any field they need.</p>
	<ul>
		<li><strong>voyager.listing.v1</strong> — Physical goods. Snapper, sandals, hardware. Ship weight, pickup, courier in the same event shape.</li>
		<li><strong>voyager.accommodation.v1</strong> — Stays. Rooms, rentals, weeks. Add check_in, check_out, capacity without changing the protocol.</li>
		<li><strong>voyager.tour.v1</strong> — Experiences. Tours, tastings, guides. Add group_size, meeting_point, duration_minutes in the same listing.</li>
		<li><strong>voyager.consulting.v1</strong> — Services &amp; digital. Hours, deliverables, digital downloads. The same wire format carries them.</li>
	</ul>
</section>

<section>
	<h2 id="add-new-convention">How to add a new convention.</h2>
	<p>No protocol change is needed. Anyone can ship a new vendor kind by following four steps.</p>
	<ol>
		<li><strong>Name the namespace.</strong> Pick a stable id like <code class="font-mono">voyager.&lt;kind&gt;.v1</code>. The version suffix lets you evolve without breaking old events.</li>
		<li><strong>Define the fields.</strong> One paragraph per field: the key, the value type, and what it means. Keep the list short.</li>
		<li><strong>Publish the spec.</strong> Put the document at a stable URL. Anyone can read it; clients adopt it at their own pace.</li>
		<li><strong>Reference it from your stall.</strong> Add the convention id to your stall event (kind:30017) so clients know which conventions you use. Relays from any year forward it.</li>
	</ol>
	<p>That is the whole loop. No coordination with other client teams. No protocol amendment. No permission.</p>
</section>

<section>
	<p>Continue to <a href="/docs/security-model">Security model</a>.</p>
</section>
