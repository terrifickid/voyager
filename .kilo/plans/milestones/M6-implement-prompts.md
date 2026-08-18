# M6 — Implement Prompt Builders

## Goal
Replace prompt stubs with real builders that return `{ system, user }` objects embedding the relevant trip preferences and a JSON response schema.

## Files Touched
- `src/lib/agent/prompts.js` (only)

## Preconditions
M5 passed.

## Changes

Replace `src/lib/agent/prompts.js` with:

```js
const JSON_ONLY_INSTRUCTION =
  'You are an agent that responds ONLY with a single ```json code block. ' +
  'Do not include any prose, greetings, or explanation outside the code block. ' +
  'The code block must contain a single valid JSON object matching the schema provided.';

function prefsSummary(prefs) {
  const t = prefs.trip ?? {};
  const f = prefs.form ?? {};
  const p = prefs.personality ?? {};
  return JSON.stringify({
    destination: t.destination,
    dates: [t.startDate, t.endDate],
    travelers: t.travelers,
    archetype: f.archetype,
    tags: f.tags,
    budget: f.budget,
    note: f.note,
    personality: p,
    type: prefs.type
  }, null, 2);
}

export function buildConceptPrompt(prefs) {
  const system = JSON_ONLY_INSTRUCTION;
  const schema = {
    summary: 'string — 2 to 3 sentences describing the fundamental concept for this trip',
    themes: 'string[] — 2 to 5 high-level themes (e.g. culinary, historical, outdoor)',
    pace: "'relaxed' | 'balanced' | 'packed'",
    notes: 'string — optional rationale for the concept'
  };
  const user =
    `Trip preferences:\n\`\`\`json\n${prefsSummary(prefs)}\n\`\`\`\n\n` +
    `Produce a trip concept. Respond with EXACTLY one \`\`\`json code block matching this schema:\n` +
    `\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\``;
  return { system, user };
}

export function buildDayPlanPrompt(prefs, date, concept) {
  const system = JSON_ONLY_INSTRUCTION;
  const schema = {
    date: `'${date}' (string YYYY-MM-DD)`,
    morning:   { stay: { location: 'string', notes: 'string?' }, meal: { food: 'string', location: 'string', notes: 'string?' }, activity: { action: 'string', location: 'string', notes: 'string?' } },
    afternoon: { stay: { location: 'string', notes: 'string?' }, meal: { food: 'string', location: 'string', notes: 'string?' }, activity: { action: 'string', location: 'string', notes: 'string?' } },
    evening:   { stay: { location: 'string', notes: 'string?' }, meal: { food: 'string', location: 'string', notes: 'string?' }, activity: { action: 'string', location: 'string', notes: 'string?' } },
    late_night:{ stay: { location: 'string', notes: 'string?' }, meal: { food: 'string', location: 'string', notes: 'string?' }, activity: { action: 'string', location: 'string', notes: 'string?' } }
  };
  const user =
    `Trip concept: \`\`\`json\n${JSON.stringify(concept, null, 2)}\n\`\`\`\n\n` +
    `Trip preferences: \`\`\`json\n${prefsSummary(prefs)}\n\`\`\`\n\n` +
    `Produce a single-day plan for date ${date}. ` +
    `Each of the four stages (morning, afternoon, evening, late_night) MUST include stay, meal, and activity. ` +
    `Respond with EXACTLY one \`\`\`json code block matching:\n` +
    `\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\``;
  return { system, user };
}

export function buildPlaceQueryPrompt(stage, slot, location, prefs) {
  const system = JSON_ONLY_INSTRUCTION;
  const user =
    `Destination: ${prefs.trip?.destination ?? 'unknown'}\n` +
    `Stage: ${stage}\nSlot: ${slot}\nConceptual location: ${location}\n\n` +
    `Write a single Google Places textQuery string to find appropriate places for the ${slot} during the ${stage} at "${location}". ` +
    `Keep it under 120 characters. Respond with EXACTLY one \`\`\`json code block:\n` +
    `\`\`\`json\n${JSON.stringify({ query: 'string — the textQuery' }, null, 2)}\n\`\`\``;
  return { system, user };
}
```

## Validation Gate

In DevTools console on `/chat`:

```js
import('/src/lib/agent/prompts.js').then(m => {
  const sample = {
    trip: { destination: 'Kyoto', startDate:'2026-09-01', endDate:'2026-09-03', travelers:{adults:2,kids:0,kidsAges:[]}},
    form: { archetype:'planner', tags:['culinary'], budget:3, note:'first time' },
    personality: {}, type: null
  };
  const c = m.buildConceptPrompt(sample);
  const d = m.buildDayPlanPrompt(sample, '2026-09-01', {summary:'x'});
  const p = m.buildPlaceQueryPrompt('morning','activity','Gion', sample);
  console.log('1', c.system.includes('```json'));
  console.log('2', c.user.includes('Kyoto'));
  console.log('3', d.user.includes('2026-09-01'));
  console.log('4', d.user.includes('morning'));
  console.log('5', p.user.includes('Gion'));
  console.log('6', p.user.includes('textQuery'));
});
```

All 6 outputs must be `true`.

## Rollback
Revert `src/lib/agent/prompts.js` to its M3 stub.

## Commit Message
`M6: implement prompt builders for concept, dayPlan, placeQuery`

## Pass Criteria
All 6 console checks return `true`. Proceed to M7.