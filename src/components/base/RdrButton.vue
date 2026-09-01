<template>
  <button 
    class="rdr-button" 
    :class="[
      `rdr-button--${variant}`,
      `rdr-button--size-${size}`,
      { 'rdr-button--active': active }
    ]"
    :type="type"
    :disabled="disabled"
  >
    <span v-if="$slots.icon" class="rdr-button__icon">
      <slot name="icon" />
    </span>
    <span class="rdr-button__label"><slot></slot></span>
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
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'subtle'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})
</script>

<style scoped>
/* ---- Fixed layout: icon pinned left, label dead-centered ---- */
.rdr-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: var(--rdr-spacing-xs) 0;
  transition: all var(--rdr-transition-fast);
}

.rdr-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* The icon is pulled out of flow and pinned to the left padding edge.
   `left` is driven by --rdr-button-icon-left, which mirrors the horizontal
   padding of each size (see the size/variant rules below). */
.rdr-button__icon {
  position: absolute;
  left: var(--rdr-button-icon-left, 14px);
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* The label is the only in-flow flex child, so the button's
   justify-content/align-items center it across the full width. */
.rdr-button__label {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
}

/* Size icon slot content off the button font-size, so lucide svg, png,
   and inline svg all render identically and scale with sm/md/lg. */
.rdr-button__icon :deep(img),
.rdr-button__icon :deep(svg) {
  width: 1em;
  height: 1em;
  display: block;
}

/* ---- Default: heavy textured variant (unchanged) ---- */
.rdr-button--default {
  --rdr-button-icon-left: var(--rdr-spacing-lg); /* 25px, mirrors padding */
  background: var(--rdr-texture-box);
  background-size: 100% 100%;
  color: var(--rdr-color-text-muted);
  font-family: var(--rdr-font-decorative);
  font-size: var(--rdr-font-size-lg);
  height: 80px;
  padding: 0 var(--rdr-spacing-lg);
}

.rdr-button--default:hover:not(:disabled) {
  background: var(--rdr-texture-box-red);
  background-size: 100% 100%;
  color: var(--rdr-color-text);
}

.rdr-button--default.rdr-button--active {
  background: var(--rdr-texture-box-red);
  background-size: 100% 100%;
  color: var(--rdr-color-text);
}

/* ---- Subtle: light-weight secondary variant ---- */
.rdr-button--subtle {
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
  background: var(--rdr-color-surface);
  border: 1px solid transparent;
  border-radius: 0;
  color: var(--rdr-color-text);
  font-family: var(--rdr-font-body);
  line-height: 1.2;
  letter-spacing: 0.02em;
  cursor: pointer;
}

.rdr-button--subtle::before {
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

.rdr-button--subtle .rdr-button__icon {
  z-index: 1;
}

.rdr-button--subtle .rdr-button__label {
  position: relative;
  z-index: 1;
}

.rdr-button--subtle:hover:not(:disabled) {
  background: var(--rdr-color-surface-hover);
}

.rdr-button--subtle:active:not(:disabled) {
  background: var(--rdr-color-surface-pressed);
  transform: translateY(1px);
}

.rdr-button--subtle:disabled {
  opacity: 0.4;
}

.rdr-button--subtle.rdr-button--active {
  background: var(--rdr-color-surface-red);
  border-color: var(--rdr-color-primary);
  color: var(--rdr-color-text);
}

/* Sizes (scoped to subtle — the default variant keeps its fixed proportions).
   --rdr-button-icon-left mirrors the horizontal padding of each size. */
.rdr-button--subtle.rdr-button--size-sm {
  --rdr-button-icon-left: 14px;
  font-size: 13px;
  padding: 7px 14px;
}

.rdr-button--subtle.rdr-button--size-md {
  --rdr-button-icon-left: 22px;
  font-size: 15px;
  padding: 12px 22px;
}

.rdr-button--subtle.rdr-button--size-lg {
  --rdr-button-icon-left: 30px;
  font-size: 18px;
  padding: 16px 30px;
}
</style>