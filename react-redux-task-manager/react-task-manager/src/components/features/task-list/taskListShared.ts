import { closestCorners, pointerWithin, type CollisionDetection } from '@dnd-kit/core'
import { PRIORITY_FLAG_COLORS } from '../../../constants/taskFilters'
import type { Task, TaskStatus } from '../../../types/task'

export const COLUMN_ORDER: TaskStatus[] = ['todo', 'in_progress', 'complete']

export const LABELS: Record<TaskStatus, string> = {
  todo: 'TO DO',
  in_progress: 'IN PROGRESS',
  complete: 'COMPLETE',
}

const STATUS_BADGE_BG: Record<TaskStatus, string> = {
  todo: '#5F6375',
  in_progress: '#4086F4',
  complete: '#28C76F',
}

export type ByStatus = Record<TaskStatus, Task[]>

export function statusBadgeSx(status: TaskStatus) {
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

export function priorityFlagColor(priority: Task['priority']) {
  return PRIORITY_FLAG_COLORS[priority]
}

export const boardCollisionDetection: CollisionDetection = (args) => {
  const pointerHits = pointerWithin(args)
  if (pointerHits.length > 0) {
    return pointerHits
  }
  return closestCorners(args)
}

export function findTaskById(byStatus: ByStatus, id: string): Task | undefined {
  for (const status of COLUMN_ORDER) {
    const hit = byStatus[status].find((t) => t.id === id)
    if (hit) return hit
  }
  return undefined
}
