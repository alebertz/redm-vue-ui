<template>
  <button 
    class="rdr-button" 
    :class="{ 'rdr-button--active': active }"
    :type="type"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.rdr-button {
  background: var(--rdr-texture-box);
  background-size: 100% 100%;
  color: var(--rdr-color-text-muted);
  font-family: var(--rdr-font-decorative);
  font-size: var(--rdr-font-size-lg);
  width: 100%;
  height: 80px;
  margin: var(--rdr-spacing-xs) 0;
  transition: all var(--rdr-transition-fast);
  padding: 0 var(--rdr-spacing-lg);
}

.rdr-button:hover:not(:disabled) {
  background: var(--rdr-texture-box-red);
  background-size: 100% 100%;
  color: var(--rdr-color-text);
}

.rdr-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.rdr-button--active {
  background: var(--rdr-texture-box-red);
  background-size: 100% 100%;
  color: var(--rdr-color-text);
}
</style>
