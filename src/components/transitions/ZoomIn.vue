<template>
  <Transition name="zoom-in">
    <slot></slot>
  </Transition>
</template>

<script setup>
defineProps({
  duration: {
    type: Number,
    default: 300
  }
})
</script>

<style scoped>
.zoom-in-enter-active,
.zoom-in-leave-active {
  transition: all v-bind(duration + 'ms') ease-out;
}

.zoom-in-enter-from,
.zoom-in-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.zoom-in-enter-to,
.zoom-in-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
