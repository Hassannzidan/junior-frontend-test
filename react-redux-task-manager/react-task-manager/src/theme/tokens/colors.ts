/**
 * ClickUp-inspired brand primitives (Shark, Cornflower / Purple, accents).
 * Semantic tokens map these to light/dark UI roles.
 */
export const brand = {
  purple: '#7B68EE',
  shark: '#292D34',
  hotPink: '#FD71AF',
  malibu: '#49CCF9',
  supernova: '#FFC800',
  white: '#FFFFFF',
} as const

/** Neutral ramp for surfaces, borders, and muted text */
export const neutral = {
  50: '#FAFAFB',
  100: '#F5F5F7',
  200: '#E8E8EC',
  300: '#D1D1D6',
  400: '#9CA3AF',
  500: '#676879',
  600: '#4B4F5C',
  700: '#3D4149',
  800: '#2B2D31',
  900: '#1E2024',
} as const

/** Status primitives for validation, alerts, and badges */
export const state = {
  success: '#2DB662',
  error: '#E5484D',
  warning: brand.supernova,
  info: brand.malibu,
} as const

export type ColorMode = 'light' | 'dark'

export function getSemanticColors(mode: ColorMode) {
  if (mode === 'light') {
    return {
      backgroundDefault: neutral[50],
      backgroundPaper: brand.white,
      textPrimary: brand.shark,
      textSecondary: neutral[500],
      textDisabled: neutral[400],
      border: neutral[200],
      divider: neutral[200],
      subtleFill: neutral[100],
      codeBackground: neutral[100],
      primaryHover: '#6A56E5',
      primarySelected: 'rgba(123, 104, 238, 0.12)',
      focusRing: brand.purple,
      shadow:
        'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px',
      state: {
        success: {
          main: state.success,
          subtle: 'rgba(45, 182, 98, 0.12)',
        },
        error: {
          main: state.error,
          subtle: 'rgba(229, 72, 77, 0.12)',
        },
        warning: {
          main: state.warning,
          subtle: 'rgba(255, 200, 0, 0.18)',
        },
        info: {
          main: state.info,
          subtle: 'rgba(73, 204, 249, 0.14)',
        },
      },
    } as const
  }

  return {
    backgroundDefault: neutral[900],
    backgroundPaper: neutral[800],
    textPrimary: neutral[100],
    textSecondary: neutral[400],
    textDisabled: neutral[500],
    border: neutral[700],
    divider: neutral[700],
    subtleFill: 'rgba(255, 255, 255, 0.06)',
    codeBackground: neutral[800],
    primaryHover: '#8F7EF2',
    primarySelected: 'rgba(123, 104, 238, 0.24)',
    focusRing: '#A996F5',
    shadow:
      'rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px',
    state: {
      success: {
        main: state.success,
        subtle: 'rgba(45, 182, 98, 0.22)',
      },
      error: {
        main: state.error,
        subtle: 'rgba(229, 72, 77, 0.22)',
      },
      warning: {
        main: state.warning,
        subtle: 'rgba(255, 200, 0, 0.16)',
      },
      info: {
        main: state.info,
        subtle: 'rgba(73, 204, 249, 0.18)',
      },
    },
  } as const
}
