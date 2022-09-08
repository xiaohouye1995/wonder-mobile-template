import React, { useState, useEffect } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'
import BasePage from '@/components/BasePage'
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

const ProductDetails: React.FC = () => {
  const router = useRouter()
  const [productDetails, setProductDetails] = useState<IProductItem>(
    {} as IProductItem
  )

  useEffect(() => {
    toGetProductDetails()
  }, [])

  const toGetProductDetails = () => {
    const list = redAndBlackList.filter(
      (item) => item.id === Number(router.params.id)
    )
    // const richText: any = list[0].content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block"')

    setProductDetails(list[0])
  }

  const renderProductListCard = (title, val?, className?) => {
    return (
      <View className='productList-card mt-20 px-20 flex'>
        <View className='productList-card-title bold'>{title}:</View>
        <View className={className}>{val}</View>
      </View>
    )
  }

  return (
    <BasePage className='productDetails--page' pageTitle='详情'>
      <View className='productDetails-card mt-32 pb-20 mx-24'>
        <View
          className={[
            'industryPlatform-card-head py-12 px-20 flex flex-y-center flex-between',
            productDetails.type === '红榜' ? 'bg-primary' : 'bg-dark',
          ].join(' ')}
        >
          <View className='text-white'>
            {productDetails.storeName} · {productDetails.type}
          </View>
        </View>
        {renderProductListCard('所属公司', productDetails.company)}
        {renderProductListCard('店铺地址', productDetails.address)}
        {renderProductListCard('上线平台', productDetails.platform)}
        {renderProductListCard('发布来源', productDetails.origin)}
        {renderProductListCard('发布时间', productDetails.create_time)}
        {renderProductListCard('上榜理由')}
        <View className='flex px-20 mt-20'>
          <RichText
            className='productDetails-richText'
            nodes={productDetails.content}
          />
        </View>
      </View>
    </BasePage>
  )
}

export default ProductDetails
