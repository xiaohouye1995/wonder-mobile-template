import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { navigateToPage } from '@/utils/common'
import avatar from '../../../assets/my/avatar.png'
import sit from '../../../assets/my/sit.png'
import right from '../../../assets/my/right.png'
import affection from '../../../assets/my/affection.png'
import dummy from '../../../assets/my/dummy.png'
import rightMore from '../../../assets/my/rightMore.png'
import './index.scss'

// interface infor {
//   phone: number
//   gongsi: string
// }

const BasicInformation: React.FC = () => {
  const myInfor: any = {
    phone: 19866661234,
    gongsi: '中国移动通信集团浙江有限公司',
  }

  const moneyList = [
    {
      text: '实时话费(元)',
      num: '20.00',
    },
    {
      text: '账户余额(元)',
      num: '100.00',
    },
    {
      text: '语音剩余(分钟)',
      num: '100.00',
    },
    {
      text: '剩余流量(GB)',
      num: '30.00',
    },
  ]

  return (
    <View className='basicInformation'>
      <View className='basTop'>
        <View
          className='avatar'
          onClick={() => {
            navigateToPage('/pages/login/index')
          }}
        >
          <Image src={avatar} className='avatarPic' />
        </View>
        <View className='myInfor'>
          <Text className='basicText'>
            {(myInfor.phone + '').replace(
              (myInfor.phone + '').substring(3, 7),
              '****'
            )}
          </Text>
          <Text className='basicFirm'>{myInfor.gongsi}</Text>
        </View>
        <View className='materials'>
          <Image mode='aspectFill' src={sit} className='sitPic' />
          <View className='fils'>
            资料 <Image mode='aspectFill' src={right} className='rightPic' />
          </View>
        </View>
      </View>
      <View className='basCenter'>
        {moneyList &&
          moneyList.map((item, index) => {
            return (
              <View key={index} className='money'>
                <Text className='basNum'>{item.num}</Text>
                <View className='basText'>{item.text}</View>
                <View className='Vertical'></View>
              </View>
            )
          })}
      </View>
      <View className='basBottom'>
        <View className='box'>
          <View className='affection'>
            <View className='interText'>
              亲情网 <Text className='basLabel'>664</Text>{' '}
              <Image
                mode='aspectFill'
                src={rightMore}
                className='rightMorePic'
              />
            </View>
            <View className='chat'>3位短号 家庭畅聊</View>
          </View>
          <Image mode='aspectFill' src={affection} className='chatPic' />
        </View>
        <View className='box'>
          <View className='dummy'></View>
          <View className='affection'>
            <View className='interText'>
              虚拟网{' '}
              <Image
                mode='aspectFill'
                src={rightMore}
                className='rightMorePic ml-24'
              />
            </View>
            <View className='chat'>6位短号 任性畅聊</View>
          </View>
          <Image mode='aspectFill' src={dummy} className='chatPic' />
        </View>
      </View>
    </View>
  )
}

export default BasicInformation
