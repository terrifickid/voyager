<script>
  import { log, EVENT } from '$lib/logger.js';

  const componentLog = log.child({ component: 'plan', function: 'DatePicker' });

  /** @type {{
   *   label: string,
   *   value: string,
   *   minDate?: Date,
   *   maxDate?: Date,
   *   id?: string,
   *   field?: 'start' | 'end',
   *   onSelect: (iso: string) => void
   * }}
   * `minDate` / `maxDate` are accepted but ignored — demo mockup shows the current month only. */
  let {
    label,
    value,
    minDate = undefined,
    maxDate = undefined,
    id = undefined,
    field = undefined,
    onSelect,
  } = $props();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function toIso(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function parseIso(iso) {
    if (!iso) return null;
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function sameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  const cells = $derived.by(() => {
    const viewYear = today.getFullYear();
    const viewMonth = today.getMonth();
    const first = new Date(viewYear, viewMonth, 1);
    const leading = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const total = leading + daysInMonth;
    const rows = Math.ceil(total / 7);
    const cellsNeeded = Math.max(rows * 7, 42);
    const out = [];
    for (let i = 0; i < cellsNeeded; i++) {
      const dayNum = i - leading + 1;
      const d = new Date(viewYear, viewMonth, dayNum);
      out.push({ date: d, inMonth: dayNum >= 1 && dayNum <= daysInMonth });
    }
    return out;
  });

  function isSelected(d) {
    const v = parseIso(value);
    return !!v && sameDay(d, v);
  }

  function isToday(d) {
    return sameDay(d, today);
  }

  function handleClick(d) {
    const iso = toIso(d);
    const prev = value;
    componentLog.info(
      {
        type: EVENT.USER_ACTION,
        step: 'datepicker:select',
        field: field ?? null,
        from: prev,
        to: iso
      },
      'Date selected'
    );
    onSelect(iso);
  }
</script>

<div class="flex flex-col gap-3 rounded-2xl bg-bone-50 p-4">
  <span class="text-sm font-medium text-ink">{label}</span>

  <div class="grid grid-cols-7 gap-1 text-center text-xs uppercase text-muted">
    <span>M</span>
    <span>T</span>
    <span>W</span>
    <span>T</span>
    <span>F</span>
    <span>S</span>
    <span>S</span>
  </div>

  <div class="grid grid-cols-7 gap-1" role="grid" aria-label={label}>
    {#each cells as cell (cell.date.toISOString() + (cell.inMonth ? 'm' : 'o'))}
      {@const selected = cell.inMonth && isSelected(cell.date)}
      {@const disabled = !cell.inMonth}
      {@const todayRing = cell.inMonth && isToday(cell.date)}
      <button
        type="button"
        role="gridcell"
        aria-selected={selected}
        aria-disabled={disabled}
        disabled={disabled}
        id={id && selected ? id : undefined}
        onclick={() => handleClick(cell.date)}
        class="aspect-square rounded-full text-sm font-medium transition-colors
               {disabled ? 'text-bone-300 cursor-not-allowed' : 'text-ink hover:bg-bone-200'}
               {selected ? 'bg-ink text-bone-50 hover:bg-ink' : ''}
               {todayRing && !selected ? 'ring-1 ring-ink' : ''}
               {!cell.inMonth ? 'opacity-40' : ''}"
      >
        {cell.date.getDate()}
      </button>
    {/each}
  </div>
</div>
