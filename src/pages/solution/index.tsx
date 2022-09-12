import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { View, Image } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import Loading from '@/components/Loading'
import HeadSearchBar from '@/components/HeadSearchBar'
import { isRouterUrl } from '@/utils/common'
import { queySitesInfo } from '@/apis/home'
import './index.scss'

const Solution: React.FC = () => {
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

  const toQueySitesInfo = () => {
    setIsLoading(true)
    queySitesInfo(['H5-solution'])
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
      (item) => item.title.indexOf(value) !== -1
    )
    setQueySitesList(list)
  }

  return (
    <BasePage
      className={`solution--page ${useCustomNav ? 'customNav' : ''}`}
      pageTitle='解决方案'
    >
      <HeadSearchBar
        placeholder='输入搜索解决方案名称'
        bindConfirm={(val) => toSearch(val)}
      />
      {!isLoading && (
        <View className='solution-list flex flex-wrap mt-136 flex-x-center px-24'>
          {queySitesList.map((item) => {
            return (
              <View
                key={item.elementId}
                className='solution-card flex flex-col mb-14'
                onClick={() => {
                  isRouterUrl(item.address, item.type)
                }}
              >
                <Image
                  className='solution-card-img'
                  mode='aspectFill'
                  src={item.img}
                />
                <View className='solution-card-content text-center bold px-12 lineOmit'>
                  {item.title}
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

export default Solution
