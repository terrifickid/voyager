<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>How Voyager plans your trip in your browser — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 1 — For travelers</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		How Voyager plans your trip in your browser.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Four steps: load a model, assemble a prompt from your preferences, draft a day-by-day plan, and rank real places against that draft. Everything runs in your browser.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<p>
			Most AI trip planners send your prompt to a remote model. A copy of your trip sits on someone else's hard drive. You pay a monthly bill for an API key you don't control. The service can disappear overnight.
		</p>
		<p>
			Voyager does the opposite. The model lives in your browser tab.
		</p>

		<h2 id="the-model-in-your-tab">The model in your tab</h2>
		<p>
			Voyager uses <a href="https://webllm.mlc.ai/" class="underline underline-offset-4">WebLLM</a> to load a small language model into the browser through <a href="https://www.w3.org/TR/webgpu/" class="underline underline-offset-4">WebGPU</a>. The wrapper lives at <code>src/lib/webllm/engine.svelte.js</code>.
		</p>
		<p>
			The first visit downloads the model weights, a few hundred megabytes, and caches them. After that, every trip you plan runs on your machine. No network round-trip. No remote inference endpoint.
		</p>

		<h2 id="assembling-the-prompt">Assembling the prompt</h2>
		<p>
			A raw model doesn't know you hate 10am queues. Voyager keeps your preferences locally and folds them into the prompt. The shape of that assembly lives in <code>src/lib/preferences/contextPrompt.svelte.js</code>.
		</p>
		<p>
			It reads your pace, food, anchors, and group composition. It produces a structured system prompt that nudges the model toward plans you'd actually take.
		</p>

		<h2 id="drafting-into-a-day-schema">Drafting into a day schema</h2>
		<p>
			The model fills a fixed day schema: a sequence of days. Each day has morning, afternoon, and evening blocks. Each block carries a category and a short rationale.
		</p>
		<p>
			Forcing the output through a schema is what lets the next step work. The plan is structured data, not a wall of prose.
		</p>

		<h2 id="grounding-in-real-places">Grounding the draft in real places</h2>
		<p>
			A model-only plan is a hallucination factory. Voyager grounds each block against a local place dataset at <code>src/lib/agent/fixtures/places.json</code>. The agent runtime at <code>src/lib/agent/index.ts</code> selects and orders the candidates.
		</p>
		<p>
			Candidates are scored against the draft using a rubric. The rubric checks fit-to-block, distance, opening hours, and category match.
		</p>

		<div class="rounded-[24px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">What the rubric actually does here</p>
			<p class="mt-2">
				For every block in the draft, Voyager asks a question. Of the candidate places near the block's location, which ones match the block's category, are open at the block's time, and fit this traveler's pace and preferences? The candidates are ranked by a small analytic rubric. The top result is swapped into the plan. This is the same shape of rubric we will meet in the next lesson.
			</p>
		</div>

		<p>
			Local model, local preferences, local data, local ranking. No round-trip. No account. No API key. That is the structural promise of Voyager.
		</p>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">What a rubric is</h3>
			<p class="mt-2 text-sm text-ink-2">Criteria, levels, descriptors, and why contrast is the engine.</p>
		</div>
		<Cta variant="primary" href="/docs/what-is-a-rubric">Continue</Cta>
	</div>
</section>
