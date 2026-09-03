<script>
  // @ts-ignore
  import { user } from '$lib/stores/user.svelte.js';
  import {
    generateConcept,
    generateDayPlan,
    enrichDayPlan
  } from '$lib/agent/index.ts';
  import PlanTripWizard from '$lib/components/PlanTripWizard.svelte';
  import Cta from '$lib/components/Cta.svelte';
  import PersonalityGraph from '$lib/components/PersonalityGraph.svelte';
  import RegisterSection from '$lib/components/RegisterSection.svelte';
  import { log, EVENT, serializeError } from '$lib/logger.js';

  const componentLog = log.child({ component: 'plan', function: 'planPage' });

  let submitted = $state(false);
  let loading = $state(false);

  const concept = $derived(user.tripConcept);
  const itinerary = $derived(user.itinerary ?? []);
  const candidates = $derived(user.placeCandidates ?? []);

  let planMounted = $state(false);
  $effect(() => {
    if (planMounted) return;
    planMounted = true;
    componentLog.debug(
      {
        step: 'plan:mount',
        rank: itinerary.length,
        hasConcept: !!user.tripConcept,
        hasItinerary: !!user.itinerary,
        candidatesCount: candidates.length
      },
      'Plan page mounted/derived'
    );
  });

  async function onFinish() {
    componentLog.info(
      { type: EVENT.JOB_START, step: 'plan:onfinish' },
      'Plan finish flow started'
    );
    loading = true;
    try {
      await generateConcept();
      await generateDayPlan();
      await enrichDayPlan(1);
      componentLog.info(
        {
          type: EVENT.JOB_SUCCESS,
          step: 'plan:onfinish',
          hasConcept: !!user.tripConcept,
          itineraryDays: (user.itinerary ?? []).length
        },
        'Plan finish flow succeeded'
      );
    } catch (err) {
      componentLog.error(
        {
          type: EVENT.RENDER_ERROR,
          step: 'plan:onfinish',
          err: serializeError(err, { function: 'planPage:onfinish' })
        },
        `Plan finish flow failed: ${err.message}`
      );
      throw err;
    } finally {
      loading = false;
      submitted = true;
    }
  }

  function edit() {
    componentLog.info(
      { type: EVENT.USER_ACTION, step: 'plan:edit' },
      'Edit answers clicked'
    );
    submitted = false;
  }

  function slotCell(slot) {
    if (!slot) return null;
    return slot;
  }

  const slotLabels = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' };
</script>

<svelte:head>
  <title>Plan a trip — Voyager · Caribbean-first</title>
</svelte:head>

<RegisterSection register="editorial">
<div class="mx-auto max-w-6xl px-6 pt-16 pb-24" class:hidden={submitted}>
  <PlanTripWizard {onFinish} hidden={submitted} />
