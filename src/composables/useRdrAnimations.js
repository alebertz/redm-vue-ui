import { ref } from 'vue'

/**
 * Composable for managing RedM animations
 * @returns {Object} Animation utilities
 */
export function useRdrAnimations() {
  const isAnimating = ref(false)

  /**
   * Execute an animation with callback
   * @param {Function} callback - Function to execute during animation
   * @param {Number} duration - Animation duration in ms
   */
  async function animate(callback, duration = 300) {
    isAnimating.value = true
    await callback()
    return new Promise(resolve => {
      setTimeout(() => {
        isAnimating.value = false
        resolve()
      }, duration)
    })
  }

  /**
   * Fade in element
   * @param {HTMLElement} element - DOM element to animate
   * @param {Number} duration - Animation duration in ms
   */
  function fadeIn(element, duration = 300) {
    return new Promise(resolve => {
      element.style.opacity = '0'
      element.style.transition = `opacity ${duration}ms ease-out`
      
      requestAnimationFrame(() => {
        element.style.opacity = '1'
        setTimeout(resolve, duration)
      })
    })
  }

  /**
   * Fade out element
   * @param {HTMLElement} element - DOM element to animate
   * @param {Number} duration - Animation duration in ms
   */
  function fadeOut(element, duration = 300) {
    return new Promise(resolve => {
      element.style.opacity = '1'
      element.style.transition = `opacity ${duration}ms ease-out`
      
      requestAnimationFrame(() => {
        element.style.opacity = '0'
        setTimeout(resolve, duration)
      })
    })
  }

  /**
   * Zoom in element
   * @param {HTMLElement} element - DOM element to animate
   * @param {Number} duration - Animation duration in ms
   */
  function zoomIn(element, duration = 300) {
    return new Promise(resolve => {
      element.style.opacity = '0'
      element.style.transform = 'scale(0.8)'
      element.style.transition = `all ${duration}ms ease-out`
      
      requestAnimationFrame(() => {
        element.style.opacity = '1'
        element.style.transform = 'scale(1)'
        setTimeout(resolve, duration)
      })
    })
  }

  /**
   * Zoom out element
   * @param {HTMLElement} element - DOM element to animate
   * @param {Number} duration - Animation duration in ms
   */
  function zoomOut(element, duration = 300) {
    return new Promise(resolve => {
      element.style.opacity = '1'
      element.style.transform = 'scale(1)'
      element.style.transition = `all ${duration}ms ease-out`
      
      requestAnimationFrame(() => {
        element.style.opacity = '0'
        element.style.transform = 'scale(0.8)'
        setTimeout(resolve, duration)
      })
    })
  }

  /**
   * Slide in element from bottom
   * @param {HTMLElement} element - DOM element to animate
   * @param {Number} duration - Animation duration in ms
   */
  function slideInFromBottom(element, duration = 300) {
    return new Promise(resolve => {
      element.style.transform = 'translateY(200px)'
      element.style.transition = `transform ${duration}ms ease-out`
      
      requestAnimationFrame(() => {
        element.style.transform = 'translateY(0)'
        setTimeout(resolve, duration)
      })
    })
  }

  /**
   * Slide out element to bottom
   * @param {HTMLElement} element - DOM element to animate
   * @param {Number} duration - Animation duration in ms
   */
  function slideOutToBottom(element, duration = 300) {
    return new Promise(resolve => {
      element.style.transform = 'translateY(0)'
      element.style.transition = `transform ${duration}ms ease-out`
      
      requestAnimationFrame(() => {
        element.style.transform = 'translateY(200px)'
        setTimeout(resolve, duration)
      })
    })
  }

  /**
   * Add animation class to element and remove it after duration
   * @param {HTMLElement} element - DOM element to animate
   * @param {String} animationClass - CSS class name
   * @param {Number} duration - Animation duration in ms
   */
  function addAnimationClass(element, animationClass, duration = 300) {
    return new Promise(resolve => {
      element.classList.add(animationClass)
      setTimeout(() => {
        element.classList.remove(animationClass)
        resolve()
      }, duration)
    })
  }

  return {
    isAnimating,
    animate,
    fadeIn,
    fadeOut,
    zoomIn,
    zoomOut,
    slideInFromBottom,
    slideOutToBottom,
    addAnimationClass
  }
}
