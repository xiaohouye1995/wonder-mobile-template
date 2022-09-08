import React, { useState, useEffect } from 'react'
import { View, Button } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import './index.scss'

const Mine: React.FC = () => {
  const [myList, setMyList] = useState<any>([])

  return (
    <BasePage className='mine pt-40' pageTitle='我的' isTabPage>
      <View className='mine-list px-24'>
        <View className='mine-list-item px-20 round flex flex-between flex-y-center'>
          <Button open-type='contact' className='mine-list-item-contact'>
            意见反馈
          </Button>
          <View className='iconfont icon-arrow'></View>
        </View>
      </View>
    </BasePage>
  )
}

export default Mine
