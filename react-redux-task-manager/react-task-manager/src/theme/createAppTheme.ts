import { createTheme } from '@mui/material/styles'
import { brand, getSemanticColors, neutral } from './tokens/colors'
import { breakpointValues } from './tokens/breakpoints'
import { spacingUnit } from './tokens/spacing'
import { buildTypographyVariants } from './tokens/typography'

export function createAppTheme() {
  const semantic = getSemanticColors()

  const baseTheme = createTheme({
    spacing: spacingUnit,
    breakpoints: {
      values: { ...breakpointValues },
    },
  })

  return createTheme(baseTheme, {
    palette: {
      mode: 'light',
      grey: {
        50: neutral[50],
        100: neutral[100],
        200: neutral[200],
        300: neutral[300],
        400: neutral[400],
        500: neutral[500],
        600: neutral[600],
        700: neutral[700],
        800: neutral[800],
        900: neutral[900],
      },
      action: {
        hover: 'rgba(123, 104, 238, 0.06)',
        selected: semantic.subtleFill,
      },
      primary: {
        main: brand.purple,
        dark: semantic.primaryHover,
        contrastText: brand.white,
      },
      secondary: {
        main: brand.hotPink,
        contrastText: brand.white,
      },
      warning: {
        main: brand.supernova,
        contrastText: brand.shark,
      },
      info: {
        main: brand.malibu,
        contrastText: brand.shark,
      },
      success: {
        main: '#2DB662',
        contrastText: brand.white,
      },
      brandAccent: {
        main: brand.accentDeep,
        contrastText: brand.white,
      },
      background: {
        default: semantic.backgroundDefault,
        paper: semantic.backgroundPaper,
      },
      text: {
        primary: semantic.textPrimary,
        secondary: semantic.textSecondary,
        disabled: semantic.textDisabled,
      },
      divider: semantic.divider,
    },
    typography: buildTypographyVariants(baseTheme.breakpoints),
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontSynthesis: 'none',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
  })
}

