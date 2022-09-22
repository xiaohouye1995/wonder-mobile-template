import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import { navigateToPage } from '@/utils/common'
import './index.scss'

const Home: React.FC = () => {
  useEffect(() => {
    console.log('初始化')
  }, [])

  return (
    <BasePage
      className='home--page px-28'
      pageTitle='首页'
      isTabPage
      navBgColor='#F6F6F6'
    >
      <View className='t2 mt-24'>
        欢迎使用 <Text className='text-primary'>杭州网达移动多端模板</Text>
      </View>
      <View
        className='t2 mt-20'
        onClick={() => navigateToPage('/pages/index/index')}
      >
        请查看 <Text className='text-primary'>设计规范</Text>
      </View>
    </BasePage>
  )
}

export default Home
