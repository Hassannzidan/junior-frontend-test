import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { IconLayoutGrid, IconList } from '@tabler/icons-react'
import type { ViewMode } from '../../types/viewMode'

export type { ViewMode }

export type ViewModeToggleProps = {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

const track = { bg: 'transparent', border: 'rgba(74, 74, 226, 0.18)' } as const
const segment = { activeColor: '#4A4AE2', activeBg: '#F5F3FF', inactiveColor: '#5F6368' } as const
const iconSize = 18

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  const theme = useTheme()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const trackHeight = 40
  const insetX = theme.spacing(0.5)
  const insetY = theme.spacing(0.25)
  const gap = theme.spacing(0.5)
  const slideTransition = reduceMotion
    ? 'none'
    : theme.transitions.create('transform', { duration: theme.transitions.duration.standard, easing: theme.transitions.easing.easeInOut })

  const segmentSx = (mode: ViewMode) => {
    const active = value === mode
    return {
      flex: 1,
      position: 'relative' as const,
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0.75,
      minHeight: 0,
      alignSelf: 'stretch',
      px: 1.75,
      py: 0,
      borderRadius: 999,
      fontSize: '0.875rem',
      fontWeight: 500,
      color: active ? segment.activeColor : segment.inactiveColor,
      bgcolor: 'transparent',
      transition: theme.transitions.create('color', { duration: theme.transitions.duration.shorter }),
      '& svg': { color: 'inherit' },
    } as const
  }

  return (
    <Box
      role="group"
      aria-label="View mode"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: 0.5,
        boxSizing: 'border-box',
        height: trackHeight,
        minHeight: trackHeight,
        py: insetY,
        px: insetX,
        bgcolor: track.bg,
        borderRadius: 999,
        border: 1,
        borderColor: track.border,
        minWidth: { xs: '100%', sm: 220 },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: insetY,
          bottom: insetY,
          left: insetX,
          width: `calc((100% - 2 * ${insetX} - ${gap}) / 2)`,
          borderRadius: 999,
          bgcolor: segment.activeBg,
          zIndex: 0,
          transition: slideTransition,
          transform: value === 'board' ? `translateX(calc(100% + ${gap}))` : 'translateX(0)',
          pointerEvents: 'none',
        }}
      />
      <ButtonBase disableRipple aria-pressed={value === 'list'} onClick={() => onChange('list')} sx={segmentSx('list')}>
        <IconList size={iconSize} stroke={1.75} aria-hidden />
        List
      </ButtonBase>
      <ButtonBase disableRipple aria-pressed={value === 'board'} onClick={() => onChange('board')} sx={segmentSx('board')}>
        <IconLayoutGrid size={iconSize} stroke={1.75} aria-hidden />
        Board
      </ButtonBase>
    </Box>
  )
}
