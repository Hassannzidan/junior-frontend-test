import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { fontFamily } from '../../theme/tokens/fonts'

export type LogoProps = {
  sx?: SxProps<Theme>
}

export function Logo({ sx }: LogoProps) {
  return (
    <Box
      component="svg"
      viewBox="0 0 48 48"
      role="img"
      aria-hidden
      sx={{ width: 48, height: 48, flexShrink: 0, display: 'block', color: 'primary.main', ...sx }}
    >
      <rect width="48" height="48" rx="12" fill="currentColor" />
      <text x="24" y="33" textAnchor="middle" fill="#FFFFFF" fontSize="26" fontWeight="700" fontFamily={fontFamily.sans}>
        T
      </text>
    </Box>
  )
}
