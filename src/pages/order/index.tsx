import React, { useState, useEffect } from 'react'
import { ScrollView, View, Image } from '@tarojs/components'
import { navigateToPage } from '@/utils/common'
import { queySitesInfo } from '@/apis/home'
import Taro from '@tarojs/taro'
import BasePage from '@/components/BasePage'
import Popup from '@/components/Popup'
import search from '@/assets/product_category/sousuo.png'
import './index.scss'

interface IPopupProps extends IProps {
  show?: boolean
  onClose?: () => void
}

const Order: React.FC<IPopupProps> = (props) => {
  const [packageFlag, setPackageFlag] = useState<number>(1)
  const [moneyFlag, setMoneyFlag] = useState<number>(1)
  const [quantity, setQuantity] = useState<number>(1)

  const operation = (type: string) => {
    if (type === 'add') {
      setQuantity((num) => num + 1)
    } else if (quantity > 1) {
      setQuantity((num) => num - 1)
    }
  }

  //点击业务办理
  const handleClick = () => {
    navigateToPage(`/pages/order/detail/index?num=${quantity}`)
    // Taro.navigateTo({
    //   url: '/pages/order/detail/index',
    //   success: function (res) {
    //     res.eventChannel.emit('acceptDataFromOpenerPage', { data: quantity })
    //   }
    // })
  }

  return (
    <Popup mode='bottom' show={props.show} maskClosable onClose={props.onClose}>
      <View className='contentBox pr-48 pl-48 pb-48'>
        <View className='topBox pb-46'>
          <Image
            mode='aspectFill'
            className='cancelImg'
            src={require('../../assets/order/top.png')}
          />
          <View className='topRightBox pl-54 pt-26 pb-26'>
            <View className='money mb-28'>
              <View className='symbol'>￥</View>128
            </View>
            <View>已选 ：精品宽带包月</View>
            <View>100M包月～120元/月</View>
          </View>
          <View className='close' onClick={props.onClose} />
        </View>

        <View className='package pt-32 pb-32'>
          <View className='title'>资费选择</View>
          <View
            className={packageFlag === 1 ? 'active' : 'options'}
            onClick={() => {
              setPackageFlag(1)
            }}
          >
            精品宽带套餐包月
          </View>
          <View
            className='options2'
            // onClick={() => { setPackageFlag(2) }}
          >
            精品宽带套餐包年
          </View>
          <View
            className={packageFlag === 3 ? 'active' : 'options'}
            onClick={() => {
              setPackageFlag(3)
            }}
          >
            精品宽带套餐包2年
          </View>
        </View>

        <View className='selectMoney pt-32 pb-32'>
          <View className='title'>资费选择</View>
          <View
            className={moneyFlag === 1 ? 'active' : 'options'}
            onClick={() => {
              setMoneyFlag(1)
            }}
          >
            200M包月 180元/月
          </View>
          <View
            className={moneyFlag === 2 ? 'active' : 'options'}
            onClick={() => {
              setMoneyFlag(2)
            }}
          >
            200M包月 180元/月
          </View>
        </View>

        <View className='buy flex flex-between pt-32 pb-32'>
          <View className='title'>购买数量</View>
          <View className='flex'>
            <View
              className={quantity > 1 ? 'most' : 'reduction'}
              onClick={() => {
                operation('reduction')
              }}
            >
              -
            </View>
            <View className='number mr-4 ml-4'>{quantity}</View>
            <View
              className='add'
              onClick={() => {
                operation('add')
              }}
            >
              +
            </View>
          </View>
        </View>

        <View className='bottom flex flex-between'>
          <View className='cancel mr-48' onClick={props.onClose}>
            取消
          </View>
          <View className='business' onClick={handleClick}>
            业务办理
          </View>
        </View>
      </View>
    </Popup>
  )
}

export default Order
