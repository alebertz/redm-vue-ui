<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="rows"
    class="rdr-textarea"
    @input="$emit('update:modelValue', $event.target.value)"
  ></textarea>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 5
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.rdr-textarea {
  background: var(--rdr-color-background);
  font-family: var(--rdr-font-body);
  font-size: var(--rdr-font-size-xs);
  padding: var(--rdr-spacing-sm);
  resize: none;
  border: none;
  width: 100%;
  color: var(--rdr-color-text);
  transition: all var(--rdr-transition-fast);
}

.rdr-textarea::placeholder {
  color: var(--rdr-color-text-muted);
}

.rdr-textarea:focus {
  background: rgba(33, 33, 33, 0.5);
}

.rdr-textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
