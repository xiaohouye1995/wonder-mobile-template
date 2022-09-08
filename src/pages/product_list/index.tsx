import React, { useState, useEffect } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import NoData from '@/components/NoData'
import Loading from '@/components/Loading'
import HeadSearchBar from '@/components/HeadSearchBar'
import { navigateToPage, arrTimeSort } from '@/utils/common'
// import { redAndBlackList } from '@/utils/city'
import redAndBlackList from '@/utils/foodRB.json'
import './index.scss'

interface IProductItem {
  storeName: string
  company: string
  city: string
  id: number
  platform: string
  address: string
  type: string
  content: string
  origin: string
  create_time: string
}

const ProductList: React.FC = () => {
  const router = useRouter()
  const [productList, setProductList] = useState<IProductItem[]>([])
  const [productListAll, setProductListAll] = useState<IProductItem[]>([])
  const [tabsName, setTabsName] = useState('全部')
  const [searchVal, setSearchVal] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const tabs = ['全部', '红榜', '黑榜']

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: router.params.area || '区域',
    })
    toGetRedAndBlackList()
  }, [])

  const toGetRedAndBlackList = () => {
    setIsLoading(true)
    const data = arrTimeSort(redAndBlackList)
    const list = data.filter(
      (item) =>
        item.city === router.params.city && item.area === router.params.area
    )
    setProductList(list)
    setProductListAll([...list])
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const toChangeTabsName = (name) => {
    const list = productListAll.filter(
      (item) =>
        item.storeName.indexOf(searchVal) !== -1 &&
        (item.type === name || name === '全部')
    )
    setProductList(list)
    setTabsName(name)
  }

  const toSearch = (value) => {
    const list = productListAll.filter(
      (item) =>
        item.storeName.indexOf(value) !== -1 &&
        (item.type === tabsName || tabsName === '全部')
    )
    setProductList(list)
    setSearchVal(value)
  }

  const renderProductListCardCell = (title, val, className?) => {
    return (
      <View className='productList-card mt-20 px-20 flex'>
        <View className='productList-card-title bold'>{title}:</View>
        <View className={className}>{val}</View>
      </View>
    )
  }

  return (
    <BasePage className='industryPlatform--page'>
      <HeadSearchBar
        placeholder='输入搜索店铺名称'
        bindConfirm={(val) => toSearch(val)}
      />
      <View className='fifthGeneration-tabs flex'>
        {tabs.map((item) => {
          return (
            <View
              key={item}
              className={[
                'fifthGeneration-tabs-item flex flex-center',
                item === tabsName ? 'fifthGeneration-tabs-active' : '',
              ].join(' ')}
              onClick={() => toChangeTabsName(item)}
            >
              {item}
            </View>
          )
        })}
      </View>
      {!isLoading && (
        <View className='industryPlatform-list flex flex-col mt-104 px-24'>
          {productList.map((item) => {
            return (
              <View
                key={item.id}
                onClick={() => {
                  navigateToPage(`/pages/product_detail/index?id=${item.id}`)
                }}
                className='industryPlatform-card flex flex-col mt-32 pb-20'
              >
                <View
                  className={[
                    'industryPlatform-card-head py-12 px-20 flex flex-y-center flex-between',
                    item.type === '红榜' ? 'bg-primary' : 'bg-dark',
                  ].join(' ')}
                >
                  <View className='text-white'>
                    {item.storeName} · {item.type}
                  </View>
                  <View className='iconfont icon-arrow text-white'></View>
                </View>
                {renderProductListCardCell('所属公司', item.company)}
                {renderProductListCardCell('店铺地址', item.address)}
                {renderProductListCardCell('发布来源', item.origin)}
                {renderProductListCardCell('发布时间', item.create_time)}
              </View>
            )
          })}
        </View>
      )}
      {!isLoading && productList.length === 0 && (
        <NoData styleVal='height: calc(100vh - 92px - 104px)' desc='暂无内容' />
      )}
      {isLoading && (
        <Loading title='加载中' styleVal='margin-top: calc(92px + 104px)' />
      )}
    </BasePage>
  )
}

export default ProductList
