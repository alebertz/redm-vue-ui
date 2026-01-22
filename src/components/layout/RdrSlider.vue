<template>
  <div class="rdr-slider">
    <Transition name="slide-in">
      <div v-if="modelValue" class="rdr-slider__panel" :class="sliderClasses">
        <button 
          v-if="closable" 
          class="rdr-slider__close"
          @click="$emit('update:modelValue', false)"
        >
          <img src="../../assets/textures/cross.png" alt="Close">
        </button>
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  },
  width: {
    type: String,
    default: '500px'
  },
  closable: {
    type: Boolean,
    default: true
  }
})

defineEmits(['update:modelValue'])

const sliderClasses = computed(() => ({
  [`rdr-slider__panel--${props.position}`]: true
}))
</script>

<style scoped>
.rdr-slider {
  position: relative;
}

.rdr-slider__panel {
  position: absolute;
  top: 0;
  width: v-bind(width);
  min-height: 100%;
  background: var(--rdr-texture-bg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: var(--rdr-spacing-xl);
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.rdr-slider__panel--left {
  left: 0;
}

.rdr-slider__panel--right {
  right: 0;
}

.rdr-slider__close {
  position: absolute;
  top: var(--rdr-spacing-lg);
  right: var(--rdr-spacing-lg);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--rdr-transition-fast);
  z-index: 10;
  padding: 8px;
}

.rdr-slider__close img {
  width: 100%;
  height: 100%;
}

.rdr-slider__close:hover {
  transform: scale(1.2);
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform var(--rdr-transition-normal);
}

.rdr-slider__panel--right.slide-in-enter-from,
.rdr-slider__panel--right.slide-in-leave-to {
  transform: translateX(100%);
}

.rdr-slider__panel--left.slide-in-enter-from,
.rdr-slider__panel--left.slide-in-leave-to {
  transform: translateX(-100%);
}
</style>
