import axios from 'axios'
import { Notify } from 'vant'

const errorCode = {
  12000: '需要验证码',
  12001: 'sessionid无效',
  12005: '暂无权限，请联系管理员开通',
  12006: '重复注册',
  12007: '系统错误'
}

const service = axios.create({
  timeout: 5000
  // 允许携带cookie
  // withCredentials: true
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
    const res = response.data
    // eslint-disable-next-line no-undefined
    if (res.code !== undefined) {
      if (res.code === 0 || res.code.length === 6) {
        res.ErrorCode = 'OK'
      } else if (String(res.code).length === 5) {
        res.message = errorCode[res.code]
      }
    }
    if (res.ErrorCode !== 'OK') {
      Notify({ type: 'danger', message: res.message || res.ErrorMsg || 'Error' })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Notify({ type: 'danger', message: error.message || error.ErrorMsg || 'Error' })
    return Promise.reject(error)
  }
)

export default service
