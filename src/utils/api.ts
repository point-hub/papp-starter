import axios, { AxiosError } from 'axios';
import qs from 'qs';
import { UAParser } from 'ua-parser-js';

import api from '@/config/api';
import { useAuthStore } from '@/stores/auth.store';

const UNHANDLED_ERROR_MESSAGE = 'Something went wrong';
const UNHANDLED_ERROR_LISTS = [
  'Try refreshing the page.',
  'If it keeps happening, contact support for help.',
];

export interface IHandleErrorResponse {
  message?: string
  lists?: string[]
  errors?: { [key: string]: string[] }
}

export interface IHandleError {
  (error: unknown): IHandleErrorResponse
}

const instance = axios.create({
  baseURL: api.baseURL,
  timeout: api.timeout * 1000,
  paramsSerializer: (params) => qs.stringify(params, { allowDots: true }),
  withCredentials: true,
});

instance.defaults.headers.common['Cache-Control'] = 'no-cache';

// ----------------------------------------------------
// Request Logging
// ----------------------------------------------------
instance.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log('Request:', config.url, config);
  }
  const userAgent = new UAParser().getResult();
  config.headers = config.headers ?? {};
  config.headers['client-user-agent'] = JSON.stringify({
    browser: {
      type: userAgent.browser.type,
      name: userAgent.browser.name,
      version: userAgent.browser.version,
    },
    os: {
      name: userAgent.os.name,
      version: userAgent.os.version,
    },
    device: {
      type: userAgent.device.type,
      model: userAgent.device.model,
      vendor: userAgent.device.vendor,
    },
  });

  return config;
}, (error) => {
  if (import.meta.env.DEV) {
    console.log('Request Error:', error);
  }
  return Promise.reject(error);
});

// ----------------------------------------------------
// Refresh Token Queue Handling
// ----------------------------------------------------
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ----------------------------------------------------
// Response Interceptor (Handles 401)
// ----------------------------------------------------
instance.interceptors.response.use((response) => response, async (error) => {
  const authStore = useAuthStore();
  const originalRequest = error.config;

  // If refresh token itself failed
  if (error.config.url.includes('/auth/refresh')) {
    await authStore.signout();
    return Promise.reject(error);
  }

  // If unauthorized (401)
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    // If refresh already running → queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => {
        return instance(originalRequest);
      }).catch(() => {
        return Promise.reject();
      });
    }

    // Start refresh process
    isRefreshing = true;
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await authStore.refreshToken();
          // Retry all queued requests
          processQueue(null, null);
          resolve(instance(originalRequest));
        } catch (refreshErr) {
          processQueue(refreshErr, null);
          await authStore.signout();
          reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      })(); // Execute the async function immediately
    });
  }
  return Promise.reject(error);
});

// ----------------------------------------------------
// Error Handler
// ----------------------------------------------------
export const handleError: IHandleError = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    return { message: UNHANDLED_ERROR_MESSAGE, lists: UNHANDLED_ERROR_LISTS };
  }

  if (!error.response) {
    return { message: UNHANDLED_ERROR_MESSAGE, lists: UNHANDLED_ERROR_LISTS };
  }

  if (error.response.status === 404) {
    return { message: 'Data Not Found' };
  }

  if (error.response.status === 500) {
    return { message: UNHANDLED_ERROR_MESSAGE, lists: UNHANDLED_ERROR_LISTS };
  }

  const message = error.response.data?.message;
  const errors = error.response.data?.errors;

  return { message, errors };
};

export const apiRequest = instance;

export default { apiRequest: instance, handleError };
