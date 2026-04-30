import {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

import type { AppError } from '@/types/errors';

function toAppError(error: unknown): AppError {
  if (isAxiosError(error)) {
    const ax = error as AxiosError<{ message?: string }>;
    const status = ax.response?.status;
    const data = ax.response?.data;
    let message =
      (typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string'
        ? data.message
        : null) ??
      ax.message ??
      'Request failed';

    if (status === 404) message = 'Resource not found';
    else if (status === 500) message = 'Server error. Please try again later';
    else if (ax.code === 'ECONNABORTED' || ax.message?.includes('Network Error')) {
      message = 'Network error. Check your connection';
    }

    return {
      message,
      status,
      code: ax.code,
      details: data,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'An unexpected error occurred' };
}

export function setupInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => config,
    (error) => Promise.reject(toAppError(error))
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(toAppError(error))
  );
}
