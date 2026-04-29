import type { TaskStatus } from '@/types/task'

/** Brand and neutral ramps consumed by `createAppTheme`. */
export const brand = {
  purple: '#7B68EE',
  shark: '#292D34',
  hotPink: '#FD71AF',
  malibu: '#49CCF9',
  supernova: '#FFC800',
  accentDeep: '#253837',
  white: '#FFFFFF',
} as const

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

export const taskStatusBadgeBg = {
  todo: '#5F6375',
  in_progress: '#4086F4',
  complete: '#28C76F',
} as const satisfies Record<TaskStatus, string>
