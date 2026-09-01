<template>
  <hr class="rdr-divider" :style="dividerStyle" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  opacity: {
    type: Number,
    default: null,
    validator: (v) => v >= 0 && v <= 1
  }
})

const dividerStyle = computed(() => {
  if (props.opacity === null || props.opacity === undefined) return {}
  return { opacity: props.opacity }
})
</script>

<style scoped>
.rdr-divider {
  border: none;
  height: 2px;
  background: var(--rdr-texture-divider);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  margin: var(--rdr-spacing-md) 0;
  opacity: var(--rdr-divider-opacity);
}
</style>
