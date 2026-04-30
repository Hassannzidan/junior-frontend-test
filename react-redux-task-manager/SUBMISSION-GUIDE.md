  # Frontend Projects Documentation (Reviewer Guide)

  This file is a quick navigation and evaluation guide for both submitted projects.

  ## Projects

  <details>
  <summary><strong>Web Project: React Task Manager</strong></summary>

  - **Folder:** [`react-task-manager`](./react-task-manager)
  - **Project README:** [`react-task-manager/README.md`](./react-task-manager/README.md)
  - **What it demonstrates:**
    - Redux state management
    - Task CRUD operations
    - Priority filtering
    - localStorage persistence
    - polished UI and maintainable component structure
  </details>

  <details>
  <summary><strong>Mobile Project: React Native User List</strong></summary>

  - **Folder:** [`react-native-user-list`](./react-native-user-list)
  - **Project README:** [`react-native-user-list/README.md`](./react-native-user-list/README.md)
  - **What it demonstrates:**
    - Redux Toolkit + async thunks
    - API integration (`jsonplaceholder`)
    - offline caching (`redux-persist` + `AsyncStorage`)
    - `FlatList` optimization
    - search + pagination + transformed address mapping
  </details>

  ### Web Demo

  - **Web GIF:**
<img width="1908" height="878" alt="test-web" src="https://github.com/user-attachments/assets/a6aafa75-54af-415e-912a-909b5beedfb6" />

| View | Demo |
| --- | --- |
| **Responsive** | <img width="395" height="823" alt="image" src="https://github.com/user-attachments/assets/421dbabc-5831-4d4e-b121-e3426b24547f" /> |
| **Mobile Demo** | <img width="384" height="848" alt="test-mobile" src="https://github.com/user-attachments/assets/d034896e-c4b8-42b9-8a43-4071ccd0a0be" /> |

    

  ## Installation

  ### Prerequisites

  - [Node.js (LTS)](https://nodejs.org/)
  - npm
  - For mobile testing:
    - [Expo Go](https://expo.dev/go), and/or Android/iOS emulator

  ### Setup and Run (Web)

  ```bash
  cd react-task-manager
  npm install
  npm run dev
  ```

  ### Setup and Run (Mobile)

  ```bash
  cd react-native-user-list
  npm install
  npm run start
  ```

  Optional commands:

  ```bash
  npm run android
  npm run ios
  npm run web
  ```

  ## Technical Highlights

  - **Architecture:** Feature-based component organization with dedicated store slices.
  - **State Management:** Redux Toolkit in both projects.
  - **Persistence:** localStorage (web), Redux Persist + AsyncStorage (mobile).
  - **Performance:** Debounced search, memoized render paths, paginated loading, and optimized list rendering.
  - **Code Quality:** TypeScript usage, reusable UI components, isolated API layer, and clear separation of concerns.
  - Added selector layer (`tasksSelectors`) for stable derived-state access.
  - Synced filters/search/layout to URL for shareable state + browser navigation consistency.
  - Added app-level error boundary and safe storage wrappers for runtime resilience.
  - Added focused tests for reducers/selectors/storage to lock in core behavior.

  ## Reviewer Navigation

  For complete technical details, start from:
  - [`react-task-manager/README.md`](./react-task-manager/README.md)
  - [`react-native-user-list/README.md`](./react-native-user-list/README.md)
