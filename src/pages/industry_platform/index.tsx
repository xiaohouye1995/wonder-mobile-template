import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { View, Image, Text } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import HeadSearchBar from '@/components/HeadSearchBar'
import Loading from '@/components/Loading'
import { isRouterUrl } from '@/utils/common'
import { queySitesInfo } from '@/apis/home'
import icon_arrow_right from '@/assets/common/icon_arrow_right.png'
import './index.scss'

const IndustryPlatform: React.FC = () => {
  const useCustomNav = useSelector(
    (state: RootState) => state.global.useCustomNav
  )
  const [queySitesList, setQueySitesList] = useState<
    Store.Home.IQueySitesListInfo[]
  >([])
  const [queySitesListFixed, setQueySitesListFixed] = useState<
    Store.Home.IQueySitesListInfo[]
  >([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    toQueySitesInfo()
  }, [])

  const toQueySitesInfo = async () => {
    setIsLoading(true)
    queySitesInfo(['H5-Industry platform'])
      .then((res) => {
        setQueySitesList(res[0]?.list || [])
        setQueySitesListFixed(res[0]?.list || [])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toSearch = (value) => {
    const list = queySitesListFixed.filter(
      (item) =>
        item.title.indexOf(value) !== -1 || item.subTitle.indexOf(value) !== -1
    )
    setQueySitesList(list)
  }

  return (
    <BasePage
      className={`industryPlatform--page ${useCustomNav ? 'customNav' : ''}`}
      pageTitle='行业平台'
    >
      <HeadSearchBar
        placeholder='输入搜索平台名称'
        bindConfirm={(val) => toSearch(val)}
      />
      {!isLoading && (
        <View className='industryPlatform-list flex flex-col mt-104 px-24'>
          {queySitesList.map((item) => {
            return (
              <View
                key={item.elementId}
                className='industryPlatform-card flex flex-col mt-32'
                onClick={() => {
                  isRouterUrl(item.address, item.type)
                }}
              >
                <Image
                  className='industryPlatform-card-img'
                  mode='aspectFill'
                  src={item.img}
                />
                <View className='flex flex-between flex-y-center pl-24 pr-30 py-24'>
                  <View className='industryPlatform-card-title bold'>
                    <Text className='text-DE3A3A'>{item.title} </Text>
                    <Text className='text-1C1C1C'>{item.subTitle}</Text>
                  </View>
                  <Image
                    className='industryPlatform-card-icon'
                    src={icon_arrow_right}
                  />
                </View>
              </View>
            )
          })}
        </View>
      )}
      <Loading isShow={isLoading} styleVal='height: calc(100vh - 104px)' />
    </BasePage>
  )
}

export default IndustryPlatform
