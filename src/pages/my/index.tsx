import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import BasePage from '@/components/BasePage'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/store'
// import { store } from '@/store/index'
import { queySitesInfo } from '@/apis/my'
import { navigateToPage } from '@/utils/common'
import BasicInformation from './BasicInformation/index'
import Order from './Order/index'
import Package from './Package/index'
import Calls from './Calls/index'
import FlowRate from './FlowRate/index'
import './index.scss'

const Mine: React.FC = () => {
  const [myList, setMyList] = useState<any>([])

  // useEffect(() => {
  //   if (sessionStorage.getItem('token') !== '757575') {
  //     navigateToPage('pages/login/index')
  //   }
  // }, [])

  useEffect(() => {
    mineMeth()
  }, [])

  const mineMeth = async () => {
    const siteNos = ['H5-mine']
    const res: any = await queySitesInfo(siteNos)
    setMyList(res[0]?.list)
  }

  return (
    <BasePage
      className='mine px-28'
      pageTitle='我的'
      isTabPage
      pageColor='#F6F6F6'
    >
      <View className='my'>
        <BasicInformation />
        <Order />

        {myList &&
          myList.map((item: any) => {
            const commodityList = item.childList.filter(
              (itm) => itm.title === '商品'
            )
            const num = commodityList[0]?.childList?.length || 0
            return (
              <View key={item.elementId}>
                {/* 根据商品数量进行多布局处理 */}
                {num <= 2 && <Package data={item} />}
                {num > 2 && num <= 4 && <Calls data={item} />}
                {num > 4 && num <= 6 && <FlowRate data={item} />}
              </View>
            )
          })}
      </View>
    </BasePage>
  )
}

export default Mine
