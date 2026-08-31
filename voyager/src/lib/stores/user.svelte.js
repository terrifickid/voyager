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
  tripConcept = $state(null);
  itinerary = $state([]);
  placeCandidates = $state([]);

  setPreferences(snapshot) { this.preferences = snapshot; }
  setTrip(trip) {
    this.preferences = {
      ...this.preferences,
      trip: { ...this.preferences.trip, ...trip },
    };
  }
  patchPreferencesForm(partial) { Object.assign(this.preferences.form, partial); }
  clear() { this.id = null; this.email = null; this.name = null; }
}

export const user = new UserStore();