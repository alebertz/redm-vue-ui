import { ref, computed } from 'vue'

// Default theme configuration
const defaultTheme = {
  colors: {
    primary: '#B62A2A',
    primaryDark: '#B21214',
    text: '#fafafa',
    textMuted: 'rgba(250, 250, 250, 0.7)',
    background: 'rgba(33, 33, 33, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.5)'
  },
  fonts: {
    decorative: 'Chinese Rocks, sans-serif',
    title: 'RDR Lino Regular, serif',
    body: 'Hapna Slab Serif, serif'
  },
  fontSizes: {
    xs: '16px',
    sm: '18px',
    md: '20px',
    lg: '24px',
    xl: '32px'
  },
  spacing: {
    xs: '5px',
    sm: '10px',
    md: '15px',
    lg: '25px',
    xl: '50px'
  },
  transitions: {
    fast: '0.15s ease-out',
    normal: '0.3s ease-out'
  }
}

// Global theme state
const themeConfig = ref({ ...defaultTheme })

/**
 * Composable for managing RedM theme
 * @returns {Object} Theme utilities and configuration
 */
export function useRdrTheme() {
  /**
   * Get current theme configuration
   */
  const theme = computed(() => themeConfig.value)

  /**
   * Update theme configuration
   * @param {Object} newTheme - Partial theme configuration to merge
   */
  function updateTheme(newTheme) {
    themeConfig.value = {
      ...themeConfig.value,
      ...newTheme,
      colors: { ...themeConfig.value.colors, ...(newTheme.colors || {}) },
      fonts: { ...themeConfig.value.fonts, ...(newTheme.fonts || {}) },
      fontSizes: { ...themeConfig.value.fontSizes, ...(newTheme.fontSizes || {}) },
      spacing: { ...themeConfig.value.spacing, ...(newTheme.spacing || {}) },
      transitions: { ...themeConfig.value.transitions, ...(newTheme.transitions || {}) }
    }
    applyThemeToCSSVariables()
  }

  /**
   * Reset theme to default configuration
   */
  function resetTheme() {
    themeConfig.value = { ...defaultTheme }
    applyThemeToCSSVariables()
  }

  /**
   * Get a specific theme value by path
   * @param {String} path - Dot notation path (e.g., 'colors.primary')
   */
  function getThemeValue(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], themeConfig.value)
  }

  /**
   * Apply theme to CSS custom properties
   */
  function applyThemeToCSSVariables() {
    const root = document.documentElement
    
    // Colors
    root.style.setProperty('--rdr-color-primary', themeConfig.value.colors.primary)
    root.style.setProperty('--rdr-color-primary-dark', themeConfig.value.colors.primaryDark)
    root.style.setProperty('--rdr-color-text', themeConfig.value.colors.text)
    root.style.setProperty('--rdr-color-text-muted', themeConfig.value.colors.textMuted)
    root.style.setProperty('--rdr-color-background', themeConfig.value.colors.background)
    root.style.setProperty('--rdr-color-overlay', themeConfig.value.colors.overlay)
    
    // Fonts
    root.style.setProperty('--rdr-font-decorative', themeConfig.value.fonts.decorative)
    root.style.setProperty('--rdr-font-title', themeConfig.value.fonts.title)
    root.style.setProperty('--rdr-font-body', themeConfig.value.fonts.body)
    
    // Font Sizes
    Object.entries(themeConfig.value.fontSizes).forEach(([key, value]) => {
      root.style.setProperty(`--rdr-font-size-${key}`, value)
    })
    
    // Spacing
    Object.entries(themeConfig.value.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--rdr-spacing-${key}`, value)
    })
    
    // Transitions
    root.style.setProperty('--rdr-transition-fast', themeConfig.value.transitions.fast)
    root.style.setProperty('--rdr-transition-normal', themeConfig.value.transitions.normal)
  }

  return {
    theme,
    updateTheme,
    resetTheme,
    getThemeValue
  }
}
