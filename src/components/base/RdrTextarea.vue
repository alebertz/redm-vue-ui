<template>
  <div class="rdr-textarea__wrap">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      class="rdr-textarea"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
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
.rdr-textarea__wrap {
  position: relative;
  display: block;
  width: 100%;
  isolation: isolate;
  border-radius: 0;
}

.rdr-textarea__wrap::before {
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

.rdr-textarea {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  background: var(--rdr-color-background);
  border: 1px solid transparent;
  border-radius: 0;
  font-family: var(--rdr-font-body);
  font-size: var(--rdr-font-size-xs);
  padding: var(--rdr-spacing-sm);
  resize: none;
  width: 100%;
  display: block;
  color: var(--rdr-color-text);
  transition: all var(--rdr-transition-fast);
}

.rdr-textarea::placeholder {
  color: var(--rdr-color-text-muted);
}

.rdr-textarea:focus {
  background: rgba(33, 33, 33, 0.5);
  outline: none;
}

.rdr-textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
