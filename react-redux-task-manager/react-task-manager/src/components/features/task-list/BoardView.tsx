import { useState } from 'react'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import Box from '@mui/material/Box'
import type { BoardViewProps } from '../../../types/components'
import type { TaskStatus } from '../../../types/task'
import { boardCollisionDetection, COLUMN_ORDER, findTaskById } from './taskListShared'
import { BoardColumn } from './BoardColumn'
import { BoardTaskCardSurface } from './BoardTaskCardSurface'

export function BoardView({ byStatus, onDeleteTask, onChangeTaskStatus }: BoardViewProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeTask = activeId ? findTaskById(byStatus, activeId) : null

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event
    if (!over) return
    const taskId = String(active.id)
    const overId = String(over.id)
    if (!COLUMN_ORDER.includes(overId as TaskStatus)) return
    const nextStatus = overId as TaskStatus
    const task = findTaskById(byStatus, taskId)
    if (task && task.status !== nextStatus) {
      onChangeTaskStatus(taskId, nextStatus)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={boardCollisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
          gap: 2,
          alignItems: 'flex-start',
        }}
      >
        {COLUMN_ORDER.map((status) => (
          <BoardColumn key={status} status={status} tasks={byStatus[status]} onDeleteTask={onDeleteTask} />
        ))}
      </Box>
      <DragOverlay>{activeTask ? <Box sx={{ cursor: 'grabbing', boxShadow: 6, borderRadius: 2 }}><BoardTaskCardSurface task={activeTask} showActions={false} /></Box> : null}</DragOverlay>
    </DndContext>
  )
}
