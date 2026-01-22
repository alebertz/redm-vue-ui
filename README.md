# RedM Vue UI

A Vue 3 UI Component Library inspired by Red Dead Redemption styling for RedM NUI interfaces.

## 📦 Installation

```bash
npm install @alebtz/redm-vue-ui
```

## 🚀 Quick Start

```js
import { createApp } from 'vue'
import RedmVueUI from '@alebtz/redm-vue-ui'
import '@alebtz/redm-vue-ui/style.css'

const app = createApp(App)
app.use(RedmVueUI)
app.mount('#app')
```

### Or import components individually

```js
import { RdrButton, RdrCard, RdrInput } from '@alebtz/redm-vue-ui'
import '@alebtz/redm-vue-ui/style.css'
```

## 📚 Components

### Base Components
- **RdrButton** - Styled button with RDR textures
- **RdrInput** - Text input field
- **RdrTextarea** - Multi-line text area
- **RdrCard** - Content card with vintage styling
- **RdrHeader** - Header with decorative red divider
- **RdrDivider** - Horizontal separator
- **RdrSlider** - Range slider control

### Layout Components
- **RdrPanel** - Main panel with background texture
- **RdrModal** - Centered modal with backdrop
- **RdrScrollArea** - Scrollable area with custom scrollbar

### Transitions
- **RdrZoomTransition** - Zoom and fade animation
- **RdrSlideTransition** - Slide from bottom animation
- **RdrFadeTransition** - Simple fade animation

### Composables
- **useRdrTheme** - Access theme colors and variables
- **useRdrAnimations** - Animation utilities

## 🎨 Customization

The library uses CSS custom properties for easy theming:

```css
:root {
  --rdr-color-primary: #B62A2A;
  --rdr-color-text: #fafafa;
  --rdr-color-overlay: rgba(33, 33, 33, 0.3);
  --rdr-font-title: 'Chinese Rocks', serif;
  --rdr-font-heading: 'RDR Lino Regular', serif;
  --rdr-font-body: 'Hapna Slab Serif', serif;
}
```

## 📖 Usage Examples

### Button
```vue
<RdrButton @click="handleClick">
  Click Me
</RdrButton>
```

### Card with Header
```vue
<RdrCard>
  <RdrHeader>Patient Details</RdrHeader>
  <p>Card content here...</p>
</RdrCard>
```

### Modal
```vue
<RdrModal v-model="isOpen">
  <RdrHeader>Confirmation</RdrHeader>
  <p>Are you sure?</p>
  <RdrButton @click="isOpen = false">Close</RdrButton>
</RdrModal>
```

### Input
```vue
<RdrInput 
  v-model="text" 
  placeholder="Enter text..."
/>
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Build in watch mode
npm run build:watch
```

## 📄 License

MIT License - feel free to use in your RedM projects!