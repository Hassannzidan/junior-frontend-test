import axios from 'axios';

import { setupInterceptors } from '@/api/interceptors';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

setupInterceptors(apiClient);
