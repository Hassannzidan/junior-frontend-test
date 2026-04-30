import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { IconX } from '@tabler/icons-react'
import * as yup from 'yup'
import {
  AppDrawer,
  AppDrawerHeaderRow,
  FilterSelect,
  FormFieldBlock,
  PrimaryPillButton,
} from '@/components/ui'
import {
  NEW_TASK_FORM_FIELD_LIMITS,
  TASK_FORM_PRIORITY_OPTIONS,
  TASK_FORM_STATUS_OPTIONS,
  type TaskFormPriorityValue,
  type TaskFormStatusValue,
} from '@/constants/taskFormOptions'
import type { TaskFormDrawerProps } from '@/types/components'
import { dueDateFromInput } from '@/utils/date'
import {
  newTaskFormEmpty,
  newTaskFormFieldErrors,
  newTaskFormSchema,
  taskToNewTaskFormState,
  type NewTaskFormFieldErrors,
  type NewTaskFormState,
} from '@/validation/newTaskForm'

const { titleMax, descriptionMax } = NEW_TASK_FORM_FIELD_LIMITS

export function TaskFormDrawer({
  open,
  initialTask,
  formResetKey,
  onClose,
  onAddTask,
  onEditTask,
}: TaskFormDrawerProps) {
  const isEdit = Boolean(initialTask)
  const [form, setForm] = useState<NewTaskFormState>(newTaskFormEmpty)
  const [fieldErrors, setFieldErrors] = useState<NewTaskFormFieldErrors>({})
  const [appliedResetKey, setAppliedResetKey] = useState<number | null>(null)

  if (open && appliedResetKey !== formResetKey) {
    setAppliedResetKey(formResetKey)
    setForm(initialTask ? taskToNewTaskFormState(initialTask) : newTaskFormEmpty)
    setFieldErrors({})
  }

  const handleSubmit = () => {
    try {
      const data = newTaskFormSchema.validateSync(form, { abortEarly: false, stripUnknown: true })
      setFieldErrors({})
      const descriptionTrimmed = (data.description ?? '').trim()
      const payload = {
        title: data.title ?? '',
        description: descriptionTrimmed === '' ? undefined : descriptionTrimmed,
        status: data.status as TaskFormStatusValue,
        priority: data.priority as TaskFormPriorityValue,
        dueDate: dueDateFromInput(data.dueDate ?? ''),
      }
      if (initialTask) {
        onEditTask(initialTask.id, payload)
      } else {
        onAddTask(payload)
      }
      onClose()
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setFieldErrors(newTaskFormFieldErrors(err))
      } else {
        throw err
      }
    }
  }

  return (
    <AppDrawer
      open={open}
      onClose={() => onClose()}
      header={
        <AppDrawerHeaderRow
          title={
            <Typography component="h2" variant="h6" sx={{ fontWeight: 600 }}>
              {isEdit ? 'Edit task' : 'New task'}
            </Typography>
          }
          actions={
            <IconButton edge="end" aria-label="Close" onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
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
            {isEdit ? 'Save changes' : 'Add task'}
          </PrimaryPillButton>
        </Stack>
      }
    >
      <Stack spacing={2.5}>
        <FormFieldBlock label="Task name">
          <TextField
            value={form.title}
            onChange={(e) => {
              setForm((f) => ({ ...f, title: e.target.value }))
              if (fieldErrors.title) setFieldErrors((prev) => ({ ...prev, title: undefined }))
            }}
            placeholder="What needs to be done?"
            fullWidth
            size="small"
            error={Boolean(fieldErrors.title)}
            helperText={fieldErrors.title}
            aria-label="Task name"
            slotProps={{ htmlInput: { 'aria-required': true, maxLength: titleMax } }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </FormFieldBlock>
        <FormFieldBlock label="Description">
          <TextField
            value={form.description}
            onChange={(e) => {
              setForm((f) => ({ ...f, description: e.target.value }))
              if (fieldErrors.description) setFieldErrors((errs) => ({ ...errs, description: undefined }))
            }}
            placeholder="Add details…"
            fullWidth
            size="small"
            multiline
            minRows={3}
            error={Boolean(fieldErrors.description)}
            helperText={fieldErrors.description}
            aria-label="Task description"
            slotProps={{ htmlInput: { maxLength: descriptionMax } }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </FormFieldBlock>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2.5, alignItems: 'stretch' }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <FormFieldBlock label="Status">
            <FilterSelect value={form.status} onChange={(value) => setForm((f) => ({ ...f, status: value }))} options={TASK_FORM_STATUS_OPTIONS} ariaLabel="Task status" />
            </FormFieldBlock>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <FormFieldBlock label="Priority">
            <FilterSelect value={form.priority} onChange={(value) => setForm((f) => ({ ...f, priority: value }))} options={TASK_FORM_PRIORITY_OPTIONS} ariaLabel="Task priority" />
            </FormFieldBlock>
          </Box>
        </Box>
        <FormFieldBlock label="Due date">
          <TextField
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
            fullWidth
            size="small"
            aria-label="Due date"
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </FormFieldBlock>
      </Stack>
    </AppDrawer>
  )
}
