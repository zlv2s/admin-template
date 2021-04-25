const axios = require('axios')

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/api'
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
