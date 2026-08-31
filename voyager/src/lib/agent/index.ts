import conceptFixture from './fixtures/concept.json';
import dayFixture from './fixtures/day.json';
import placesFixture from './fixtures/places.json';
// @ts-ignore — .svelte.js rune store has no .d.ts surface
import { user } from '$lib/stores/user.svelte.js';

export interface TripConcept {
  title: string;
  summary: string;
  vibe: string[];
  pace: string;
  logistics: { base: string; transit: string; bestTime: string };
  highlights: string[];
}

export interface DaySlot {
  label: 'morning' | 'afternoon' | 'evening' | 'late';
  stay: PlaceRef | null;
  eat: PlaceRef | null;
  do: PlaceRef | null;
}

export interface PlaceRef {
  name: string;
  kind: string;
  note: string;
}

export interface DayPlan {
  dayNumber: number;
  theme: string;
  slots: DaySlot[];
}

export interface Place {
  id: string;
  name: string;
  kind: string;
  address: string;
  rating: number;
  priceLevel: number;
  tags: string[];
  hours: string;
  note: string;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export async function runPrompt(_prompt: string): Promise<string> {
  const concept = clone(conceptFixture) as TripConcept;
  return JSON.stringify(concept);
}

export async function searchPlaces(_query: string): Promise<Place[]> {
  return clone(placesFixture) as Place[];
}

export async function generateConcept(): Promise<TripConcept> {
  const concept = clone(conceptFixture) as TripConcept;
  user.tripConcept = concept;
  return concept;
}

export async function generateDayPlan(): Promise<DayPlan[]> {
  const baseDay = clone(dayFixture) as DayPlan;
  const trip = user.preferences?.trip;
  const start = trip?.startDate ? new Date(trip.startDate) : null;
  const end = trip?.endDate ? new Date(trip.endDate) : null;
  let count = 3;
  if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())) {
    const diff = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
    if (diff > 0 && diff <= 30) count = diff;
  }
  const itinerary: DayPlan[] = [];
  for (let i = 0; i < count; i++) {
    itinerary.push({ ...baseDay, dayNumber: i + 1, theme: baseDay.theme });
  }
  user.itinerary = itinerary;
  return itinerary;
}

export async function enrichDayPlan(dayNumber: number): Promise<Place[]> {
  const places = clone(placesFixture) as Place[];
  const day = user.itinerary.find((d: DayPlan) => d.dayNumber === dayNumber) ?? user.itinerary[0];
  if (day) {
    const slotDo = day.slots.find((s: DaySlot) => s.label === 'morning')?.do;
    const match = places.find((p) => slotDo && p.name === slotDo.name);
    user.placeCandidates = match ? [match, ...places.filter((p) => p.id !== match.id)] : places;
  } else {
    user.placeCandidates = places;
  }
  return user.placeCandidates;
}

export { conceptFixture, dayFixture, placesFixture };