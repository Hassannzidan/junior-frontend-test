import { describe, expect, it } from 'vitest'
import {
  addTask,
  deleteTask,
  editTask,
  setFilterPriority,
  setFilterStatus,
  setLayout,
  setSearch,
  setStatus,
  tasksReducer,
  type TasksState,
} from '../tasksSlice'

function baseState(): TasksState {
  return {
    items: [],
    filterPriority: 'all',
    filterStatus: 'all',
    layout: 'list',
    search: '',
  }
}

describe('tasksSlice reducer', () => {
  it('adds and edits a task', () => {
    const afterAdd = tasksReducer(
      baseState(),
      addTask({ title: 'Ship release', status: 'todo', priority: 'high' }),
    )
    expect(afterAdd.items).toHaveLength(1)
    const created = afterAdd.items[0]
    expect(created.title).toBe('Ship release')

    const afterEdit = tasksReducer(
      afterAdd,
      editTask({ id: created.id, title: 'Ship hotfix', status: 'in_progress', priority: 'urgent' }),
    )
    expect(afterEdit.items[0].title).toBe('Ship hotfix')
    expect(afterEdit.items[0].status).toBe('in_progress')
  })

  it('deletes and changes status', () => {
    const withTask = tasksReducer(
      baseState(),
      addTask({ title: 'Clean inbox', status: 'todo', priority: 'medium' }),
    )
    const taskId = withTask.items[0].id

    const afterStatus = tasksReducer(withTask, setStatus({ id: taskId, status: 'complete' }))
    expect(afterStatus.items[0].status).toBe('complete')

    const afterDelete = tasksReducer(afterStatus, deleteTask(taskId))
    expect(afterDelete.items).toHaveLength(0)
  })

  it('updates view filters and search text', () => {
    let state = baseState()
    state = tasksReducer(state, setFilterPriority('low'))
    state = tasksReducer(state, setFilterStatus('todo'))
    state = tasksReducer(state, setLayout('board'))
    state = tasksReducer(state, setSearch('docs'))

    expect(state.filterPriority).toBe('low')
    expect(state.filterStatus).toBe('todo')
    expect(state.layout).toBe('board')
    expect(state.search).toBe('docs')
  })
})
