import type { AxiosInstance } from 'axios'
import Axios from 'axios'
import { ElMessage } from 'element-plus'
const baseURL = 'http://localhost:3001'

const axios: AxiosInstance = Axios.create({ baseURL, timeout: 20000 })

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.data
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
      console.error(`[Axios Error]`, error.response)
    } else {
      ElMessage.error(error)
    }
    return Promise.reject(error)
  }
)

export default axios
