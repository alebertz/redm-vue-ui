<script setup>
import { ref, computed } from 'vue'
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

// Table — sortable demo
const sortBy = ref('name')
const sortDir = ref('asc')
const posse = ref([
  { name: 'Arthur Morgan', camp: 'Colter', bounty: 500 },
  { name: 'John Marston', camp: "Beecher's Hope", bounty: 320 },
  { name: 'Dutch van der Linde', camp: 'Horseshoe Overlook', bounty: 850 },
  { name: 'Sadie Adler', camp: 'Saint Denis', bounty: 400 },
  { name: 'Host', camp: 'Rhodes', bounty: 120 },
])

const sortedPosse = computed(() => {
  const dir = sortDir.value === 'asc' ? 1 : -1
  const key = sortBy.value
  return [...posse.value].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
    return String(av).localeCompare(String(bv)) * dir
  })
})

function onTableSort({ key, dir }) {
  // sorting is owned by parent — sortedPosse recomputes from sortBy/sortDir
  // kept for demo logging if needed
}
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

          <RdrHeader :level="3" style="margin-top: 20px;">Subtle (Secondary) Buttons</RdrHeader>
          <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 8px;">
            <RdrButton variant="subtle" size="sm">Subtle Small</RdrButton>
            <RdrButton variant="subtle" size="md">Subtle Medium</RdrButton>
            <RdrButton variant="subtle" size="lg">Subtle Large</RdrButton>
            <RdrButton variant="subtle" size="md" :disabled="true">Subtle Disabled</RdrButton>
          </div>

          <RdrHeader :level="3" style="margin-top: 20px;">Buttons with Icons (<code>#icon</code> slot — pinned left, label centered)</RdrHeader>
          <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 8px;">
            <RdrButton variant="subtle" size="md">
              <template #icon>
                <img src="../../src/assets/textures/arrow_right.png" alt="Continue" />
              </template>
              Continue Recording
            </RdrButton>

            <RdrButton variant="subtle" size="md">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </template>
              Set Up New Character
            </RdrButton>

            <RdrButton variant="subtle" size="md">
              <template #icon>
                <img src="../../src/assets/textures/tick.png" alt="Saved" />
              </template>
              Publish All Pending Updates
            </RdrButton>

            <RdrButton variant="subtle" size="md">No Icon — Dead Centered</RdrButton>
          </div>

          <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 8px;">
            <RdrButton variant="subtle" size="sm">
              <template #icon>
                <img src="../../src/assets/textures/arrow_right.png" alt="Small" />
              </template>
              Small Icon
            </RdrButton>

            <RdrButton variant="subtle" size="lg">
              <template #icon>
                <img src="../../src/assets/textures/tick.png" alt="Large" />
              </template>
              Large Icon
            </RdrButton>
          </div>
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

      <!-- Table Section -->
      <div class="section">
        <RdrHeader :level="2">Table</RdrHeader>

        <!-- Hover demo — default table, rows highlight on hover -->
        <div style="margin-top: 20px;">
          <RdrHeader :level="3">Hover highlight (default)</RdrHeader>
          <p style="opacity: 0.65; font-size: 13px; margin: 6px 0 10px;">Hover any row — subtle <code>rgba(255,255,255,0.04)</code> highlight on <code>tbody tr</code> only. Header &amp; footer unaffected.</p>
          <RdrTable>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Kentucky Bourbon</td><td>Liquor</td><td>24</td><td>$1.80</td></tr>
              <tr><td>Canned Beans</td><td>Provisions</td><td>68</td><td>$0.60</td></tr>
              <tr><td>Premium Cigarettes</td><td>Tobacco</td><td>41</td><td>$0.75</td></tr>
              <tr><td>Horse Reviver</td><td>Medical</td><td>15</td><td>$5.00</td></tr>
              <tr><td>Snake Oil</td><td>Medical</td><td>33</td><td>$1.10</td></tr>
            </tbody>
          </RdrTable>

          <RdrHeader :level="3" style="margin-top: 22px;">Compact + Footer</RdrHeader>
          <RdrTable footer density="compact" style="margin-top: 10px;">
            <thead>
              <tr>
                <th>Settlement</th>
                <th>Wanted</th>
                <th>Bounty</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Rhodes</td><td>Dead or Alive</td><td>$120</td></tr>
              <tr><td>Saint Denis</td><td>Dead or Alive</td><td>$350</td></tr>
              <tr><td>Annesburg</td><td>Alive</td><td>$80</td></tr>
            </tbody>
            <tfoot>
              <tr><td colspan="3">Posters amended by the Bounty Hunter Guild</td></tr>
            </tfoot>
          </RdrTable>

          <!-- Sortable demo — opt-in via props -->
          <RdrHeader :level="3" style="margin-top: 22px;">Sortable (opt-in)</RdrHeader>
          <p style="opacity: 0.65; font-size: 13px; margin: 6px 0 10px;">Headers with <code>data-sort-key</code> become clickable when <code>sortable</code> is true. Click <strong>Name</strong> / <strong>Camp</strong> / <strong>Bounty</strong> to cycle <code>asc → desc</code>. Parent owns sorting.</p>
          <RdrTable
            sortable
            :sortBy="sortBy"
            :sortDir="sortDir"
            @update:sortBy="v => sortBy = v"
            @update:sortDir="v => sortDir = v"
            @sort="onTableSort"
          >
            <thead>
              <tr>
                <th data-sort-key="name">Name</th>
                <th data-sort-key="camp">Camp</th>
                <th data-sort-key="bounty">Bounty</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in sortedPosse" :key="row.name">
                <td>{{ row.name }}</td>
                <td>{{ row.camp }}</td>
                <td>${{ row.bounty }}</td>
              </tr>
            </tbody>
          </RdrTable>
          <p style="margin-top: 8px; opacity: 0.6; font-size: 12px;">Sorted by <strong>{{ sortBy }}</strong> ({{ sortDir }}) — ▲/▼ via ::after, opacity active vs inactive.</p>
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
          <p>Text after divider</p>
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
