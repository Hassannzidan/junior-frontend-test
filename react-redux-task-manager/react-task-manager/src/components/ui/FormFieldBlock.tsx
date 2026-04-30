import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type FormFieldBlockProps = {
  label: string
  children: ReactNode
}

export function FormFieldBlock({ label, children }: FormFieldBlockProps) {
  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>
      {children}
    </Box>
  )
}
