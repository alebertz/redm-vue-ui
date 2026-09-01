<template>
  <div
    ref="rootRef"
    class="rdr-dropdown"
    :class="{
      'rdr-dropdown--open': isOpen,
      'rdr-dropdown--disabled': disabled
    }"
  >
    <label v-if="label" class="rdr-dropdown__label">{{ label }}</label>

    <div class="rdr-dropdown__wrap">
      <button
        ref="triggerRef"
        type="button"
        class="rdr-dropdown__trigger"
        :disabled="disabled"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        @click="toggle"
        @keydown="onTriggerKeydown"
      >
        <span class="rdr-dropdown__value" :class="{ 'rdr-dropdown__value--placeholder': !selectedLabel }">
          {{ selectedLabel || placeholder }}
        </span>

        <span class="rdr-dropdown__chevron" :class="{ 'rdr-dropdown__chevron--open': isOpen }" aria-hidden="true">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter" />
          </svg>
        </span>
      </button>
    </div>

    <Transition name="rdr-dropdown-panel">
      <div v-if="isOpen" class="rdr-dropdown__panel" role="listbox">
        <ul class="rdr-dropdown__list">
          <li
            v-for="(opt, idx) in normalizedOptions"
            :key="String(opt.value) + idx"
            class="rdr-dropdown__option"
            :class="{
              'rdr-dropdown__option--selected': isSelected(opt),
              'rdr-dropdown__option--disabled': opt.disabled,
              'rdr-dropdown__option--focused': idx === focusedIndex
            }"
            role="option"
            :aria-selected="isSelected(opt)"
            :aria-disabled="opt.disabled"
            @click="selectOption(opt)"
            @mouseenter="focusedIndex = idx"
          >
            <span class="rdr-dropdown__option-label">{{ opt.label }}</span>
          </li>
          <li v-if="normalizedOptions.length === 0" class="rdr-dropdown__option rdr-dropdown__option--empty">
            No options
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Select...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const focusedIndex = ref(-1)
const rootRef = ref(null)
const triggerRef = ref(null)

const normalizedOptions = computed(() => {
  return props.options.map((o) => {
    if (typeof o === 'string' || typeof o === 'number') {
      return { label: String(o), value: o, disabled: false }
    }
    return {
      label: o.label ?? String(o.value ?? ''),
      value: o.value,
      disabled: !!o.disabled
    }
  })
})

const selectedLabel = computed(() => {
  const found = normalizedOptions.value.find((o) => o.value === props.modelValue)
  return found ? found.label : ''
})

function isSelected(opt) {
  return opt.value === props.modelValue
}

function toggle() {
  if (props.disabled) return
  isOpen.value ? close() : open()
}

function open() {
  if (props.disabled) return
  isOpen.value = true
  const selIdx = normalizedOptions.value.findIndex((o) => o.value === props.modelValue)
  focusedIndex.value = selIdx >= 0 ? selIdx : 0
}

function close() {
  isOpen.value = false
  focusedIndex.value = -1
}

function selectOption(opt) {
  if (opt.disabled) return
  emit('update:modelValue', opt.value)
  close()
  nextTick(() => triggerRef.value?.focus())
}

function onClickOutside(e) {
  if (!rootRef.value) return
  if (!rootRef.value.contains(e.target)) close()
}

function onTriggerKeydown(e) {
  if (props.disabled) return

  switch (e.key) {
    case 'Escape':
      if (isOpen.value) {
        e.preventDefault()
        close()
      }
      break
    case 'Enter':
    case ' ':
      e.preventDefault()
      if (!isOpen.value) open()
      else {
        if (focusedIndex.value >= 0) {
          const opt = normalizedOptions.value[focusedIndex.value]
          if (opt && !opt.disabled) selectOption(opt)
        } else close()
      }
      break
    case 'ArrowDown':
      e.preventDefault()
      if (!isOpen.value) open()
      else moveFocus(1)
      break
    case 'ArrowUp':
      e.preventDefault()
      if (!isOpen.value) open()
      else moveFocus(-1)
      break
    case 'Tab':
      close()
      break
  }
}

