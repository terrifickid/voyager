import { log, EVENT, serializeError } from "$lib/server/logger.js";

const componentLog = log.child({ component: "http", function: "handle" });

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const start = Date.now();
	const opLog = componentLog.child({
		method: event.request.method,
		path: event.url.pathname,
	});

	opLog.debug({ type: EVENT.REQUEST_START }, "Request started");

	try {
		const response = await resolve(event);
		response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
		response.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
		opLog.info(
			{
				type: EVENT.REQUEST_SUCCESS,
				status: response.status,
				durationMs: Date.now() - start,
			},
			"Request completed",
		);
		return response;
	} catch (err) {
		const errInfo = serializeError(err, { function: "handle" });
		opLog.error(
			{
				type: EVENT.REQUEST_ERROR,
				err: errInfo,
				durationMs: Date.now() - start,
			},
			`Request failed: ${errInfo.message}`,
		);
		throw err;
	}
}