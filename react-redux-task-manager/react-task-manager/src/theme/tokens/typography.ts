import type { Breakpoints, TypographyVariantsOptions } from '@mui/material/styles'
import { fontFamily } from './fonts'

/**
 * Typography variants using `theme.breakpoints` so `lg` stays in sync with `breakpointValues`.
 * Built in `createAppTheme` after a base theme with breakpoints exists (see MUI deep-merge pattern).
 *
 * Heading scale uses ~1.2–1.25× steps between levels; h4 stays larger than body1 on `lg` for clear structure.
 */
export function buildTypographyVariants(
  breakpoints: Breakpoints,
): TypographyVariantsOptions {
  return {
    fontFamily: fontFamily.sans,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: fontFamily.display,
      fontWeight: 500,
      fontSize: '2.5rem',
      lineHeight: 1.08,
      letterSpacing: '-0.035em',
      [breakpoints.up('lg')]: {
        fontSize: '3.5rem',
        letterSpacing: '-0.03em',
      },
    },
    h2: {
      fontFamily: fontFamily.sans,
      fontWeight: 500,
      fontSize: '1.625rem',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      [breakpoints.up('lg')]: {
        fontSize: '2rem',
      },
    },
    h3: {
      fontFamily: fontFamily.sans,
      fontWeight: 500,
      fontSize: '1.3125rem',
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
      [breakpoints.up('lg')]: {
        fontSize: '1.625rem',
      },
    },
    h4: {
      fontFamily: fontFamily.sans,
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.28,
      letterSpacing: '-0.01em',
      [breakpoints.up('lg')]: {
        fontSize: '1.375rem',
      },
    },
    subtitle1: {
      fontFamily: fontFamily.sans,
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      [breakpoints.up('lg')]: {
        fontSize: '1.0625rem',
      },
    },
    subtitle2: {
      fontFamily: fontFamily.sans,
      fontWeight: 500,
      fontSize: '0.8125rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
      [breakpoints.up('lg')]: {
        fontSize: '0.875rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.55,
      letterSpacing: '0.01em',
      [breakpoints.up('lg')]: {
        fontSize: '1.125rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.008em',
    },
    button: {
      fontFamily: fontFamily.sans,
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
      textTransform: 'none',
    },
    caption: {
      fontFamily: fontFamily.sans,
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.4,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontFamily: fontFamily.sans,
      fontWeight: 500,
      fontSize: '0.75rem',
      lineHeight: 2,
      letterSpacing: '0.08333em',
      textTransform: 'none',
    },
  }
}
