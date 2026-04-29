import { useMemo, useState, type CSSProperties } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  pointerWithin,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  IconCalendar,
  IconChevronDown,
  IconChevronRight,
  IconFlagFilled,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react'
import { PRIORITY_FLAG_COLORS } from '../constants/taskFilters'
import type { Task, TaskStatus } from '../types/task'
import type { ViewMode } from './ViewModeToggle'

const COLUMN_ORDER: TaskStatus[] = ['todo', 'in_progress', 'complete']

const LABELS: Record<TaskStatus, string> = {
  todo: 'TO DO',
  in_progress: 'IN PROGRESS',
  complete: 'COMPLETE',
}

/** ClickUp-style status badge palette */
const STATUS_BADGE_BG: Record<TaskStatus, string> = {
  todo: '#5F6375',
  in_progress: '#4086F4',
  complete: '#28C76F',
}

function statusBadgeSx(status: TaskStatus) {
  return {
    bgcolor: STATUS_BADGE_BG[status],
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.6875rem',
    letterSpacing: '0.06em',
    px: 1.25,
    py: 0.5,
    borderRadius: '6px',
    lineHeight: 1.35,
  }
}

function priorityFlagColor(priority: Task['priority']) {
  return PRIORITY_FLAG_COLORS[priority]
}

/** Prefer column hit when the pointer is inside a column (handles cards stacked in columns). */
const boardCollisionDetection: CollisionDetection = (args) => {
  const pointerHits = pointerWithin(args)
  if (pointerHits.length > 0) {
    return pointerHits
  }
  return closestCorners(args)
}

function findTaskById(byStatus: ByStatus, id: string): Task | undefined {
  for (const status of COLUMN_ORDER) {
    const hit = byStatus[status].find((t) => t.id === id)
    if (hit) return hit
  }
  return undefined
}

export type TaskListProps = {
  tasks: Task[]
  view: ViewMode
  onToggleComplete?: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
  onChangeTaskStatus: (taskId: string, status: TaskStatus) => void
  noSearchResults?: boolean
  searchQuery?: string
}

export function TaskList({
  tasks,
  view,
  onToggleComplete,
  onDeleteTask,
  onChangeTaskStatus,
  noSearchResults = false,
  searchQuery = '',
}: TaskListProps) {
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

  if (noSearchResults) {
    return (
      <Box
        role="status"
        aria-live="polite"
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
          py: { xs: 6, sm: 8 },
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 420,
          mx: 'auto',
        }}
      >
        <Box
          sx={(theme) => ({
            width: 56,
            height: 56,
            borderRadius: '50%',
            bgcolor: theme.palette.grey[100],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary',
            mb: 2,
          })}
        >
          <IconSearch size={28} stroke={1.5} aria-hidden />
        </Box>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 0.75 }}>
          No tasks found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
          No results for “{searchQuery}”. Try different keywords, or check spelling in titles,
          descriptions, and tags.
        </Typography>
      </Box>
    )
  }

  if (view === 'board') {
    return (
      <BoardView
        byStatus={byStatus}
        onDeleteTask={onDeleteTask}
        onChangeTaskStatus={onChangeTaskStatus}
      />
    )
  }

  return (
    <ListView
      byStatus={byStatus}
      onToggleComplete={onToggleComplete}
      onDeleteTask={onDeleteTask}
      onChangeTaskStatus={onChangeTaskStatus}
    />
  )
}

type ByStatus = Record<TaskStatus, Task[]>

