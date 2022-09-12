import React, { useState } from 'react'
import { View, Form, Switch, Text } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import './index.scss'

const Groupinfo: React.FC = () => {
  return (
    <BasePage className='groupinfo' pageTitle='集团信息' pageColor='#FFF'>
      <View className='groupinfo-content'>
        <View className='groupinfo-form'>
          <View className='negoHead'>集团信息</View>
          <View className='formItem'>
            <Text className='formItem-title'>集团名称</Text>
            <Text className='formItem-content'>浙江移动</Text>
          </View>
          <View className='formItem'>
            <Text className='formItem-title'>集团编号</Text>
            <Text className='formItem-content'>9100223489044979</Text>
          </View>
          <View className='formItem'>
            <Text className='formItem-title'>入网时间</Text>
            <Text className='formItem-content'>2022-12-12</Text>
          </View>
          <View className='formItem'>
            <Text className='formItem-title'>证件名称</Text>
            <Text className='formItem-content'>浙江移动杭州分公司</Text>
          </View>
          <View className='formItem'>
            <Text className='formItem-title'>证件编号</Text>
            <Text className='formItem-content'>91330106577334427W</Text>
          </View>
          <View className='formItem'>
            <Text className='formItem-title'>法人代表</Text>
            <Text className='formItem-content'>张三</Text>
          </View>
          <View className='formItem'>
            <Text className='formItem-title'>客户经理</Text>
            <Text className='formItem-content'>李四 15867124356</Text>
          </View>
        </View>
      </View>
    </BasePage>
  )
}

export default Groupinfo
