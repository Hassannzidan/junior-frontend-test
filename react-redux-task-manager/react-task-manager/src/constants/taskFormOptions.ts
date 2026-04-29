import { PRIORITY_FLAG_COLORS } from './taskFilters'

export const TASK_FORM_STATUS_OPTIONS = [
  { value: 'todo', label: 'To do' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'complete', label: 'Complete' },
] as const

export type TaskFormStatusValue = (typeof TASK_FORM_STATUS_OPTIONS)[number]['value']

export const TASK_FORM_PRIORITY_OPTIONS = [
  { value: 'urgent', label: 'Urgent', flagColor: PRIORITY_FLAG_COLORS.urgent },
  { value: 'high', label: 'High', flagColor: PRIORITY_FLAG_COLORS.high },
  { value: 'medium', label: 'Medium', flagColor: PRIORITY_FLAG_COLORS.medium },
  { value: 'low', label: 'Low', flagColor: PRIORITY_FLAG_COLORS.low },
] as const

export type TaskFormPriorityValue = (typeof TASK_FORM_PRIORITY_OPTIONS)[number]['value']
