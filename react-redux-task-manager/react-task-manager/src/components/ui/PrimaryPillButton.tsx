import type { ReactNode } from 'react'
import Button, { type ButtonProps } from '@mui/material/Button'
import { IconPlus } from '@tabler/icons-react'

export type PrimaryPillButtonProps = Omit<ButtonProps, 'variant' | 'color'> & {
  children: ReactNode
}

export function PrimaryPillButton({ children, startIcon, sx, ...rest }: PrimaryPillButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={startIcon ?? <IconPlus size={18} stroke={2} aria-hidden />}
      sx={{
        borderRadius: 999,
        px: 2.5,
        py: 1,
        minHeight: 40,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.875rem',
        flexShrink: 0,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}
