import type { PriorityFilterValue } from '../constants/taskFilters'

/** Kanban / list column */
export type TaskStatus = 'todo' | 'in_progress' | 'complete'

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  /** Used by priority filter */
  priority: Exclude<PriorityFilterValue, 'all'>
  tags?: string[]
  /** Short label e.g. "Feb 4" */
  dueDate?: string
}
