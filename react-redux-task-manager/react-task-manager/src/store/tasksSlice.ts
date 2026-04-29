import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'
import type { PriorityFilterValue, StatusFilterValue } from '../constants/taskFilters'
import type { Task, TaskStatus } from '../types/task'
import type { ViewMode } from '../types/components'

export interface TasksState {
  items: Task[]
  filterPriority: PriorityFilterValue
  filterStatus: StatusFilterValue
  layout: ViewMode
  search: string
}

/** Bumped when persisted shape changes or to drop legacy/demo caches (see legacy removal in loadState). */
export const STORAGE_KEY = 'tasks_state_v3'

const LEGACY_STORAGE_KEYS = ['tasks_state_v2'] as const

const VALID_TASK_STATUSES: TaskStatus[] = ['todo', 'in_progress', 'complete']

function sanitizeLoadedTask(raw: unknown): Task | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (typeof o.id !== 'string' || typeof o.title !== 'string') return null
  const status = VALID_TASK_STATUSES.includes(o.status as TaskStatus)
    ? (o.status as TaskStatus)
    : 'todo'
  const priorityVals: Task['priority'][] = ['urgent', 'high', 'medium', 'low']
  const priority = priorityVals.includes(o.priority as Task['priority'])
    ? (o.priority as Task['priority'])
    : 'medium'
  const tags =
    Array.isArray(o.tags) && o.tags.every((x) => typeof x === 'string')
      ? (o.tags as string[])
      : undefined
  return {
    id: o.id,
    title: o.title,
    description: typeof o.description === 'string' ? o.description : undefined,
    status,
    priority,
    dueDate: typeof o.dueDate === 'string' ? o.dueDate : undefined,
    tags,
  }
}

const defaultState = (): TasksState => ({
  items: [],
  filterPriority: 'all',
  filterStatus: 'all',
  layout: 'list',
  search: '',
})

const loadState = (): TasksState => {
  try {
    for (const key of LEGACY_STORAGE_KEYS) {
      localStorage.removeItem(key)
    }
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<TasksState>
      const rawItems = Array.isArray(parsed.items) ? parsed.items : []
      const items = rawItems.map(sanitizeLoadedTask).filter((t): t is Task => t !== null)

      const priorityOk = (
        v: unknown,
      ): v is PriorityFilterValue =>
        v === 'all' || v === 'urgent' || v === 'high' || v === 'medium' || v === 'low'

      const statusOk = (v: unknown): v is StatusFilterValue =>
        v === 'all' || v === 'todo' || v === 'in_progress' || v === 'complete'

      const migrateFilterStatus = (v: unknown): StatusFilterValue => {
        if (v === 'completed') return 'complete'
        if (v === 'active') return 'all'
        return statusOk(v) ? v : 'all'
      }

      return {
        ...defaultState(),
        ...parsed,
        items,
        filterPriority: priorityOk(parsed.filterPriority) ? parsed.filterPriority : 'all',
        filterStatus: migrateFilterStatus(parsed.filterStatus),
        layout: parsed.layout === 'board' ? 'board' : 'list',
        search: typeof parsed.search === 'string' ? parsed.search : '',
      }
    }
  } catch {
    /* ignore */
  }
  return defaultState()
}

export type NewTaskInput = {
  title: string
  description?: string
  status: TaskStatus
  priority: Task['priority']
  dueDate?: string
  tags?: string[]
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: loadState(),
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.items.unshift(action.payload)
      },
      prepare(input: NewTaskInput) {
        const task: Task = {
          id: nanoid(),
          title: input.title,
          description: input.description,
          status: input.status,
          priority: input.priority,
          dueDate: input.dueDate,
          tags: input.tags,
        }
        return { payload: task }
      },
    },
    editTask(state, action: PayloadAction<{ id: string } & Partial<NewTaskInput>>) {
      const t = state.items.find((x) => x.id === action.payload.id)
      if (!t) return
      const { id: _id, ...rest } = action.payload
      Object.assign(t, rest)
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((task) => task.id !== action.payload)
    },
    toggleTask(state, action: PayloadAction<string>) {
      const t = state.items.find((x) => x.id === action.payload)
      if (!t) return
      if (t.status === 'complete') {
        t.status = 'todo'
      } else {
        t.status = 'complete'
      }
    },
    setStatus(state, action: PayloadAction<{ id: string; status: TaskStatus }>) {
      const t = state.items.find((x) => x.id === action.payload.id)
      if (!t) return
      t.status = action.payload.status
    },
    setFilterPriority(state, action: PayloadAction<PriorityFilterValue>) {
      state.filterPriority = action.payload
    },
    setFilterStatus(state, action: PayloadAction<StatusFilterValue>) {
      state.filterStatus = action.payload
    },
    setLayout(state, action: PayloadAction<ViewMode>) {
      state.layout = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
  },
})

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTask,
  setStatus,
  setFilterPriority,
  setFilterStatus,
  setLayout,
  setSearch,
} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer
