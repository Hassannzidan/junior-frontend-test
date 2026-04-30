import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './index'
import { filterTasks } from '../utils/filterTasks'

export const selectTasksState = (state: RootState) => state.tasks

export const selectTasks = createSelector(selectTasksState, (tasksState) => tasksState.items)
export const selectTaskLayout = createSelector(selectTasksState, (tasksState) => tasksState.layout)
export const selectTaskSearch = createSelector(selectTasksState, (tasksState) => tasksState.search)
export const selectTaskPriorityFilter = createSelector(
  selectTasksState,
  (tasksState) => tasksState.filterPriority,
)
export const selectTaskStatusFilter = createSelector(
  selectTasksState,
  (tasksState) => tasksState.filterStatus,
)

export const selectCompletedTasksCount = createSelector(selectTasks, (tasks) => {
  return tasks.filter((task) => task.status === 'complete').length
})

export const selectFilteredTasks = createSelector(
  [
    selectTasks,
    selectTaskSearch,
    selectTaskPriorityFilter,
    selectTaskStatusFilter,
  ],
  (tasks, search, priority, status) => filterTasks(tasks, search, priority, status),
)
