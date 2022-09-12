import React, { useEffect } from 'react'
// import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import BasePage from '@/components/BasePage'
// import { navigateToPage } from '@/utils/common'
import './index.scss'

const Scenes: React.FC = () => {
  useEffect(() => {
    console.log('初始化')
  }, [])

  return <BasePage className='scenes' pageTitle='场景' isTabPage></BasePage>
}

export default Scenes
