import type { PriorityFilterValue } from '../constants/taskFilters'

export type TaskStatus = 'todo' | 'in_progress' | 'complete'

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: Exclude<PriorityFilterValue, 'all'>
  tags?: string[]
  dueDate?: string
}
