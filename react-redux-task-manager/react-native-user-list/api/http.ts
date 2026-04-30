import type { AxiosRequestConfig } from 'axios';

import { apiClient } from './client';

export const http = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return apiClient.get<T>(url, config).then((r) => r.data);
  },

  post<T, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig) {
    return apiClient.post<T>(url, data, config).then((r) => r.data);
  },

  put<T, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig) {
    return apiClient.put<T>(url, data, config).then((r) => r.data);
  },

  patch<T, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig) {
    return apiClient.patch<T>(url, data, config).then((r) => r.data);
  },

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return apiClient.delete<T>(url, config).then((r) => r.data);
  },
};
