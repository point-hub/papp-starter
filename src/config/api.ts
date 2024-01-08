export const baseURL: string = import.meta.env.VITE_API_BASE_URL
export const timeout: number = Number(import.meta.env.VITE_API_TIMEOUT)

export default {
  baseURL: baseURL,
  timeout: timeout
}
