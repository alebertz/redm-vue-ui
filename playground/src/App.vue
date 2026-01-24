<script setup>
import { ref } from 'vue'
import { useRdrTheme } from '../../src/composables/useRdrTheme'

const { theme } = useRdrTheme()

// Component states
const inputValue = ref('')
const textareaValue = ref('')
const modalOpen = ref(false)
const sliderOpen = ref(false)
const testBoxVisible = ref(false)
const sliderValue = ref(50)
const numberValue = ref(10)
const checkboxValue = ref(false)
const checkbox2Value = ref(true)
const checkbox3Value = ref(false)

const demoNotes = [
  { id: 1, author: 'Dr. John Smith', date: '2026-01-20', content: 'Patient showing signs of improvement. Continue treatment.' },
  { id: 2, author: 'Dr. Sarah Johnson', date: '2026-01-21', content: 'Prescribed medication for pain relief. Follow-up in 3 days.' },
]
</script>

<template>
  <div class="playground">
    <div class="playground__header">
      <RdrHeader :level="1">RedM Vue UI Playground</RdrHeader>
      <p style="margin-top: 20px; font-size: 18px;">
        Component library demo with RedM/RDR2 styling
      </p>
    </div>

    <div class="playground__grid">
      <!-- Buttons Section -->
      <div class="section">
        <RdrHeader :level="2">Buttons</RdrHeader>
        <div style="margin-top: 20px;">
          <RdrButton>Default Button</RdrButton>
          <RdrButton :active="true">Active Button</RdrButton>
          <RdrButton :disabled="true">Disabled Button</RdrButton>
        </div>
      </div>

      <!-- Inputs Section -->
      <div class="section">
        <RdrHeader :level="2">Input Fields</RdrHeader>
        <div style="margin-top: 20px;">
          <RdrInput 
            v-model="inputValue" 
            placeholder="Enter text here..."
          />
          <p style="margin-top: 10px;">Value: {{ inputValue || 'empty' }}</p>
        </div>
      </div>

      <!-- Textarea Section -->
      <div class="section">
        <RdrHeader :level="2">Textarea</RdrHeader>
        <div style="margin-top: 20px;">
          <RdrTextarea 
            v-model="textareaValue" 
            placeholder="Enter long text here..."
            :rows="4"
          />
        </div>
      </div>

      <!-- Slider Input Section -->
      <div class="section">
        <RdrHeader :level="2">Slider Input</RdrHeader>
        <div style="margin-top: 20px;">
          <RdrSliderInput 
            v-model="sliderValue" 
            :min="0"
            :max="100"
            :step="5"
            :showArrows="true"
          />
          <p style="margin-top: 10px;">Current value: {{ sliderValue }}</p>
        </div>
      </div>

      <!-- Number Input Section -->
      <div class="section">
        <RdrHeader :level="2">Number Input</RdrHeader>
        <div style="margin-top: 20px;">
          <RdrNumberInput 
            v-model="numberValue" 
            :min="0"
            :max="100"
            :step="1"
            placeholder="Enter number"
          />
          <p style="margin-top: 10px;">Current value: {{ numberValue }}</p>
          <RdrNumberInput 
            v-model="numberValue" 
            :min="-50"
            :max="50"
            :step="5"
            placeholder="Step of 5"
            style="margin-top: 15px;"
          />
        </div>
      </div>

      <!-- Checkbox Section -->
      <div class="section">
        <RdrHeader :level="2">Checkboxes</RdrHeader>
        <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 15px;">
          <RdrCheckbox v-model="checkboxValue">
            Accept terms and conditions
          </RdrCheckbox>
          <RdrCheckbox v-model="checkbox2Value">
            Enable notifications
          </RdrCheckbox>
          <RdrCheckbox v-model="checkbox3Value" disabled>
            Disabled checkbox
          </RdrCheckbox>
          <p style="margin-top: 10px; opacity: 0.8;">
            Values: {{ checkboxValue }}, {{ checkbox2Value }}, {{ checkbox3Value }}
          </p>
        </div>
      </div>

      <!-- Cards Section -->
      <div class="section">
        <RdrHeader :level="2">Cards</RdrHeader>
        <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 15px;">
          <RdrCard padding="md">
            <h3>Card with Medium Padding</h3>
            <p style="margin-top: 10px;">This is a card component with textured background.</p>
          </RdrCard>
          <RdrCard padding="lg">
            <h3>Card with Large Padding</h3>
            <p style="margin-top: 10px;">Cards can have different padding sizes.</p>
          </RdrCard>
        </div>
      </div>

      <!-- Divider Section -->
      <div class="section">
        <RdrHeader :level="2">Dividers</RdrHeader>
        <div style="margin-top: 20px;">
          <p>Text before divider</p>
          <RdrDivider />
          <p>Text after normal divider</p>
          <RdrDivider :thick="true" />
          <p>Text after thick divider</p>
        </div>
      </div>

      <!-- Panel Section -->
      <div class="section">
        <RdrHeader :level="2">Panel</RdrHeader>
        <div style="margin-top: 20px; height: 300px;">
          <RdrPanel padding="lg">
            <RdrHeader :level="3">Panel Content</RdrHeader>
            <p style="margin-top: 15px;">
              This is a panel with background texture. Panels are great for larger content areas.
            </p>
            <RdrButton>Action Button</RdrButton>
          </RdrPanel>
        </div>
      </div>

      <!-- Modal Section -->
      <div class="section">
        <RdrHeader :level="2">Modal</RdrHeader>
        <div style="margin-top: 20px;">
          <RdrButton @click="modalOpen = true">Open Modal</RdrButton>
          
          <RdrModal v-model="modalOpen" width="60%" height="60%">
            <RdrHeader :level="2">Modal Title</RdrHeader>
            <p style="margin-top: 20px;">
              This is a modal dialog with zoom animation and textured background.
            </p>
            <RdrButton @click="modalOpen = false" style="margin-top: 30px;">
              Close Modal
            </RdrButton>
          </RdrModal>
        </div>
      </div>

      <!-- Slider Section -->
      <div class="section">
        <RdrHeader :level="2">Slider Panel</RdrHeader>
        <div style="margin-top: 20px;">
          <RdrButton @click="sliderOpen = !sliderOpen">
            {{ sliderOpen ? 'Close' : 'Open' }} Slider
          </RdrButton>
          
          <div style="position: relative; height: 400px; margin-top: 20px; border: 1px dashed var(--rdr-color-primary);">
            <RdrSlider v-model="sliderOpen" width="300px">
              <RdrHeader :level="3">Slider Content</RdrHeader>
              <p style="margin-top: 20px;">
                This is a side panel slider that slides in from the right.
              </p>
              <RdrDivider />
              <p>You can put any content here!</p>
            </RdrSlider>
          </div>
        </div>
      </div>

      <!-- Transitions Section -->
      <div class="section">
        <RdrHeader :level="2">Transitions</RdrHeader>
        <div style="margin-top: 20px;">
          <RdrButton @click="testBoxVisible = !testBoxVisible">
            Test Zoom-In (Simple Box)
          </RdrButton>
          
          <div style="position: relative; min-height: 200px; margin-top: 20px; display: flex; align-items: center; justify-content: center;">
            <Transition name="zoom-in">
              <div v-if="testBoxVisible" style="background: var(--rdr-texture-box); background-size: 100% 100%; padding: 40px; color: var(--rdr-color-text);">
                <h3>Zoom-In Test Box</h3>
                <p style="margin-top: 10px;">If you see this smoothly zoom in/out, the transition works!</p>
              </div>
            </Transition>
          </div>
          
          <RdrButton @click="modalOpen = true" style="margin-top: 10px;">
            Demo Modal (Zoom Transition)
          </RdrButton>
          <p style="margin-top: 15px; opacity: 0.8;">
            Modal uses ZoomIn transition, Slider uses SlideIn transition
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Test zoom animation */
.zoom-in-enter-active,
.zoom-in-leave-active {
  transition: all 0.15s ease-out;
}

.zoom-in-enter-from,
.zoom-in-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

body {
  background: #1a1a1a;
  margin: 0;
  padding: 0;
}

.playground {
  min-height: 100vh;
  padding: 50px;
  max-width: 1400px;
  margin: 0 auto;
}

.playground__header {
  margin-bottom: 50px;
}

.playground__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
}

.section {
  background: rgba(33, 33, 33, 0.3);
  padding: 30px;
  border-radius: 5px;
}
</style>
