import type { TaskStatus } from '@/types/task'

/** Board / list column order (left to right). */
export const COLUMN_ORDER: TaskStatus[] = ['todo', 'in_progress', 'complete']

/** Short labels shown on column headers and list section titles. */
export const LABELS: Record<TaskStatus, string> = {
  todo: 'TO DO',
  in_progress: 'IN PROGRESS',
  complete: 'COMPLETE',
}

/** Background colors for status badges — sourced from theme tokens. */
export { taskStatusBadgeBg as STATUS_BADGE_BG } from '@/theme/tokens/colors'
