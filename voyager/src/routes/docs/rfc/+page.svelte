<script>
	import { meta, sections, appendices, VERSION, SOURCE_URL } from '$lib/data/rfc-sections.js';
</script>

<svelte:head>
	<title>Protocol RFC — Voyager · open rails</title>
</svelte:head>

<section>
	<span class="eyebrow">// protocol RFC</span>
	<h1>Voyager — Protocol RFC</h1>
	<p>
		The canonical specification of the Voyager protocol. Modeled on NIPs and BOLTs:
		stable section numbers, RFC 2119 normative language, JSON-Schema validation, and
		conformance test vectors.
	</p>
	<dl class="rfc-meta-strip">
		<div>
			<dt>Series</dt>
			<dd>{meta.series}</dd>
		</div>
		<div>
			<dt>Type</dt>
			<dd>{meta.type}</dd>
		</div>
		<div>
			<dt>Status</dt>
			<dd>{meta.status}</dd>
		</div>
		<div>
			<dt>Version</dt>
			<dd>{meta.version}</dd>
		</div>
		<div>
			<dt>Created</dt>
			<dd>{meta.created}</dd>
		</div>
		<div>
			<dt>Layer</dt>
			<dd>{meta.layer}</dd>
		</div>
		<div>
			<dt>Audience</dt>
			<dd>{meta.audience}</dd>
		</div>
	</dl>
	<p style="margin-top: 1rem;">
		Replaces <code>{meta.replaces}</code>. This page is a rendered snapshot of the
		canonical RFC; the source of truth lives in the
		<a href={SOURCE_URL}>voyager-sdk repository</a>.
	</p>
</section>

{#each sections as s (s.id)}
	<section id={s.id}>
		<h2>{s.title}</h2>
		{@html s.body}
	</section>
{/each}

<section id="appendices">
	<h2>Appendices</h2>
	{#each appendices as a (a.id)}
		<details id={a.id}>
			<summary>
				{a.title}
				{#if a.summary}
					<div class="appendix-summary">{a.summary}</div>
				{/if}
			</summary>
			{@html a.body}
		</details>
	{/each}
</section>

<p class="rfc-footer">
	View the source on GitHub →
	<a href={SOURCE_URL}>VOYAGER_RFC.md</a>
	@ <code>voyager-{VERSION}</code>.
</p>