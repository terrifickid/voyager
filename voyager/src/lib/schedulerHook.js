// schedulerHook.js — dev-only diagnostic hook around the Svelte 5 scheduler
// flush and the originating store writes that precede it.
// See .kilocode/rules/logging.md for the logging conventions this file follows.
//
// The previous two passes captured nothing for the live repro because:
//   - Svelte 5.56.1's bundled client runtime does NOT use requestIdleCallback.
//     The "n.timeout" in the stack is a minified symbol in the bundled runtime
//     that wraps `setTimeout`. So the requestIdleCallback wrapper never fires
//     for this crash.
//   - Svelte's queue_micro_task calls queueMicrotask exactly once for the
//     outer scheduling edge; subsequent flush_tasks runs happen inside that
//     one microtask, so the throw deep inside flush_queued_effects does NOT
//     cross the queueMicrotask wrapper boundary again.
//   - The throw escapes uncaught because Svelte's microtask runner does not
//     catch errors from flush_queued_effects, so the throw propagates as
//     Uncaught and never goes through console.error.
//
// This pass captures the four boundaries that DO see the live crash:
//   1. setTimeout                 (Svelte's actual flush scheduler path)
//   2. queueMicrotask              (outer schedule edge; useful as a marker)
//   3. window 'error' event        (uncaught boundary; full stack visible)
//   4. window 'unhandledrejection' (if the next flush is async-driven)
// And pairs every captured line with a monotonic captureIndex so the next
// repro can correlate schedule -> throw -> originating write.

import { log, EVENT, serializeError, presence } from './logger.js';

const hookLog = log.child({
	component: 'scheduler-hook',
	function: 'schedulerHook:install'
});

let schedulerInstalled = false;
let boundaryInstalled = false;
let setTimeoutWrapCount = 0;
let microtaskWrapCount = 0;

function wrapSetTimeout(orig) {
	return function schedulerSetTimeoutWrapper(fn, delay, ...rest) {
		setTimeoutWrapCount += 1;
		const captureIndex = setTimeoutWrapCount;
		const wrapped = function schedulerSetTimeoutInner(...args) {
			const route =
				(typeof globalThis !== 'undefined' && globalThis.location?.pathname) ||
				'(unknown)';
			try {
				return fn.apply(this, args);
			} catch (err) {
				hookLog.error(
					{
						type: EVENT.RENDER_ERROR,
						step: 'scheduler:setTimeout-throw',
						captureIndex,
						route,
						err: serializeError(err, {
							function: 'schedulerHook:setTimeoutCallback',
							step: 'scheduler:setTimeout-throw'
						})
					},
					`setTimeout callback threw: ${err?.message ?? String(err)}`
				);
				throw err;
			}
		};
		return orig.call(this, wrapped, delay, ...rest);
	};
}

function wrapQueueMicrotask(orig) {
	return function schedulerMicrotaskWrapper(fn) {
		microtaskWrapCount += 1;
		const captureIndex = microtaskWrapCount;
		const wrapped = function schedulerMicrotaskInner(...args) {
			try {
				return fn.apply(this, args);
			} catch (err) {
				hookLog.error(
					{
						type: EVENT.RENDER_ERROR,
						step: 'scheduler:microtask-throw',
						captureIndex,
						err: serializeError(err, {
							function: 'schedulerHook:queueMicrotask',
							step: 'scheduler:microtask-throw'
						})
					},
					`Microtask threw: ${err?.message ?? String(err)}`
				);
				throw err;
			}
		};
		return orig.call(this, wrapped);
	};
}

function installUncaughtBoundary() {
	if (!import.meta.env.DEV) return;
	if (boundaryInstalled) return;
	boundaryInstalled = true;

	hookLog.info(
		{ type: EVENT.JOB_START, step: 'scheduler-hook:installBoundary' },
		'Uncaught error boundary install started'
	);

	globalThis.addEventListener('error', function schedulerErrorCapture(ev) {
		const err = ev?.error ?? new Error(ev?.message ?? 'window error');
		const route =
			(typeof globalThis !== 'undefined' && globalThis.location?.pathname) ||
			'(unknown)';
		hookLog.error(
			{
				type: EVENT.RENDER_ERROR,
				step: 'uncaught:error',
				route,
				filename: presence(ev?.filename),
				lineno: ev?.lineno,
				colno: ev?.colno,
				err: serializeError(err, {
					function: 'schedulerHook:windowError',
					step: 'uncaught:error'
				})
			},
			`Uncaught error: ${err?.message ?? String(err)}`
		);
		// Additive: do not prevent default, do not stop propagation, so
		// devtools and any other listeners still see it.
	});

	globalThis.addEventListener('unhandledrejection', function schedulerRejectionCapture(ev) {
		const reason = ev?.reason ?? 'unknown';
		const route =
			(typeof globalThis !== 'undefined' && globalThis.location?.pathname) ||
			'(unknown)';
		const errInfo =
			reason instanceof Error
				? serializeError(reason, {
						function: 'schedulerHook:windowRejection',
						step: 'uncaught:unhandledrejection'
					})
				: {
						message: String(reason),
						function: 'schedulerHook:windowRejection',
						step: 'uncaught:unhandledrejection'
					};
		hookLog.error(
			{
				type: EVENT.RENDER_ERROR,
				step: 'uncaught:unhandledrejection',
				route,
				err: errInfo
			},
			`Unhandled rejection: ${reason?.message ?? String(reason)}`
		);
	});

	hookLog.info(
		{ type: EVENT.JOB_SUCCESS, step: 'scheduler-hook:installBoundary' },
		'Uncaught error boundary install succeeded'
	);
}

export function installSchedulerHook() {
	if (!import.meta.env.DEV) return;
	if (schedulerInstalled) return;
	schedulerInstalled = true;

	hookLog.info(
		{ type: EVENT.JOB_START, step: 'scheduler-hook:install' },
		'Scheduler hook install started'
	);

	let setTimeoutWrapped = false;
	let microtaskWrapped = false;

	if (typeof globalThis.setTimeout === 'function') {
		const origSetTimeout = globalThis.setTimeout;
		globalThis.setTimeout = wrapSetTimeout(origSetTimeout);
		setTimeoutWrapped = true;
	}

	if (typeof globalThis.queueMicrotask === 'function') {
		const origMicro = globalThis.queueMicrotask;
		globalThis.queueMicrotask = wrapQueueMicrotask(origMicro);
		microtaskWrapped = true;
	}

	hookLog.info(
		{
			type: EVENT.JOB_SUCCESS,
			step: 'scheduler-hook:install',
			setTimeoutWrapped,
			microtaskWrapped
		},
		`Scheduler hook install succeeded (setTimeout=${setTimeoutWrapped}, microtask=${microtaskWrapped})`
	);
}

export function installErrorBoundary() {
	installUncaughtBoundary();
}