</div>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-24 flex flex-col gap-12" class:hidden={!submitted}>
    <header class="flex flex-col gap-4">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div class="flex flex-col gap-3">
          <span class="eyebrow">Your trip</span>
          <h1 class="font-display text-[44px] sm:text-[60px] text-ink leading-[1.02] max-w-2xl">
            {concept?.title ?? 'Your itinerary'}
          </h1>
        </div>
        <Cta variant="secondary" onclick={edit}>Edit my answers</Cta>
      </div>
      <p class="text-sm text-muted">Demo build. Generated from local fixtures on your device.</p>
    </header>

    <PersonalityGraph />

    {#if loading}
      <p class="rounded-[28px] bg-bone-100 p-8 text-center text-sm text-muted">
        Building your itinerary…
      </p>
    {:else}
      <div class="flex flex-col gap-6">
        {#if !concept && itinerary.length === 0 && candidates.length === 0}
          <p class="rounded-[28px] bg-bone-100 p-8 text-center text-sm text-muted">
            Nothing yet. Answer the prompts and submit to see your plan.
          </p>
        {/if}

        {#if concept}
          <article class="rounded-[28px] bg-bone-200 p-8 flex flex-col gap-5">
            <span class="eyebrow">Trip concept</span>
            <h2 class="font-display text-[32px] text-ink leading-[1.05]">{concept.title}</h2>
            <p class="text-[15px] leading-relaxed text-ink-2">{concept.summary}</p>
            <dl class="grid grid-cols-1 gap-5 text-sm sm:grid-cols-3">
              <div class="flex flex-col gap-1">
                <dt class="eyebrow">Base</dt>
                <dd class="text-ink-2">{concept.logistics.base}</dd>
              </div>
              <div class="flex flex-col gap-1">
                <dt class="eyebrow">Getting around</dt>
                <dd class="text-ink-2">{concept.logistics.transit}</dd>
              </div>
              <div class="flex flex-col gap-1">
                <dt class="eyebrow">Best time to go</dt>
                <dd class="text-ink-2">{concept.logistics.bestTime}</dd>
              </div>
            </dl>
            {#if concept.highlights?.length}
              <div>
                <p class="eyebrow">What you'll remember</p>
                <ul class="mt-3 flex flex-col gap-2 text-[15px] text-ink-2">
                  {#each concept.highlights as h (h)}
                    <li class="flex items-baseline gap-2">
                      <span aria-hidden="true" class="text-ink">›</span>
                      <span>{h}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </article>
        {/if}

        {#if itinerary.length > 0}
          <div class="flex flex-col gap-6">
            {#each itinerary as day (day.dayNumber)}
              <article class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-5">
                <header class="flex items-baseline justify-between gap-3">
                  <h3 class="font-display text-[26px] text-ink leading-[1.05]">
                    Day {day.dayNumber} — {day.theme}
                  </h3>
                </header>
                <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {#each day.slots as slot (slot.label)}
                    {@const doCell = slotCell(slot.do)}
                    {@const eatCell = slotCell(slot.eat)}
                    {@const stayCell = slotCell(slot.stay)}
                    <div class="rounded-2xl bg-bone-200 p-5">
                      <p class="eyebrow">{slotLabels[slot.label] ?? slot.label}</p>
                      <div class="mt-3 flex flex-col gap-2 text-[15px]">
                        {#if stayCell}
                          <div class="flex flex-col gap-0.5">
                            <span class="eyebrow">Stay</span>
                            <span class="text-ink">{stayCell.name}</span>
                            <span class="text-muted">{stayCell.note}</span>
                          </div>
                        {/if}
                        {#if eatCell}
                          <div class="flex flex-col gap-0.5">
                            <span class="eyebrow">Eat</span>
                            <span class="text-ink">{eatCell.name}</span>
                            <span class="text-muted">{eatCell.note}</span>
                          </div>
                        {/if}
                        {#if doCell}
                          <div class="flex flex-col gap-0.5">
                            <span class="eyebrow">Do</span>
                            <span class="text-ink">{doCell.name}</span>
                            <span class="text-muted">{doCell.note}</span>
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
          <article class="rounded-[28px] bg-bone-200 p-8 flex flex-col gap-5">
            <div class="flex items-baseline justify-between gap-3">
              <h3 class="font-display text-[26px] text-ink leading-[1.05]">Other places you might like</h3>
              <span class="text-sm text-muted">From the local places fixture</span>
            </div>
            <ul class="grid grid-cols-1 gap-3 md:grid-cols-2">
              {#each candidates as place (place.id)}
                <li class="rounded-2xl bg-bone-100 p-5">
                  <div class="flex items-baseline justify-between gap-2">
                    <p class="text-[15px] font-semibold text-ink">{place.name}</p>
                    <span class="text-sm text-muted">{'★'.repeat(Math.round(place.rating))}</span>
                  </div>
                  <p class="mt-1 text-xs text-muted">{place.kind} · {place.address}</p>
                  <p class="mt-3 text-[15px] text-ink-2">{place.note}</p>
                  {#if place.tags?.length}
                    <div class="mt-3 flex flex-wrap gap-1">
                      {#each place.tags as t (t)}
                        <span class="rounded-pill bg-bone-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{t}</span>
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
</RegisterSection>
