import type { ReactNode } from 'react'
import type { ButtonProps } from '@mui/material/Button'
import type { DrawerProps } from '@mui/material/Drawer'
import type { SxProps, Theme } from '@mui/material/styles'
import type { PriorityFilterValue, StatusFilterValue } from '../constants/taskFilters'
import type { Task, TaskStatus } from './task'

export type ViewMode = 'list' | 'board'

export type ViewModeToggleProps = {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export type FilterOption<T extends string = string> = {
  value: T
  label: string
  flagColor?: string
}

export type FilterValueUnion<Options extends readonly FilterOption<string>[]> = Options[number]['value']

export type FilterSelectProps<Options extends readonly FilterOption<string>[] = readonly FilterOption[]> = {
  value: FilterValueUnion<Options>
  onChange: (value: FilterValueUnion<Options>) => void
  options: Options
  ariaLabel: string
}

export type AppDrawerProps = {
  open: boolean
  onClose: DrawerProps['onClose']
  header: ReactNode
  children: ReactNode
  footer: ReactNode
  anchor?: DrawerProps['anchor']
  width?: { xs?: number | string; sm?: number | string }
}

export type AppDrawerHeaderRowProps = {
  title: ReactNode
  actions?: ReactNode
}

export type LogoProps = {
  sx?: SxProps<Theme>
}

export type PrimaryPillButtonProps = Omit<ButtonProps, 'variant' | 'color'> & {
  children: ReactNode
}

export type SearchFieldProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  'aria-label'?: string
}

export type WorkspaceHeaderProps = {
  children: ReactNode
}

export type ManagerBarProps = {
  view: ViewMode
  onViewChange: (mode: ViewMode) => void
  search: string
  onSearchChange: (value: string) => void
  priority: PriorityFilterValue
  onPriorityChange: (value: PriorityFilterValue) => void
  status: StatusFilterValue
  onStatusChange: (value: StatusFilterValue) => void
  onAddTask: (task: Omit<Task, 'id'>) => void
}

export type HeaderProps = {
  totalTasks: number
  completedTasks: number
}

export type WorkspaceMainProps = {
  tasks: Task[]
  view: ViewMode
  onToggleComplete: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
  onChangeTaskStatus: (taskId: string, status: TaskStatus) => void
  noSearchResults?: boolean
  searchQuery?: string
}

export type NewTaskDrawerProps = {
  open: boolean
  onClose: () => void
  onAddTask: (task: Omit<Task, 'id'>) => void
}

/** Tasks grouped by workflow column (board / list views). */
export type ByStatus = Record<TaskStatus, Task[]>

export type BoardViewProps = {
  byStatus: ByStatus
  taskById: Map<string, Task>
  onDeleteTask: (taskId: string) => void
  onChangeTaskStatus: (taskId: string, status: TaskStatus) => void
}

export type TaskListProps = {
  tasks: Task[]
  view: ViewMode
  onToggleComplete?: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
  onChangeTaskStatus: (taskId: string, status: TaskStatus) => void
  noSearchResults?: boolean
  searchQuery?: string
}

export type ListViewProps = {
  byStatus: ByStatus
  onToggleComplete?: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
  onChangeTaskStatus: (taskId: string, status: TaskStatus) => void
}

export type BoardTaskCardProps = {
  task: Task
  onDeleteTask: (taskId: string) => void
}

export type BoardTaskCardSurfaceProps = {
  task: Task
  showActions: boolean
  onDeleteTask?: (taskId: string) => void
}

export type BoardColumnProps = {
  status: TaskStatus
  tasks: Task[]
  onDeleteTask: (taskId: string) => void
}

export type ListTaskRowProps = {
  task: Task
  onToggleComplete?: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
  onChangeTaskStatus: (taskId: string, status: TaskStatus) => void
}
