import type { Task } from '../types/task'

/** Sample data aligned with list/board reference layouts */
export const DEMO_TASKS: Task[] = [
  {
    id: '1',
    title: 'hassan',
    description: 'this is sparata',
    status: 'todo',
    priority: 'medium',
    dueDate: 'Feb 4',
  },
  {
    id: '2',
    title: 'Welcome to your ClickUp-style workspace',
    description:
      'Click any task to view details, or use the New Task button.',
    status: 'todo',
    priority: 'low',
    tags: ['onboarding'],
  },
  {
    id: '3',
    title: 'Try switching between List and Board views',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Filter tasks by priority',
    status: 'complete',
    priority: 'low',
  },
]
