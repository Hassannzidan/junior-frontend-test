import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import { usersReducer } from './usersSlice';

/** AsyncStorage has no native module on Expo web; persist via localStorage instead. */
const persistStorage =
  Platform.OS === 'web' ? createWebStorage('local') : AsyncStorage;

const usersPersistConfig = {
  key: 'users',
  storage: persistStorage,
  whitelist: ['entities', 'ids', 'nextFetchStart', 'hasMore', 'totalCount'],
};

const persistedUsersReducer = persistReducer(usersPersistConfig, usersReducer);

export const store = configureStore({
  reducer: {
    users: persistedUsersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
