import { useDroppable } from '@dnd-kit/core'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { LABELS } from '@/constants/taskList'
import type { BoardColumnProps } from '@/types/components'
import { BoardTaskCard } from './BoardTaskCard'
import { statusBadgeSx } from './taskListShared'

export function BoardColumn({ status, tasks, onDeleteTask, onEditTask }: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { type: 'column', status },
  })

  return (
    <Stack
      ref={setNodeRef}
      spacing={1.5}
      data-status-col={status}
      sx={(theme) => ({
        minWidth: 0,
        minHeight: { xs: 420, sm: 480, md: 'min(68vh, 720px)' },
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.grey[100],
        borderRadius: 2,
        p: 2,
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
        transition: theme.transitions.create(['box-shadow', 'outline-color'], {
          duration: theme.transitions.duration.short,
        }),
        outline: isOver ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
        outlineOffset: 2,
      })}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexShrink: 0 }}>
        <Box sx={statusBadgeSx(status)}>{LABELS[status]}</Box>
        <Typography variant="body2" color="text.secondary">
          {tasks.length}
        </Typography>
      </Stack>
      <Stack spacing={1.5} sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {tasks.map((task) => (
          <BoardTaskCard key={task.id} task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />
        ))}
      </Stack>
    </Stack>
  )
}
