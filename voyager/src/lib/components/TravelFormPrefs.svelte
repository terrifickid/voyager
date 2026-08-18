<script>
  // =====================================================================
  // TravelPrefsForm.svelte  —  self-contained SvelteKit component
  //
  // Renders the travel-preferences form from an inline config, holds ONE
  // stateful `form` object (two-way bound), and recomputes the OCEAN
  // personality vector as a $derived value every time the state changes.
  // No submit button needed — the personality is a live computed value.
  //
  // Uses Svelte 5 runes. If you're on Svelte 4, swap:
  //   $state -> let        $derived -> $:        $props() -> export let
  //   $effect -> $:        (bind:group works unchanged)
  //
  // Optionally pass your own config or an `onchange` callback:
  //   <TravelPrefsForm onchange={(s) => console.log(s)} />
  // =====================================================================

  import { user } from '$lib/stores/user.svelte.js';

  const CONFIG = {
    version: 1,
    formId: "voyager-travel-prefs",
    title: "Tell us how you travel",
    subtitle: "Takes about 30 seconds — it helps Voyager read you better.",
    emptyState: { archetype: null, tags: [], budget: 3, note: "" },
    fields: [
      {
        id: "archetype",
        type: "radio",
        label: "Which one sounds like you?",
        help: "Pick the closest fit. Your picks below will refine it.",
        optional: true,
        scored: true,
        options: [
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
        ],
      },
      {
        id: "tags",
        type: "multiselect",
        label: "Pick all that apply",
        help: "The pattern of picks matters as much as any single one.",
        scored: true,
        groups: [
          {
            id: "vibe",
            label: "Vibe",
            options: [
              {
                id: "go_with_the_flow",
                label: "Go with the flow",
                traits: {
                  conscientiousness: -0.5,
                  agreeableness: 0.4,
                  neuroticism: -0.4,
                },
              },
              {
                id: "planned_organized",
                label: "Planned & organized",
                traits: { conscientiousness: 0.7 },
              },
              {
                id: "slow_relaxed",
                label: "Slow & relaxed",
                traits: {
                  conscientiousness: -0.4,
                  extraversion: -0.4,
                  neuroticism: -0.4,
                },
              },
              {
                id: "adventurous",
                label: "Adventurous",
                traits: { openness: 0.5, neuroticism: -0.4 },
              },
              {
                id: "pampered",
                label: "Pampered & taken care of",
                traits: {
                  openness: -0.5,
                  agreeableness: 0.4,
                  neuroticism: 0.4,
                },
              },
              {
                id: "off_the_grid",
                label: "Off the grid",
                traits: {
                  openness: 0.5,
                  extraversion: -0.5,
                  neuroticism: -0.4,
                },
              },
            ],
          },
          {
            id: "activities",
            label: "Activities",
            options: [
              {
                id: "local_food",
                label: "Local food & markets",
                traits: { openness: 0.5 },
              },
              {
                id: "hidden_gems",
                label: "Hidden gems",
                traits: { openness: 0.6, extraversion: -0.4 },
              },
              {
                id: "iconic_mustsees",
                label: "Iconic must-sees",
                traits: { openness: -0.5 },
              },
              {
                id: "culture_history",
                label: "Culture & history",
                traits: { openness: 0.4 },
              },
              {
                id: "nightlife",
                label: "Nightlife",
                traits: { extraversion: 0.7 },
              },
              {
                id: "meeting_locals",
                label: "Meeting locals",
                traits: { extraversion: 0.5, agreeableness: 0.4 },
              },
              {
                id: "nature_hiking",
                label: "Nature & hiking",
                traits: { openness: 0.5, extraversion: -0.4 },
              },
              {
                id: "beach_water",
                label: "Beach & water",
                traits: {
                  openness: -0.3,
                  extraversion: -0.4,
                  neuroticism: -0.4,
                },
              },
              {
                id: "wellness_spa",
                label: "Wellness & spa",
                traits: {
                  extraversion: -0.4,
                  openness: -0.3,
                  neuroticism: 0.4,
                },
              },
            ],
          },
          {
            id: "environment",
            label: "Environment",
            options: [
              {
                id: "quiet_secluded",
                label: "Quiet & secluded",
                traits: { extraversion: -0.6 },
              },
              {
                id: "lively_social",
                label: "Lively & social",
                traits: { extraversion: 0.6 },
              },
              {
                id: "local_neighborhoods",
                label: "Local neighborhoods",
                traits: { openness: 0.5, agreeableness: 0.4 },
              },
              {
                id: "resort_allinclusive",
                label: "Resort / all-inclusive",
                traits: { openness: -0.5, neuroticism: 0.5 },
              },
              {
                id: "wilderness_nature",
                label: "Wilderness & nature",
                traits: { openness: 0.5, extraversion: -0.4 },
              },
            ],
          },
        ],
      },
      {
        id: "budget",
        type: "budget",
        label: "Budget",
        help: "Rough daily spend comfort.",
        min: 1,
        max: 5,
        symbol: "$",
        defaultValue: 3,
        scored: false,
      },
      {
        id: "note",
        type: "textarea",
        label: "Anything else?",
        placeholder:
          "e.g. I hate crowded tourist traps. I wake up early but hate rushing.",
        maxLength: 500,
        optional: true,
        scored: false,
      },
    ],
    scoring: {
      combine: "weighted-mean",
      clamp: [-1, 1],
      traits: [
        { key: "openness", display: "novel vs familiar" },
        { key: "conscientiousness", display: "planned vs spontaneous" },
        { key: "extraversion", display: "social vs solo" },
        { key: "agreeableness", display: "trusting vs controlling" },
        { key: "neuroticism", display: "prepared vs chill" },
      ],
    },
  };

  // ---- props -----------------------------------------------------------
  let { config = CONFIG, onchange } = $props();

  // ---- state: bind directly to the user store's preferences form ---------
  // `user.preferences.form` is a deeply reactive $state proxy, so `bind:group`
  // and `bind:value` continue to work and every nested edit propagates.
  const form = user.preferences.form;

  // ---- helpers ----------------------------------------------------------
  const clamp = (v, lo = -1, hi = 1) => Math.max(lo, Math.min(hi, v));

  function computePersonality(f) {
    const keys = config.scoring.traits.map((t) => t.key);
    const archOpt = config.fields
      .find((x) => x.id === "archetype")
      ?.options.find((o) => o.id === f.archetype);
    const allTags = config.fields
      .find((x) => x.id === "tags")
      .groups.flatMap((g) => g.options);
    const selected = allTags.filter((o) => f.tags.includes(o.id));

    const out = {};
    for (const key of keys) {
      const parts = [];
      if (archOpt && archOpt.traits[key]) parts.push(archOpt.traits[key]);
      for (const o of selected) if (o.traits[key]) parts.push(o.traits[key]);
      out[key] = parts.length
        ? clamp(parts.reduce((a, b) => a + b, 0) / parts.length)
        : 0;
    }
    return out;
  }

  function nearestType(p) {
    const opts = config.fields.find((x) => x.id === "archetype").options;
    const keys = config.scoring.traits.map((t) => t.key);
    let best = null;
    let bestD = Infinity;
    for (const opt of opts) {
      let d = 0;
      for (const k of keys) {
        const dv = (p[k] || 0) - (opt.traits[k] || 0);
        d += dv * dv;
      }
      if (d < bestD) {
        bestD = d;
        best = opt;
      }
    }
    return best;
  }

  const fillStyle = (v) => {
    const pct = Math.abs(v) * 50;
    const left = v >= 0 ? 50 : 50 - pct;
    return `left:${left}%;width:${pct}%;`;
  };

  // ---- derived field references (reactive to config prop) ---------------
  const archetypeField = $derived(
    config.fields.find((f) => f.id === "archetype"),
  );
  const tagsField = $derived(config.fields.find((f) => f.id === "tags"));
  const budgetField = $derived(config.fields.find((f) => f.id === "budget"));
  const noteField = $derived(config.fields.find((f) => f.id === "note"));
  const budgetLevels = $derived(
    Array.from(
      { length: budgetField.max - budgetField.min + 1 },
      (_, i) => budgetField.min + i,
    ),
  );

  // ---- the computed value: personality, live on every change ------------
  const personality = $derived(computePersonality(form));
  const type = $derived(nearestType(personality));
  const hasSignal = $derived(form.archetype != null || form.tags.length > 0);

  const snapshot = $derived({
    form: {
      archetype: form.archetype,
      tags: [...form.tags],
      budget: form.budget,
      note: form.note,
    },
    personality: { ...personality },
    type: type ? { id: type.id, label: type.label, icon: type.icon } : null,
  });

  // ---- emit on every change ---------------------------------------------
  $effect(() => {
    user.setPreferences(snapshot);
    onchange?.(snapshot);
  });
