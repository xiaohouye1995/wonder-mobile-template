// >2 <=4 商品
import React, { useState, useEffect } from 'react'
import { isRouterUrl } from '@/utils/common'
// import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import MyHead from '@/components/MyHead/index'
import './index.scss'

interface IPageProps {
  data: any
}

const Calls: React.FC<IPageProps> = (props) => {
  const { data } = props

  const [bannerData, setBannerData] = useState<any>([])
  const [commodityData, setCommodityData] = useState<any>([])

  useEffect(() => {
    const bannerList = data.childList.filter((item) => item.title === 'banner')
    const commodityList = data.childList.filter((item) => item.title === '商品')
    setBannerData(bannerList)
    setCommodityData(commodityList)
  }, [])

  return (
    <View className='calls'>
      <MyHead obj={data} />
      <View className='callBanner'>
        {bannerData &&
          bannerData[0]?.childList?.map((item: any) => {
            return (
              <View
                key={item.elementId}
                className='bannerPic'
                style={{
                  width:
                    bannerData[0]?.childList.length === 2 ? '48.8%' : '100%',
                }}
              >
                {item.img && (
                  <Image
                    src={item.img}
                    onClick={() => {
                      isRouterUrl(item.address, item.type)
                    }}
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </View>
            )
          })}
      </View>
      <View className='callBox'>
        {commodityData &&
          commodityData[0]?.childList?.map((item) => {
            return (
              <View
                key={item.elementId}
                className='callCon'
                onClick={() => {
                  isRouterUrl(item.address, item.type)
                }}
              >
                {/* 背景图 */}
                {item.img && <Image src={item.img} className='callBg' />}
                {/* 角标 */}
                {item.cornerAddress && (
                  <Image src={item.cornerAddress} className='callHot' />
                )}
                {item.icon && <Image src={item.icon} className='callPic' />}
                {!item.icon && <View className='callPic' />}
                <View className='callTitle'>{item.title}</View>
                <View className='callText'>{item.subTitle}</View>
              </View>
            )
          })}
      </View>
    </View>
  )
}
export default Calls
