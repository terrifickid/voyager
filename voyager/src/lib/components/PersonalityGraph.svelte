<script>
  import { user } from '$lib/stores/user.svelte.js';
  import { archetypeOptions, scoringTraits } from '$lib/preferences/config.js';

  const personality = $derived(user.preferences.personality);
  const hasSignal = $derived(
    (user.preferences.form.archetype != null) ||
    (user.preferences.form.tags.length > 0)
  );

  function nearestType(p) {
    let best = null;
    let bestD = Infinity;
    for (const opt of archetypeOptions) {
      let d = 0;
      for (const t of scoringTraits) {
        const dv = (p[t.key] || 0) - (opt.traits[t.key] || 0);
        d += dv * dv;
      }
      if (d < bestD) {
        bestD = d;
        best = opt;
      }
    }
    return best;
  }

  const type = $derived(nearestType(personality));

  const fillStyle = (v) => {
    const pct = Math.abs(v) * 50;
    const left = v >= 0 ? 50 : 50 - pct;
    return `left:${left}%;width:${pct}%;`;
  };
</script>

<section class="flex flex-col gap-3 p-6 rounded-[28px] bg-bone-100">
  <h2 class="eyebrow">
    Personality
  </h2>
  {#if hasSignal && type}
    <p class="text-ink-2">
      Closest type: <strong class="font-semibold text-ink">{type.icon} {type.label}</strong>
    </p>
    <div class="flex flex-col gap-2">
      {#each scoringTraits as t (t.key)}
        <div class="flex items-center gap-3 text-sm">
          <span class="w-40 shrink-0 text-muted">{t.display}</span>
          <span class="relative flex-1 h-3 bg-bone-200 rounded-full overflow-hidden">
            <span class="absolute left-1/2 top-0 bottom-0 w-px" style="background: var(--bone-300);"></span>
            <span
              class="absolute top-0 bottom-0 rounded-full bg-ink"
              style={fillStyle(personality[t.key])}
            ></span>
          </span>
          <span class="w-12 text-right font-mono tabular-nums text-ink-2">
            {personality[t.key].toFixed(2)}
          </span>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-muted">
      Pick an archetype or a few tags — your type appears here in real time.
    </p>
  {/if}
</section>
