// Shared personality config used by TravelFormPrefs and PersonalityGraph.
// Kept as plain JS (not a Svelte component) so it can be imported anywhere
// without `export const` constraints.

export const archetypeOptions = [
  {
    id: "planner",
    icon: "🧭",
    label: "The Planner",
    description: "I like to know what's happening, and when.",
    traits: {
      openness: 0.1,
      conscientiousness: 0.7,
      extraversion: 0.0,
      agreeableness: -0.2,
      neuroticism: 0.4,
    },
  },
  {
    id: "explorer",
    icon: "🥾",
    label: "The Explorer",
    description: "I go off the map and find what locals love.",
    traits: {
      openness: 0.8,
      conscientiousness: 0.0,
      extraversion: -0.3,
      agreeableness: 0.2,
      neuroticism: -0.4,
    },
  },
  {
    id: "social",
    icon: "🥂",
    label: "The Social",
    description: "I'm here for people, energy, and good times.",
    traits: {
      openness: 0.4,
      conscientiousness: -0.3,
      extraversion: 0.8,
      agreeableness: 0.3,
      neuroticism: -0.3,
    },
  },
  {
    id: "relaxer",
    icon: "🌴",
    label: "The Relaxer",
    description: "I want to slow down and do as little as possible.",
    traits: {
      openness: -0.4,
      conscientiousness: -0.4,
      extraversion: -0.3,
      agreeableness: 0.2,
      neuroticism: -0.5,
    },
  },
  {
    id: "comfort_seeker",
    icon: "✨",
    label: "The Comfort Seeker",
    description: "I want it easy, familiar, and fully taken care of.",
    traits: {
      openness: -0.5,
      conscientiousness: 0.3,
      extraversion: -0.2,
      agreeableness: 0.5,
      neuroticism: 0.5,
    },
  },
];

export const scoringTraits = [
  { key: "openness", display: "novel vs familiar" },
  { key: "conscientiousness", display: "planned vs spontaneous" },
  { key: "extraversion", display: "social vs solo" },
  { key: "agreeableness", display: "trusting vs controlling" },
  { key: "neuroticism", display: "prepared vs chill" },
];
