import axios, { AxiosError } from 'axios'

import api from '@/config/api'

const UNKNOW_ERROR_MESSAGE = 'Internal Server Error (500)'

export interface IHandleErrorResponse {
  message: string
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
  const lists = [
    'Try refreshing the page.',
    'Wait a few minutes and try again.',
    'If it keeps happening, contact support for help.'
  ]
  console.log('AXIOS ERROR')
  if (error instanceof AxiosError) {
    console.log(error.code)
    if (error.code === 'ERR_NETWORK') {
      return {
        message: 'Network Error'
      }
    }
    console.log(error?.response)
    console.log(error?.response?.data)
    const message = error?.response?.data?.message ?? UNKNOW_ERROR_MESSAGE
    const errors = error?.response?.data?.errors
    if (!errors) {
      return {
        message: message,
        lists: lists
      }
    }
    return { message, errors }
  } else {
    return { message: UNKNOW_ERROR_MESSAGE, lists: lists }
  }
}

export const apiRequest = instance

export default { apiRequest: instance, handleError }
