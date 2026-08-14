// server/logger.js — canonical logging infrastructure (server-only).
// The single shared pino logger plus the vocabulary every other module uses.
// Extend EVENT and the helpers for new use cases, but DO NOT change the
// structure: one shared logger, child loggers for context, every log is a
// short `message` + context object, every error is typed + serialized,
// secrets are logged as presence/shape, never as values.

import pino from "pino";

export { EVENT, serializeError, presence } from "../log/vocab.js";

export function createLogger(options = {}) {
	return pino({
		level: process.env.LOG_LEVEL || "info",
		messageKey: "message",
		base: {
			service: process.env.SERVICE_NAME || "app",
			version: process.env.SERVICE_VERSION || "0.0.0",
		},
		formatters: {
			level: (label) => ({ severity: label.toUpperCase() }),
		},
		...options,
	});
}

export const log = createLogger();