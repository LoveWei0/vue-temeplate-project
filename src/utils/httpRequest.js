import axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import { fullLoading } from './fullLoading'
import { LOGOUT_CODE } from '../constant'

const prefix = import.meta.env.VITE_BASE_API

export const axiosInstance = axios.create({
  baseURL: prefix,
  timeout: 3000
})
let theFullLoading = null
// 加载提示
const showLoading = () => {
  theFullLoading = fullLoading('数据加载中...')
}
// 取消提示
const clearLoading = () => {
  theFullLoading && theFullLoading.close()
}
// 随机数字
const generateNumber = () => {
  return Number.parseInt(String(Math.random() * 10000000000))
}
// 浏览器上的同一个URL请求会走cache
const delBrowserCache = config => {
  if (config.method) {
    if (config.method.toLowerCase() === 'post' && config.url) {
      config.url =
        config.url.indexOf('?') > -1
          ? config.url + '&t=' + generateNumber()
          : config.url + '?t=' + generateNumber()
    } else if (config.method.toLowerCase() === 'get') {
      config.params = {
        t: generateNumber(),
        ...config.params
      }
    }
  }
  return config
}
//定义一个数组
const queue = []
let refreshing = false
// 请求拦截器
axiosInstance.interceptors.request.use(config => {
  showLoading()
  // 配置请求头
  if (!config.headers['Content-Type']) {
    if (typeof config.data == 'string') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    } else {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
  }
  return delBrowserCache(config)
})

// 响应拦截器
// axiosInstance.interceptors.response.use(async response => {
//   const status = response.status
//   clearLoading()
//   const { url, method, data } = response.config
//   if ((status >= 200 && status < 300) || status === 304) {
//     if (response?.data) {
//       console.log(response.data)
//       if (response.headers['content-type'].startsWith('image/svg+xml')) {
//         return Promise.resolve(response.data)
//       }
//       const { code, message, result } = response.data
//       if (Object.is(code, 0)) {
//         return Promise.resolve({ code, message, result })
//       } else {
//         if (code === LOGOUT_CODE) {
//           const config = response.config
//           console.log(config)
//           if (refreshing) {
//             return new Promise(resolve => {
//               queue.push({ config, resolve })
//             })
//           }
//           if (!config.url?.includes('/refresh')) {
//             // 刷新token
//             refreshing = true
//             const { code } = await refreshToken()
//             refreshing = false
//             if (code === 0) {
//               queue.forEach(({ config, resolve }) => {
//                 resolve(axiosInstance(config))
//               })
//               return axiosInstance(config)
//             } else {
//               ElMessage.warning('登录过期,请重新登录')
//               const appStore = useAppStore()
//               // 退出登录
//               appStore.logout()
//             }
//           }
//         }
//       }
//     }
//   }
// })
axiosInstance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return new Promise(error)
  }
)

// 刷新token
const refreshToken = async () => {
  const appStore = useAppStore()
  const result = await axiosInstance.get('/admin/refresh', {
    params: {
      token: appStore.globalRefreshToken
    }
  })
  console.log(result, '刷新token请求')
}
