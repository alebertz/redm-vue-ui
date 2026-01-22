<template>
  <div class="rdr-card" :class="cardClasses">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  scrollable: {
    type: Boolean,
    default: false
  }
})

const cardClasses = computed(() => ({
  [`rdr-card--padding-${props.padding}`]: true,
  'rdr-card--scrollable': props.scrollable
}))
</script>

<style scoped>
.rdr-card {
  background: var(--rdr-texture-box);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.rdr-card--padding-none {
  padding: 0;
}

.rdr-card--padding-sm {
  padding: var(--rdr-spacing-sm);
}

.rdr-card--padding-md {
  padding: var(--rdr-spacing-lg);
}

.rdr-card--padding-lg {
  padding: var(--rdr-spacing-xl);
}

.rdr-card--padding-xl {
  padding: calc(var(--rdr-spacing-xl) * 1.5);
}

.rdr-card--scrollable {
  overflow-y: auto;
}
</style>
