import React, { useState, useEffect } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import { navigateToPage } from '@/utils/common'
import { CITY } from '@/utils/city'
import './index.scss'

// interface ICity {
//   region: string
//   city: string,
//   child: string[]
// }

const AreaList: React.FC = () => {
  const router = useRouter()
  const [areaList, setAreaList] = useState<string[]>([])

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: router.params.city || '城市',
    })
    const arr: any = CITY.filter((res) => res.city === router.params.city)
    setAreaList(arr[0].child)
  }, [])

  return (
    <BasePage className='area--page pt-24'>
      <View className='home-list flex flex-wrap flex-between'>
        {areaList.map((item) => {
          return (
            <View
              key={item}
              className='home-card mb-40 flex flex-col flex-center'
            >
              <View
                className='home-card-img flex flex-center t1'
                onClick={() =>
                  navigateToPage(
                    `/pages/product_list/index?area=${item}&city=${router.params.city}`
                  )
                }
              >
                {item[0]}
              </View>
              <View className='mt-20'>{item}</View>
            </View>
          )
        })}
      </View>
    </BasePage>
  )
}

export default AreaList
