import Taro from '@tarojs/taro'
import { store } from '@/store/index'
import { navigateToPage } from '@/utils/common'

// 从config文件中获取当前环境对应的api根路径
const baseUrl = API_ROOT

// 不需要loading的api白名单
const noLoadingList: string[] = []

// 返回结果是流的api白名单，此类接口返回数据没有data等格式
const arrayBufferList: string[] = []

interface IResponseResult<T> {
  statusCode: number
  cookies: string[]
  errMsg: string
  // header中自定义属性较多，故用any替代
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header: Record<string, any>
  data: IResponseData<T>
}

export interface IResponseData<T> {
  code: number
  data: any
  msg: string
}

const handle404 = () => {
  navigateToPage('/pages/404/index')
}

const toRawType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1)
}

// 过滤无效参数
const interceptor = function (chain) {
  const requestParams = chain.requestParams
  const keys = Object.keys(requestParams.data)
  if (keys.length) {
    keys.forEach((key) => {
      const rawType = toRawType(requestParams.data)
      if (
        ['', undefined, null].includes(requestParams.data[key]) &&
        ['Object'].includes(rawType)
      ) {
        // 移除属性之前，进行深拷贝断开引用，避免影响页面
        requestParams.data = JSON.parse(JSON.stringify(requestParams.data))
        delete requestParams.data[key]
      }
    })
  }
  return chain.proceed(requestParams).then((res) => {
    return res
  })
}

/***
 * get请求
 */
export const get = <T>(url: string, data = {}, msg?: string): Promise<T> =>
  new Promise((resolve, reject) => {
    if (msg) {
      Taro.showLoading({
        title: msg,
      })
    }

    Taro.addInterceptor(interceptor)

    Taro.request({
      url: baseUrl + url,
      method: 'GET',
      data,
      header: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + store.getState().global.userToken,
      },
      responseType:
        arrayBufferList.indexOf(url) < 0 ? undefined : 'arraybuffer',
      fail(res: IResponseResult<T>) {
        if (!res.data) {
          Taro.showToast({
            icon: 'none',
            title: '服务器未响应',
          })
          reject('服务器未响应')
          Taro.hideLoading()
        }
        Taro.showToast({
          icon: 'none',
          title: res.data.msg || '网络开小差了！！！',
        })
        reject(res.data.msg || '网络开小差了！！！')
        Taro.hideLoading()
      },
    }).then((res: IResponseResult<T>) => {
      if (res.data.code === 200) {
        resolve(res.data.data)
        Taro.hideLoading()
        return
      }
      if (res.data.code === 404) {
        handle404()
        reject(res.data.msg || '网络开小差了！！！')
        Taro.hideLoading()
        return
      }
      Taro.showToast({
        icon: 'none',
        title: res.data.msg || '网络开小差了！！！',
      })
      reject(res.data.msg || '网络开小差了！！！')
      Taro.hideLoading()
    })
  })
/**
 * post请求
 * @param {*} url
 * @param {*} data
 */
export const post = <T>(
  url: string,
  data = {},
  msg?: string,
  isLoading?: boolean
): Promise<T> =>
  new Promise((resolve, reject) => {
    const loading = noLoadingList.indexOf(url) < 0
    if (isLoading && loading) {
      Taro.showLoading({
        title: msg || '数据加载中',
      })
    }
    Taro.request({
      url: baseUrl + url,
      method: 'POST',
      data,
      header: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + store.getState().global.userToken,
      },
      fail(res: IResponseResult<T>) {
        if (loading) {
          Taro.hideLoading()
        }
        if (res.data.code === 404) {
          handle404()
          reject(res.data.msg || '网络开小差了！！！')
          return
        }
        Taro.showToast({
          icon: 'none',
          title: res.data.msg || '网络开小差了！！！',
        })
        reject(res.data.msg || '网络开小差了！！！')
      },
    }).then((res: IResponseResult<T>) => {
      if (loading) {
        Taro.hideLoading()
      }
      if (res.data.code === 200) {
        resolve(res.data.data)
        return
      }
      if (res.data.code === 404) {
        handle404()
        reject(res.data.msg || '网络开小差了！！！')
        return
      }
      Taro.showToast({
        icon: 'none',
        title: res.data.msg || '网络开小差了！！！',
      })
      reject(res.data.msg || '网络开小差了！！！')
    })
  })
