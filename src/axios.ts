import axios from 'axios'

import api from '@/config/api'

const instance = axios.create({
  baseURL: api.baseURL,
  timeout: api.timeout
})

instance.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Request: ', config.url)
      console.log('Request: ', config)
    }
    return config
  },
  function (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Response Error: ', error.response)
    }
    return Promise.reject(error.response)
  }
)

export default instance
