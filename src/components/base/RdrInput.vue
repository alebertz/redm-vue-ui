<template>
  <div class="rdr-input__wrap">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="rdr-input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.rdr-input__wrap {
  position: relative;
  display: block;
  width: 100%;
  isolation: isolate;
  border-radius: 0;
}

.rdr-input__wrap::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  border-image: var(--rdr-border-image);
  opacity: var(--rdr-border-image-opacity);
  pointer-events: none;
  z-index: 0;
  border-radius: 0;
}

.rdr-input {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  background: var(--rdr-color-background);
  border: 1px solid transparent;
  border-radius: 0;
  font-family: var(--rdr-font-body);
  font-size: var(--rdr-font-size-xs);
  padding: var(--rdr-spacing-sm) var(--rdr-spacing-md);
  width: 100%;
  display: block;
  color: var(--rdr-color-text);
  transition: all var(--rdr-transition-fast);
}

.rdr-input::placeholder {
  color: var(--rdr-color-text-muted);
}

.rdr-input:focus {
  background: rgba(33, 33, 33, 0.5);
  outline: none;
}

.rdr-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
