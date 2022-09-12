import React, { useState, useEffect } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Form, Input, Button, Image, Picker } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import './index.scss'

const OrderDetail: React.FC = () => {
  const router = useRouter()
  const [number, setNumber] = useState<number>(1)
  const [selectCity, setSelectCity] = useState<Array<string>>([])
  const [region, setRegion] = useState<string>()
  const [selectUsage, setSelectUsage] = useState<Array<string>>([])
  const [use, setUse] = useState<string>()

  useEffect(() => {
    setNumber(Number(router.params.num))
    setSelectCity(['杭州市', '宁波市', '温州市', '湖州市'])
    setSelectUsage(['1', '2', '3'])
  }, [])

  const onFinsh = (e) => {
    const value = e.detail.value
    if (!value.city) {
      Taro.showToast({
        title: '您未填写所在城市',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!value.usage) {
      Taro.showToast({
        title: '您未填写使用用途',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!value.idCard) {
      Taro.showToast({
        title: '您未填写身份证号',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!value.phone) {
      Taro.showToast({
        title: '您未填写联系人号码',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    Taro.showToast({
      title: '提交成功',
      icon: 'none',
      duration: 2000,
    })
    Taro.navigateBack({
      delta: 1, // 返回上一级页面。
    })
  }

  return (
    <BasePage pageTitle='极简订购'>
      <View className='minimalist mt-24 mr-24 ml-24'>
        <View className='selectedBox'>
          <View className='title pt-20 pb-20 pl-24'>已选业务</View>
          <View className='topBox mt-32 mr-24 pb-30 ml-24'>
            <Image
              mode='aspectFill'
              className='cancelImg'
              src={require('../../../assets/order/top.png')}
            />
            <View className='topRightBox pl-40 pt-26 pb-26'>
              <View className='flex flex-between'>
                <View className='topRightName'>精品宽带</View>
                <View className='money'>
                  <View className='symbol'>￥</View>128
                </View>
              </View>
              <View className='numCon flex flex-between mb-4'>
                <View className='numberText'>数量</View>
                <View className='num'>×{number}</View>
              </View>
              <View className='bottomBox'>
                <View className='mb-8'>已选 ：精品宽带包月</View>
                <View>100M包月～120元/月</View>
              </View>
            </View>
          </View>
          <View className='purchase flex flex-between flex-y-center pt-32 pr-68 pb-32 pl-24'>
            <View className='purchaseText'>购买数量</View>
            <View className='purchaseNum'>{number}</View>
          </View>
        </View>
        <Form
          onSubmit={(e) => {
            onFinsh(e)
          }}
        >
          <View className='information mt-24'>
            <View className='title pt-20 pb-20 pl-24'>业务信息</View>
            <View className='content pt-32 pr-24  pl-24'>
              <View className='formItem pt-32 pb-30'>
                <View className='rigarrowhead' />
                <View className='label flex'>
                  <View className='requiredIcon'>* </View>
                  <View className='text'>专线接入地址</View>
                </View>
                <Picker
                  mode='selector'
                  range={selectCity}
                  name='city'
                  onChange={(e) => {
                    setRegion(selectCity[e.detail.value])
                  }}
                >
                  <View className={`${region ? 'pickerK' : 'picker'}`}>
                    {region ? region : '请选择所在城市'}
                  </View>
                </Picker>
              </View>

              <View className='formItem pt-32 pb-30'>
                <View className='label' />
                <Input
                  name='detailAdd'
                  type='text'
                  placeholder='请输入详细地址'
                />
              </View>

              <View className='formItem pt-32 pb-30'>
                <View className='rigarrowhead' />
                <View className='label flex'>
                  <View className='requiredIcon'>* </View>
                  <View className='text'>使用用途</View>
                </View>
                <Picker
                  mode='selector'
                  range={selectUsage}
                  name='usage'
                  onChange={(e) => {
                    setUse(selectUsage[e.detail.value])
                  }}
                >
                  <View className={`${use ? 'pickerK' : 'picker'}`}>
                    {use ? use : '请选择使用用途'}
                  </View>
                </Picker>
              </View>

              <View className='formItem pt-32 pb-30'>
                <View className='label flex'>
                  <View className='requiredIcon'>* </View>
                  <View className='text'>联系人姓名</View>
                </View>
                <Input name='idCard' type='text' placeholder='请输入身份证号' />
              </View>

              <View className='formItem pt-32 pb-30'>
                <View className='label flex'>
                  <View className='requiredIcon'>* </View>
                  <View className='text'>联系人号码</View>
                </View>
                <Input
                  name='phone'
                  type='text'
                  placeholder='请输入联系人号码'
                />
              </View>
            </View>
          </View>
          <View className='footer'>
            <Button
              className='cancel'
              size='mini'
              type='warn'
              formType='reset'
              onClick={() => {
                Taro.navigateBack({
                  delta: 1, // 返回上一级页面。
                })
              }}
            >
              取消
            </Button>

            <Button
              className='submit'
              size='mini'
              plain
              type='warn'
              formType='submit'
            >
              提交
            </Button>
          </View>
        </Form>
      </View>
    </BasePage>
  )
}

export default OrderDetail
