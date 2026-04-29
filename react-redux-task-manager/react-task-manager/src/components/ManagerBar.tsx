import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import {
  PRIORITY_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  type PriorityFilterValue,
  type StatusFilterValue,
} from '../constants/taskFilters'
import { FilterSelect } from './ui/FilterSelect'
import { PrimaryPillButton } from './ui/PrimaryPillButton'
import { SearchField } from './ui/SearchField'
import { ViewModeToggle, type ViewMode } from './ui/ViewModeToggle'

export function ManagerBar() {
  const [view, setView] = useState<ViewMode>('board')
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState<PriorityFilterValue>('all')
  const [status, setStatus] = useState<StatusFilterValue>('all')

  return (
    <Box
      component="nav"
      aria-label="Task tools"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1.5,
        py: 2,
        px: { xs: 2, sm: 3 },
      }}
    >
      <ViewModeToggle value={view} onChange={setView} />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        useFlexGap
        sx={{ flex: 1, minWidth: 0, alignItems: { sm: 'center' } }}
      >
        <SearchField value={search} onChange={setSearch} />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          useFlexGap
          sx={{ alignItems: { sm: 'center' } }}
        >
          <FilterSelect
            value={priority}
            onChange={setPriority}
            options={PRIORITY_FILTER_OPTIONS}
            ariaLabel="Filter by priority"
          />
          <FilterSelect
            value={status}
            onChange={setStatus}
            options={STATUS_FILTER_OPTIONS}
            ariaLabel="Filter by status"
          />
        </Stack>
      </Stack>
      <PrimaryPillButton onClick={() => {}}>New Task</PrimaryPillButton>
    </Box>
  )
}
