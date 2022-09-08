import { createModel } from '@rematch/core'
import Taro from '@tarojs/taro'
// import { isUseCustomNav } from '@/utils/common'
import { RootModel } from '.'

export const global = createModel<RootModel>()({
  state: {
    userToken: Taro.getStorageSync('token') || '',
    systemInfo: {} as Taro.getSystemInfoSync.Result,
    useCustomNav: false,
  } as Store.Global.IGlobal,
  reducers: {
    setToken: (state, userToken: string) => {
      return {
        ...state,
        userToken,
      }
    },
    setSystemInfoSync: (state, systemInfo: Taro.getSystemInfoSync.Result) => {
      return {
        ...state,
        systemInfo,
      }
    },
    setUseCustomNavSync: (state, useCustomNav: boolean) => {
      return {
        ...state,
        useCustomNav,
      }
    },
  },
  effects: (dispatch) => ({
    setUserToken(token: string) {
      dispatch.global.setToken(token)
      Taro.setStorageSync('token', token)
    },
    cleanUserToken() {
      dispatch.global.setToken('')
      Taro.removeStorageSync('token')
    },
    setSystemInfo() {
      const systemInfo = Taro.getSystemInfoSync()
      dispatch.global.setSystemInfoSync(systemInfo)
    },
    setUseCustomNav() {
      // dispatch.global.setUseCustomNavSync(isUseCustomNav())
    },
  }),
})
