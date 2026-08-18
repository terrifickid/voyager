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

  // ---- state: ONE stateful object, two-way bound ------------------------
  let form = $state({
    archetype: config.emptyState.archetype,
    tags: [...config.emptyState.tags],
    budget: config.emptyState.budget,
    note: config.emptyState.note,
  });

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
    onchange?.(snapshot);
  });
</script>

<main class="wrap">
  <header>
    <h1>{config.title}</h1>
    <p>{config.subtitle}</p>
  </header>

  <section class="panel">
    <fieldset>
      <legend>{archetypeField.label}</legend>
      <p class="help">{archetypeField.help}</p>
      <div class="arches">
        {#each archetypeField.options as opt (opt.id)}
          <label class="arch" class:on={form.archetype === opt.id}>
            <input
              type="radio"
              name="archetype"
              value={opt.id}
              bind:group={form.archetype}
            />
            <span class="icon">{opt.icon}</span>
            <span class="body">
              <strong>{opt.label}</strong>
              <small>{opt.description}</small>
            </span>
          </label>
        {/each}
      </div>
    </fieldset>

    {#each tagsField.groups as group (group.id)}
      <fieldset>
        <legend>{group.label}</legend>
        <div class="tags">
          {#each group.options as opt (opt.id)}
            <label class="tag" class:on={form.tags.includes(opt.id)}>
              <input type="checkbox" value={opt.id} bind:group={form.tags} />
              <span>{opt.label}</span>
            </label>
          {/each}
        </div>
      </fieldset>
    {/each}

    <fieldset>
      <legend>{budgetField.label}</legend>
      <p class="help">{budgetField.help}</p>
      <div class="budget">
        {#each budgetLevels as level (level)}
          <button
            type="button"
            class:on={form.budget === level}
            onclick={() => {
              form.budget = level;
            }}
          >
            {"$".repeat(level)}
          </button>
        {/each}
      </div>
    </fieldset>

    <fieldset>
      <legend>{noteField.label}</legend>
      <textarea
        bind:value={form.note}
        placeholder={noteField.placeholder}
        maxlength={noteField.maxLength}
        rows="3"
      ></textarea>
    </fieldset>
  </section>

  <section class="personality">
    <h2>Live personality</h2>
    {#if hasSignal}
      <p class="type">
        Closest type: <strong>{type.icon} {type.label}</strong>
      </p>
      <div class="traits">
        {#each config.scoring.traits as t (t.key)}
          <div class="trait">
            <span class="tname">{t.display}</span>
            <span class="track">
              <span class="zero"></span>
              <span
                class="fill"
                class:neg={personality[t.key] < 0}
                style={fillStyle(personality[t.key])}
              ></span>
            </span>
            <span class="score">{personality[t.key].toFixed(2)}</span>
          </div>
        {/each}
      </div>
    {:else}
      <p class="muted">
        Pick an archetype or a few tags — your type appears here in real time.
      </p>
    {/if}
  </section>

  <details>
    <summary>State + payload (live JSON)</summary>
    <pre>{JSON.stringify(snapshot, null, 2)}</pre>
  </details>
</main>

<style>
  .wrap {
    max-width: 720px;
    margin: 0 auto;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
    color: #1a1a1a;
  }
  header h1 {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }
  header p {
    color: #666;
    margin-top: 0;
  }

  .panel {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  fieldset {
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    padding: 1rem;
  }
  legend {
    font-weight: 600;
    padding: 0 0.4rem;
  }
  .help {
    color: #888;
    font-size: 0.85rem;
    margin: 0 0 0.75rem;
  }

  .arches {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .arch {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    padding: 0.6rem 0.75rem;
    border: 1px solid #e3e3e3;
    border-radius: 8px;
    cursor: pointer;
  }
  .arch input {
    display: none;
  }
  .arch .icon {
    font-size: 1.4rem;
  }
  .arch .body {
    display: flex;
    flex-direction: column;
  }
  .arch small {
    color: #777;
  }
  .arch.on {
    border-color: #3b82f6;
    background: #eff6ff;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .tag {
    padding: 0.4rem 0.75rem;
    border: 1px solid #e3e3e3;
    border-radius: 999px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  .tag input {
    display: none;
  }
  .tag.on {
    background: #3b82f6;
    border-color: #3b82f6;
    color: #fff;
  }

  .budget {
    display: flex;
    gap: 0.5rem;
  }
  .budget button {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #e3e3e3;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    letter-spacing: 2px;
  }
  .budget button.on {
    background: #3b82f6;
    border-color: #3b82f6;
    color: #fff;
  }

  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 0.6rem;
    border: 1px solid #e3e3e3;
    border-radius: 8px;
    font: inherit;
    resize: vertical;
  }

  .personality {
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: 10px;
    background: #fafafa;
    border: 1px solid #eee;
  }
  .personality h2 {
    font-size: 1rem;
    margin: 0 0 0.5rem;
  }
  .type {
    margin: 0 0 0.75rem;
  }
  .traits {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .trait {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
  }
  .tname {
    width: 150px;
    color: #555;
  }
  .track {
    position: relative;
    flex: 1;
    height: 12px;
    background: #eee;
    border-radius: 6px;
  }
  .zero {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: #bbb;
  }
  .fill {
    position: absolute;
    top: 0;
    bottom: 0;
    background: #22c55e;
    border-radius: 6px;
  }
  .fill.neg {
    background: #ef4444;
  }
  .score {
    width: 44px;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .muted {
    color: #999;
  }

  details {
    margin-top: 1rem;
  }
  details pre {
    background: #0f172a;
    color: #e2e8f0;
    padding: 0.75rem;
    border-radius: 8px;
    overflow: auto;
    font-size: 0.8rem;
  }
</style>
