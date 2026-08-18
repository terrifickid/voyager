<script>
	import { browser } from '$app/environment';
	import { initEngine, streamChat, webllm } from '$lib/webllm/engine.svelte.js';
	import { log, EVENT, serializeError, presence } from '$lib/logger.js';
	import { getUserContextMessage } from '$lib/preferences/contextPrompt.svelte.js';

	const chatLog = log.child({ component: 'chat', function: 'page' });

	let messages = $state([]);
	let input = $state('');
	let scrollEl;

	$effect(() => {
		if (!browser) return;
		if (webllm.status === 'idle' || webllm.status === 'error') {
			initEngine();
		}
	});

	$effect(() => {
		const last = messages[messages.length - 1];
		void (last?.content ?? '');
		void messages.length;
		if (scrollEl) {
			scrollEl.scrollTop = scrollEl.scrollHeight;
		}
	});

	async function handleSend(event) {
		event.preventDefault();
		const text = input.trim();
		const opLog = chatLog.child({ step: 'chat:send', turns: messages.length });

		if (!text) {
			opLog.warn(
				{ type: EVENT.VALIDATION_ERROR, reason: 'empty_input' },
				'Send rejected: empty input'
			);
			return;
		}
		if (webllm.status !== 'ready') {
			opLog.warn(
				{ type: EVENT.VALIDATION_ERROR, reason: 'engine_not_ready' },
				'Send rejected: engine not ready'
			);
			return;
		}

		opLog.info(
			{
				type: EVENT.JOB_START,
				turn: messages.length,
				inputLength: presence(text)
			},
			'Send started'
		);

		const userMsg = { role: 'user', content: text };
		messages = [...messages, userMsg];
		input = '';

		messages = [...messages, { role: 'assistant', content: '' }];
		const i = messages.length - 1;

		const history = [
			getUserContextMessage(),
			...messages.slice(0, i).map((m) => ({ role: m.role, content: m.content })),
		];

		let tokensDelivered = 0;
		try {
			await streamChat(
				history,
				(token) => {
					tokensDelivered += 1;
					const current = messages[i];
					messages[i] = { ...current, content: current.content + token };
				}
			);
			opLog.info(
				{
					type: EVENT.JOB_SUCCESS,
					turn: messages.length,
					tokensDelivered
				},
				'Send succeeded'
			);
		} catch (err) {
			const errInfo = serializeError(err, { function: 'handleSend' });
			opLog.error(
				{
					type: EVENT.JOB_FAILURE,
					turn: messages.length,
					tokensDelivered,
					err: errInfo
				},
				`Send failed: ${errInfo.message}`
			);
			messages[i] = { ...messages[i], content: `(error: ${errInfo.message})` };
		}
	}

	function handleClear() {
		chatLog.info(
			{
				type: EVENT.JOB_START,
				step: 'chat:clear',
				previousTurns: messages.length,
				reason: 'user_clear'
			},
			'Chat cleared'
		);
		messages = [];
	}

	function handleRetry() {
		chatLog.info(
			{
				type: EVENT.JOB_START,
				step: 'chat:retry',
				reason: 'user_retry'
			},
			'Retry requested'
		);
		initEngine();
	}

	const ready = $derived(webllm.status === 'ready');
	const generating = $derived(webllm.status === 'generating');
	const initializing = $derived(webllm.status === 'initializing');
	const errored = $derived(webllm.status === 'error');
	const progressPercent = $derived(Math.round((webllm.progress.percent ?? 0) * 100));
</script>

<svelte:head>
	<title>Chat — Voyager</title>
</svelte:head>

<section class="flex h-[calc(100vh-9rem)] flex-col">
	<div class="mb-3 flex items-center justify-between gap-4">
		<p class="text-xs text-slate-400">
			Runs locally in your browser via WebLLM. First load downloads ~1&nbsp;GB; cached afterward.
		</p>
		<button
			type="button"
			class="rounded-md border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-800/60 disabled:opacity-40"
			onclick={handleClear}
			disabled={messages.length === 0 || generating}
		>
			Clear
		</button>
	</div>

	{#if initializing}
		<div class="mb-3 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
			<div class="flex items-center justify-between text-sm text-slate-300">
				<span>Loading model…</span>
				<span class="tabular-nums text-slate-400">{progressPercent}%</span>
			</div>
			<div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
				<div
					class="h-full bg-indigo-500 transition-all"
					style="width: {progressPercent}%"
				></div>
			</div>
			{#if webllm.progress.text}
				<p class="mt-2 truncate text-xs text-slate-500">{webllm.progress.text}</p>
			{/if}
		</div>
	{/if}

	{#if errored}
		<div class="mb-3 rounded-lg border border-red-900/60 bg-red-950/40 p-4">
			<p class="text-sm font-medium text-red-200">Engine failed to load.</p>
			<p class="mt-1 text-xs text-red-300/80">{webllm.error}</p>
			<button
				type="button"
				class="mt-3 rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-500"
				onclick={handleRetry}
			>
				Retry
			</button>
		</div>
	{/if}

	<div
		bind:this={scrollEl}
		class="flex-1 space-y-4 overflow-y-auto rounded-lg border border-slate-800 bg-slate-900/40 p-4"
	>
		{#each messages as msg, i (i)}
			<div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
				<div
					class="max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed {msg
						.role === 'user'
						? 'bg-indigo-600 text-white'
						: 'bg-slate-800 text-slate-100'}"
				>
					{msg.content}
				</div>
			</div>
		{/each}

		{#if messages.length === 0 && ready}
			<p class="text-center text-sm text-slate-500">
				Engine ready. Send a message to start the conversation.
			</p>
		{/if}
	</div>

	<form class="mt-3 flex gap-2" onsubmit={handleSend}>
		<textarea
			bind:value={input}
			rows="2"
			placeholder={ready ? 'Type a message…' : 'Waiting for engine…'}
			disabled={!ready}
			class="flex-1 resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
			onkeydown={(e) => {
				if (e.key === 'Enter' && !e.shiftKey) {
					e.preventDefault();
					handleSend(e);
				}
			}}
		></textarea>
		<button
			type="submit"
			disabled={!ready || input.trim().length === 0}
			class="self-stretch rounded-md bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
		>
			Send
		</button>
	</form>
</section>