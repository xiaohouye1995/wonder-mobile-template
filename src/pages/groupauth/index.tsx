import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import './index.scss'

const list = [
  {
    name: '李晓红',
    phone: '13232323232',
  },
  {
    name: '王小明',
    phone: '13232323231',
  },
  {
    name: '张三',
    phone: '13232323233',
  },
  {
    name: '王五',
    phone: '13232323234',
  },
  {
    name: '李四',
    phone: '13232323237',
  },
]

const Groupauth: React.FC = () => {
  return (
    <BasePage className='groupinfo' pageTitle='集团授权人' pageColor='#FFF'>
      <View className='groupinfo-content'>
        <View className='groupinf-first'>
          <View className='negoHead'>
            <View className='form-name'>姓名</View>
            <View className='form-phone'>手机号</View>
            <View className='form-operate'>操作</View>
          </View>
        </View>
        <View className='groupinfo-form'>
          {list.map((item, index) => {
            return (
              <View className='formItem'>
                <View className='formItem-name'>
                  <Text className='form-number'>{index + 1}</Text>
                  {item.name}
                </View>
                <View className='formItem-phone'>{item.phone}</View>
                <View className='formItem-operate'>
                  <View className='formItem-read'>查看</View>
                  <View className='formItem-edit'>变更</View>
                </View>
              </View>
            )
          })}
          <View className='add'>新增</View>
        </View>
      </View>
    </BasePage>
  )
}

export default Groupauth
