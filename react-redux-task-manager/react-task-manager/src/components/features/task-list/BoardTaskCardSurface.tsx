import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { IconCalendar, IconEdit, IconFlagFilled, IconTrash } from '@tabler/icons-react'
import type { BoardTaskCardSurfaceProps } from '@/types/components'
import { priorityFlagColor } from './taskListShared'

export function BoardTaskCardSurface({ task, showActions, onDeleteTask, onEditTask }: BoardTaskCardSurfaceProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
        minWidth: 0,
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
      }}
    >
      {showActions && onDeleteTask && onEditTask ? (
        <Box sx={{ position: 'absolute', top: 6, right: 6, display: 'flex', alignItems: 'center', gap: 0, lineHeight: 0 }}>
          <IconButton
            size="small"
            aria-label={`Edit ${task.title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onEditTask(task)}
            sx={{ cursor: 'pointer', color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'action.hover' } }}
          >
            <IconEdit size={18} stroke={1.5} aria-hidden />
          </IconButton>
          <IconButton
            size="small"
            aria-label={`Delete ${task.title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onDeleteTask(task.id)}
            sx={{ cursor: 'pointer', color: 'text.secondary', '&:hover': { color: 'error.main', bgcolor: 'action.hover' } }}
          >
            <IconTrash size={18} stroke={1.5} aria-hidden />
          </IconButton>
          <Box sx={{ color: priorityFlagColor(task.priority), display: 'flex', alignItems: 'center' }}>
            <IconFlagFilled size={18} aria-hidden />
          </Box>
        </Box>
      ) : null}
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 700, pr: showActions ? 10 : 0, mb: task.description ? 0.5 : 0, minWidth: 0, overflowWrap: 'anywhere', wordBreak: 'break-word' }}
      >
        {task.title}
      </Typography>
      {task.description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minWidth: 0, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
          {task.description}
        </Typography>
      ) : null}
      <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap', mb: task.dueDate ? 1 : 0 }}>
        {(task.tags ?? []).map((tag) => (
          <Chip key={tag} label={tag} size="small" sx={(theme) => ({ height: 22, fontSize: '0.75rem', bgcolor: theme.palette.grey[100], color: 'text.secondary' })} />
        ))}
      </Stack>
      {task.dueDate ? (
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'text.secondary', typography: 'body2' }}>
          <IconCalendar size={16} stroke={1.5} aria-hidden />
          {task.dueDate}
        </Stack>
      ) : null}
    </Box>
  )
}
