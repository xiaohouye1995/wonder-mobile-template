import React from 'react'
// import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { isRouterUrl } from '@/utils/common'
import './index.scss'

interface headType {
  obj: any
}

const MyHead: React.FC<headType> = (props) => {
  const { obj } = props

  return (
    <View className='myHead'>
      <View className='title'>
        {obj.icon && <Image src={obj.icon} className='headIcon' />}
        <Text className='myTitle'>{obj.title}</Text>
      </View>
      {obj.address && obj.address !== '/' && obj.type !== 3 && (
        <View
          className='more'
          onClick={() => {
            isRouterUrl(obj.address, obj.type)
          }}
        >
          更多
        </View>
      )}
    </View>
  )
}
export default MyHead
