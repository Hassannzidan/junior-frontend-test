import { forwardRef } from 'react'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { IconChevronDown, IconFlagFilled } from '@tabler/icons-react'

export type FilterOption<T extends string = string> = {
  value: T
  label: string
  /** When set, a colored flag icon is shown in the menu and in the closed select. */
  flagColor?: string
}

/** Union of `value` fields from a readonly options array. */
export type FilterValueUnion<Options extends readonly FilterOption<string>[]> =
  Options[number]['value']

export type FilterSelectProps<
  Options extends readonly FilterOption<string>[] = readonly FilterOption[],
> = {
  value: FilterValueUnion<Options>
  onChange: (value: FilterValueUnion<Options>) => void
  options: Options
  ariaLabel: string
}

/** Pill dropdown field — surface, border, and type colors from design spec. */
const pillSelect = {
  surface: '#F8F8FB',
  border: '#E2E2E9',
  borderHover: '#D8D8E0',
  text: '#0C1227',
  icon: '#808191',
  fontSize: '0.875rem',
} as const

const Chevron = forwardRef<SVGSVGElement>(function Chevron(props, ref) {
  return (
    <IconChevronDown
      ref={ref}
      size={18}
      stroke={1.75}
      {...props}
    />
  )
})

export function FilterSelect<
  const Options extends readonly FilterOption<string>[],
>({
  value,
  onChange,
  options,
  ariaLabel,
}: FilterSelectProps<Options>) {
  type V = FilterValueUnion<Options>

  const handleChange = (event: SelectChangeEvent<V>) => {
    onChange(event.target.value as V)
  }

  const renderOptionContent = (opt: (typeof options)[number]) => {
    if (!opt.flagColor) {
      return opt.label
    }
    return (
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          width: '100%',
        }}
      >
        <IconFlagFilled
          size={18}
          stroke={1.25}
          aria-hidden
          style={{ color: opt.flagColor, flexShrink: 0 }}
        />
        <span>{opt.label}</span>
      </Box>
    )
  }

  return (
    <FormControl
      sx={{
        minWidth: { xs: '100%', sm: 200 },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: pillSelect.border,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: pillSelect.borderHover,
        },
      }}
    >
      <Select<V>
        size="small"
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': ariaLabel }}
        IconComponent={Chevron}
        renderValue={(selected) => {
          const opt = options.find((o) => o.value === selected)
          if (!opt) return ''
          return renderOptionContent(opt)
        }}
        sx={{
          fontFamily: 'inherit',
          bgcolor: pillSelect.surface,
          borderRadius: 999,
          minHeight: 40,
          fontSize: pillSelect.fontSize,
          fontWeight: 400,
          color: pillSelect.text,
          transition: (theme) =>
            theme.transitions.create(['border-color', 'background-color'], {
              duration: theme.transitions.duration.shorter,
            }),
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
          },
          '&:hover': {
            bgcolor: pillSelect.surface,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: pillSelect.borderHover,
            },
          },
          '& .MuiSelect-select': {
            py: 1,
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.875rem',
            fontWeight: 400,
          },
          '& .MuiSelect-icon': {
            color: pillSelect.icon,
          },
          '&.Mui-focused': {
            bgcolor: pillSelect.surface,
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderColor: pillSelect.border,
            },
          },
        }}
        MenuProps={{
          slotProps: {
            paper: {
              elevation: 2,
              sx: {
                borderRadius: 3,
                mt: 0.75,
                minWidth: 200,
                border: `1px solid ${pillSelect.border}`,
                boxShadow: '0 4px 24px rgba(12, 18, 39, 0.08)',
              },
            },
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={(theme) => ({
              py: 1,
              px: 2,
              fontSize: theme.typography.body2.fontSize,
              fontWeight: theme.typography.fontWeightRegular,
              lineHeight: theme.typography.body2.lineHeight,
              letterSpacing: theme.typography.body2.letterSpacing,
              color: pillSelect.text,
              fontFamily: theme.typography.fontFamily,
            })}
          >
            {renderOptionContent(opt)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
