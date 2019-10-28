import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return error
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return error
  }
)

export default service
