import * as yup from 'yup'
import {
  NEW_TASK_FORM_FIELD_LIMITS,
  TASK_FORM_PRIORITY_OPTIONS,
  TASK_FORM_STATUS_OPTIONS,
  type TaskFormPriorityValue,
  type TaskFormStatusValue,
} from '../constants/taskFormOptions'
import type { Task } from '../types/task'
import { dueDateDisplayToInput } from '../utils/date'

const TASK_STATUS_VALUES = TASK_FORM_STATUS_OPTIONS.map((o) => o.value)
const TASK_PRIORITY_VALUES = TASK_FORM_PRIORITY_OPTIONS.map((o) => o.value)

const { titleMax, descriptionMax } = NEW_TASK_FORM_FIELD_LIMITS

export const newTaskFormSchema = yup.object({
  title: yup.string().trim().min(1, 'Enter a task name').max(titleMax, 'Task name is too long'),
  description: yup.string().trim().max(descriptionMax, 'Description is too long'),
  status: yup.string().oneOf(TASK_STATUS_VALUES).required(),
  priority: yup.string().oneOf(TASK_PRIORITY_VALUES).required(),
  dueDate: yup.string(),
})

export type NewTaskFormState = {
  title: string
  description: string
  status: TaskFormStatusValue
  priority: TaskFormPriorityValue
  dueDate: string
}

export const newTaskFormEmpty: NewTaskFormState = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
}

export function taskToNewTaskFormState(task: Task): NewTaskFormState {
  return {
    title: task.title,
    description: task.description ?? '',
    status: task.status,
    priority: task.priority,
    dueDate: dueDateDisplayToInput(task.dueDate),
  }
}

export type NewTaskFormFieldErrors = {
  title?: string
  description?: string
}

export function newTaskFormFieldErrors(err: yup.ValidationError): NewTaskFormFieldErrors {
  const items = err.inner.length ? err.inner : [{ path: err.path, message: err.message }]
  const title = items.find((e) => e.path === 'title')?.message
  const description = items.find((e) => e.path === 'description')?.message
  return { ...(title ? { title } : {}), ...(description ? { description } : {}) }
}
