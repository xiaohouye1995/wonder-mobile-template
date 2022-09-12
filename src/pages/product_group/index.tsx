import React, { useState, useEffect } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
// import { View } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import Loading from '@/components/Loading'
import CommodityGroup from '@/components/CommodityGroup'
import { queryCommodityGroup } from '@/apis/home'
import './index.scss'

const ProductGroup: React.FC = () => {
  const router = useRouter()
  const [commodityGroupInfo, setCommodityGroupInfo] =
    useState<Store.Home.IQueryCommodityGroup>(
      {} as Store.Home.IQueryCommodityGroup
    )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    toQueryCommodityGroup()
  }, [])

  const toQueryCommodityGroup = () => {
    setIsLoading(true)
    queryCommodityGroup(router.params.id || '')
      .then((res) => {
        setCommodityGroupInfo(res)
        Taro.setNavigationBarTitle({
          title: res.commodityGroupName,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <BasePage
      className='productGroup'
      pageTitle={commodityGroupInfo.commodityGroupName}
    >
      {!isLoading && commodityGroupInfo.categoryId && (
        <CommodityGroup info={commodityGroupInfo} />
      )}
      <Loading isShow={isLoading} />
    </BasePage>
  )
}

export default ProductGroup
