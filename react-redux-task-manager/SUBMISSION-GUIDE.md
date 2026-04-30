# Frontend Projects Documentation (HR / Reviewer Guide)

This file is a quick navigation and evaluation guide for both submitted projects.

## Projects

### Web Project: React Task Manager

- **Folder:** [`react-task-manager`](./react-task-manager)
- **Project README:** [`react-task-manager/README.md`](./react-task-manager/README.md)
- **What it demonstrates:**
  - Redux state management
  - Task CRUD operations
  - Priority filtering
  - localStorage persistence
  - polished UI and maintainable component structure

### Mobile Project: React Native User List

- **Folder:** [`react-native-user-list`](./react-native-user-list)
- **Project README:** [`react-native-user-list/README.md`](./react-native-user-list/README.md)
- **What it demonstrates:**
  - Redux Toolkit + async thunks
  - API integration (`jsonplaceholder`)
  - offline caching (`redux-persist` + `AsyncStorage`)
  - `FlatList` optimization
  - search + pagination + transformed address mapping

### Web Demo

- **Demo GIF:**
  - ![Web Demo](test-web.gif)


### Mobile Demo

- **Video:** [Add mobile demo video link](#)
- **Screenshots:**
  - ![Mobile - User List](./docs/screenshots/mobile-user-list.png)
  - ![Mobile - Search](./docs/screenshots/mobile-search.png)
  - ![Mobile - Details](./docs/screenshots/mobile-user-details.png)

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

## Reviewer Navigation

For complete technical details, start from:
- [`react-task-manager/README.md`](./react-task-manager/README.md)
- [`react-native-user-list/README.md`](./react-native-user-list/README.md)
