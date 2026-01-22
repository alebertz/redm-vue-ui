<template>
  <div class="rdr-panel" :class="panelClasses">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  padding: {
    type: String,
    default: 'xl',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  scrollable: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'red'].includes(value)
  }
})

const panelClasses = computed(() => ({
  [`rdr-panel--padding-${props.padding}`]: true,
  'rdr-panel--scrollable': props.scrollable,
  [`rdr-panel--${props.variant}`]: true
}))
</script>

<style scoped>
.rdr-panel {
  background: var(--rdr-texture-bg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.rdr-panel--red {
  background: var(--rdr-texture-bg-red);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.rdr-panel--padding-none {
  padding: 0;
}

.rdr-panel--padding-sm {
  padding: var(--rdr-spacing-sm);
}

.rdr-panel--padding-md {
  padding: var(--rdr-spacing-lg);
}

.rdr-panel--padding-lg {
  padding: var(--rdr-spacing-xl);
}

.rdr-panel--padding-xl {
  padding: var(--rdr-spacing-xl);
}

.rdr-panel--scrollable {
  overflow-y: auto;
}
</style>
