<template>
  <hr class="rdr-divider" :class="{ 'rdr-divider--thick': thick }" />
</template>

<script setup>
defineProps({
  thick: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.rdr-divider {
  border: var(--rdr-border-width) solid var(--rdr-color-primary);
  width: 100%;
  margin: var(--rdr-spacing-md) 0;
}

.rdr-divider--thick {
  border-width: calc(var(--rdr-border-width) * 2);
}
</style>
