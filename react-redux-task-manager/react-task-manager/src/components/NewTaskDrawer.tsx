import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { IconX } from '@tabler/icons-react'
import {
  TASK_FORM_PRIORITY_OPTIONS,
  TASK_FORM_STATUS_OPTIONS,
  type TaskFormPriorityValue,
  type TaskFormStatusValue,
} from '../constants/taskFormOptions'
import type { Task } from '../types/task'
import { AppDrawer, AppDrawerHeaderRow } from './AppDrawer'
import { FilterSelect } from './FilterSelect'
import { PrimaryPillButton } from './PrimaryPillButton'

function dueDateFromInput(isoDate: string): string | undefined {
  if (!isoDate.trim()) return undefined
  const d = new Date(`${isoDate}T12:00:00`)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export type NewTaskDrawerProps = {
  open: boolean
  onClose: () => void
  onAddTask: (task: Omit<Task, 'id'>) => void
}

const emptyForm = {
  title: '',
  description: '',
  status: 'todo' as TaskFormStatusValue,
  priority: 'medium' as TaskFormPriorityValue,
  dueDate: '',
}

export function NewTaskDrawer({ open, onClose, onAddTask }: NewTaskDrawerProps) {
  const [form, setForm] = useState(emptyForm)
  const [titleError, setTitleError] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(emptyForm)
      setTitleError(false)
    }
  }, [open])

  const handleSubmit = () => {
    const title = form.title.trim()
    if (!title) {
      setTitleError(true)
      return
    }
    setTitleError(false)
    onAddTask({
      title,
      description: form.description.trim() || undefined,
      status: form.status,
      priority: form.priority,
      dueDate: dueDateFromInput(form.dueDate),
    })
    onClose()
  }

  return (
    <AppDrawer
      open={open}
      onClose={() => onClose()}
      header={
        <AppDrawerHeaderRow
          title={
            <Typography component="h2" variant="h6" sx={{ fontWeight: 600 }}>
              New task
            </Typography>
          }
          actions={
            <IconButton
              edge="end"
              aria-label="Close"
              onClick={onClose}
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <IconX size={20} stroke={1.75} />
            </IconButton>
          }
        />
      }
      footer={
        <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="inherit" onClick={onClose} sx={{ borderRadius: 999 }}>
            Cancel
          </Button>
          <PrimaryPillButton type="button" onClick={handleSubmit}>
            Add task
          </PrimaryPillButton>
        </Stack>
      }
    >
      <Stack spacing={2.5}>
        <div>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Task name
          </Typography>
          <TextField
            value={form.title}
            onChange={(e) => {
              setForm((f) => ({ ...f, title: e.target.value }))
              if (titleError) setTitleError(false)
            }}
            placeholder="What needs to be done?"
            fullWidth
            size="small"
            error={titleError}
            helperText={titleError ? 'Enter a task name' : undefined}
            aria-label="Task name"
            slotProps={{ htmlInput: { 'aria-required': true } }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />
        </div>
        <div>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Description
          </Typography>
          <TextField
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Add details…"
            fullWidth
            size="small"
            multiline
            minRows={3}
            aria-label="Task description"
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />
        </div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2.5,
            alignItems: 'stretch',
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Status
            </Typography>
            <FilterSelect
              value={form.status}
              onChange={(value) => setForm((f) => ({ ...f, status: value }))}
              options={TASK_FORM_STATUS_OPTIONS}
              ariaLabel="Task status"
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Priority
            </Typography>
            <FilterSelect
              value={form.priority}
              onChange={(value) => setForm((f) => ({ ...f, priority: value }))}
              options={TASK_FORM_PRIORITY_OPTIONS}
              ariaLabel="Task priority"
            />
          </Box>
        </Box>
        <div>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Due date
          </Typography>
          <TextField
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
            fullWidth
            size="small"
            aria-label="Due date"
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />
        </div>
      </Stack>
    </AppDrawer>
  )
}
