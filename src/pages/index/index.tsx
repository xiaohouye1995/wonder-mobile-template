import React, { useState } from 'react'
import { View, Button } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import './index.scss'

const DemoPage: React.FC = () => {
  const [showMask, setShowMask] = useState(false)

  return (
    <BasePage className='defaultIndex' pageTitle='设计规范'>
      <View className='p-40'>
        <View className='mb-24 t1'>文字</View>
        <View className='t1'>T1 级别--标准字 34px 加粗 123456789 abc</View>
        <View className='t2'>T2 级别--标准字 32px 加粗 123456789 abc</View>
        <View className='t3'>T3 级别--标准字 30px 加粗 123456789 abc</View>
        <View className='t4'>T4 级别--标准字 28px 123456789 abc</View>
        <View className='t5'>T5 级别--标准字 26px 123456789 abc</View>
        <View className='t6'>T6 级别--标准字 24px 123456789 abc</View>
        <View className='t7'>T7 级别--标准字 22px 123456789 abc</View>
        <View className='t8'>T8 级别--标准字 20px 123456789 abc</View>
        <View className='t9'>T9 级别--标准字 18px 123456789 abc</View>
        <View className='t10'>T10 级别--标准字 16px 123456789 abc</View>
      </View>
      <View className='p-40'>
        <View className='mb-24 t1'>颜色</View>
        <View>默认标准字体大小 #333333 text-dark</View>
        <View className='text-primary'>
          默认标准字体大小 #FF4E4F text-primary
        </View>
        <View className='text-gray'>默认标准字体大小 #666666 text-gray</View>
        <View className='text-light'>默认标准字体大小 #A5A5A5 text-light</View>
      </View>
      <View className='p-40'>
        <View className='mb-24 t1'>圆角</View>
        <View className='flex'>
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
        <Button
          className='button button-primary button-xs'
          onClick={() => setShowMask(!showMask)}
        >
          出现阴影
        </Button>
        {showMask && (
          <View className='mask' onClick={() => setShowMask(!showMask)}></View>
        )}
      </View>
    </BasePage>
  )
}

export default DemoPage
