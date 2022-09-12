/**
 * @author 周俊阳
 * @desc 全局接口
 */
import { get, post } from '@/utils/request'

/**
 * 微信登录
 * @param data
 */
export const wxLogin = (data: string) =>
  post<string>('api/v1/login/wx/silenceLogin', { data }, '登录中')

/**
 * H5登录
 * @param data
 */

// export const H5Login = (account, code, capycha, key, mode, loginType) => {
//   const res: any = post('/5gmall-api/user/registryOrLoginUser', {
//     account,
//     code,
//     capycha,
//     key,
//     mode,
//     loginType,
//   })
//   return res.data
// }

/**
 * 绑定手机号
 * @param data
 */
export const bindPhone = (code: string, iv: string, encryptedData: string) =>
  post(
    'api/v1/user/wx/authPhone',
    {
      data: {
        code,
        iv,
        encryptedData,
      },
    },
    '绑定手机号'
  )

/**
 * 完善用户信息
 * @param name 用户名
 * @param avatarUrl 头像
 */
export const completeUserInfo = async (name?: string, avatarUrl?: string) => {
  post('api/v1/user/wx/userUpdate', {
    data: {
      name,
      avatarUrl,
    },
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = (): Promise<Store.User.IUserInfo> =>
  get('api/v1/user/wx/get', {})
