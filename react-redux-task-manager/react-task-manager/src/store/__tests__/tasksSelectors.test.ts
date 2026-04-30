import { describe, expect, it } from 'vitest'
import {
  selectCompletedTasksCount,
  selectFilteredTasks,
  selectTaskLayout,
  selectTaskPriorityFilter,
  selectTaskSearch,
  selectTaskStatusFilter,
  selectTasks,
} from '../tasksSelectors'
import type { RootState } from '../index'

function createState(): RootState {
  return {
    tasks: {
      items: [
        { id: '1', title: 'Write docs', status: 'todo', priority: 'medium' },
        { id: '2', title: 'Fix production bug', status: 'complete', priority: 'urgent' },
        { id: '3', title: 'Release notes', status: 'in_progress', priority: 'high' },
      ],
      filterPriority: 'urgent',
      filterStatus: 'all',
      layout: 'board',
      search: 'bug',
    },
  } as RootState
}

describe('tasksSelectors', () => {
  it('returns atomic slice values', () => {
    const state = createState()
    expect(selectTasks(state)).toHaveLength(3)
    expect(selectTaskLayout(state)).toBe('board')
    expect(selectTaskSearch(state)).toBe('bug')
    expect(selectTaskPriorityFilter(state)).toBe('urgent')
    expect(selectTaskStatusFilter(state)).toBe('all')
  })

  it('computes derived values', () => {
    const state = createState()
    expect(selectCompletedTasksCount(state)).toBe(1)
    expect(selectFilteredTasks(state).map((task) => task.id)).toEqual(['2'])
  })
})
