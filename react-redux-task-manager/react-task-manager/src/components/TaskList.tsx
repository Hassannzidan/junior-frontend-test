import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  IconCalendar,
  IconChevronDown,
  IconChevronRight,
  IconFlagFilled,
} from '@tabler/icons-react'
import type { Theme } from '@mui/material/styles'
import type { Task, TaskStatus } from '../types/task'
import type { ViewMode } from './ViewModeToggle'

const COLUMN_ORDER: TaskStatus[] = ['todo', 'in_progress', 'complete']

const LABELS: Record<TaskStatus, string> = {
  todo: 'TO DO',
  in_progress: 'IN PROGRESS',
  complete: 'COMPLETE',
}

function statusBadgeSx(theme: Theme, status: TaskStatus) {
  const map = {
    todo: { bg: theme.palette.grey[700], color: '#fff' },
    in_progress: { bg: theme.palette.info.main, color: theme.palette.info.contrastText },
    complete: { bg: theme.palette.success.main, color: theme.palette.success.contrastText },
  }
  const m = map[status]
  return {
    bgcolor: m.bg,
    color: m.color,
    fontWeight: 600,
    fontSize: '0.6875rem',
    letterSpacing: '0.04em',
    px: 1,
    py: 0.25,
    borderRadius: 999,
    lineHeight: 1.4,
  }
}

function flagColor(theme: Theme, status: TaskStatus) {
  if (status === 'todo') return theme.palette.warning.main
  if (status === 'in_progress') return theme.palette.info.main
  return theme.palette.success.main
}

export type TaskListProps = {
  tasks: Task[]
  view: ViewMode
  onToggleComplete?: (taskId: string) => void
}

export function TaskList({ tasks, view, onToggleComplete }: TaskListProps) {
  const byStatus = useMemo(() => {
    const map: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      complete: [],
    }
    for (const t of tasks) {
      map[t.status].push(t)
    }
    return map
  }, [tasks])

  if (view === 'board') {
    return (
      <BoardView
        byStatus={byStatus}
      />
    )
  }

  return (
    <ListView
      byStatus={byStatus}
      onToggleComplete={onToggleComplete}
    />
  )
}

type ByStatus = Record<TaskStatus, Task[]>

function ListView({
  byStatus,
  onToggleComplete,
}: {
  byStatus: ByStatus
  onToggleComplete?: (taskId: string) => void
}) {
  const [open, setOpen] = useState<Record<TaskStatus, boolean>>({
    todo: true,
    in_progress: true,
    complete: true,
  })

  return (
    <Stack spacing={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper', overflow: 'hidden' }}>
      {COLUMN_ORDER.map((status, index) => {
        const list = byStatus[status]
        const expanded = open[status]

        return (
          <Box
            key={status}
            sx={{
              borderTop: index > 0 ? 1 : 0,
              borderColor: 'divider',
            }}
          >
            <Box
              component="div"
              role="button"
              tabIndex={0}
              onClick={() =>
                setOpen((o) => ({ ...o, [status]: !o[status] }))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpen((o) => ({ ...o, [status]: !o[status] }))
                }
              }}
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.5,
                bgcolor: theme.palette.grey[50],
                borderBottom: 1,
                borderColor: 'divider',
                cursor: 'pointer',
              })}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                {expanded ? (
                  <IconChevronDown size={20} stroke={1.75} aria-hidden />
                ) : (
                  <IconChevronRight size={20} stroke={1.75} aria-hidden />
                )}
              </Box>
              <Box sx={(theme) => statusBadgeSx(theme, status)}>
                {LABELS[status]}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 0 }}>
                {list.length}
              </Typography>
            </Box>
            <Collapse in={expanded}>
              <Stack divider={<Divider flexItem sx={{ borderColor: 'divider' }} />}>
                {list.map((task) => (
                  <ListTaskRow
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                  />
                ))}
              </Stack>
            </Collapse>
          </Box>
        )
      })}
    </Stack>
  )
}

function ListTaskRow({
  task,
  onToggleComplete,
}: {
  task: Task
  onToggleComplete?: (taskId: string) => void
}) {
  const done = task.status === 'complete'

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1.5,
        flexWrap: 'wrap',
      }}
    >
      <Checkbox
        checked={done}
        onChange={() => onToggleComplete?.(task.id)}
        slotProps={{ input: { 'aria-label': `Complete ${task.title}` } }}
        sx={(theme) => ({
          p: 0.5,
          color: theme.palette.grey[400],
          '&.Mui-checked': { color: theme.palette.primary.main },
        })}
      />
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          textDecoration: done ? 'line-through' : 'none',
          color: done ? 'text.secondary' : 'text.primary',
          flex: '1 1 160px',
          minWidth: 0,
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
            sx={(theme) => ({
              height: 22,
              fontSize: '0.75rem',
              bgcolor: theme.palette.grey[100],
              color: 'text.secondary',
            })}
          />
        ))}
      </Stack>
      <Box sx={(theme) => statusBadgeSx(theme, task.status)}>{LABELS[task.status]}</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
        <Box
          component="span"
          sx={(theme) => ({
            color: flagColor(theme, task.status),
            display: 'flex',
            alignItems: 'center',
            lineHeight: 0,
          })}
        >
          <IconFlagFilled size={18} aria-hidden />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            minWidth: 56,
            justifyContent: 'flex-end',
            color: 'text.secondary',
            typography: 'body2',
          }}
        >
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

function BoardView({ byStatus }: { byStatus: ByStatus }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(3, minmax(0, 1fr))',
        },
        gap: 2,
        alignItems: 'flex-start',
      }}
    >
      {COLUMN_ORDER.map((status) => (
        <BoardColumn key={status} status={status} tasks={byStatus[status]} />
      ))}
    </Box>
  )
}

function BoardColumn({ status, tasks }: { status: TaskStatus; tasks: Task[] }) {
  return (
    <Stack spacing={1.5} sx={{ minWidth: 0 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Box sx={(theme) => statusBadgeSx(theme, status)}>{LABELS[status]}</Box>
        <Typography variant="body2" color="text.secondary">
          {tasks.length}
        </Typography>
      </Stack>
      <Stack spacing={1.5}>
        {tasks.map((task) => (
          <BoardTaskCard key={task.id} task={task} />
        ))}
      </Stack>
    </Stack>
  )
}

function BoardTaskCard({ task }: { task: Task }) {
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
      }}
    >
      <Box
        sx={(theme) => ({
          position: 'absolute',
          top: 12,
          right: 12,
          color: flagColor(theme, task.status),
          lineHeight: 0,
        })}
      >
        <IconFlagFilled size={18} aria-hidden />
      </Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, pr: 3, mb: task.description ? 0.5 : 0 }}>
        {task.title}
      </Typography>
      {task.description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {task.description}
        </Typography>
      ) : null}
      <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap', mb: task.dueDate ? 1 : 0 }}>
        {(task.tags ?? []).map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={(theme) => ({
              height: 22,
              fontSize: '0.75rem',
              bgcolor: theme.palette.grey[100],
              color: 'text.secondary',
            })}
          />
        ))}
      </Stack>
      {task.dueDate ? (
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ alignItems: 'center', color: 'text.secondary', typography: 'body2' }}
        >
          <IconCalendar size={16} stroke={1.5} aria-hidden />
          {task.dueDate}
        </Stack>
      ) : null}
    </Box>
  )
}
