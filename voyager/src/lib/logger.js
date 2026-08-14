// logger.js — canonical logging infrastructure (browser-safe).
// Mirrors the pino call signature of src/lib/server/logger.js so call sites
// are identical across server and client. Emits JSON to console.* so a
// stranger reading the browser console can reconstruct what happened.

import { EVENT, serializeError, presence } from "./log/vocab.js";

export { EVENT, serializeError, presence };

const SERVICE = "app";
const VERSION = "0.0.0";

const LEVELS = ["trace", "debug", "info", "warn", "error", "fatal"];

function emit(level, bindings, context, message) {
	const base = {
		severity: level.toUpperCase(),
		service: SERVICE,
		version: VERSION,
		message,
	};
	const record = { ...base, ...bindings };
	if (context && typeof context === "object") Object.assign(record, context);
	const consoleFn =
		level === "fatal" || level === "error"
			? console.error
			: level === "warn"
				? console.warn
				: console.info;
	consoleFn(JSON.stringify(record));
}

function makeLogger(bindings) {
	const log = {};
	for (const level of LEVELS) {
		log[level] = (context, message) =>
			emit(level, bindings, context, typeof message === "string" ? message : "");
	}
	log.child = (extra) => makeLogger({ ...bindings, ...extra });
	return log;
}

export const log = makeLogger({});