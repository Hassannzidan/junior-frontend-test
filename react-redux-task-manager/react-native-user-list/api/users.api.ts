import { apiClient } from './client';
import { http } from './http';
import type { ApiUser } from '@/types/user';

const userEndpoints = {
  users: '/users',
  userById: (id: number) => `/users/${id}`,
};

export type FetchUsersParams = {
  start: number;
  limit: number;
};

export type FetchUsersResult = {
  users: ApiUser[];
  totalCount: number | null;
};

export async function fetchUsersPage(params: FetchUsersParams): Promise<FetchUsersResult> {
  const { start, limit } = params;

  const response = await apiClient.get<ApiUser[]>(userEndpoints.users, {
    params: { _start: start, _limit: limit },
  });

  const raw = response.headers['x-total-count'];
  const parsed = typeof raw === 'string' ? parseInt(raw, 10) : NaN;
  const totalCount = Number.isFinite(parsed) ? parsed : null;

  return {
    users: response.data,
    totalCount,
  };
}

export async function fetchUserById(id: number): Promise<ApiUser> {
  return http.get<ApiUser>(userEndpoints.userById(id));
}
