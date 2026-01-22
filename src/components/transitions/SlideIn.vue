<template>
  <Transition name="slide-in">
    <slot></slot>
  </Transition>
</template>

<script setup>
defineProps({
  duration: {
    type: Number,
    default: 300
  },
  direction: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  distance: {
    type: Number,
    default: 200
  }
})
</script>

<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform v-bind(duration + 'ms') ease-out;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: v-bind('direction === "bottom" ? `translateY(${distance}px)` : direction === "top" ? `translateY(-${distance}px)` : direction === "right" ? `translateX(${distance}px)` : `translateX(-${distance}px)`');
}

.slide-in-enter-to,
.slide-in-leave-from {
  transform: translate(0, 0);
}
</style>