function moveFocus(dir) {
  if (!normalizedOptions.value.length) return
  let idx = focusedIndex.value
  // skip disabled
  for (let i = 0; i < normalizedOptions.value.length; i++) {
    idx = (idx + dir + normalizedOptions.value.length) % normalizedOptions.value.length
    if (!normalizedOptions.value[idx].disabled) {
      focusedIndex.value = idx
      return
    }
  }
}

watch(isOpen, (open) => {
  if (open) document.addEventListener('click', onClickOutside)
  else document.removeEventListener('click', onClickOutside)
})

onMounted(() => {
  // listener added dynamically on open; also listen Escape globally when mounted
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen.value) close()
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
.rdr-dropdown {
  position: relative;
  width: 100%;
  display: block;
}

.rdr-dropdown__label {
  display: block;
  margin-bottom: 6px;
  font-family: var(--rdr-font-body);
  font-size: var(--rdr-font-size-xs);
  color: var(--rdr-color-text-muted);
  letter-spacing: 0.02em;
  line-height: 1;
}

/* --- Trigger wrap mirrors RdrInput pattern --- */
.rdr-dropdown__wrap {
  position: relative;
  display: block;
  width: 100%;
  isolation: isolate;
  border-radius: 0;
}

.rdr-dropdown__wrap::before {
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

.rdr-dropdown__trigger {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--rdr-spacing-sm);
  width: 100%;
  background: var(--rdr-color-background);
  border: 1px solid transparent;
  border-radius: 0;
  font-family: var(--rdr-font-body);
  font-size: var(--rdr-font-size-xs);
  padding: var(--rdr-spacing-sm) var(--rdr-spacing-md);
  color: var(--rdr-color-text);
  line-height: 1.2;
  text-align: left;
  cursor: pointer;
  transition: all var(--rdr-transition-fast);
  user-select: none;
  min-height: 38px;
}

.rdr-dropdown__trigger:focus {
  outline: none;
  background: rgba(33, 33, 33, 0.5);
}

.rdr-dropdown--open .rdr-dropdown__trigger {
  background: rgba(33, 33, 33, 0.5);
}

.rdr-dropdown__trigger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.rdr-dropdown__value {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rdr-dropdown__value--placeholder {
  color: var(--rdr-color-text-muted);
}

.rdr-dropdown__chevron {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--rdr-color-text-muted);
  transition: transform var(--rdr-transition-fast), color var(--rdr-transition-fast);
  transform-origin: center;
}

.rdr-dropdown--open .rdr-dropdown__chevron {
  color: var(--rdr-color-text);
}

.rdr-dropdown__chevron--open {
  transform: rotate(180deg);
}

/* --- Panel: square, dark gray, plain border --- */
.rdr-dropdown__panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 10;
  background: var(--rdr-color-surface);
  border: 1px solid var(--rdr-color-border);
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  max-height: 220px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--rdr-scrollbar-thumb) transparent;
}

.rdr-dropdown__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.rdr-dropdown__option {
  display: flex;
  align-items: center;
  padding: var(--rdr-spacing-sm) var(--rdr-spacing-md);
  font-family: var(--rdr-font-body);
  font-size: var(--rdr-font-size-xs);
  color: var(--rdr-color-text);
  line-height: 1.2;
  border-bottom: 1px solid var(--rdr-color-border);
  cursor: pointer;
  transition: background var(--rdr-transition-fast), color var(--rdr-transition-fast);
  user-select: none;
  position: relative;
}

.rdr-dropdown__option:last-child {
  border-bottom: none;
}

.rdr-dropdown__option:hover {
  background: rgba(255, 255, 255, 0.06);
}

.rdr-dropdown__option--focused {
  background: rgba(255, 255, 255, 0.06);
}

.rdr-dropdown__option--selected {
  background: rgba(255, 255, 255, 0.08);
  color: var(--rdr-color-text);
}



.rdr-dropdown__option--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.rdr-dropdown__option--empty {
  opacity: 0.6;
  cursor: default;
  pointer-events: none;
  justify-content: center;
}

.rdr-dropdown__option-label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* --- Panel transition --- */
.rdr-dropdown-panel-enter-active,
.rdr-dropdown-panel-leave-active {
  transition: opacity var(--rdr-transition-fast), transform var(--rdr-transition-fast);
}

.rdr-dropdown-panel-enter-from,
.rdr-dropdown-panel-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
