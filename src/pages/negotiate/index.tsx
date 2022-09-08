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

const Negotiate: React.FC = () => {
  const [selectCity, setSelectCity] = useState<Array<string>>([])
  const [region, setRegion] = useState<string>()
  const [district, setDistrict] = useState<Array<string>>([])
  const [area, setArea] = useState<string>()
  const [textNum, setTextNum] = useState<number>(0)

  useEffect(() => {
    const arr = ['杭州市', '宁波市', '温州市', '湖州市']
    setSelectCity(arr)
  }, [])

  useEffect(() => {
    const arr = ['西湖区', '萧山区', '余杭区', '拱墅区']
    setDistrict(arr)
  }, [])

  const onFinsh = (e) => {
    const value = e.detail.value
    console.log(e.detail.value)
    if (!value.companyName) {
      Taro.showToast({
        title: '您未填写集团名称',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!value.contactName) {
      Taro.showToast({
        title: '您未填写联系人姓名',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!value.contactPhone) {
      Taro.showToast({
        title: '您未填写联系人号码',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!value.regionName) {
      Taro.showToast({
        title: '您未填写所在城市',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!value.countyName) {
      Taro.showToast({
        title: '您未填写所在区县',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!value.contactAddress) {
      Taro.showToast({
        title: '您未填写详细地址',
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

  const onTextChange = (e) => {
    setTextNum(e.detail.cursor)
  }

  return (
    <BasePage
      className='negotiate px-28'
      pageTitle='预约洽谈'
      pageColor='#F6F6F6'
    >
      <View className='negotiateBox'>
        <Form
          onSubmit={(e) => {
            onFinsh(e)
          }}
          // onReset={(e) => {
          //   console.log(e)
          // }}
        >
          <View className='clientBox'>
            <View className='negoHead'>客户信息</View>
            <View className='client'>
              {/* 必填项样式 */}
              <View className='formItem'>
                <View className='label mr-40'>
                  <Image src={star} className='star' /> 集团名称
                </View>
                <Input
                  name='companyName'
                  type='text'
                  placeholder='请输入集团名称'
                />
              </View>
              {/* 非必填项样式 */}
              <View className='formItem ml-40'>
                <View className='label'>社会信用代码</View>
                <Input
                  name='socialUnifiedCreditCode'
                  type='text'
                  placeholder='请输入社会信用代码'
                />
              </View>
              <View className='formItem ml-40'>
                <View className='label'>集团编号</View>
                <Input name='ecId' type='text' placeholder='请输入集团编号' />
              </View>
              <View className='formItem'>
                <View className='label mr-40'>
                  <Image src={star} className='star' /> 联系人姓名
                </View>
                <Input
                  name='contactName'
                  type='text'
                  placeholder='请输入联系人姓名'
                />
              </View>
              <View className='formItem'>
                <View className='label mr-40'>
                  <Image src={star} className='star' /> 联系人号码
                </View>
                <Input
                  name='contactPhone'
                  type='text'
                  placeholder='请输入联系人号码'
                />
              </View>
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
                  <Image src={star} className='star' /> 详细地址
                </View>
                <Input
                  name='contactAddress'
                  type='text'
                  placeholder='请输入详细地址'
                />
              </View>
            </View>
          </View>

          <View className='businessBox'>
            <View className='negoHead'>业务需求</View>
            <View className='ml-12 mt-20 mr-12'>
              <Textarea
                style={{ width: '100%' }}
                name='demandDescription'
                placeholder='请输入详细业务需求'
                maxlength={100}
                onInput={(e) => onTextChange(e)}
              />
            </View>
            <View className='textNum mr-2'>{textNum}/100</View>
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

export default Negotiate
