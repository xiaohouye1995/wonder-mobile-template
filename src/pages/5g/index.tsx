import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { View, Image, Button } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import CommodityGroup from '@/components/CommodityGroup'
import NoData from '@/components/NoData'
import Loading from '@/components/Loading'
import { isRouterUrl } from '@/utils/common'
import { queySitesInfo, queryCommodityGroup } from '@/apis/home'
import './index.scss'

const FifthGeneration: React.FC = () => {
  const useCustomNav = useSelector(
    (state: RootState) => state.global.useCustomNav
  )
  const [tabsName, setTabsName] = useState('5G专区')
  const [fifthGList, setFifthList] = useState<Store.Home.IQueySitesListInfo[]>(
    []
  )
  const [commodityGroupInfo, setCommodityGroupInfo] =
    useState<Store.Home.IQueryCommodityGroup>(
      {} as Store.Home.IQueryCommodityGroup
    )
  const [isLoading, setIsLoading] = useState(false)
  const tabs = ['5G专区', '5G切片']

  useEffect(() => {
    toQueySitesInfo()
  }, [])

  const toQueySitesInfo = async () => {
    setIsLoading(true)
    try {
      const sitesInfo = await queySitesInfo(['H5-5G zone', 'H5-5G slice'])
      setFifthList(sitesInfo[0]?.list || [])
      setIsLoading(false)
      const url = sitesInfo[1]?.list[0]?.address || ''
      const id = url.split('productGroup/')[1]
      if (!id) {
        return
      }
      const groupInfo = await queryCommodityGroup(id)
      setCommodityGroupInfo(groupInfo)
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <BasePage
      className={`fifthGeneration ${useCustomNav ? 'customNav' : ''}`}
      pageTitle='5G专区'
    >
      <View className='fifthGeneration-tabs flex'>
        {tabs.map((item) => {
          return (
            <View
              key={item}
              className={[
                'fifthGeneration-tabs-item flex flex-center',
                item === tabsName ? 'fifthGeneration-tabs-active' : '',
              ].join(' ')}
              onClick={() => setTabsName(item)}
            >
              {item}
            </View>
          )
        })}
      </View>
      {tabsName === '5G专区' && !isLoading && fifthGList.length > 0 && (
        <View className='fifthGeneration-content px-24 pb-68'>
          {fifthGList.map((item) => {
            return (
              <View key={item.elementId} className='flex flex-col mb-32'>
                <View className='fifthGeneration-banner'>
                  <Image
                    className='fifthGeneration-banner-img'
                    src={item.img}
                  ></Image>
                  <View className='fifthGeneration-banner-title text-C83232'>
                    {item.title}
                  </View>
                </View>
                <View className='fifthGeneration-list pt-28 pb-24'>
                  {item.childList &&
                    item.childList.map((item2, index) => {
                      return (
                        <View key={item2.elementId}>
                          <View className='flex flex-y-center pl-10 pr-24'>
                            <View className='fifthGeneration-tip-icon' />
                            <View className='t2 text-1C1C1C ml-6'>
                              {item2.title}
                            </View>
                          </View>
                          <View className='bold text-1C1C1C mt-24 pl-22'>
                            {item2.childList[0]?.title || ''}
                          </View>
                          <View className='t6 text-gray mt-14 pl-22 pr-24'>
                            {item2.childList[0]?.subTitle || ''}
                          </View>
                          {item2.childList[0]?.address && (
                            <View className='text-right pr-24'>
                              <Button
                                className='button button-primary shadow square bold'
                                onClick={() =>
                                  isRouterUrl(
                                    item.childList[0]?.address,
                                    item.childList[0]?.type
                                  )
                                }
                              >
                                查看详情
                              </Button>
                            </View>
                          )}
                          {index < item.childList.length - 1 && (
                            <View className='fifthGeneration-line' />
                          )}
                        </View>
                      )
                    })}
                </View>
              </View>
            )
          })}
        </View>
      )}
      {tabsName === '5G专区' && !isLoading && fifthGList.length === 0 && (
        <NoData desc='暂无内容' />
      )}
      {tabsName === '5G专区' && <Loading isShow={isLoading} />}
      {tabsName === '5G切片' && commodityGroupInfo.commodityGroupName && (
        <CommodityGroup
          className='fifthGeneration-content'
          info={commodityGroupInfo}
          offsetTop={92}
          offsetHeight={92 + 32}
        />
      )}
    </BasePage>
  )
}

export default FifthGeneration
