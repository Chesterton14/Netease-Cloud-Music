import axios from 'axios'
// import Message from '@/components/MessageBox/index.js'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return error
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    // Message({
    //   message: error.message,
    //   duration: 2500
    // })
    console.log(error.message)
    return error
  }
)

export default service
