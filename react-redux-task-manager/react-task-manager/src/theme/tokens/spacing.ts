/**
 * Spacing scale (px). MUI default spacing factor is 8 — `theme.spacing(1)` === 8px.
 * Use these names for one-off layout constants outside `theme.spacing`.
 */
export const space = {
  px: 1,
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 40,
  9: 48,
  10: 64,
  11: 88,
} as const

/** Default MUI spacing step multiplier (matches `createTheme` default). */
export const spacingUnit = 8
