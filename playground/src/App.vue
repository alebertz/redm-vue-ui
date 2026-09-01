<script setup>
import { ref, computed } from 'vue'
import { useRdrTheme } from '../../src/composables/useRdrTheme'

const { theme } = useRdrTheme()

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

const dropdownBasic = ref('')
const dropdownObject = ref('')
const dropdownPlaceholder = ref('')
const dropdownDisabled = ref('schofield')
const dropdownPreselected = ref('valentine')

const classOptions = ['Gunslinger', 'Bounty Hunter', 'Trader', 'Collector', 'Moonshiner']
const weaponOptions = [
  { label: 'Cattleman Revolver', value: 'cattleman' },
  { label: 'Schofield Revolver', value: 'schofield' },
  { label: 'Volcanic Pistol — Out of Stock', value: 'volcanic', disabled: true },
  { label: 'Lancaster Varmint Rifle', value: 'lancaster' },
  { label: 'Carbine Repeater', value: 'carbine' },
]
const campOptions = [
  { label: 'Horseshoe Overlook', value: 'horseshoe' },
  { label: 'Clemens Point', value: 'clemens' },
  { label: 'Shady Belle', value: 'shady' },
  { label: 'Beaver Hollow', value: 'beaver' },
]
const locationOptions = [
  { label: 'Valentine', value: 'valentine' },
  { label: 'Rhodes', value: 'rhodes' },
  { label: 'Saint Denis', value: 'saintdenis' },
  { label: 'Annesburg', value: 'annesburg' },
  { label: 'Blackwater', value: 'blackwater' },
  { label: 'Strawberry', value: 'strawberry' },
]

const demoNotes = [
  { id: 1, author: 'Dr. John Smith', date: '2026-01-20', content: 'Patient showing signs of improvement. Continue treatment.' },
  { id: 2, author: 'Dr. Sarah Johnson', date: '2026-01-21', content: 'Prescribed medication for pain relief. Follow-up in 3 days.' },
]

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
      <div class="section">
        <RdrHeader :level="2">Buttons</RdrHeader>
        <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 8px;">
          <RdrButton>Default Button</RdrButton>
          <RdrButton variant="subtle" size="sm">Subtle Small</RdrButton>
          <RdrButton variant="subtle" size="md">Subtle Medium</RdrButton>
          <RdrButton variant="subtle" size="lg">Subtle Large</RdrButton>
        </div>
      </div>

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

      <div class="section">
        <RdrHeader :level="2">Dropdown / Select</RdrHeader>

        <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 22px;">
          <div>
            <RdrHeader :level="3">Basic — string options</RdrHeader>
            <RdrDropdown
              v-model="dropdownBasic"
              :options="classOptions"
              label="Role"
              placeholder="Select a role..."
            />
            <p class="value-readout">Value: {{ dropdownBasic || '—' }}</p>
          </div>

          <RdrDivider />

          <div>
            <RdrHeader :level="3">Object options + disabled</RdrHeader>
            <RdrDropdown
              v-model="dropdownObject"
              :options="weaponOptions"
              label="Weapon"
              placeholder="Choose a weapon..."
            />
            <p class="value-readout">Value: {{ dropdownObject || '—' }}</p>
          </div>

          <RdrDivider />

          <div>
            <RdrHeader :level="3">Placeholder</RdrHeader>
            <RdrDropdown
              v-model="dropdownPlaceholder"
              :options="campOptions"
              label="Camp"
              placeholder="Choose a camp..."
            />
            <p class="value-readout">Value: {{ dropdownPlaceholder || '—' }}</p>
          </div>

          <RdrDivider />

          <div>
            <RdrHeader :level="3">Disabled</RdrHeader>
            <RdrDropdown
              v-model="dropdownDisabled"
              :options="weaponOptions"
              label="Disabled armory"
              placeholder="Cannot open"
              disabled
            />
            <p class="value-readout">Value: {{ dropdownDisabled }} (locked)</p>
          </div>

          <RdrDivider />

          <div>
            <RdrHeader :level="3">Preselected value</RdrHeader>
            <RdrDropdown
              v-model="dropdownPreselected"
              :options="locationOptions"
              label="Location"
              placeholder="Select a town..."
            />
            <p class="value-readout">Value: {{ dropdownPreselected }}</p>
          </div>
        </div>
      </div>

      <div class="section">
        <RdrHeader :level="2">Table</RdrHeader>

        <div style="margin-top: 20px;">
          <RdrHeader :level="3">Hover highlight (default)</RdrHeader>
          <div class="table-wrap">
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
          </div>

          <RdrHeader :level="3" style="margin-top: 22px;">Compact + Footer</RdrHeader>
          <div class="table-wrap" style="margin-top: 10px;">
            <RdrTable footer density="compact">
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
          </div>

          <RdrHeader :level="3" style="margin-top: 22px;">Sortable (opt-in)</RdrHeader>
          <div class="table-wrap">
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
          </div>
          <p style="margin-top: 8px; color: var(--rdr-color-text-muted); font-size: 12px;">Sorted by <strong>{{ sortBy }}</strong> ({{ sortDir }}) — ▲/▼ via ::after, opacity active vs inactive.</p>
        </div>
      </div>

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

      <div class="section">
        <RdrHeader :level="2">Dividers</RdrHeader>
        <div style="margin-top: 20px;">
          <p>Text before divider</p>
          <RdrDivider />
          <p>Text after divider</p>
        </div>
      </div>

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
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: 40px;
}

.section {
  background: rgba(33, 33, 33, 0.3);
  padding: 30px;
  border-radius: 5px;
  min-width: 0;
  overflow: hidden;
}

@media (max-width: 480px) {
  .playground {
    padding: 20px;
  }
  .playground__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .section {
    padding: 20px;
  }
}

.table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 0;
  max-width: 100%;
}

.value-readout {
  margin-top: 8px;
  color: var(--rdr-color-text-muted);
  font-size: 12px;
  font-style: italic;
  letter-spacing: 0.02em;
  line-height: 1.4;
}
</style>
