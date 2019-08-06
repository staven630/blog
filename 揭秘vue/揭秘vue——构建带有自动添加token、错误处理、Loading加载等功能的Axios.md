```
import AxiosInstance from 'axios'
import store from '@store'
import router from '@router'
import { Loading, Message } from 'element-ui'
const qs = require('qs')

const ERRORS = {}
const AUTH_ERRORS = {}

let loadingInstance = null
const showLoading = () => {
  loadingInstance = Loading.service({ fullscreen: true })
}
const hideLoading = () => {
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }
}

const handlerError = error => {
  if (ERRORS[error.code]) {
    return Message({
      message: error.message,
      type: 'error',
      center: true,
      onClose: () => {}
    })
  }

  if (AUTH_ERRORS[error.code]) {
    router.replace('login')
    return
  }
}

// token拦截器
const tokenInterceptor = config => {
  const token = store.getters['auth/token']
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
  return config
}

// 格式化参数拦截器
const paramsInterceptor = config => {
  config.paramsSerializer = params => {
    return qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false
    })
  }
  return config
}

// 显示loading拦截器
const loadingInterceptor = config => {
  showLoading()
  return config
}

const createInstance = (options = { showLoading: false, hideLoading: true }, config = {}) => {
  // 默认配置
  const defaultConfig = {
    baseURL: process.env.VUE_APP_BASE_URL || '/',
    timeout: 5000,
    headers: {
      // 'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
      // post: {
      //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      // }
    },
    ...config
  }

  const httpClient = AxiosInstance.create(defaultConfig)

  httpClient.interceptors.request.use(tokenInterceptor)
  httpClient.interceptors.request.use(paramsInterceptor)

  if (options.showLoading) {
    httpClient.interceptors.request.use(loadingInterceptor)
  }

  httpClient.interceptors.response.use(
    res => {
      if (options.hideLoading) {
        hideLoading()
      }
      if (!res.data) return res
      return res.data.data ? res.data.data : res.data
    },
    err => {
      if (options.hideLoading) {
        hideLoading()
      }

      if (AxiosInstance.isCancel(err)) {
        return Promise.reject('REQUEST_CANCELED')
      }
      console.log(err)
      let { status, statusText, data, headers, request } = err.response
      handlerError(data)
      return Promise.reject(err.response)
    }
  )

  return httpClient
}

export const axios = createInstance()
export const axiosLoading = createInstance({
  showLoading: true,
  hideLoading: true
})
export const getAxios = createInstance
export default axios
```