<template>
  <label class="rdr-checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="rdr-checkbox__input"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="rdr-checkbox__box">
      <img 
        v-if="modelValue" 
        src="../../assets/textures/tick.png" 
        alt="check" 
        class="rdr-checkbox__tick"
      />
    </span>
    <span v-if="$slots.default" class="rdr-checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.rdr-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--rdr-spacing-sm);
  cursor: pointer;
  user-select: none;
}

.rdr-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.rdr-checkbox__box {
  position: relative;
  width: 24px;
  height: 24px;
  border: 2px solid var(--rdr-color-text);
  background: transparent;
  transition: all var(--rdr-transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rdr-checkbox__tick {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.rdr-checkbox__label {
  color: var(--rdr-color-text);
  font-family: var(--rdr-font-body);
  font-size: var(--rdr-font-size-xs);
}

.rdr-checkbox:hover .rdr-checkbox__box {
  border-color: var(--rdr-color-primary);
}

.rdr-checkbox__input:disabled ~ .rdr-checkbox__box {
  opacity: 0.5;
  cursor: not-allowed;
}

.rdr-checkbox__input:disabled ~ .rdr-checkbox__label {
  opacity: 0.5;
  cursor: not-allowed;
}

.rdr-checkbox:has(.rdr-checkbox__input:disabled) {
  cursor: not-allowed;
}
</style>
