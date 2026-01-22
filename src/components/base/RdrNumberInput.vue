<template>
  <div class="rdr-number-input">
    <button 
      class="rdr-number-input__button"
      @mousedown="startDecrement"
      @mouseup="stopChange"
      @mouseleave="stopChange"
      @touchstart="startDecrement"
      @touchend="stopChange"
      :disabled="modelValue <= min"
    >
      <img src="../../assets/textures/arrow_left.png" alt="Decrease">
    </button>
    
    <input
      type="text"
      :value="displayValue"
      @input="handleInput"
      @blur="handleBlur"
      class="rdr-number-input__field"
      :placeholder="placeholder"
    />
    
    <button 
      class="rdr-number-input__button"
      @mousedown="startIncrement"
      @mouseup="stopChange"
      @mouseleave="stopChange"
      @touchstart="startIncrement"
      @touchend="stopChange"
      :disabled="modelValue >= max"
    >
      <img src="../../assets/textures/arrow_right.png" alt="Increase">
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: -Infinity
  },
  max: {
    type: Number,
    default: Infinity
  },
  step: {
    type: Number,
    default: 1
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const displayValue = computed(() => props.modelValue)

let changeInterval = null
let changeTimeout = null
let currentDelay = 500

function handleInput(event) {
  const value = parseFloat(event.target.value)
  if (!isNaN(value)) {
    updateValue(value)
  }
}

function handleBlur() {
  // Ensure value is within bounds on blur
  if (props.modelValue < props.min) {
    emit('update:modelValue', props.min)
  } else if (props.modelValue > props.max) {
    emit('update:modelValue', props.max)
  }
}

function updateValue(value) {
  // Clamp value between min and max
  const clampedValue = Math.max(props.min, Math.min(props.max, value))
  // Round to nearest step
  const steppedValue = Math.round(clampedValue / props.step) * props.step
  emit('update:modelValue', steppedValue)
}

function increment() {
  const newValue = Math.min(props.modelValue + props.step, props.max)
  emit('update:modelValue', newValue)
}

function decrement() {
  const newValue = Math.max(props.modelValue - props.step, props.min)
  emit('update:modelValue', newValue)
}

function startIncrement() {
  increment()
  currentDelay = 500
  
  changeTimeout = setTimeout(() => {
    changeInterval = setInterval(() => {
      increment()
      // Accelerate: reduce delay progressively
      if (currentDelay > 50) {
        currentDelay -= 50
        clearInterval(changeInterval)
        changeInterval = setInterval(() => {
          increment()
        }, currentDelay)
      }
    }, currentDelay)
  }, 300) // Initial delay before continuous change
}

function startDecrement() {
  decrement()
  currentDelay = 500
  
  changeTimeout = setTimeout(() => {
    changeInterval = setInterval(() => {
      decrement()
      // Accelerate: reduce delay progressively
      if (currentDelay > 50) {
        currentDelay -= 50
        clearInterval(changeInterval)
        changeInterval = setInterval(() => {
          decrement()
        }, currentDelay)
      }
    }, currentDelay)
  }, 300) // Initial delay before continuous change
}

function stopChange() {
  if (changeTimeout) {
    clearTimeout(changeTimeout)
    changeTimeout = null
  }
  if (changeInterval) {
    clearInterval(changeInterval)
    changeInterval = null
  }
  currentDelay = 500
}
</script>

<style scoped>
.rdr-number-input {
  display: flex;
  align-items: stretch;
  gap: var(--rdr-spacing-xs);
  width: 100%;
}

.rdr-number-input__field {
  flex: 1;
  background: var(--rdr-color-background);
  font-family: var(--rdr-font-body);
  font-size: var(--rdr-font-size-md);
  padding: var(--rdr-spacing-sm) var(--rdr-spacing-md);
  border: none;
  color: var(--rdr-color-text);
  text-align: center;
  transition: all var(--rdr-transition-fast);
}

.rdr-number-input__field::placeholder {
  color: var(--rdr-color-text-muted);
}

.rdr-number-input__field:focus {
  background: rgba(33, 33, 33, 0.5);
}

.rdr-number-input__button {
  background: none;
  width: 40px;
  transition: all var(--rdr-transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  padding: 8px;
}

.rdr-number-input__button img {
  width: 100%;
  height: 100%;
  opacity: 0.7;
  transition: all var(--rdr-transition-fast);
}

.rdr-number-input__button:hover:not(:disabled) img {
  opacity: 1;
  transform: scale(1.1);
}

.rdr-number-input__button:active:not(:disabled) {
  transform: scale(0.95);
}

.rdr-number-input__button:disabled img {
  opacity: 0.3;
}
</style>
