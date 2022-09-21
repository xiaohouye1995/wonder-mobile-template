import React from 'react'
import { View, Image } from '@tarojs/components'
import { navigateToPage } from '@/utils/common'
import avatar from '@/assets/my/avatar.png'
import './index.scss'

const MineHeader: React.FC = () => {
  return (
    <View
      className='mineHeader flex flex-y-center'
      onClick={() => navigateToPage('/pages/login/index')}
    >
      <Image src={avatar} className='mineHeader-avatar mr-40' />
      <View className='flex-1'>
        <View className='t2'>未登录</View>
        <View className='t6'>杭州网达移动多端模板</View>
      </View>
    </View>
  )
}

export default MineHeader
