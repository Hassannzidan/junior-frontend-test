import { closestCorners, pointerWithin, type CollisionDetection } from '@dnd-kit/core'
import { PRIORITY_FLAG_COLORS } from '@/constants/taskFilters'
import { STATUS_BADGE_BG } from '@/constants/taskList'
import type { Task, TaskStatus } from '@/types/task'

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
