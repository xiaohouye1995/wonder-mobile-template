/**
 * @author 小侯爷
 * @desc 我的页面接口
 */
import { get, post } from '@/utils/request'

interface ICompleteUserInfo {
  name: string
  avatarUrl: string
}

/**
 * 参考接口可删除
 * 完善用户信息
 * @param name 用户名
 * @param avatarUrl 头像
 */
export const completeUserInfo = (data: ICompleteUserInfo) => {
  post('api/v1/user/wx/userUpdate', data)
}

/**
 * 参考接口可删除
 * 获取用户信息
 */
export const getUserInfo = (): Promise<Store.User.IUserInfo> =>
  get('api/v1/user/wx/get', {})

/**
 * 参考接口可删除
 * 删除用户
 */
export const delUser = (id: number) =>
  post('api/v1/user/wx/get', { id }, '删除中')

export const queySitesInfo = async (siteNos: Array<string>) => {
  const res = post('5gmall-api/mall/site/queySitesInfo', { siteNos, module: 2 })
  return res
}
