import React, { useState, useEffect } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
// import { View } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import CommodityGroup from '@/components/CommodityGroup'
import { queryCommodityGroup } from '@/apis/home'
import './index.scss'

const ProductGroup: React.FC = () => {
  const router = useRouter()
  const [commodityGroupInfo, setCommodityGroupInfo] =
    useState<Store.Home.IQueryCommodityGroup>(
      {} as Store.Home.IQueryCommodityGroup
    )

  useEffect(() => {
    toQueryCommodityGroup()
  }, [])

  const toQueryCommodityGroup = async () => {
    queryCommodityGroup(router.params.id || '').then((res) => {
      setCommodityGroupInfo(res)
      Taro.setNavigationBarTitle({
        title: res.commodityGroupName,
      })
    })
  }

  return (
    <BasePage
      className='productGroup'
      pageTitle={commodityGroupInfo.commodityGroupName}
    >
      {commodityGroupInfo.categoryId && (
        <CommodityGroup info={commodityGroupInfo} />
      )}
    </BasePage>
  )
}

export default ProductGroup
