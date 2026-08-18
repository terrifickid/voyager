# M4 — Implement Response Parsers

## Goal
Replace `responseParsers.js` stubs with real implementations: extract JSON blocks from model output, safely parse with cleanup, and validate concept/day-plan shapes.

## Files Touched
- `src/lib/agent/responseParsers.js` (only)

## Preconditions
M3 passed.

## Changes

Replace the file contents with:

```js
export class AgentParseError extends Error {
  constructor(message, raw, cause) {
    super(message);
    this.name = 'AgentParseError';
    this.raw = raw ?? null;
    this.cause = cause ?? null;
  }
}

export function extractJsonBlock(text) {
  if (typeof text !== 'string') throw new AgentParseError('extractJsonBlock: not a string', text);
  const fenced = text.match(/```(?:json)?\s*([\s\S]+?)\s*```/i);
  if (fenced) return fenced[1].trim();
  // Fallback: first balanced {...} block
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first === -1 || last === -1 || last <= first) {
    throw new AgentParseError('extractJsonBlock: no JSON found', text);
  }
  // Try progressively shorter tails to handle multiple objects or trailing prose
  let depth = 0;
  let inStr = false;
  let esc = false;
  let start = -1;
  for (let i = first; i <= last; i++) {
    const c = text[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === '{') { if (depth === 0) start = i; depth++; }
    else if (c === '}') { depth--; if (depth === 0 && start !== -1) return text.slice(start, i + 1); }
  }
  throw new AgentParseError('extractJsonBlock: unbalanced braces', text);
}

export function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (e1) {
    // Cleanup attempt: trailing commas in objects/arrays
    const cleaned = String(text)
      .replace(/,\s*([}\]])/g, '$1')
      .replace(/[\u0000-\u001F]/g, (m) => (m === '\n' || m === '\r' || m === '\t' ? m : ''));
    try {
      return JSON.parse(cleaned);
    } catch (e2) {
      throw new AgentParseError('safeJsonParse: failed after cleanup', text, e2);
    }
  }
}

export function parseConcept(obj) {
  if (!obj || typeof obj !== 'object') throw new AgentParseError('parseConcept: not an object', obj);
  const required = ['summary', 'themes', 'pace', 'notes'];
  for (const k of required) {
    if (!(k in obj)) throw new AgentParseError(`parseConcept: missing ${k}`, obj);
  }
  if (typeof obj.summary !== 'string') throw new AgentParseError('parseConcept: summary not string', obj);
  if (!Array.isArray(obj.themes)) throw new AgentParseError('parseConcept: themes not array', obj);
  if (!['relaxed', 'balanced', 'packed'].includes(obj.pace)) throw new AgentParseError('parseConcept: pace invalid', obj);
  return obj;
}

// Stubbed for now — tightened in M9.
export function parseDayPlan(obj) {
  if (!obj || typeof obj !== 'object') throw new AgentParseError('parseDayPlan: not an object', obj);
  if (typeof obj.date !== 'string') throw new AgentParseError('parseDayPlan: missing date', obj);
  return obj;
}

// Stubbed for now — tightened in M10.
export function parsePlaceQueryString(obj) {
  if (!obj || typeof obj !== 'object') throw new AgentParseError('parsePlaceQueryString: not an object', obj);
  if (typeof obj.query !== 'string' || obj.query.length === 0) {
    throw new AgentParseError('parsePlaceQueryString: missing query', obj);
  }
  return obj;
}
```

## Validation Gate

In DevTools console on `/chat`:

```js
import('/src/lib/agent/responseParsers.js').then(m => {
  const { extractJsonBlock, safeJsonParse, parseConcept, AgentParseError, parseDayPlan, parsePlaceQueryString } = m;

  console.log('1', safeJsonParse('{"a":1}').a === 1);
  console.log('2', safeJsonParse('{"a":1,}').a === 1); // trailing comma cleanup
  console.log('3', extractJsonBlock('hello ```json\n{"x":1}\n``` bye').includes('"x":1'));
  console.log('4', extractJsonBlock('prefix {"y":2} suffix').includes('"y":2'));
  console.log('5', parseConcept({summary:'s', themes:['t'], pace:'relaxed', notes:''}).summary === 's');
  let threw = false;
  try { safeJsonParse('totally not json'); } catch (e) { threw = e instanceof AgentParseError; }
  console.log('6', threw);
  let threw2 = false;
  try { extractJsonBlock('no json here'); } catch (e) { threw2 = e instanceof AgentParseError; }
  console.log('7', threw2);
  console.log('8', parseDayPlan({date:'2026-01-01'}).date === '2026-01-01');
  console.log('9', parsePlaceQueryString({query:'coffee'}).query === 'coffee');
});
```

All 9 outputs must be `true`.

## Rollback
Revert `src/lib/agent/responseParsers.js` to its M3 stub.

## Commit Message
`M4: implement response parsers (extract, safeJsonParse, validators)`

## Pass Criteria
All 9 console checks return `true`. Proceed to M5.