</script>

<main class="max-w-2xl mx-auto flex flex-col gap-8 text-slate-100">
  <header class="flex flex-col gap-1">
    <h1 class="text-2xl font-semibold">{config.title}</h1>
    <p class="text-slate-400">{config.subtitle}</p>
  </header>

  <section class="flex flex-col gap-8">
    <section class="flex flex-col gap-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-300">
        {archetypeField.label}
      </h2>
      <p class="text-sm text-slate-400 -mt-2">{archetypeField.help}</p>
      <div class="grid grid-cols-1 gap-2">
        {#each archetypeField.options as opt (opt.id)}
          <label
            class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                   border-slate-700 hover:border-slate-500
                   {form.archetype === opt.id ? 'bg-blue-600/15 border-blue-500' : ''}"
          >
            <input
              type="radio"
              name="archetype"
              value={opt.id}
              bind:group={form.archetype}
              class="hidden"
            />
            <span class="text-2xl">{opt.icon}</span>
            <span class="flex flex-col">
              <strong class="font-medium text-slate-100">{opt.label}</strong>
              <small class="text-sm text-slate-400">{opt.description}</small>
            </span>
          </label>
        {/each}
      </div>
    </section>

    {#each tagsField.groups as group (group.id)}
      <section class="flex flex-col gap-3">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-300">
          {group.label}
        </h2>
        <div class="flex flex-wrap gap-2">
          {#each group.options as opt (opt.id)}
            <label
              class="px-3 py-1.5 rounded-full border text-sm cursor-pointer transition-colors
                     border-slate-700 text-slate-200 hover:border-slate-500
                     {form.tags.includes(opt.id) ? 'bg-blue-600 border-blue-600 text-white' : ''}"
            >
              <input
                type="checkbox"
                value={opt.id}
                bind:group={form.tags}
                class="hidden"
              />
              <span>{opt.label}</span>
            </label>
          {/each}
        </div>
      </section>
    {/each}

    <section class="flex flex-col gap-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-300">
        {budgetField.label}
      </h2>
      <p class="text-sm text-slate-400 -mt-2">{budgetField.help}</p>
      <div class="flex gap-2">
        {#each budgetLevels as level (level)}
          <button
            type="button"
            aria-pressed={form.budget === level}
            class="flex-1 py-2 rounded-lg border text-lg tracking-widest transition-colors cursor-pointer
                   border-slate-700 text-slate-100 hover:border-slate-500
                   {form.budget === level ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-800'}"
            onclick={() => {
              form.budget = level;
            }}
          >
            {"$".repeat(level)}
          </button>
        {/each}
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-300">
        {noteField.label}
      </h2>
      <textarea
        bind:value={form.note}
        placeholder={noteField.placeholder}
        maxlength={noteField.maxLength}
        rows="3"
        class="w-full p-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 resize-y"
      ></textarea>
    </section>
  </section>

  <section class="flex flex-col gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
    <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-300">
      Live personality
    </h2>
    {#if hasSignal}
      <p class="text-slate-200">
        Closest type: <strong class="font-semibold">{type.icon} {type.label}</strong>
      </p>
      <div class="flex flex-col gap-2">
        {#each config.scoring.traits as t (t.key)}
          <div class="flex items-center gap-3 text-sm">
            <span class="w-40 shrink-0 text-slate-400">{t.display}</span>
            <span class="relative flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
              <span class="absolute left-1/2 top-0 bottom-0 w-px bg-slate-500"></span>
              <span
                class="absolute top-0 bottom-0 rounded-full
                       {personality[t.key] < 0 ? 'bg-amber-500' : 'bg-emerald-500'}"
                style={fillStyle(personality[t.key])}
              ></span>
            </span>
            <span class="w-12 text-right font-mono tabular-nums text-slate-300">
              {personality[t.key].toFixed(2)}
            </span>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-slate-400">
        Pick an archetype or a few tags — your type appears here in real time.
      </p>
    {/if}
  </section>
</main>
