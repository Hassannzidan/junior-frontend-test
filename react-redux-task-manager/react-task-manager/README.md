# React Task Manager (Web)

Production-style task management app built with React, TypeScript, and Redux Toolkit as part of the Frontend Coding Test.

## Objective

Build a web task manager that demonstrates:
- Redux state management
- CRUD task operations
- Filtering and search
- Persistent data storage
- Clean component architecture

## Tech Stack

- React 19
- TypeScript
- Redux Toolkit + React Redux
- Material UI
- Vite
- Yup (form validation)
- dnd-kit (board drag-and-drop view)

## Requirement Coverage

### 1) Redux State Management

Implemented with a dedicated `tasks` slice containing:
- task collection
- view/filter/search state
- reducers for all required operations

Task model includes:
- `id`
- `title`
- `priority`
- completion represented via `status` (`todo`, `in_progress`, `complete`)

### 2) Core Features

- Add task
- Edit task
- Delete task
- Toggle completion (complete <-> todo)
- Filter by priority (`high`, `medium`, `low`, plus `urgent` extension)
- Extra filters:
  - status filter
  - search filter across title/description/tags

### 3) Persistence

- Redux `tasks` state is persisted to `localStorage`
- state is rehydrated on app load
- includes lightweight state sanitization/migration handling

## Architecture Highlights

- `src/store/tasksSlice.ts`: core reducers and storage bootstrap logic
- `src/store/tasksSelectors.ts`: selector layer for slice reads + derived data
- `src/store/index.ts`: store configuration + persistence subscription
- `src/components/features/`: feature-oriented UI blocks
- `src/components/features/task-list/`: list and board rendering layers
- `src/utils/filterTasks.ts`: centralized filtering logic
- `src/utils/storage.ts`: guarded localStorage wrapper helpers
- `src/hooks/useTaskActions.ts`: action dispatch wrappers

## URL-Synced Task State

- Search, priority, status, and board/list mode are synchronized with URL query params.
- Search synchronization is debounced to keep browsing behavior smooth while preserving shareable links.
- Browser back/forward updates Redux state so filters and view restore correctly.

## Reliability and Safety

- App-level error boundary prevents hard crashes from unhandled render errors.
- Storage access is centralized through safe utility wrappers with graceful fallback on failures.
- Persisted state rehydration continues to sanitize legacy/invalid payloads.

## Performance Notes

- Debounced search updates before filtering
- Memoized filtered task results (`useMemo`)
- Memoized action handlers (`useCallback`)
- Efficient task grouping by status in list/board renderers

## UI/UX Enhancements (Beyond Minimum Requirements)

- Dual visualization modes (List + Kanban board)
- Drag-and-drop task movement between status columns
- Form validation with user-friendly error feedback
- Empty/search-empty states
- Polished responsive interface

## How to Run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Evaluation Readiness Summary

This project satisfies the required coding-test functionality (Redux, CRUD, filters, persistence) and adds maintainability/performance-focused engineering choices that are expected in production-oriented frontend work.
