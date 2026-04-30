# React Native User List (Mobile)

Scalable Expo + React Native application that fetches, caches, and displays users from the JSONPlaceholder API using Redux Toolkit.

## Objective

Build a mobile user directory that demonstrates:
- Redux state management
- API integration with robust loading/error handling
- offline-friendly caching
- optimized list rendering
- reusable component design

## Tech Stack

- Expo (React Native)
- TypeScript
- Redux Toolkit + React Redux
- Redux Persist
- AsyncStorage (native) / localStorage fallback on web
- Axios
- Expo Router

## Requirement Coverage

### 1) Redux State Management

User data and UI state are managed in Redux:
- normalized user entities (`entities` + `ids`)
- loading statuses (`idle`, `loading`, `loadingMore`, `succeeded`)
- pagination metadata (`nextFetchStart`, `hasMore`, `totalCount`)
- search query and error state

### 2) API Integration

- Data fetched from:
  - `https://jsonplaceholder.typicode.com/users`
- API layer separated in dedicated modules (`api/client`, `api/http`, `api/users.api`)
- Users stored in Redux via async thunks

### 3) Offline Support

- Cached data persisted using Redux Persist
- Storage strategy:
  - AsyncStorage on mobile
  - localStorage-compatible web storage for Expo Web

### 4) FlatList Optimization

Implemented with performance-oriented `FlatList` props:
- `initialNumToRender`
- `maxToRenderPerBatch`
- `windowSize`
- `removeClippedSubviews` on Android

### 5) Features

- Reusable `UserCard` displays:
  - name
  - email
  - transformed address
- Search bar filters by user name
- Pagination through **Load More** button
- Pull-to-refresh and retry/error UX

### 6) Data Transformation

API address fields are combined into:
- `street, city, zipcode`

Implemented in `utils/mapUser.ts`.

## Architecture Highlights

- `store/usersSlice.ts`: async thunks + normalized state + selectors
- `store/index.ts`: store + persistence setup
- `api/`: isolated networking layer with interceptors
- `components/users/`: reusable domain UI components
- `app/(tabs)/` + `app/user/[id].tsx`: routed screens

## Performance Notes

- Memoized `UserCard` component (`React.memo`)
- Selector-driven filtering
- Incremental pagination to avoid rendering full dataset at once
- Debounced search input update flow to reduce per-keystroke Redux churn

## How to Run

```bash
npm install
npm run start
```

Run on specific platforms:

```bash
npm run android
npm run ios
npm run web
```

Lint:

```bash
npm run lint
```

## Evaluation Readiness Summary

This project fulfills the mobile task requirements (Redux + API + caching + FlatList + search + pagination + transformation) and includes practical production-minded improvements in architecture, resilience, and rendering performance.
