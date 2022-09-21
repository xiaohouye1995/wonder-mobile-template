import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import Popup from '@/components/Popup'
import { navigateToPage } from '@/utils/common'
import './index.scss'

const Home: React.FC = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    console.log('初始化')
  }, [])

  return (
    <BasePage
      className='home px-28'
      pageTitle='首页'
      isTabPage
      navBgColor='#F6F6F6'
    >
      <View className='t2 mt-24' onClick={() => setShow(true)}>
        欢迎使用 <Text className='text-primary'>杭州网达移动多端模板</Text>
      </View>
      <View
        className='t2 mt-20'
        onClick={() => navigateToPage('/pages/index/index')}
      >
        请查看 <Text className='text-primary'>设计规范</Text>
      </View>
      <Popup
        mode='bottom'
        height={300}
        show={show}
        onClose={() => setShow(false)}
      >
        <View className='test-box'>5555</View>
      </Popup>
    </BasePage>
  )
}

export default Home
