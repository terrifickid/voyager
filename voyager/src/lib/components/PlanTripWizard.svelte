<script>
  // @ts-ignore
  import { user } from '$lib/stores/user.svelte.js';
  import Cta from './Cta.svelte';
  import DatePicker from './DatePicker.svelte';

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endCeiling = new Date(today.getFullYear(), 11, 31);

  function addDays(d, n) {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
  }

  const endMaxDate = $derived.by(() => {
    if (!draft.startDate) return endCeiling;
    const start = new Date(draft.startDate);
    return addDays(start, 60) < endCeiling ? addDays(start, 60) : endCeiling;
  });

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

<div class="mx-auto flex max-w-2xl flex-col gap-8 text-ink-2">
  <header class="flex flex-col gap-3">
    <span class="eyebrow">Plan a trip</span>
    <h1 class="font-display text-[40px] sm:text-[52px] text-ink leading-[1.02]">
      Tell us where. We'll do the rest.
    </h1>
    <p class="text-sm text-muted">Step {stepIndex + 1} of {STEPS.length} — {currentStep.title}</p>
    <div class="h-1.5 w-full overflow-hidden rounded-full bg-bone-200">
      <div
        class="h-full rounded-full bg-ink transition-all"
        style="width: {progress}%"
      ></div>
    </div>
  </header>

  <div
    class="flex flex-col gap-4 rounded-[28px] bg-bone-100 p-7"
    aria-label={currentStep.title}
  >
    {#if currentStep.id === 'destination'}
      <label class="flex flex-col gap-2">
        <span class="text-sm font-medium text-ink">Destination</span>
        <input
          type="text"
          bind:value={draft.destination}
          onkeydown={onInputKeydown}
          placeholder="e.g. Kyoto, Japan"
          class="w-full rounded-2xl bg-bone-50 p-4 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink"
        />
      </label>

    {:else if currentStep.id === 'dates'}
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DatePicker
            label="Start date"
            value={draft.startDate}
            minDate={today}
            maxDate={endCeiling}
            id="start-date"
            onSelect={(iso) => {
              draft.startDate = iso;
              if (draft.endDate && draft.endDate < iso) draft.endDate = '';
            }}
          />
          <DatePicker
            label="End date"
            value={draft.endDate}
            minDate={draft.startDate ? new Date(draft.startDate) : today}
            maxDate={endMaxDate}
            id="end-date"
            onSelect={(iso) => { draft.endDate = iso; }}
          />
        </div>
        {#if dateError}
          <p class="text-sm text-ink">{dateError}</p>
        {/if}
      </div>

    {:else if currentStep.id === 'travelers'}
      <div class="flex flex-col gap-5">
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm font-medium text-ink">Adults</span>
          <div class="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease adults"
              onclick={() => setAdults(draft.travelers.adults - 1)}
              class="h-10 w-10 rounded-full bg-bone-200 text-lg text-ink hover:bg-bone-300"
            >−</button>
            <input
              type="number"
              min="1"
              max="10"
              bind:value={draft.travelers.adults}
              onkeydown={onInputKeydown}
              oninput={(e) => setAdults(+e.currentTarget.value)}
              class="w-16 rounded-2xl bg-bone-50 p-2 text-center text-ink focus:outline-none focus:ring-2 focus:ring-ink"
            />
            <button
              type="button"
              aria-label="Increase adults"
              onclick={() => setAdults(draft.travelers.adults + 1)}
              class="h-10 w-10 rounded-full bg-bone-200 text-lg text-ink hover:bg-bone-300"
            >+</button>
          </div>
        </div>

        <div class="flex items-center justify-between gap-3">
          <span class="text-sm font-medium text-ink">Kids</span>
          <div class="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease kids"
              onclick={() => setKids(draft.travelers.kids - 1)}
              class="h-10 w-10 rounded-full bg-bone-200 text-lg text-ink hover:bg-bone-300"
            >−</button>
            <input
              type="number"
              min="0"
              max="10"
              bind:value={draft.travelers.kids}
              onkeydown={onInputKeydown}
              oninput={(e) => setKids(+e.currentTarget.value)}
              class="w-16 rounded-2xl bg-bone-50 p-2 text-center text-ink focus:outline-none focus:ring-2 focus:ring-ink"
            />
            <button
              type="button"
              aria-label="Increase kids"
              onclick={() => setKids(draft.travelers.kids + 1)}
              class="h-10 w-10 rounded-full bg-bone-200 text-lg text-ink hover:bg-bone-300"
            >+</button>
          </div>
        </div>

        {#if draft.travelers.kids > 0}
          <div class="flex flex-col gap-3 rounded-2xl bg-bone-200 p-4">
            <span class="eyebrow">
              Kids' ages
            </span>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {#each draft.travelers.kidsAges as age, i (i)}
                <label class="flex flex-col gap-1">
                  <span class="text-xs text-muted">Kid {i + 1}</span>
                  <input
                    type="number"
                    min="0"
                    max="17"
                    value={age}
                    onkeydown={onInputKeydown}
                    oninput={(e) => setKidAge(i, +e.currentTarget.value)}
                    class="w-full rounded-2xl bg-bone-50 p-2 text-center text-ink focus:outline-none focus:ring-2 focus:ring-ink"
                  />
                </label>
              {/each}
            </div>
          </div>
        {/if}
      </div>

    {:else if currentStep.id === 'archetype'}
      <p class="text-sm text-muted">Pick the closest fit.</p>
      <div class="grid grid-cols-1 gap-2">
        {#each CONFIG.archetypes as opt (opt.id)}
          <label
            class="flex cursor-pointer items-center gap-3 rounded-2xl p-3 transition-colors
                   bg-bone-200 hover:bg-bone-300
                   {draft.archetype === opt.id ? 'bg-ink text-bone-50' : ''}"
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
              <strong class="font-medium {draft.archetype === opt.id ? 'text-bone-50' : 'text-ink'}">{opt.label}</strong>
              <small class="text-sm {draft.archetype === opt.id ? 'text-bone-200' : 'text-muted'}">{opt.description}</small>
            </span>
          </label>
        {/each}
      </div>

    {:else if currentStep.id === 'tags'}
      <p class="text-sm text-muted">Optional — pick as many as you like.</p>
      <div class="flex flex-col gap-5">
        {#each CONFIG.tagGroups as group (group.id)}
          <div class="flex flex-col gap-2">
            <h2 class="eyebrow">
              {group.label}
            </h2>
            <div class="flex flex-wrap gap-2">
              {#each group.options as opt (opt.id)}
                <label
                  class="cursor-pointer rounded-pill px-4 py-2 text-sm transition-colors
                         bg-bone-200 text-ink hover:bg-bone-300
                         {draft.tags.includes(opt.id) ? 'bg-ink text-bone-50' : ''}"
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
      <p class="text-sm text-muted">Rough daily spend comfort.</p>
      <div class="flex gap-2">
        {#each [1, 2, 3, 4, 5] as level (level)}
          <button
            type="button"
            aria-pressed={draft.budget === level}
            onclick={() => { draft.budget = level; }}
            class="flex-1 rounded-2xl py-3 text-lg tracking-widest transition-colors
                   {draft.budget === level
                     ? 'bg-ink text-bone-50'
                     : 'bg-bone-200 text-ink hover:bg-bone-300'}"
          >
            {"$".repeat(level)}
          </button>
        {/each}
      </div>

    {:else if currentStep.id === 'note'}
      <label class="flex flex-col gap-2">
        <span class="text-sm font-medium text-ink">Anything else?</span>
        <textarea
          bind:value={draft.note}
          maxlength={NOTE_MAX}
          rows="3"
          placeholder="e.g. I hate crowded tourist traps. I wake up early but hate rushing."
          class="w-full resize-y rounded-2xl bg-bone-50 p-4 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink"
        ></textarea>
        <span class="text-right text-xs text-muted">{noteLen}/{NOTE_MAX}</span>
      </label>
    {/if}
  </div>

  <footer class="flex items-center justify-between gap-3">
    <button
      type="button"
      onclick={back}
      disabled={stepIndex === 0}
      class="inline-flex items-center gap-1.5 text-ink underline underline-offset-4 decoration-[1.5px] disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <span aria-hidden="true">‹</span> Back
    </button>
    <Cta
      variant="primary"
      onclick={next}
      disabled={!canAdvance}
    >
      {stepIndex === STEPS.length - 1 ? 'Finish' : 'Next'}
    </Cta>
  </footer>
</div>