function ListView({
  byStatus,
  onToggleComplete,
  onDeleteTask,
  onChangeTaskStatus,
}: {
  byStatus: ByStatus
  onToggleComplete?: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
  onChangeTaskStatus: (taskId: string, status: TaskStatus) => void
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
              <Box sx={statusBadgeSx(status)}>
                {LABELS[status]}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 0 }}>
                {list.length}
              </Typography>
            </Box>
            <Collapse in={expanded}>
              {list.length === 0 ? (
                <Box
                  sx={{
                    px: 2,
                    py: 3,
                    bgcolor: 'background.default',
                    borderTop: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    No tasks yet
                  </Typography>
                </Box>
              ) : (
                <Stack divider={<Divider flexItem sx={{ borderColor: 'divider' }} />}>
                  {list.map((task) => (
                    <ListTaskRow
                      key={task.id}
                      task={task}
                      onToggleComplete={onToggleComplete}
                      onDeleteTask={onDeleteTask}
                      onChangeTaskStatus={onChangeTaskStatus}
                    />
                  ))}
                </Stack>
              )}
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
  onDeleteTask,
  onChangeTaskStatus,
}: {
  task: Task
  onToggleComplete?: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
  onChangeTaskStatus: (taskId: string, status: TaskStatus) => void
}) {
  const done = task.status === 'complete'
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(null)
  const statusMenuOpen = Boolean(statusMenuAnchor)
  const statusMenuId = `task-row-status-menu-${task.id}`

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
            sx={(theme) => ({
              height: 22,
              fontSize: '0.75rem',
              bgcolor: theme.palette.grey[100],
              color: 'text.secondary',
            })}
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
                if (nextStatus !== task.status) {
                  onChangeTaskStatus(task.id, nextStatus)
                }
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
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'error.main', bgcolor: 'action.hover' },
          }}
        >
          <IconTrash size={18} stroke={1.5} aria-hidden />
        </IconButton>
        <Box
          component="span"
          sx={{
            color: priorityFlagColor(task.priority),
            display: 'flex',
            alignItems: 'center',
            lineHeight: 0,
          }}
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

function BoardView({
  byStatus,
  onDeleteTask,
  onChangeTaskStatus,
}: {
  byStatus: ByStatus
  onDeleteTask: (taskId: string) => void
  onChangeTaskStatus: (taskId: string, status: TaskStatus) => void
}) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeTask = activeId ? findTaskById(byStatus, activeId) : null

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event
    if (!over) return
    const taskId = String(active.id)
    const overId = String(over.id)
    if (!COLUMN_ORDER.includes(overId as TaskStatus)) return
    const nextStatus = overId as TaskStatus
    const task = findTaskById(byStatus, taskId)
    if (task && task.status !== nextStatus) {
      onChangeTaskStatus(taskId, nextStatus)
    }
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={boardCollisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
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
          <BoardColumn
            key={status}
            status={status}
            tasks={byStatus[status]}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </Box>
      <DragOverlay>
        {activeTask ? (
          <Box sx={{ cursor: 'grabbing', boxShadow: 6, borderRadius: 2 }}>
            <BoardTaskCardSurface task={activeTask} showActions={false} />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

function BoardColumn({
  status,
  tasks,
  onDeleteTask,
}: {
  status: TaskStatus
  tasks: Task[]
  onDeleteTask: (taskId: string) => void
}) {
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
          <BoardTaskCard key={task.id} task={task} onDeleteTask={onDeleteTask} />
        ))}
      </Stack>
    </Stack>
  )
}

function BoardTaskCardSurface({
  task,
  showActions,
  onDeleteTask,
}: {
  task: Task
  showActions: boolean
  onDeleteTask?: (taskId: string) => void
}) {
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
      {showActions && onDeleteTask ? (
        <Box
          sx={{
            position: 'absolute',
            top: 6,
            right: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            lineHeight: 0,
          }}
        >
          <IconButton
            size="small"
            aria-label={`Delete ${task.title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onDeleteTask(task.id)}
            sx={{
              cursor: 'pointer',
              color: 'text.secondary',
              '&:hover': { color: 'error.main', bgcolor: 'action.hover' },
            }}
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
        sx={{
          fontWeight: 700,
          pr: showActions ? 8 : 0,
          mb: task.description ? 0.5 : 0,
          minWidth: 0,
          overflowWrap: 'anywhere',
          wordBreak: 'break-word',
        }}
      >
        {task.title}
      </Typography>
      {task.description ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            minWidth: 0,
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
          }}
        >
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

function BoardTaskCard({
  task,
  onDeleteTask,
}: {
  task: Task
  onDeleteTask: (taskId: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { type: 'task', task },
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    touchAction: 'none',
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{
        opacity: isDragging ? 0 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <BoardTaskCardSurface task={task} showActions onDeleteTask={onDeleteTask} />
    </Box>
  )
}
