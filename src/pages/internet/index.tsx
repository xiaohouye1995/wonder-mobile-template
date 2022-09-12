import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import {
  View,
  Form,
  Input,
  Button,
  Image,
  Picker,
  Textarea,
} from '@tarojs/components'
import BasePage from '@/components/BasePage'
import star from '@/assets/negotiate/star.png'
import './index.scss'

const Internet: React.FC = () => {
  const [selectCity, setSelectCity] = useState<Array<string>>([])
  const [region, setRegion] = useState<string>()
  const [district, setDistrict] = useState<Array<string>>([])
  const [area, setArea] = useState<string>()

  useEffect(() => {
    const arr = ['杭州市', '宁波市', '温州市', '湖州市']
    setSelectCity(arr)
  }, [])

  useEffect(() => {
    const arr = ['西湖区', '萧山区', '余杭区', '拱墅区']
    setDistrict(arr)
  }, [])

  return (
    <BasePage
      className='internet px-28'
      pageTitle='网络资源查询'
      pageColor='#F6F6F6'
    >
      <View className='internetBox'>
        <View className='negoHead'>网络资源查询</View>
        <View className='formItem'>
          {/* 右箭头 */}
          <View className='rigarrowhead'></View>
          <View className='label mr-40'>
            <Image src={star} className='star' /> 城市选择
          </View>
          <Picker
            mode='selector'
            range={selectCity}
            name='regionName'
            onChange={(e) => {
              setRegion(selectCity[e.detail.value])
            }}
          >
            <View className={`${region ? 'pickerK' : 'picker'}`}>
              {region ? region : '请选择当前城市'}
            </View>
          </Picker>
        </View>
        <View className='formItem'>
          {/* 右箭头 */}
          <View className='rigarrowhead'></View>
          <View className='label mr-40'>
            <Image src={star} className='star' /> 区县选择
          </View>
          <Picker
            mode='selector'
            range={district}
            name='countyName'
            onChange={(e) => {
              setArea(district[e.detail.value])
            }}
          >
            <View className={`${area ? '' : 'picker'}`}>
              {area ? area : '请选择当前区县'}
            </View>
          </Picker>
        </View>
        <View className='formItem'>
          <View className='label mr-40'>
            <Image src={star} className='star' /> 安装地址
          </View>
          <Input
            name='contactAddress'
            type='text'
            placeholder='请输入详细地址'
          />
        </View>
        <View className='formItem ml-40'>
          <View className='label'>查询结果</View>
          <Input
            name='socialUnifiedCreditCode'
            type='text'
            placeholder='请输入社会信用代码'
          />
        </View>
      </View>

      <View className='footer'>
        <Button
          className='submit'
          size='mini'
          plain
          type='warn'
          // onClick={() => {
          //   Taro.navigateBack({
          //     delta: 1, // 返回上一级页面。
          //   })
          // }}
        >
          完成
        </Button>
      </View>
    </BasePage>
  )
}
export default Internet
