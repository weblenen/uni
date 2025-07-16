import { ENV } from './config'
// #ifdef VUE3
import { useUserStore } from '@/store/user'
// #endif

// 环境配置
const baseURLMap = {
  local: 'http://localhost:3000', // 本地环境
  prod: 'https://dev.xinchebangmai.cn', // 生产环境
}
const baseURL = baseURLMap[ENV] || ''

function getToken() {
  // #ifdef VUE3
  try {
    const store = useUserStore()
    if (store && store.token) return store.token
  } catch {}
  // #endif
  try {
    return typeof uni !== 'undefined' && uni.getStorageSync ? uni.getStorageSync('token') : ''
  } catch { return '' }
}

function request({ url, method = 'GET', data = {}, header = {} }) {
  const token = getToken()
  const finalHeader = {
    ...header,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      method,
      data,
      header: finalHeader,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

export function get(url, data = {}, header = {}) {
  return request({ url, method: 'GET', data, header })
}

export function post(url, data = {}, header = {}) {
  return request({ url, method: 'POST', data, header })
}
