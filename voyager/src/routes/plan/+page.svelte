<script>
  // @ts-ignore
  import { user } from '$lib/stores/user.svelte.js';
  import {
    generateConcept,
    generateDayPlan,
    enrichDayPlan
  } from '$lib/agent/index.ts';
  import PlanTripWizard from '$lib/components/PlanTripWizard.svelte';

  let submitted = $state(false);
  let loading = $state(false);

  const concept = $derived(user.tripConcept);
  const itinerary = $derived(user.itinerary ?? []);
  const candidates = $derived(user.placeCandidates ?? []);

  async function onFinish() {
    loading = true;
    try {
      await generateConcept();
      await generateDayPlan();
      await enrichDayPlan(1);
    } finally {
      loading = false;
      submitted = true;
    }
  }

  function edit() {
    submitted = false;
  }

  function slotCell(slot) {
    if (!slot) return null;
    return slot;
  }
</script>

<svelte:head>
  <title>Plan a trip — Voyager</title>
</svelte:head>

{#if !submitted}
  <PlanTripWizard {onFinish} />
{:else}
  <section class="flex flex-col gap-6">
    <header class="flex flex-col gap-1">
      <div class="flex items-baseline justify-between gap-3">
        <h1 class="text-2xl font-semibold">Your itinerary</h1>
        <button
          type="button"
          onclick={edit}
          class="text-sm text-indigo-400 hover:text-indigo-300"
        >
          Edit my trip
        </button>
      </div>
      <p class="text-sm text-slate-400">
        Demo mode — generated from local fixtures.
      </p>
    </header>

    {#if loading}
      <p class="rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-6 text-center text-sm text-slate-500">
        Generating your itinerary…
      </p>
    {:else}
      <div class="flex flex-col gap-4">
        {#if !concept && itinerary.length === 0 && candidates.length === 0}
          <p class="rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-6 text-center text-sm text-slate-500">
            Nothing yet.
          </p>
        {/if}

        {#if concept}
          <article class="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 class="text-lg font-semibold text-slate-100">{concept.title}</h2>
            <p class="mt-1 text-xs uppercase tracking-wide text-slate-500">Trip concept</p>
            <p class="mt-3 text-sm leading-relaxed text-slate-300">{concept.summary}</p>
            <dl class="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt class="text-xs uppercase text-slate-500">Base</dt>
                <dd class="text-slate-200">{concept.logistics.base}</dd>
              </div>
              <div>
                <dt class="text-xs uppercase text-slate-500">Transit</dt>
                <dd class="text-slate-200">{concept.logistics.transit}</dd>
              </div>
              <div>
                <dt class="text-xs uppercase text-slate-500">Best time</dt>
                <dd class="text-slate-200">{concept.logistics.bestTime}</dd>
              </div>
            </dl>
            {#if concept.highlights?.length}
              <div class="mt-4">
                <p class="text-xs uppercase text-slate-500">Highlights</p>
                <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                  {#each concept.highlights as h (h)}
                    <li>{h}</li>
                  {/each}
                </ul>
              </div>
            {/if}
          </article>
        {/if}

        {#if itinerary.length > 0}
          <div class="flex flex-col gap-4">
            {#each itinerary as day (day.dayNumber)}
              <article class="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <header class="flex items-baseline justify-between gap-3">
                  <h3 class="text-base font-semibold text-slate-100">
                    Day {day.dayNumber} — {day.theme}
                  </h3>
                </header>
                <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {#each day.slots as slot (slot.label)}
                    {@const doCell = slotCell(slot.do)}
                    {@const eatCell = slotCell(slot.eat)}
                    {@const stayCell = slotCell(slot.stay)}
                    <div class="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                      <p class="text-xs uppercase tracking-wide text-slate-500">{slot.label}</p>
                      <div class="mt-2 flex flex-col gap-2 text-sm">
                        {#if stayCell}
                          <div>
                            <span class="text-slate-500">Stay · </span>
                            <span class="text-slate-100">{stayCell.name}</span>
                            <span class="text-slate-400"> — {stayCell.note}</span>
                          </div>
                        {/if}
                        {#if eatCell}
                          <div>
                            <span class="text-slate-500">Eat · </span>
                            <span class="text-slate-100">{eatCell.name}</span>
                            <span class="text-slate-400"> — {eatCell.note}</span>
                          </div>
                        {/if}
                        {#if doCell}
                          <div>
                            <span class="text-slate-500">Do · </span>
                            <span class="text-slate-100">{doCell.name}</span>
                            <span class="text-slate-400"> — {doCell.note}</span>
                          </div>
                        {/if}
                      </div>
                    </div>
                  {/each}
                </div>
              </article>
            {/each}
          </div>
        {/if}

        {#if candidates.length > 0}
          <article class="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 class="text-base font-semibold text-slate-100">Place candidates</h3>
            <p class="mt-1 text-xs text-slate-500">From the local places fixture.</p>
            <ul class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {#each candidates as place (place.id)}
                <li class="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                  <div class="flex items-baseline justify-between gap-2">
                    <p class="text-sm font-medium text-slate-100">{place.name}</p>
                    <span class="text-xs text-slate-400">{'★'.repeat(Math.round(place.rating))}</span>
                  </div>
                  <p class="text-xs text-slate-500">{place.kind} · {place.address}</p>
                  <p class="mt-2 text-sm text-slate-300">{place.note}</p>
                  {#if place.tags?.length}
                    <div class="mt-2 flex flex-wrap gap-1">
                      {#each place.tags as t (t)}
                        <span class="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-400">{t}</span>
                      {/each}
                    </div>
                  {/if}
                </li>
              {/each}
            </ul>
          </article>
        {/if}
      </div>
    {/if}
  </section>
{/if}