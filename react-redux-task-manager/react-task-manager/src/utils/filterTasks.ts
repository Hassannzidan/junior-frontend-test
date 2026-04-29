import type { PriorityFilterValue, StatusFilterValue } from '../constants/taskFilters'
import type { Task } from '../types/task'

export function filterTasks(
  tasks: Task[],
  search: string,
  priorityFilter: PriorityFilterValue,
  statusFilter: StatusFilterValue,
): Task[] {
  let result = tasks

  const q = search.trim().toLowerCase()
  if (q) {
    result = result.filter((t) => {
      const inTitle = t.title.toLowerCase().includes(q)
      const inDesc = (t.description ?? '').toLowerCase().includes(q)
      const inTags = (t.tags ?? []).some((tag) => tag.toLowerCase().includes(q))
      return inTitle || inDesc || inTags
    })
  }

  if (priorityFilter !== 'all') {
    result = result.filter((t) => t.priority === priorityFilter)
  }

  if (statusFilter === 'active') {
    result = result.filter((t) => t.status !== 'complete')
  } else if (statusFilter === 'completed') {
    result = result.filter((t) => t.status === 'complete')
  }

  return result
}
