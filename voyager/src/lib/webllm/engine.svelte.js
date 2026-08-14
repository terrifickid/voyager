import { browser } from '$app/environment';
import { log, EVENT, serializeError, presence } from '$lib/logger.js';

const MODEL = 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC';

const componentLog = log.child({ component: 'webllm', function: 'engine' });

export const webllm = $state({
	status: 'idle',
	progress: { text: '', percent: 0 },
	error: null,
	engine: null
});

let initPromise = null;

export async function initEngine() {
	const opLog = componentLog.child({ step: 'engine:init', model: MODEL });

	if (!browser) {
		opLog.trace({ type: EVENT.VALIDATION_ERROR, reason: 'skip' }, 'initEngine skipped: not browser');
		return;
	}
	if (webllm.status === 'ready') {
		opLog.debug({ type: EVENT.VALIDATION_ERROR, reason: 'skip' }, 'initEngine skipped: already ready');
		return;
	}
	if (initPromise) {
		opLog.debug({ type: EVENT.VALIDATION_ERROR, reason: 'skip' }, 'initEngine skipped: in flight');
		return initPromise;
	}

	opLog.info(
		{ type: EVENT.JOB_START, hasModelId: presence(MODEL) },
		'Engine init started'
	);

	webllm.status = 'initializing';
	webllm.error = null;
	webllm.progress = { text: '', percent: 0 };

	initPromise = (async () => {
		try {
			opLog.info(
				{ type: EVENT.EXTERNAL_CALL_START, provider: 'cdn:jsdelivr' },
				'Loading @mlc-ai/web-llm'
			);
			const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
			opLog.info(
				{ type: EVENT.EXTERNAL_CALL_SUCCESS, provider: 'cdn:jsdelivr' },
				'Loaded @mlc-ai/web-llm'
			);

			webllm.engine = await CreateMLCEngine(MODEL, {
				initProgressCallback: (rep) => {
					webllm.progress = { text: rep.text ?? '', percent: rep.progress ?? 0 };
					opLog.debug(
						{
							type: EVENT.JOB_START,
							step: 'engine:init:progress',
							progress: rep.progress ?? 0,
							textLength: presence(rep.text)
						},
						'Engine init progress'
					);
				}
			});
			webllm.status = 'ready';
			opLog.info({ type: EVENT.JOB_SUCCESS, model: MODEL }, 'Engine ready');
		} catch (err) {
			const errInfo = serializeError(err, { function: 'initEngine' });
			webllm.error = errInfo.message;
			webllm.status = 'error';
			initPromise = null;
			opLog.error(
				{
					type: EVENT.EXTERNAL_CALL_ERROR,
					provider: 'cdn:jsdelivr',
					err: errInfo,
					model: MODEL
				},
				`Engine init failed: ${errInfo.message}`
			);
			throw err;
		}
	})();

	return initPromise;
}

export async function streamChat(messages, onToken, signal) {
	const opLog = componentLog.child({
		step: 'engine:chat',
		messageCount: messages.length,
		hasSignal: presence(signal)
	});

	opLog.info(
		{ type: EVENT.JOB_START, messageCount: messages.length, hasSignal: presence(signal) },
		'Chat stream started'
	);

	if (!browser || !webllm.engine) {
		opLog.warn(
			{ type: EVENT.VALIDATION_ERROR, reason: 'engine_not_ready' },
			'Chat stream rejected: engine not ready'
		);
		throw new Error('Engine not ready');
	}

	webllm.status = 'generating';
	let tokensDelivered = 0;
	try {
		opLog.info(
			{ type: EVENT.EXTERNAL_CALL_START, provider: 'webllm', stream: true },
			'Calling webllm chat.completions.create'
		);
		const iter = await webllm.engine.chat.completions.create({
			messages,
			stream: true,
			signal
		});
		opLog.info(
			{ type: EVENT.EXTERNAL_CALL_SUCCESS, provider: 'webllm', stream: true },
			'webllm stream returned'
		);

		for await (const chunk of iter) {
			if (signal?.aborted) break;
			const token = chunk?.choices?.[0]?.delta?.content ?? '';
			if (token) {
				tokensDelivered += 1;
				onToken(token);
			}
		}
		opLog.info(
			{
				type: EVENT.JOB_SUCCESS,
				tokensDelivered,
				aborted: signal?.aborted === true
			},
			'Chat stream completed'
		);
	} catch (err) {
		const errInfo = serializeError(err, { function: 'streamChat' });
		opLog.error(
			{
				type: EVENT.EXTERNAL_CALL_ERROR,
				provider: 'webllm',
				err: errInfo,
				tokensDelivered,
				aborted: signal?.aborted === true
			},
			`Chat stream failed: ${errInfo.message}`
		);
		throw err;
	} finally {
		if (webllm.status !== 'error') webllm.status = 'ready';
	}
}