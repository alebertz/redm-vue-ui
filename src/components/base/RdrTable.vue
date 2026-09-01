<template>
  <table
    ref="tableRef"
    class="rdr-table"
    :class="tableClasses"
    @click="onHeaderClick"
  >
    <slot />
  </table>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUpdated, nextTick } from 'vue'

const props = defineProps({
  density: {
    type: String,
    default: 'default',
    validator: (value) => ['compact', 'default', 'relaxed'].includes(value)
  },
  footer: {
    type: Boolean,
    default: false
  },
  sortable: {
    type: Boolean,
    default: false
  },
  sortBy: {
    type: String,
    default: ''
  },
  sortDir: {
    type: String,
    default: 'asc',
    validator: (value) => ['asc', 'desc'].includes(value)
  }
})

const emit = defineEmits(['update:sortBy', 'update:sortDir', 'sort'])

const tableClasses = computed(() => ({
  [`rdr-table--${props.density}`]: true,
  'rdr-table--footer': props.footer,
  'rdr-table--sortable': props.sortable
}))

const tableRef = ref(null)

function onHeaderClick(event) {
  if (!props.sortable) return
  const target = event.target
  if (!(target instanceof HTMLElement)) return
  const th = target.closest('th[data-sort-key]')
  if (!th) return
  // ensure the th belongs to this table
  if (tableRef.value && !tableRef.value.contains(th)) return
  const key = th.getAttribute('data-sort-key')
  if (!key) return
  let nextDir = 'asc'
  if (key === props.sortBy) {
    nextDir = props.sortDir === 'asc' ? 'desc' : 'asc'
  }
  emit('update:sortBy', key)
  emit('update:sortDir', nextDir)
  emit('sort', { key, dir: nextDir })
}

function syncSortIndicators() {
  if (!tableRef.value) return
  const ths = tableRef.value.querySelectorAll('th[data-sort-key]')
  ths.forEach((th) => {
    const key = th.getAttribute('data-sort-key')
    if (props.sortable && key && key === props.sortBy) {
      th.setAttribute('data-sort-active', 'true')
      th.setAttribute('data-sort-dir', props.sortDir)
      th.setAttribute('aria-sort', props.sortDir === 'asc' ? 'ascending' : 'descending')
    } else {
      th.removeAttribute('data-sort-active')
      th.removeAttribute('data-sort-dir')
      th.removeAttribute('aria-sort')
    }
  })
}

onMounted(() => {
  nextTick(syncSortIndicators)
})

onUpdated(() => {
  syncSortIndicators()
})

watch(() => props.sortBy, syncSortIndicators)
watch(() => props.sortDir, syncSortIndicators)
watch(() => props.sortable, () => nextTick(syncSortIndicators))
</script>

<style scoped>
.rdr-table {
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  width: 100%;

  /* Outer frame — same crafting-outline 9-slice as RdrInput.
     `border-collapse: separate` is required: border-image does not render on
      a table with `border-collapse: collapse`. */
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid transparent;
  border-radius: 0;
  padding: 6px;

  background: transparent;
  color: var(--rdr-color-text);
  font-family: var(--rdr-font-body);
  font-size: var(--rdr-font-size-xs);
}

.rdr-table::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  border-image: var(--rdr-border-image);
  opacity: var(--rdr-border-image-opacity);
  pointer-events: none;
  z-index: 0;
  border-radius: 0;
}

/* Ensure table content paints above the faded frame */
.rdr-table :deep(thead),
.rdr-table :deep(tbody),
.rdr-table :deep(tfoot),
.rdr-table :deep(tr),
.rdr-table :deep(th),
.rdr-table :deep(td) {
  position: relative;
  z-index: 1;
}

/* ---- Internal: plain borders (user will refine by hand) ---- */
.rdr-table :deep(th),
.rdr-table :deep(td) {
  background: transparent;
  vertical-align: middle;
  text-align: left;
  color: var(--rdr-color-text);
  border: none;
  border-right: 1px solid var(--rdr-color-border);
}

.rdr-table :deep(th:last-child),
.rdr-table :deep(td:last-child) {
  border-right: none;
}

.rdr-table :deep(thead th) {
  border-bottom: 1px solid var(--rdr-color-border);
}

/* Header band — darker opaque surface, title face, tracked-out caps. */
.rdr-table :deep(thead th) {
  background: var(--rdr-color-surface-header);
  font-family: var(--rdr-font-title);
  font-size: var(--rdr-font-size-sm);
  font-weight: normal;
  letter-spacing: 1px;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Optional footer band — mirrors the header for totals / summaries. */
.rdr-table--footer :deep(tfoot),
.rdr-table--footer :deep(tfoot th),
.rdr-table--footer :deep(tfoot td) {
  background: var(--rdr-color-surface-header);
  font-family: var(--rdr-font-title);
}

/* Density — controls cell padding only; the frame clearance is fixed. */
.rdr-table--compact :deep(th),
.rdr-table--compact :deep(td) {
  padding: var(--rdr-spacing-sm) var(--rdr-spacing-md);
}

.rdr-table--default :deep(th),
.rdr-table--default :deep(td) {
  padding: var(--rdr-spacing-md) var(--rdr-spacing-lg);
}

.rdr-table--relaxed :deep(th),
.rdr-table--relaxed :deep(td) {
  padding: var(--rdr-spacing-lg) var(--rdr-spacing-xl);
}

/* ---- Hover: subtle row highlight for tbody only ---- */
.rdr-table :deep(tbody td) {
  transition: background var(--rdr-transition-fast);
}

.rdr-table :deep(tbody tr:hover td) {
  background: rgba(255, 255, 255, 0.04);
}

/* Ensure the row itself also transitions if it has a background */
.rdr-table :deep(tbody tr) {
  transition: background var(--rdr-transition-fast);
}

/* ---- Sortable headers (opt-in) ---- */
.rdr-table--sortable :deep(thead th[data-sort-key]) {
  cursor: pointer;
  position: relative;
  padding-right: 1.8em;
  user-select: none;
  transition: background var(--rdr-transition-fast), color var(--rdr-transition-fast);
}

.rdr-table--sortable :deep(thead th[data-sort-key]:hover) {
  background: #1e1e1e;
  color: var(--rdr-color-text);
}

.rdr-table--sortable :deep(thead th[data-sort-key]:active) {
  background: #232323;
}

/* Sort indicator via ::after */
.rdr-table--sortable :deep(thead th[data-sort-key])::after {
  content: "▲";
  position: absolute;
  right: 0.65em;
  top: 50%;
  transform: translateY(-50%) scaleY(0.85);
  font-size: 0.68em;
  line-height: 1;
  opacity: 0.22;
  transition: opacity var(--rdr-transition-fast), transform var(--rdr-transition-fast), color var(--rdr-transition-fast);
  pointer-events: none;
  letter-spacing: 0;
}

.rdr-table--sortable :deep(thead th[data-sort-key]:hover)::after {
  opacity: 0.5;
}

/* Active state: brighter and direction-aware */
.rdr-table--sortable :deep(thead th[data-sort-key][data-sort-active])::after {
  opacity: 0.92;
}

.rdr-table--sortable :deep(thead th[data-sort-key][data-sort-dir="asc"])::after {
  content: "▲";
}

.rdr-table--sortable :deep(thead th[data-sort-key][data-sort-dir="desc"])::after {
  content: "▼";
}

.rdr-table--sortable :deep(thead th[data-sort-key][data-sort-active]:hover)::after {
  opacity: 1;
}
</style>
