import axios, { AxiosError } from 'axios'

import api from '@/config/api'

const UNHANDLED_ERROR_MESSAGE = 'Something went wrong'
const UNHANDLED_ERROR_LISTS = [
  'Try refreshing the page.',
  'Wait a few minutes and try again.',
  'If it keeps happening, contact support for help.'
]

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
  timeout: api.timeout
})

instance.defaults.headers.common['Cache-Control'] = `no-cache`
instance.defaults.withCredentials = true

instance.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log('Request: ', config.url)
      console.log('Request: ', config)
    }
    return config
  },
  function (error) {
    if (import.meta.env.DEV) {
      console.log('Response Error: ', error.response)
    }
    return Promise.reject(error.response)
  }
)

export const handleError: IHandleError = (error: unknown) => {
  // Generic error outside axios
  if (!(error instanceof AxiosError)) {
    return {
      message: UNHANDLED_ERROR_MESSAGE,
      lists: UNHANDLED_ERROR_LISTS
    }
  }

  // If the request doesn't reach the server (e.g., DNS error, server is down, no internet),
  // Axios treats it as a network error, and error.response will be undefined.
  if (!error.response) {
    return {
      message: UNHANDLED_ERROR_MESSAGE,
      lists: UNHANDLED_ERROR_LISTS
    }
  }

  // If internal server error or api not found return unhandled error
  if (error.response?.status === 500 || error.response?.status === 404) {
    return {
      message: UNHANDLED_ERROR_MESSAGE,
      lists: UNHANDLED_ERROR_LISTS
    }
  }

  // Return response error from backend
  const message = error?.response?.data?.message
  const errors = error?.response?.data?.errors

  return { message, errors }
}

export const apiRequest = instance

export default { apiRequest: instance, handleError }
