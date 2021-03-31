import axios from 'axios'
import {message} from 'antd'
import {stringify} from 'qs'
import config from '~/config'

const MODE = import.meta.env.MODE // 环境变量

const getRequest = (method) => {
  return (url, data, options = {}) => {
    let base = config[MODE] // 获取环境变量相应的属性值
    return axios({
      baseURL: base.apiBaseUrl, // 请求域名地址
      method,
      url,
      ...(
        method === 'POST' ?
          {data: options.string ? stringify(data) : data} :
          {}),
      params: method === 'GET' ? data : options.params,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': options.string ?
          'application/x-www-form-urlencoded' :
          'application/json',
        ...options.headers
      },
      withCredentials: true,
    })
      .then(response => {
        if (typeof response.data !== 'object') {
          console.error('数据格式响应错误：', response.data)
          message.error('前方拥挤，请刷新再试')
          return Promise.reject(response)
        }
        if (response.data.errorCode) {
          if (response.data.errorCode === 401) {
            window.location.href = 'login' // 登录失败跳转登录页
            return
          }
          // silent 选项，错误不提示
          if (res.data.message && !options.silent) {
            message.error(response.data.message)
            return Promise.reject(response.data)
          }
        }
        return response.data
      })
      .catch(error => {
        message.error('系统错误', 2)
        return Promise.reject(error)
      })
  }
}

export const get = getRequest('GET')
export const post = getRequest('POST')
