// <=2 商品
import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { isRouterUrl } from '@/utils/common'
import MyHead from '@/components/MyHead/index'
import './index.scss'

interface IPageProps extends IProps {
  data: any
}

const Package: React.FC<IPageProps> = (props) => {
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
    <View className='package'>
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
      <View className='packBox'>
        {commodityData &&
          commodityData[0]?.childList?.map((item: any) => {
            return (
              <View
                key={item.elementId}
                className='packCon'
                onClick={() => {
                  isRouterUrl(item.address, item.type)
                }}
              >
                {/* 背景图 */}
                {item.img && <Image src={item.img} className='packBg' />}
                {/* 角标 */}
                {item.cornerAddress && (
                  <Image src={item.cornerAddress} className='packHot' />
                )}
                {item.icon && <Image src={item.icon} className='packPic' />}
                {!item.icon && <View className='packPic' />}
                <View className='packContent'>
                  <Text className='packTitle'>{item.title}</Text>
                  <View className='packText'>{item.subTitle}</View>
                </View>
              </View>
            )
          })}
      </View>
    </View>
  )
}
export default Package
