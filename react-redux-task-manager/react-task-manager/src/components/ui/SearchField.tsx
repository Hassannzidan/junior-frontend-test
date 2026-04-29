import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { IconSearch } from '@tabler/icons-react'
import type { SearchFieldProps } from '@/types/components'

export function SearchField({
  value,
  onChange,
  placeholder = 'Search tasks...',
  'aria-label': ariaLabel = 'Search tasks',
}: SearchFieldProps) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      size="small"
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={{ color: 'text.secondary', mr: 4 / 8 }}>
              <IconSearch size={18} stroke={1.75} aria-hidden />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        minWidth: { xs: '100%', sm: 220 },
        maxWidth: { sm: 360 },
        '& .MuiOutlinedInput-root': {
          bgcolor: 'transparent',
          borderRadius: 999,
          minHeight: 40,
          '& fieldset': { borderColor: 'divider' },
          '&:hover fieldset': { borderColor: 'grey.300' },
          '&.Mui-focused fieldset': { borderColor: 'primary.main' },
        },
        '& .MuiInputBase-input': {
          py: 1,
          fontSize: '0.875rem',
          color: 'text.primary',
          '&::placeholder': { color: 'text.secondary', opacity: 1 },
        },
      }}
    />
  )
}
