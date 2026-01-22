// Styles
import './styles/index.css'

// Base Components
import RdrButton from './components/base/RdrButton.vue'
import RdrInput from './components/base/RdrInput.vue'
import RdrTextarea from './components/base/RdrTextarea.vue'
import RdrCard from './components/base/RdrCard.vue'
import RdrHeader from './components/base/RdrHeader.vue'
import RdrDivider from './components/base/RdrDivider.vue'
import RdrSliderInput from './components/base/RdrSlider.vue'
import RdrNumberInput from './components/base/RdrNumberInput.vue'

// Layout Components
import RdrPanel from './components/layout/RdrPanel.vue'
import RdrModal from './components/layout/RdrModal.vue'
import RdrSlider from './components/layout/RdrSlider.vue'

// Transitions
import FadeIn from './components/transitions/FadeIn.vue'
import ZoomIn from './components/transitions/ZoomIn.vue'
import SlideIn from './components/transitions/SlideIn.vue'

// Composables
export { useRdrTheme } from './composables/useRdrTheme'
export { useRdrAnimations } from './composables/useRdrAnimations'

// Component exports
export {
  // Base
  RdrButton,
  RdrInput,
  RdrTextarea,
  RdrCard,
  RdrHeader,
  RdrDivider,
  RdrSliderInput,
  RdrNumberInput,
  // Layout
  RdrPanel,
  RdrModal,
  RdrSlider,
  // Transitions
  FadeIn,
  ZoomIn,
  SlideIn
}

// Plugin install function
const RedmVueUI = {
  install(app) {
    // Register all components globally
    app.component('RdrButton', RdrButton)
    app.component('RdrInput', RdrInput)
    app.component('RdrTextarea', RdrTextarea)
    app.component('RdrCard', RdrCard)
    app.component('RdrHeader', RdrHeader)
    app.component('RdrDivider', RdrDivider)
    app.component('RdrSliderInput', RdrSliderInput)
    app.component('RdrNumberInput', RdrNumberInput)
    app.component('RdrPanel', RdrPanel)
    app.component('RdrModal', RdrModal)
    app.component('RdrSlider', RdrSlider)
    app.component('FadeIn', FadeIn)
    app.component('ZoomIn', ZoomIn)
    app.component('SlideIn', SlideIn)
  }
}

export default RedmVueUI
