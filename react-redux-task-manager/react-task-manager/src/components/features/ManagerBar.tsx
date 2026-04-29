import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import {
  FilterSelect,
  PrimaryPillButton,
  SearchField,
  ViewModeToggle,
} from '@/components/ui'
import { PRIORITY_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from '@/constants/taskFilters'
import type { ManagerBarProps } from '@/types/components'

export function ManagerBar({
  view,
  onViewChange,
  search,
  onSearchChange,
  priority,
  onPriorityChange,
  status,
  onStatusChange,
  onNewTaskClick,
}: ManagerBarProps) {
  return (
    <Box component="nav" aria-label="Task tools" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, py: 2, px: { xs: 2, sm: 3 } }}>
      <ViewModeToggle value={view} onChange={onViewChange} />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} useFlexGap sx={{ flex: 1, minWidth: 0, alignItems: { sm: 'center' } }}>
        <SearchField value={search} onChange={onSearchChange} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} useFlexGap sx={{ alignItems: { sm: 'center' } }}>
          <FilterSelect value={priority} onChange={onPriorityChange} options={PRIORITY_FILTER_OPTIONS} ariaLabel="Filter by priority" />
          <FilterSelect value={status} onChange={onStatusChange} options={STATUS_FILTER_OPTIONS} ariaLabel="Filter by status" />
        </Stack>
      </Stack>
      <PrimaryPillButton type="button" onClick={onNewTaskClick}>
        New Task
      </PrimaryPillButton>
    </Box>
  )
}
