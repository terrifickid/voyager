<svelte:head>
	<title>Voyager — Local-first AI chat in your browser</title>
</svelte:head>

<section class="py-12 sm:py-20">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Voyager</h1>
		<p class="mt-4 text-xl text-slate-300 sm:text-2xl">Local-first AI chat in your browser.</p>
		<p class="mt-8 text-base leading-relaxed text-slate-400 sm:text-lg">
			Voyager runs <span class="font-semibold text-slate-200">Qwen2.5 1.5B</span> directly on your device
			using <span class="font-semibold text-slate-200">WebLLM</span> and WebGPU. No server, no API key,
			no data leaving your machine — once the model is cached, it works offline.
		</p>
		<div class="mt-10 flex justify-center gap-4">
			<a
				href="/plan"
				class="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
			>
				Plan a trip
			</a>
			<a
				href="https://github.com/mlc-ai/web-llm"
				class="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800/60"
			>
				About WebLLM
			</a>
		</div>
	</div>
</section>

<section class="grid gap-6 py-8 sm:grid-cols-3">
	<div class="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
		<h2 class="text-lg font-semibold text-white">On-device</h2>
		<p class="mt-2 text-sm text-slate-400">
			Inference runs entirely in your browser via WebGPU. No telemetry, no backend round-trip.
		</p>
	</div>
	<div class="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
		<h2 class="text-lg font-semibold text-white">Cached after first load</h2>
		<p class="mt-2 text-sm text-slate-400">
			Weights stream from Hugging Face on first launch and are stored in your browser's IndexedDB.
		</p>
	</div>
	<div class="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
		<h2 class="text-lg font-semibold text-white">Modern browser required</h2>
		<p class="mt-2 text-sm text-slate-400">
			Use the latest Chrome or Firefox with WebGPU enabled. About 1.6 GB of VRAM is recommended.
		</p>
	</div>
</section>