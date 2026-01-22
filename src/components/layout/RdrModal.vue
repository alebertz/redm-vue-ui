<template>
  <Teleport to="body">
    <Transition name="zoom-in">
      <div v-if="modelValue" class="rdr-modal-container" @click.self="handleClose">
        <div class="rdr-modal" :style="modalStyle">
          <button 
            v-if="closable" 
            class="rdr-modal__close"
            @click="handleClose"
          >
            <img src="../../assets/textures/cross.png" alt="Close">
          </button>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '50%'
  },
  height: {
    type: String,
    default: '50%'
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const modalStyle = computed(() => ({
  width: props.width,
  height: props.height
}))

function handleClose() {
  if (props.closeOnOverlay) {
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>
/* Zoom animation for modal */
.zoom-in-enter-active,
.zoom-in-leave-active {
  transition: all 0.15s ease-out;
}

.zoom-in-enter-from,
.zoom-in-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.rdr-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.rdr-modal {
  background: var(--rdr-texture-bg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: var(--rdr-spacing-xl);
  position: relative;
}

.rdr-modal__close {
  position: absolute;
  top: var(--rdr-spacing-lg);
  right: 35px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--rdr-transition-fast);
  z-index: 10;
  padding: 8px;
}

.rdr-modal__close img {
  width: 100%;
  height: 100%;
}

.rdr-modal__close:hover {
  transform: scale(1.2);
}
</style>
