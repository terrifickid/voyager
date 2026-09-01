import { log, EVENT, presence } from '../logger.js';

const userLog = log.child({
	component: 'user-store',
	function: 'userStore:set'
});

function traceWrite(field, prev, next) {
	const route =
		(typeof globalThis !== 'undefined' && globalThis.location?.pathname) ||
		'(unknown)';
	userLog.info(
		{
			type: EVENT.USER_ACTION,
			step: `user:write:${field}`,
			route,
			prev: presence(prev),
			next: presence(next)
		},
		`user.${field} write`
	);
}

class UserStore {
	id = $state(null);
	email = $state(null);
	name = $state(null);
	preferences = $state({
		form: { archetype: null, tags: [], budget: null, note: null },
		personality: { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0 },
		type: null,
		trip: {
			destination: null,
			startDate: null,
			endDate: null,
			travelers: { adults: 1, kids: 0, kidsAges: [] },
			draft: null,
			savedAt: null,
		},
	});
	_tripConcept = $state(null);
	_itinerary = $state([]);
	_placeCandidates = $state([]);

	get tripConcept() { return this._tripConcept; }
	set tripConcept(v) { traceWrite('tripConcept', this._tripConcept, v); this._tripConcept = v; }
	get itinerary() { return this._itinerary; }
	set itinerary(v) { traceWrite('itinerary', this._itinerary, v); this._itinerary = v; }
	get placeCandidates() { return this._placeCandidates; }
	set placeCandidates(v) { traceWrite('placeCandidates', this._placeCandidates, v); this._placeCandidates = v; }

	setPreferences(snapshot) {
		traceWrite('preferences', this.preferences, snapshot);
		this.preferences = snapshot;
	}
	setTrip(trip) {
		const next = { ...this.preferences, trip: { ...this.preferences.trip, ...trip } };
		traceWrite('preferences.trip', this.preferences, next);
		this.preferences = next;
	}
	patchPreferencesForm(partial) {
		traceWrite('preferences.form', this.preferences.form, partial);
		Object.assign(this.preferences.form, partial);
	}
	clear() {
		traceWrite('id', this.id, null);
		this.id = null;
		traceWrite('email', this.email, null);
		this.email = null;
		traceWrite('name', this.name, null);
		this.name = null;
	}
}

export const user = new UserStore();
