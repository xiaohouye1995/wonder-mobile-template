/**
 * @author 周俊阳
 * @desc 工具类
 */
import Taro from '@tarojs/taro'
import { PAGES } from '@/utils/pages'

/**
 * 跳转到H5页面
 * @param url H5链接
 * @param redirectTo 是否重定向，默认不
 */
export const navigateToH5 = (url: string, redirectTo?: boolean) => {
  if (redirectTo) {
    navigateToPage(
      `/pages/${'web'}/index?url=${encodeURIComponent(url)}`,
      'redirectTo'
    )
  } else {
    navigateToPage(`/pages/${'web'}/index?url=${encodeURIComponent(url)}`)
  }
}

/**
 *
 * @param url 待跳转的小程序页面链接
 * @param type 跳转方式
 * @default navigateTo 正常跳转
 * @property {string} navigateTo 正常跳转，会留下历史记录
 * @property {string} redirectTo 重定向，会顶掉当然页面历史记录
 * @property {string} relaunch 关闭所有页面，并打开一个新页面
 * @property {string} switchTab 跳转到tab页，并且关闭所有页面
 */
export const navigateToPage = (
  url: string,
  type: 'navigateTo' | 'redirectTo' | 'relaunch' | 'switchTab' = 'navigateTo'
) => {
  const handle404 = () => {
    navigateToPage('/pages/404/index')
  }
  const testUrl = url.substring(
    url.indexOf('/') + 1,
    url.indexOf('?') !== -1 ? url.indexOf('?') : undefined
  )
  if (process.env.TARO_ENV === 'h5' && PAGES.indexOf(testUrl) === -1) {
    Taro.navigateTo({
      url: '/pages/404/index',
    })
    return
  }
  if (type === 'navigateTo') {
    Taro.navigateTo({
      url,
      fail: handle404,
    })
  } else if (type === 'redirectTo') {
    Taro.redirectTo({
      url,
      fail: handle404,
    })
  } else if (type === 'relaunch') {
    Taro.reLaunch({
      url,
      fail: handle404,
    })
  } else if (type === 'switchTab') {
    Taro.switchTab({
      url,
      fail: handle404,
    })
  }
}

/**
 * 复制字符串
 * @param val 复制的值
 */
export const copyVal = (val: string) => {
  Taro.setClipboardData({
    data: val,
    success() {
      Taro.showToast({
        title: '复制成功～',
        icon: 'success',
      })
    },
    fail() {
      Taro.showToast({
        title: '复制失败～',
        icon: 'none',
      })
    },
  })
}

/**
 * rpx转px
 */
export const rpxToPx = (rpx: number) => {
  const pixelRatio = 750 / Taro.getSystemInfoSync().windowWidth
  return rpx / pixelRatio
}

/**
 * 判断是否使用自定义导航栏
 */
export const isUseCustomNav = () => {
  let testApp = false
  if (process.env.TARO_ENV === 'h5') {
    testApp = true
    const userAgentStr = window.navigator.userAgent
    if (/MicroMessenger/.test(userAgentStr)) {
      // 微信
      testApp = false
    } else if (/AlipayClient/.test(userAgentStr)) {
      // 支付宝
      testApp = false
    } else if (/DingTalk/.test(userAgentStr)) {
      // 钉钉
      testApp = false
    }
  }

  return testApp
}

/**
 * 手机号验证
 * @param phone 手机号
 */
export const isMobile = (phone: string) => {
  return /^1[3-9]\d{9}$/.test(phone)
}
