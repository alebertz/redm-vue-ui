<template>
  <div class="rdr-slider-input">
    <button 
      v-if="showArrows" 
      class="rdr-slider-input__arrow"
      @click="decrease"
      :disabled="modelValue <= min"
    >
      <img src="../../assets/textures/arrow_left.png" alt="Decrease">
    </button>
    
    <div class="rdr-slider-input__container">
      <div class="rdr-slider-input__tooltip" :class="{ 'visible': showTooltip, 'updating': isUpdating }" :style="tooltipStyle">
        {{ modelValue }}
      </div>
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :style="sliderStyle"
        @input="handleInput"
        @mouseenter="showTooltip = true"
        @mouseleave="handleMouseLeave"
        @mousedown="handleMouseDown"
        class="rdr-slider-input__input"
      />
    </div>
    
    <button 
      v-if="showArrows" 
      class="rdr-slider-input__arrow"
      @click="increase"
      :disabled="modelValue >= max"
    >
      <img src="../../assets/textures/arrow_right.png" alt="Increase">
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  showArrows: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const showTooltip = ref(false)
const isDragging = ref(false)
const isUpdating = ref(false)

const progress = computed(() => {
  const range = props.max - props.min
  if (range === 0) return 0
  const p = ((props.modelValue - props.min) / range) * 100
  return Math.min(100, Math.max(0, p))
})

const sliderStyle = computed(() => ({
  '--rdr-slider-progress': `${progress.value}%`
}))

const tooltipStyle = computed(() => ({
  left: `${progress.value}%`
}))

// Trigger animation when value changes
watch(() => props.modelValue, () => {
  if (showTooltip.value) {
    isUpdating.value = true
    setTimeout(() => {
      isUpdating.value = false
    }, 200)
  }
})

function handleInput(event) {
  showTooltip.value = true
  emit('update:modelValue', parseFloat(event.target.value))
}

function handleMouseDown() {
  isDragging.value = true
  showTooltip.value = true
  
  const handleMouseUp = () => {
    isDragging.value = false
    showTooltip.value = false
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mouseup', handleMouseUp)
}

function handleMouseLeave() {
  if (!isDragging.value) {
    showTooltip.value = false
  }
}

function increase() {
  const newValue = Math.min(props.modelValue + props.step, props.max)
  emit('update:modelValue', newValue)
}

function decrease() {
  const newValue = Math.max(props.modelValue - props.step, props.min)
  emit('update:modelValue', newValue)
}
</script>

<style scoped>
.rdr-slider-input {
  display: flex;
  align-items: center;
  gap: var(--rdr-spacing-sm);
  width: 100%;
}

.rdr-slider-input__arrow {
  background: none;
  color: var(--rdr-color-text-muted);
  width: 40px;
  height: 40px;
  transition: all var(--rdr-transition-fast);
  flex-shrink: 0;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rdr-slider-input__arrow img {
  width: 100%;
  height: 100%;
  opacity: 0.7;
  transition: all var(--rdr-transition-fast);
}

.rdr-slider-input__arrow:hover:not(:disabled) img {
  opacity: 1;
  transform: scale(1.1);
}

.rdr-slider-input__arrow:disabled img {
  opacity: 0.3;
}

.rdr-slider-input__container {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}

.rdr-slider-input__tooltip {
  position: absolute;
  top: -40px;
  transform: translateX(-50%);
  background: transparent;
  color: var(--rdr-color-text);
  padding: 4px 12px;
  padding-bottom: 8px;
  font-family: var(--rdr-font-title);
  font-size: var(--rdr-font-size-md);
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--rdr-transition-fast), transform var(--rdr-transition-fast);
  white-space: nowrap;
  z-index: 10;
  transform: translateX(-50%) translateY(10px);
}

.rdr-slider-input__tooltip.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.rdr-slider-input__tooltip.updating {
  animation: valueChange 0.2s ease-out;
}

@keyframes valueChange {
  0% {
    transform: translateX(-50%) translateY(0) scale(1);
  }
  50% {
    transform: translateX(-50%) translateY(-5px) scale(1.15);
  }
  100% {
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

.rdr-slider-input__input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background: transparent;
  outline: none;
  border-radius: 0;
  position: relative;
  display: block;
}

.rdr-slider-input__input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 36px;
  background-color: transparent;
  background-image: var(--rdr-texture-selector);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  border-radius: 0;
  border: none;
  transition: all var(--rdr-transition-fast);
  margin-top: -14px;
  box-shadow: none;
}

.rdr-slider-input__input::-moz-range-thumb {
  width: 20px;
  height: 36px;
  background-color: transparent;
  background-image: var(--rdr-texture-selector);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  border-radius: 0;
  border: none;
  transition: all var(--rdr-transition-fast);
  box-shadow: none;
}

.rdr-slider-input__input::-webkit-slider-thumb:hover {
  transform: scale(1.08);
  filter: brightness(1.08);
}

.rdr-slider-input__input::-moz-range-thumb:hover {
  transform: scale(1.08);
  filter: brightness(1.08);
}

.rdr-slider-input__input::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 0;
  border: none;
  background: linear-gradient(
    to right,
    #8a8a8a 0%,
    #8a8a8a var(--rdr-slider-progress, 0%),
    rgba(77, 77, 77, 0.35) var(--rdr-slider-progress, 0%),
    rgba(77, 77, 77, 0.35) 100%
  );
}

.rdr-slider-input__input::-moz-range-track {
  height: 8px;
  border-radius: 0;
  border: none;
  background: rgba(77, 77, 77, 0.35);
}

.rdr-slider-input__input::-moz-range-progress {
  height: 8px;
  border-radius: 0;
  border: none;
  background: #8a8a8a;
}
</style>
