import { useCallback } from 'react'
import {
  addTask,
  deleteTask,
  editTask,
  setFilterPriority,
  setFilterStatus,
  setSearch,
  setStatus,
} from '../store/tasksSlice'
import { useAppDispatch } from '../store'
import type { Task, TaskStatus } from '../types/task'

export function useTaskActions() {
  const dispatch = useAppDispatch()

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

  const handleEditTask = useCallback(
    (taskId: string, updates: Omit<Task, 'id'>) => {
      dispatch(
        editTask({
          id: taskId,
          title: updates.title,
          description: updates.description,
          status: updates.status,
          priority: updates.priority,
          dueDate: updates.dueDate,
        }),
      )
    },
    [dispatch],
  )

  return {
    handleDeleteTask,
    handleChangeTaskStatus,
    handleAddTask,
    handleEditTask,
  }
}
