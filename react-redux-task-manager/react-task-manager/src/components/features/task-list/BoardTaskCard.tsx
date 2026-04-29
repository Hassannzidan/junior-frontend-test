import type { CSSProperties } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import Box from '@mui/material/Box'
import type { Task } from '../../../types/task'
import { BoardTaskCardSurface } from './BoardTaskCardSurface'

export type BoardTaskCardProps = {
  task: Task
  onDeleteTask: (taskId: string) => void
}

export function BoardTaskCard({ task, onDeleteTask }: BoardTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { type: 'task', task },
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    touchAction: 'none',
  }

  return (
    <Box ref={setNodeRef} style={style} {...listeners} {...attributes} sx={{ opacity: isDragging ? 0 : 1, cursor: isDragging ? 'grabbing' : 'grab' }}>
      <BoardTaskCardSurface task={task} showActions onDeleteTask={onDeleteTask} />
    </Box>
  )
}
