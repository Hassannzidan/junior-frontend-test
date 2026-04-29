import Box from '@mui/material/Box'
import { Header } from './components/Header'
import { ManagerBar } from './components/ManagerBar'
import { WorkspaceHeader } from './components/WorkspaceHeader'

/** Demo counts until task state is wired (e.g. Redux). */
const DEMO_ITEMS_LENGTH = 4
const DEMO_COMPLETED = 1

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <WorkspaceHeader>
        <Header totalTasks={DEMO_ITEMS_LENGTH} completedTasks={DEMO_COMPLETED} />
        <ManagerBar />
      </WorkspaceHeader>
    </Box>
  )
}
