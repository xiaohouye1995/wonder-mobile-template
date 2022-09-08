/**
 * @author 小侯爷
 * @desc 首页接口
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

/**
 * 获取分类导航
 * @param siteNos
 * @param module 类型1 web， 2 h5
 */
export const queySitesInfo = (siteNos: Array<string>) =>
  post<Store.Home.IQueySites[]>('5gmall-api/mall/site/queySitesInfo', {
    siteNos,
    module: 2,
  })

/**
 * 获取产品组详情
 * @param commodityGroupId 商品id
 */
export const queryCommodityGroup = (commodityGroupId: string) =>
  post<Store.Home.IQueryCommodityGroup>(
    '5gmall-api/commodity/queryCommodityGroup',
    {
      commodityGroupId,
    }
  )

/**
 * 获取解决方案详情
 * @param solutionId 解决方案id
 */
export const querySolutionDetails = (solutionId: string) =>
  post<Store.Home.IQueryCommodityGroup>(
    '5gmall-api/solution/detail/' + solutionId
    // {
    //   solutionId,
    // }
  )
