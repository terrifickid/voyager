// log/vocab.js — shared logging vocabulary (pure JS, no pino import).
// Imported by both the server logger (src/lib/server/logger.js) and the
// client logger (src/lib/logger.js) so call sites are identical.

// 1. EVENT CATALOG (extensible)
//    Every log line carries a `type` from here. ADD new entries for new use
//    cases. NEVER use free-text types. NEVER rename/remove an existing key.
export const EVENT = {
	// lifecycle (success steps) — log a *_START before and a *_SUCCESS after
	JOB_START: "JOB_START",
	JOB_SUCCESS: "JOB_SUCCESS",
	EXTERNAL_CALL_START: "EXTERNAL_CALL_START",
	EXTERNAL_CALL_SUCCESS: "EXTERNAL_CALL_SUCCESS",
	STORE_WRITE_START: "STORE_WRITE_START",
	STORE_WRITE_SUCCESS: "STORE_WRITE_SUCCESS",
	STORE_READ_SUCCESS: "STORE_READ_SUCCESS",
	REQUEST_START: "REQUEST_START",
	REQUEST_SUCCESS: "REQUEST_SUCCESS",

	// errors — type EVERY error log
	UNCAUGHT_EXCEPTION: "UNCAUGHT_EXCEPTION",
	UNHANDLED_REJECTION: "UNHANDLED_REJECTION",
	VALIDATION_ERROR: "VALIDATION_ERROR",
	EXTERNAL_CALL_ERROR: "EXTERNAL_CALL_ERROR",
	STORE_ERROR: "STORE_ERROR",
	CONFIG_ERROR: "CONFIG_ERROR",
	TIMEOUT_ERROR: "TIMEOUT_ERROR",
	JOB_FAILURE: "JOB_FAILURE",
	REQUEST_ERROR: "REQUEST_ERROR",
};

// 2. ERROR SERIALIZATION
//    Always pass a caught error through this before logging. Extend `keys` if
//    your error shapes carry more detail.
export function serializeError(err, context = {}) {
	if (!err || typeof err !== "object") {
		return { message: String(err), ...context };
	}
	const out = {
		message: err.message,
		name: err.name,
		stack: err.stack,
		code: err.code,
		...context,
	};
	const keys = [
		"status",
		"statusCode",
		"statusText",
		"cause",
		"body",
		"headers",
	];
	for (const k of keys) {
		if (err[k] !== undefined) out[k] = err[k];
	}
	return out;
}

// 3. REDACTION HELPER
//    Return a presence/shape value instead of a secret. presence() returns
//    length for strings/arrays, key count for objects, false for null/empty.
export function presence(value) {
	if (value == null || value === "") return false;
	if (typeof value === "string" || Array.isArray(value)) return value.length;
	if (typeof value === "object") return Object.keys(value).length;
	return Boolean(value);
}