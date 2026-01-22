<template>
  <Transition name="fade-in">
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
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity v-bind(duration + 'ms') ease-out;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}

.fade-in-enter-to,
.fade-in-leave-from {
  opacity: 1;
}
</style>
