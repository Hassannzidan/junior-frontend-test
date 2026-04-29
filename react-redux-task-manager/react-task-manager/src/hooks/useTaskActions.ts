import { useCallback } from 'react'
import {
  addTask,
  deleteTask,
  setFilterPriority,
  setFilterStatus,
  setSearch,
  setStatus,
  toggleTask,
} from '../store/tasksSlice'
import { useAppDispatch } from '../store'
import type { Task, TaskStatus } from '../types/task'

export function useTaskActions() {
  const dispatch = useAppDispatch()

  const handleToggleComplete = useCallback(
    (taskId: string) => {
      dispatch(toggleTask(taskId))
    },
    [dispatch],
  )

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      dispatch(deleteTask(taskId))
    },
    [dispatch],
  )

  const handleChangeTaskStatus = useCallback(
    (taskId: string, nextStatus: TaskStatus) => {
      dispatch(setStatus({ id: taskId, status: nextStatus }))
    },
    [dispatch],
  )

  const handleAddTask = useCallback(
    (task: Omit<Task, 'id'>) => {
      dispatch(addTask(task))
      dispatch(setSearch(''))
      dispatch(setFilterPriority('all'))
      dispatch(setFilterStatus('all'))
    },
    [dispatch],
  )

  return {
    handleToggleComplete,
    handleDeleteTask,
    handleChangeTaskStatus,
    handleAddTask,
  }
}
