<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>How Voyager plans your trip in your browser — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 1</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		How Voyager plans your trip in your browser.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Voyager is a regular web app that runs a small AI model directly inside your browser tab. There is
		no server holding your trip, no account to sign in to, and no API key to buy. You describe the
		trip; Voyager assembles a prompt from your preferences, asks the in-browser model to draft a
		day-by-day plan, and then ranks real places from a local data set against that draft.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<p>
			Most "AI trip planners" send your prompt to a remote model. That means a copy of your trip
			sitting on someone else's hard drive, a monthly bill for an API key you don't control, and a
			service that can disappear overnight. Voyager does the opposite: the model lives in your tab.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">The model in your tab</h2>
		<p>
			Voyager uses <a href="https://webllm.mlc.ai/" class="underline underline-offset-4">WebLLM</a>
			to load a small language model into the browser through
			<a href="https://www.w3.org/TR/webgpu/" class="underline underline-offset-4">WebGPU</a>. The
			engine wrapper around it is at
			<code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">src/lib/webllm/engine.svelte.js</code>.
			The first visit downloads the model weights (a few hundred megabytes) and caches them; after
			that, every trip you plan runs offline-capable, on your machine, with no network round-trip to
			anyone else's inference endpoint.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">Assembling the prompt</h2>
		<p>
			A raw model doesn't know you hate 10am queues or that you travel at restaurant-pacing speed.
			Voyager keeps your preferences locally and assembles them into the prompt the model sees. The
			shape of that assembly lives in
			<code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">src/lib/preferences/contextPrompt.svelte.js</code>.
			It reads your preferences (pace, food, anchors, group composition) and produces a structured
			system prompt that nudges the model toward plans you'd actually take.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">Drafting into a day schema</h2>
		<p>
			The model is asked to fill a fixed day schema — a sequence of days, each with morning /
			afternoon / evening blocks, each block carrying a category and a short rationale. The schema
			specification lives at the repo root as
			<code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">daySchema</code>. Forcing the
			output through a schema is what lets the next step work: the plan is structured data, not a
			wall of prose.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">Grounding the draft in real places</h2>
		<p>
			A model-only plan is a hallucination factory. Voyager grounds each block against a local place
			data set in
			<code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">src/lib/agent/fixtures/places.json</code>,
			selected and ordered by the agent runtime in
			<code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">src/lib/agent/index.ts</code>.
			Candidates are scored against the draft using a rubric that checks fit-to-block, distance,
			opening hours, and category match.
		</p>

		<div class="rounded-[28px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">What the rubric actually does here</p>
			<p class="mt-2">
				For every block in the draft, Voyager asks: of the candidate places near the block's
				location that match its category and are open at the block's time, which ones fit this
				traveler's pace and preferences? The candidates are ranked by a small analytic rubric; the
				top result is swapped into the plan. This is the same shape of rubric we'll meet in the
				next lesson.
			</p>
		</div>

		<p>
			Put together: local model, local preferences, local data, local ranking. No round-trip. No
			account. No API key. That's the structural promise of Voyager, and it's the reason the rest
			of these lessons exist.
		</p>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">What a rubric is</h3>
			<p class="mt-2 text-sm text-ink-2">A compressed expert: criteria, levels, descriptors. And why contrast is the engine.</p>
		</div>
		<Cta variant="primary" href="/docs/what-is-a-rubric">Continue</Cta>
	</div>
</section>
