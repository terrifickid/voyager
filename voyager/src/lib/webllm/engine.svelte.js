import { browser } from '$app/environment';

const MODEL = 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC';

export const webllm = $state({
	status: 'idle',
	progress: { text: '', percent: 0 },
	error: null,
	engine: null
});

let initPromise = null;

export async function initEngine() {
	if (!browser) return;
	if (webllm.status === 'ready') return;
	if (initPromise) return initPromise;

	webllm.status = 'initializing';
	webllm.error = null;
	webllm.progress = { text: '', percent: 0 };

	initPromise = (async () => {
		try {
			const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
			webllm.engine = await CreateMLCEngine(MODEL, {
				initProgressCallback: (rep) => {
					webllm.progress = { text: rep.text ?? '', percent: rep.progress ?? 0 };
				}
			});
			webllm.status = 'ready';
		} catch (err) {
			webllm.error = String(err?.message ?? err);
			webllm.status = 'error';
			initPromise = null;
		}
	})();

	return initPromise;
}

export async function streamChat(messages, onToken, signal) {
	if (!browser || !webllm.engine) throw new Error('Engine not ready');

	webllm.status = 'generating';
	try {
		const iter = await webllm.engine.chat.completions.create({
			messages,
			stream: true,
			signal
		});
		for await (const chunk of iter) {
			if (signal?.aborted) break;
			const token = chunk?.choices?.[0]?.delta?.content ?? '';
			if (token) onToken(token);
		}
	} finally {
		if (webllm.status !== 'error') webllm.status = 'ready';
	}
}