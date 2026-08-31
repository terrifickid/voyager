<script>
  // @ts-ignore
  import { user } from '$lib/stores/user.svelte.js';

  /** @type {{ onFinish?: () => void }} */
  let { onFinish = undefined } = $props();

  // ---- CONFIG (copied verbatim from TravelFormPrefs.svelte) --------------
  const CONFIG = {
    archetypes: [
      {
        id: "planner",
        icon: "🧭",
        label: "The Planner",
        description: "I like to know what's happening, and when.",
        traits: { openness: 0.1, conscientiousness: 0.7, extraversion: 0.0, agreeableness: -0.2, neuroticism: 0.4 },
      },
      {
        id: "explorer",
        icon: "🥾",
        label: "The Explorer",
        description: "I go off the map and find what locals love.",
        traits: { openness: 0.8, conscientiousness: 0.0, extraversion: -0.3, agreeableness: 0.2, neuroticism: -0.4 },
      },
      {
        id: "social",
        icon: "🥂",
        label: "The Social",
        description: "I'm here for people, energy, and good times.",
        traits: { openness: 0.4, conscientiousness: -0.3, extraversion: 0.8, agreeableness: 0.3, neuroticism: -0.3 },
      },
      {
        id: "relaxer",
        icon: "🌴",
        label: "The Relaxer",
        description: "I want to slow down and do as little as possible.",
        traits: { openness: -0.4, conscientiousness: -0.4, extraversion: -0.3, agreeableness: 0.2, neuroticism: -0.5 },
      },
      {
        id: "comfort_seeker",
        icon: "✨",
        label: "The Comfort Seeker",
        description: "I want it easy, familiar, and fully taken care of.",
        traits: { openness: -0.5, conscientiousness: 0.3, extraversion: -0.2, agreeableness: 0.5, neuroticism: 0.5 },
      },
    ],
    tagGroups: [
      {
        id: "vibe",
        label: "Vibe",
        options: [
          { id: "go_with_the_flow", label: "Go with the flow", traits: { conscientiousness: -0.5, agreeableness: 0.4, neuroticism: -0.4 } },
          { id: "planned_organized", label: "Planned & organized", traits: { conscientiousness: 0.7 } },
          { id: "slow_relaxed", label: "Slow & relaxed", traits: { conscientiousness: -0.4, extraversion: -0.4, neuroticism: -0.4 } },
          { id: "adventurous", label: "Adventurous", traits: { openness: 0.5, neuroticism: -0.4 } },
          { id: "pampered", label: "Pampered & taken care of", traits: { openness: -0.5, agreeableness: 0.4, neuroticism: 0.4 } },
          { id: "off_the_grid", label: "Off the grid", traits: { openness: 0.5, extraversion: -0.5, neuroticism: -0.4 } },
        ],
      },
      {
        id: "activities",
        label: "Activities",
        options: [
          { id: "local_food", label: "Local food & markets", traits: { openness: 0.5 } },
          { id: "hidden_gems", label: "Hidden gems", traits: { openness: 0.6, extraversion: -0.4 } },
          { id: "iconic_mustsees", label: "Iconic must-sees", traits: { openness: -0.5 } },
          { id: "culture_history", label: "Culture & history", traits: { openness: 0.4 } },
          { id: "nightlife", label: "Nightlife", traits: { extraversion: 0.7 } },
          { id: "meeting_locals", label: "Meeting locals", traits: { extraversion: 0.5, agreeableness: 0.4 } },
          { id: "nature_hiking", label: "Nature & hiking", traits: { openness: 0.5, extraversion: -0.4 } },
          { id: "beach_water", label: "Beach & water", traits: { openness: -0.3, extraversion: -0.4, neuroticism: -0.4 } },
          { id: "wellness_spa", label: "Wellness & spa", traits: { extraversion: -0.4, openness: -0.3, neuroticism: 0.4 } },
        ],
      },
      {
        id: "environment",
        label: "Environment",
        options: [
          { id: "quiet_secluded", label: "Quiet & secluded", traits: { extraversion: -0.6 } },
          { id: "lively_social", label: "Lively & social", traits: { extraversion: 0.6 } },
          { id: "local_neighborhoods", label: "Local neighborhoods", traits: { openness: 0.5, agreeableness: 0.4 } },
          { id: "resort_allinclusive", label: "Resort / all-inclusive", traits: { openness: -0.5, neuroticism: 0.5 } },
          { id: "wilderness_nature", label: "Wilderness & nature", traits: { openness: 0.5, extraversion: -0.4 } },
        ],
      },
    ],
  };

  const NOTE_MAX = 500;

  // ---- steps -------------------------------------------------------------
  const STEPS = [
    { id: 'destination', title: 'Where to?' },
    { id: 'dates', title: 'When?' },
    { id: 'travelers', title: "Who's coming?" },
    { id: 'archetype', title: 'Which sounds like you?' },
    { id: 'tags', title: 'Pick all that apply' },
    { id: 'budget', title: 'Budget' },
    { id: 'note', title: 'Anything else?' },
  ];

  // ---- initial draft (seed from store if present) ------------------------
  function initialTripDraft() {
    const existing = user.preferences?.trip;
    const base = {
      destination: '',
      startDate: '',
      endDate: '',
      travelers: { adults: 1, kids: 0, kidsAges: [] },
      archetype: null,
      tags: [],
      budget: 3,
      note: '',
    };
    if (!existing) return base;
    return {
      destination: existing.destination ?? base.destination,
      startDate: existing.startDate ?? base.startDate,
      endDate: existing.endDate ?? base.endDate,
      travelers: {
        adults: existing.travelers?.adults ?? base.travelers.adults,
        kids: existing.travelers?.kids ?? base.travelers.kids,
        kidsAges: Array.isArray(existing.travelers?.kidsAges)
          ? [...existing.travelers.kidsAges]
          : [],
      },
      archetype: existing.draft?.archetype ?? user.preferences.form.archetype ?? null,
      tags: existing.draft?.tags ?? [...(user.preferences.form.tags ?? [])],
      budget: existing.draft?.budget ?? user.preferences.form.budget ?? 3,
      note: existing.draft?.note ?? user.preferences.form.note ?? '',
    };
  }

  // ---- state -------------------------------------------------------------
  let stepIndex = $state(0);
  let draft = $state(initialTripDraft());

  const currentStep = $derived(STEPS[stepIndex]);
  const progress = $derived(((stepIndex + 1) / STEPS.length) * 100);

  const dateError = $derived(
    draft.startDate && draft.endDate && draft.endDate < draft.startDate
      ? 'End date must be on or after start date.'
      : ''
  );

  const canAdvance = $derived.by(() => {
    switch (currentStep.id) {
      case 'destination':
        return draft.destination.trim().length > 0;
      case 'dates':
        return !!draft.startDate && !!draft.endDate && !dateError;
      case 'travelers':
        return (
          draft.travelers.adults >= 1 &&
          draft.travelers.adults <= 10 &&
          draft.travelers.kids >= 0 &&
          draft.travelers.kids <= 10 &&
          draft.travelers.kidsAges.length === draft.travelers.kids
        );
      case 'archetype':
        return !!draft.archetype;
      case 'tags':
        return true;
      case 'budget':
        return draft.budget >= 1 && draft.budget <= 5;
      case 'note':
        return (draft.note?.length ?? 0) <= NOTE_MAX;
      default:
        return false;
    }
  });

  const noteLen = $derived(draft.note?.length ?? 0);

  // ---- step transitions --------------------------------------------------
  function next() {
    if (!canAdvance) return;
    if (stepIndex < STEPS.length - 1) {
      stepIndex += 1;
    } else {
      finish();
    }
  }

  function back() {
    if (stepIndex > 0) stepIndex -= 1;
  }

  function onInputKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      next();
    }
  }

  // ---- travelers helpers -------------------------------------------------
  function setAdults(n) {
    const adults = Math.max(1, Math.min(10, n || 1));
    draft.travelers.adults = adults;
  }

  function setKids(n) {
    const kids = Math.max(0, Math.min(10, n || 0));
    const cur = draft.travelers.kidsAges;
    if (kids > cur.length) {
      for (let i = cur.length; i < kids; i++) cur.push(0);
    } else if (kids < cur.length) {
      cur.length = kids;
    }
    draft.travelers.kids = kids;
  }

  function setKidAge(i, n) {
    const age = Math.max(0, Math.min(17, n || 0));
    draft.travelers.kidsAges[i] = age;
  }

  // ---- finish ------------------------------------------------------------
  function finish() {
    if (!canAdvance) return;
    const snapshot = {
      destination: draft.destination.trim(),
      startDate: draft.startDate,
      endDate: draft.endDate,
      travelers: {
        adults: draft.travelers.adults,
        kids: draft.travelers.kids,
        kidsAges: [...draft.travelers.kidsAges],
      },
      draft: {
        destination: draft.destination.trim(),
        startDate: draft.startDate,
        endDate: draft.endDate,
        travelers: {
          adults: draft.travelers.adults,
          kids: draft.travelers.kids,
          kidsAges: [...draft.travelers.kidsAges],
        },
        archetype: draft.archetype,
        tags: [...draft.tags],
        budget: draft.budget,
        note: draft.note?.trim() ?? '',
      },
      savedAt: new Date().toISOString(),
    };

    user.setTrip(snapshot);
    user.setPreferences({
      form: {
        archetype: draft.archetype,
        tags: [...draft.tags],
        budget: draft.budget,
        note: draft.note?.trim() || null,
      },
      personality: user.preferences.personality,
      type: user.preferences.type,
      trip: user.preferences.trip,
    });

    onFinish?.();
  }
