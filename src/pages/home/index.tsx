import React, { useState, useEffect } from 'react'
import Taro, { useShareAppMessage } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import { navigateToPage } from '@/utils/common'
import { CITY } from '@/utils/city'
import './index.scss'

const Home: React.FC = () => {
  useEffect(() => {
    console.log('初始化')
  }, [])
  /**
   * 分享首页
   */
  useShareAppMessage(() => {
    return {
      path: '/pages/home/index',
    }
  })

  return (
    <BasePage className='home--page pt-24' pageTitle='首页' isTabPage>
      <Swiper
        className='home-swiper px-28 round'
        indicatorDots
        indicatorColor='#fff'
        indicatorActiveColor='#D25858'
      >
        <SwiperItem className='home-swiper-item'>
          <Image
            mode='aspectFill'
            className='home-swiper-img'
            src='https://tosscoin-1256354221.file.myqcloud.com/img/%E9%A4%90%E9%A5%AE%E7%BA%A2%E9%BB%91%E6%A6%9C.png'
          />
        </SwiperItem>
        <SwiperItem className='home-swiper-item'>
          <View className='px-30 pt-24'>
            <View className='t0 text-primary'>榜单说明</View>
            <View className='mt-24'>
              1. 榜单信息来源于各地市场监督管理局所发布的公告。
            </View>
            <View className='mt-12'>2. 榜单立场中立，不恰饭、不抹黑。</View>
          </View>
        </SwiperItem>
      </Swiper>
      <View className='home-list flex flex-wrap flex-between mt-24'>
        {CITY.map((item) => {
          return (
            <View
              key={item.city}
              className='home-card mb-40 flex flex-col flex-center'
            >
              <View
                className='home-card-img flex flex-center t1'
                onClick={() =>
                  navigateToPage(`/pages/area_list/index?city=${item.city}`)
                }
              >
                {item.city[0]}
              </View>
              <View className='mt-20'>{item.city}</View>
            </View>
          )
        })}
      </View>
    </BasePage>
  )
}

export default Home
