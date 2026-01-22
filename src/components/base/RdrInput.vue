<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    class="rdr-input"
    @input="$emit('update:modelValue', $event.target.value)"
  />
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
.rdr-input {
  background: var(--rdr-color-background);
  font-family: var(--rdr-font-body);
  font-size: var(--rdr-font-size-xs);
  padding: var(--rdr-spacing-sm) var(--rdr-spacing-md);
  border: none;
  width: 100%;
  color: var(--rdr-color-text);
  transition: all var(--rdr-transition-fast);
}

.rdr-input::placeholder {
  color: var(--rdr-color-text-muted);
}

.rdr-input:focus {
  background: rgba(33, 33, 33, 0.5);
}

.rdr-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
