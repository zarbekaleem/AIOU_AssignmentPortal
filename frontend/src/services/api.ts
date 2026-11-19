import axios from 'axios'
import { siteConfig } from '@/config/site'

const api = axios.create({
  baseURL: siteConfig.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default api
