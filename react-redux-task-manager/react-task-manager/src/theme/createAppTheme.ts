import { createTheme } from '@mui/material/styles'
import { brand, neutral } from './tokens/colors'
import { buildTypographyVariants } from './tokens/typography'

const breakpoints = {
  values: { xs: 0, sm: 600, md: 900, lg: 1024, xl: 1440 },
} as const

export function createAppTheme() {
  const baseTheme = createTheme({
    spacing: 8,
    breakpoints,
  })

  const primaryHover = '#6A56E5'

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
        selected: neutral[100],
      },
      primary: {
        main: brand.purple,
        dark: primaryHover,
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
        default: neutral[50],
        paper: brand.white,
      },
      text: {
        primary: brand.shark,
        secondary: neutral[500],
        disabled: neutral[400],
      },
      divider: neutral[200],
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
