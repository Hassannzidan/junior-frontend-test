import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { IconCalendar, IconFlagFilled, IconTrash } from '@tabler/icons-react'
import type { ListTaskRowProps } from '../../../types/components'
import { COLUMN_ORDER, LABELS, priorityFlagColor, statusBadgeSx } from './taskListShared'

export function ListTaskRow({
  task,
  onToggleComplete,
  onDeleteTask,
  onChangeTaskStatus,
}: ListTaskRowProps) {
  const done = task.status === 'complete'
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(null)
  const statusMenuOpen = Boolean(statusMenuAnchor)
  const statusMenuId = `task-row-status-menu-${task.id}`

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, flexWrap: 'wrap' }}>
      <Checkbox
        checked={done}
        onChange={() => onToggleComplete?.(task.id)}
        slotProps={{ input: { 'aria-label': `Complete ${task.title}` } }}
        sx={(theme) => ({ p: 0.5, color: theme.palette.grey[400], '&.Mui-checked': { color: theme.palette.primary.main } })}
      />
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          textDecoration: done ? 'line-through' : 'none',
          color: done ? 'text.secondary' : 'text.primary',
          flex: '1 1 160px',
          minWidth: 0,
          overflowWrap: 'anywhere',
          wordBreak: 'break-word',
        }}
      >
        {task.title}
      </Typography>
      <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
        {(task.tags ?? []).map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={(theme) => ({ height: 22, fontSize: '0.75rem', bgcolor: theme.palette.grey[100], color: 'text.secondary' })}
          />
        ))}
      </Stack>
      <>
        <ButtonBase
          id={`${statusMenuId}-trigger`}
          aria-haspopup="true"
          aria-expanded={statusMenuOpen}
          aria-controls={statusMenuOpen ? statusMenuId : undefined}
          aria-label={`Status ${LABELS[task.status]}. Open menu to change`}
          onClick={(e) => setStatusMenuAnchor(e.currentTarget)}
          sx={statusBadgeSx(task.status)}
        >
          {LABELS[task.status]}
        </ButtonBase>
        <Menu
          id={statusMenuId}
          anchorEl={statusMenuAnchor}
          open={statusMenuOpen}
          onClose={() => setStatusMenuAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{ list: { dense: true, 'aria-labelledby': `${statusMenuId}-trigger` } }}
        >
          {COLUMN_ORDER.map((nextStatus) => (
            <MenuItem
              key={nextStatus}
              selected={nextStatus === task.status}
              onClick={() => {
                if (nextStatus !== task.status) onChangeTaskStatus(task.id, nextStatus)
                setStatusMenuAnchor(null)
              }}
            >
              <Box component="span" sx={statusBadgeSx(nextStatus)}>
                {LABELS[nextStatus]}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
        <IconButton
          size="small"
          aria-label={`Delete ${task.title}`}
          onClick={() => onDeleteTask(task.id)}
          sx={{ color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'action.hover' } }}
        >
          <IconTrash size={18} stroke={1.5} aria-hidden />
        </IconButton>
        <Box component="span" sx={{ color: priorityFlagColor(task.priority), display: 'flex', alignItems: 'center', lineHeight: 0 }}>
          <IconFlagFilled size={18} aria-hidden />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 56, justifyContent: 'flex-end', color: 'text.secondary', typography: 'body2' }}>
          {task.dueDate ? (
            <>
              <IconCalendar size={16} stroke={1.5} aria-hidden />
              {task.dueDate}
            </>
          ) : (
            '—'
          )}
        </Box>
      </Box>
    </Box>
  )
}