</script>

<div class="mx-auto flex max-w-2xl flex-col gap-6 text-slate-100">
  <header class="flex flex-col gap-2">
    <h1 class="text-2xl font-semibold">Plan a trip</h1>
    <p class="text-sm text-slate-400">Step {stepIndex + 1} of {STEPS.length} — {currentStep.title}</p>
    <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
      <div
        class="h-full rounded-full bg-indigo-600 transition-all"
        style="width: {progress}%"
      ></div>
    </div>
  </header>

  <div
    class="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5"
    aria-label={currentStep.title}
  >
    {#if currentStep.id === 'destination'}
      <label class="flex flex-col gap-2">
        <span class="text-sm font-medium text-slate-200">Destination</span>
        <input
          type="text"
          bind:value={draft.destination}
          onkeydown={onInputKeydown}
          placeholder="e.g. Kyoto, Japan"
          class="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
        />
      </label>

    {:else if currentStep.id === 'dates'}
      <div class="flex flex-col gap-4">
        <label class="flex flex-col gap-2">
          <span class="text-sm font-medium text-slate-200">Start date</span>
          <input
            type="date"
            bind:value={draft.startDate}
            onkeydown={onInputKeydown}
            class="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </label>
        <label class="flex flex-col gap-2">
          <span class="text-sm font-medium text-slate-200">End date</span>
          <input
            type="date"
            bind:value={draft.endDate}
            onkeydown={onInputKeydown}
            class="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </label>
        {#if dateError}
          <p class="text-sm text-amber-500">{dateError}</p>
        {/if}
      </div>

    {:else if currentStep.id === 'travelers'}
      <div class="flex flex-col gap-5">
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm font-medium text-slate-200">Adults</span>
          <div class="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease adults"
              onclick={() => setAdults(draft.travelers.adults - 1)}
              class="h-9 w-9 rounded-lg border border-slate-700 bg-slate-800 text-lg text-slate-100 hover:border-slate-500"
            >−</button>
            <input
              type="number"
              min="1"
              max="10"
              bind:value={draft.travelers.adults}
              onkeydown={onInputKeydown}
              oninput={(e) => setAdults(+e.currentTarget.value)}
              class="w-16 rounded-lg border border-slate-700 bg-slate-800 p-2 text-center text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              aria-label="Increase adults"
              onclick={() => setAdults(draft.travelers.adults + 1)}
              class="h-9 w-9 rounded-lg border border-slate-700 bg-slate-800 text-lg text-slate-100 hover:border-slate-500"
            >+</button>
          </div>
        </div>

        <div class="flex items-center justify-between gap-3">
          <span class="text-sm font-medium text-slate-200">Kids</span>
          <div class="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease kids"
              onclick={() => setKids(draft.travelers.kids - 1)}
              class="h-9 w-9 rounded-lg border border-slate-700 bg-slate-800 text-lg text-slate-100 hover:border-slate-500"
            >−</button>
            <input
              type="number"
              min="0"
              max="10"
              bind:value={draft.travelers.kids}
              onkeydown={onInputKeydown}
              oninput={(e) => setKids(+e.currentTarget.value)}
              class="w-16 rounded-lg border border-slate-700 bg-slate-800 p-2 text-center text-slate-100 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              aria-label="Increase kids"
              onclick={() => setKids(draft.travelers.kids + 1)}
              class="h-9 w-9 rounded-lg border border-slate-700 bg-slate-800 text-lg text-slate-100 hover:border-slate-500"
            >+</button>
          </div>
        </div>

        {#if draft.travelers.kids > 0}
          <div class="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
            <span class="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Kids' ages
            </span>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {#each draft.travelers.kidsAges as age, i (i)}
                <label class="flex flex-col gap-1">
                  <span class="text-xs text-slate-400">Kid {i + 1}</span>
                  <input
                    type="number"
                    min="0"
                    max="17"
                    value={age}
                    onkeydown={onInputKeydown}
                    oninput={(e) => setKidAge(i, +e.currentTarget.value)}
                    class="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-center text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </label>
              {/each}
            </div>
          </div>
        {/if}
      </div>

    {:else if currentStep.id === 'archetype'}
      <p class="text-sm text-slate-400">Pick the closest fit.</p>
      <div class="grid grid-cols-1 gap-2">
        {#each CONFIG.archetypes as opt (opt.id)}
          <label
            class="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors
                   border-slate-700 hover:border-slate-500
                   {draft.archetype === opt.id ? 'border-blue-500 bg-blue-600/15' : ''}"
          >
            <input
              type="radio"
              name="archetype"
              value={opt.id}
              bind:group={draft.archetype}
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

    {:else if currentStep.id === 'tags'}
      <p class="text-sm text-slate-400">Optional — pick as many as you like.</p>
      <div class="flex flex-col gap-5">
        {#each CONFIG.tagGroups as group (group.id)}
          <div class="flex flex-col gap-2">
            <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-300">
              {group.label}
            </h2>
            <div class="flex flex-wrap gap-2">
              {#each group.options as opt (opt.id)}
                <label
                  class="cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors
                         border-slate-700 text-slate-200 hover:border-slate-500
                         {draft.tags.includes(opt.id) ? 'border-blue-600 bg-blue-600 text-white' : ''}"
                >
                  <input
                    type="checkbox"
                    value={opt.id}
                    bind:group={draft.tags}
                    class="hidden"
                  />
                  <span>{opt.label}</span>
                </label>
              {/each}
            </div>
          </div>
        {/each}
      </div>

    {:else if currentStep.id === 'budget'}
      <p class="text-sm text-slate-400">Rough daily spend comfort.</p>
      <div class="flex gap-2">
        {#each [1, 2, 3, 4, 5] as level (level)}
          <button
            type="button"
            aria-pressed={draft.budget === level}
            onclick={() => { draft.budget = level; }}
            class="flex-1 rounded-lg border py-2 text-lg tracking-widest transition-colors
                   {draft.budget === level
                     ? 'border-blue-600 bg-blue-600 text-white'
                     : 'border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-500'}"
          >
            {"$".repeat(level)}
          </button>
        {/each}
      </div>

    {:else if currentStep.id === 'note'}
      <label class="flex flex-col gap-2">
        <span class="text-sm font-medium text-slate-200">Anything else?</span>
        <textarea
          bind:value={draft.note}
          maxlength={NOTE_MAX}
          rows="3"
          placeholder="e.g. I hate crowded tourist traps. I wake up early but hate rushing."
          class="w-full resize-y rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
        ></textarea>
        <span class="text-right text-xs text-slate-400">{noteLen}/{NOTE_MAX}</span>
      </label>
    {/if}
  </div>

  <footer class="flex items-center justify-between gap-3">
    <button
      type="button"
      onclick={back}
      disabled={stepIndex === 0}
      class="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Back
    </button>
    <button
      type="button"
      onclick={next}
      disabled={!canAdvance}
      class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {stepIndex === STEPS.length - 1 ? 'Finish' : 'Next'}
    </button>
  </footer>
</div>