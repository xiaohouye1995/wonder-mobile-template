import React, { useState } from 'react'
import { View, Button } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import './index.scss'

const DemoPage: React.FC = () => {
  const [showMask, setShowMask] = useState(false)

  const handleClickMask = () => {
    const flag = !showMask
    setShowMask(flag)
  }

  return (
    <BasePage className='defaultIndex'>
      <View className='p-40 line-height textdefault'>
        <View className='mb-24 t1'>文字</View>
        <View className='t1'>T1 级别--标准字 36px 加粗 123456789 abc</View>
        <View className='t2'>T2 级别--标准字 32px 加粗 123456789 abc</View>
        <View className='t3'>T3 级别--标准字 28px 加粗 123456789 abc</View>
        <View className='t4'>T4 级别--标准字 28px 123456789 abc</View>
        <View className='t5'>T5 级别--标准字 26px 123456789 abc</View>
        <View className='t6'>T6 级别--标准字 24px 123456789 abc</View>
        <View className='t7plus'>T7plus级别--标准字 22px 123456789 abc</View>
        <View className='t7'>T7 级别--标准字 20px 123456789 abc</View>
        <View className='t8'>T8 级别--标准字 18px 123456789 abc</View>
        <View className='t9'>T9 级别--标准字 16px 123456789 abc</View>
      </View>
      <View className='p-40'>
        <View className='mb-24 t1'>颜色</View>
        <View>默认标准字体大小 #333333 text-primary</View>
        <View className='text-primary'>
          默认标准字体大小 #FF4E4F text-primary
        </View>
        <View className='text-secondary'>
          默认标准字体大小 #CC9756 text-secondary
        </View>
        <View className='text-warning'>
          默认标准字体大小 #FF8826 text-warning
        </View>
        <View className='text-success'>
          默认标准字体大小 #27682C text-success
        </View>
        <View className='text-gray'>默认标准字体大小 #666666 text-gray</View>
        <View className='text-light'>默认标准字体大小 #A5A5A5 text-light</View>
        <View className='text-gray-light'>
          默认标准字体大小 #CDCDCD text-gray-light
        </View>
      </View>
      <View className='p-40'>
        <View className='mb-24 t1'>圆角</View>
        <View className='flex flex-center'>
          <View className='rectangular-demo mr-16 t6 primary round-xs'>
            XS圆角
          </View>
          <View className='rectangular-demo mr-16 t6 primary round-sm'>
            SM圆角
          </View>
          <View className='rectangular-demo mr-16 t6 primary round'>
            正常/MD
          </View>
          <View className='rectangular-demo mr-16 t6 primary round-lg'>
            LG圆角
          </View>
          <View className='rectangular-demo mr-16 t6 primary round-full'>
            完全圆角
          </View>
        </View>
      </View>
      <View className='p-40'>
        <View className='mb-24 t1'>卡片</View>
        <View className='card p-24 mb-24 mr-24 shadow'>这是一个小卡片</View>
        <View className='card p-24 mb-24 border'>
          这是一个小卡片,无阴影,有边框
        </View>
        <View className='card round-lg p-24 flex flex-col flex-center shadow'>
          这是一个大卡片
          <Button
            className='button button-primary button-xs'
            onClick={handleClickMask}
          >
            出现阴影
          </Button>
        </View>
        {showMask && <View className='mask' onClick={handleClickMask}></View>}
      </View>
    </BasePage>
  )
}

export default DemoPage
