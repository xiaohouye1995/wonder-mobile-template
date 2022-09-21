/**
 * @author 周俊阳
 * @desc 全局接口
 */
import { get, post } from '@/utils/request'

/**
 * 参考接口可删除
 * 微信登录
 * @param data
 */
export const wxLogin = (data: string) =>
  post<string>('api/v1/login/wx/silenceLogin', { data }, '登录中')

/**
 * 参考接口可删除
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
 * 参考接口可删除
 * 获取用户信息
 */
export const getUserInfo = (): Promise<Store.User.IUserInfo> =>
  get('api/v1/user/wx/get', {})
