import React from 'react'
// import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import MyHead from '../../../components/MyHead/index'
import buy from '../../../assets/my/buy.png'
import buyone from '../../../assets/my/buyone.png'
import buytwo from '../../../assets/my/buytwo.png'
import buythree from '../../../assets/my/buythree.png'
import buyfour from '../../../assets/my/buyfour.png'
import './index.scss'

const Order: React.FC = () => {
  const obj = {
    icon: buy,
    title: '我可订购',
    styleName: 'buyPic',
    address: '/',
    type: '1',
  }

  const buyList = [
    { pic: buyone, title: '随心看-合约' },
    { pic: buytwo, title: '随心听-合约' },
    { pic: buythree, title: '随心看-合约' },
    { pic: buyfour, title: '随心听-合约' },
    { pic: buyone, title: '随心看-合约' },
    { pic: buytwo, title: '随心听-合约' },
    { pic: buythree, title: '随心看-合约' },
    { pic: buyfour, title: '随心听-合约' },
  ]

  return (
    <View className='order'>
      <MyHead obj={obj} />
      <View className='buyBox'>
        {buyList &&
          buyList.map((item, index) => {
            return (
              <View key={index} className='buyCon'>
                <Image src={item.pic} className='buyConPic' />
                <Text className='orderText'>{item.title}</Text>
              </View>
            )
          })}
      </View>
    </View>
  )
}
export default Order
