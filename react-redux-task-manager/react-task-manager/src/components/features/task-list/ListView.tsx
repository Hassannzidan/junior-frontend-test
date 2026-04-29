import { useState } from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { COLUMN_ORDER, LABELS } from '@/constants/taskList'
import type { ListViewProps } from '@/types/components'
import type { TaskStatus } from '@/types/task'
import { ListTaskRow } from './ListTaskRow'
import { statusBadgeSx } from './taskListShared'

export function ListView({ byStatus, onDeleteTask, onChangeTaskStatus, onEditTask }: ListViewProps) {
  const [open, setOpen] = useState<Record<TaskStatus, boolean>>({
    todo: true,
    in_progress: true,
    complete: true,
  })

  return (
    <Stack spacing={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper', overflow: 'hidden' }}>
      {COLUMN_ORDER.map((status, index) => {
        const list = byStatus[status]
        const expanded = open[status]

        return (
          <Box key={status} sx={{ borderTop: index > 0 ? 1 : 0, borderColor: 'divider' }}>
            <Box
              component="div"
              role="button"
              tabIndex={0}
              onClick={() => setOpen((o) => ({ ...o, [status]: !o[status] }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpen((o) => ({ ...o, [status]: !o[status] }))
                }
              }}
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.5,
                bgcolor: theme.palette.grey[50],
                borderBottom: 1,
                borderColor: 'divider',
                cursor: 'pointer',
              })}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                {expanded ? <IconChevronDown size={20} stroke={1.75} aria-hidden /> : <IconChevronRight size={20} stroke={1.75} aria-hidden />}
              </Box>
              <Box sx={statusBadgeSx(status)}>{LABELS[status]}</Box>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 0 }}>
                {list.length}
              </Typography>
            </Box>
            <Collapse in={expanded}>
              {list.length === 0 ? (
                <Box sx={{ px: 2, py: 3, bgcolor: 'background.default', borderTop: 1, borderColor: 'divider' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    No tasks yet
                  </Typography>
                </Box>
              ) : (
                <Stack divider={<Divider flexItem sx={{ borderColor: 'divider' }} />}>
                  {list.map((task) => (
                    <ListTaskRow
                      key={task.id}
                      task={task}
                      onDeleteTask={onDeleteTask}
                      onChangeTaskStatus={onChangeTaskStatus}
                      onEditTask={onEditTask}
                    />
                  ))}
                </Stack>
              )}
            </Collapse>
          </Box>
        )
      })}
    </Stack>
  )
}
