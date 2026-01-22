<template>
  <div class="rdr-header">
    <h1 v-if="level === 1"><slot></slot></h1>
    <h2 v-else-if="level === 2"><slot></slot></h2>
    <h3 v-else-if="level === 3"><slot></slot></h3>
    <hr v-if="divider" />
  </div>
</template>

<script setup>
defineProps({
  level: {
    type: Number,
    default: 1,
    validator: (value) => [1, 2, 3].includes(value)
  },
  divider: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.rdr-header {
  width: fit-content;
}

.rdr-header hr {
  border: var(--rdr-border-width) solid var(--rdr-color-primary);
  margin-top: var(--rdr-spacing-xs);
}

.rdr-header h1 {
  font-size: var(--rdr-font-size-xl);
}

.rdr-header h2 {
  font-size: var(--rdr-font-size-lg);
}

.rdr-header h3 {
  font-size: var(--rdr-font-size-md);
}
</style>
