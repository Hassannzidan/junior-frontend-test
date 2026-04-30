import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { fetchUserById as fetchUserByIdApi, fetchUsersPage as fetchUsersPageApi } from '@/api/users.api';
import type { AppError } from '@/types/errors';
import type { ApiUser, DisplayUser } from '@/types/user';
import { mapApiUserToDisplay } from '@/utils/mapUser';

export const PAGE_SIZE = 5;

export type UsersState = {
  entities: Record<number, DisplayUser>;
  ids: number[];
  nextFetchStart: number;
  hasMore: boolean;
  totalCount: number | null;
  status: 'idle' | 'loading' | 'loadingMore' | 'succeeded';
  error: AppError | null;
  searchQuery: string;
};

/** Inline store shape avoids circular imports before `store/index` is defined */
type UsersSliceRoot = { users: UsersState };

const initialState: UsersState = {
  entities: {},
  ids: [],
  nextFetchStart: 0,
  hasMore: true,
  totalCount: null,
  status: 'idle',
  error: null,
  searchQuery: '',
};

type FetchPageResult = {
  users: ApiUser[];
  totalCount: number | null;
  append: boolean;
  requestStart: number;
};

export const fetchUsersPage = createAsyncThunk<
  FetchPageResult,
  { append: boolean },
  { rejectValue: AppError; state: UsersSliceRoot }
>('users/fetchPage', async ({ append }, thunkAPI) => {
  const state = thunkAPI.getState().users;
  const requestStart = append ? state.nextFetchStart : 0;
  try {
    const { users, totalCount } = await fetchUsersPageApi({ start: requestStart, limit: PAGE_SIZE });
    return { users, totalCount, append, requestStart };
  } catch (e) {
    return thunkAPI.rejectWithValue(e as AppError);
  }
});

export const loadUserById = createAsyncThunk<
  DisplayUser,
  number,
  { rejectValue: AppError }
>('users/loadById', async (id, thunkAPI) => {
  try {
    const raw = await fetchUserByIdApi(id);
    return mapApiUserToDisplay(raw);
  } catch (e) {
    return thunkAPI.rejectWithValue(e as AppError);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersPage.pending, (state, action) => {
        if (!action.meta.arg.append) {
          state.error = null;
          state.status = 'loading';
        } else {
          state.status = 'loadingMore';
        }
      })
      .addCase(fetchUsersPage.fulfilled, (state, action) => {
        const { users, totalCount, append, requestStart } = action.payload;
        const mapped = users.map(mapApiUserToDisplay);

        if (!append) {
          state.ids = mapped.map((u) => u.id);
          state.entities = {};
          mapped.forEach((u) => {
            state.entities[u.id] = u;
          });
        } else {
          mapped.forEach((u) => {
            if (!state.entities[u.id]) {
              state.ids.push(u.id);
            }
            state.entities[u.id] = u;
          });
        }

        if (totalCount !== null) {
          state.totalCount = totalCount;
        }

        state.nextFetchStart = requestStart + users.length;

        const pageFull = users.length === PAGE_SIZE;
        if (!pageFull || users.length === 0) {
          state.hasMore = false;
        } else if (state.totalCount !== null) {
          state.hasMore = state.nextFetchStart < state.totalCount;
        } else {
          state.hasMore = pageFull;
        }

        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchUsersPage.rejected, (state, action) => {
        state.status = state.ids.length > 0 ? 'succeeded' : 'idle';
        state.error = action.payload ?? { message: 'Failed to load users' };
      })
      .addCase(loadUserById.fulfilled, (state, action) => {
        const u = action.payload;
        state.entities[u.id] = u;
        if (!state.ids.includes(u.id)) {
          state.ids.push(u.id);
        }
      });
  },
});

export const { setSearchQuery, clearError } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

const selectUserIds = (s: UsersSliceRoot) => s.users.ids;
const selectUserEntities = (s: UsersSliceRoot) => s.users.entities;
const selectSearchQuery = (s: UsersSliceRoot) => s.users.searchQuery;

export const selectFilteredUsers = createSelector(
  [selectUserIds, selectUserEntities, selectSearchQuery],
  (ids, entities, q) => {
    const needle = q.trim().toLowerCase();
    const list = ids.map((id) => entities[id]).filter(Boolean) as DisplayUser[];
    if (!needle) return list;
    return list.filter((u) => u.name.toLowerCase().includes(needle));
  }
);

export const selectUsersError = (s: UsersSliceRoot) => s.users.error;
export const selectHasMore = (s: UsersSliceRoot) => s.users.hasMore;
export const selectUsersStatus = (s: UsersSliceRoot) => s.users.status;
export const selectUserById =
  (id: number) =>
  (s: UsersSliceRoot) =>
    s.users.entities[id];
