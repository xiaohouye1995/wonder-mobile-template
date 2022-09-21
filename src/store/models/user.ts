import { wxLogin, getUserInfo, bindPhone } from '@/apis/common'
import { createModel } from '@rematch/core'
import { ButtonProps } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { RootModel } from '.'

export const userInfo = createModel<RootModel>()({
  state: {} as Store.User.IUser,
  reducers: {
    setInfo: (state, payload: Store.User.IUserInfo) => {
      return { ...state, info: payload }
    },
    getUser: (state) => {
      return { ...state }
    },
    setExtendedParams: (state, payload: Store.User.IExtendedParameters) => {
      return { ...state, extendedParams: payload }
    },
  },
  effects: (dispatch) => ({
    async completeUserMobile(e: ButtonProps.onGetPhoneNumberEventDetail) {
      if (e.errMsg === 'getPhoneNumber:ok') {
        try {
          let code = Taro.getStorageSync('code')
          if (!code) {
            console.log('重新拿code')
            const result = await Taro.login()
            code = result.code
          }
          bindPhone(code, e.iv, e.encryptedData).then(() => {
            setTimeout(() => {
              dispatch.userInfo.fetchUserInfo()
            }, 100)
          })
        } catch (err) {
          Taro.showToast({
            title: err,
            icon: 'none',
          })
        }
      } else if (e.errMsg === 'getPhoneNumber:fail user deny') {
        Taro.showToast({
          title: '请先授权手机号进行登录',
          icon: 'none',
        })
      }
    },
    async initUserInfo() {
      if (process.env.TARO_ENV === 'weapp') {
        const { code } = await Taro.login()
        const data: string = await wxLogin(code)
        dispatch.global.setUserToken(data)
      }
    },
    setUserInfo(user: Store.User.IUserInfo) {
      dispatch.userInfo.setInfo(user)
      Taro.setStorageSync('user', user)
    },
    async fetchUserInfo() {
      const info = await getUserInfo()
      dispatch.userInfo.setUserInfo(info)
    },
    cleanUserInfo() {
      Taro.removeStorageSync('user')
    },
  }),
})
