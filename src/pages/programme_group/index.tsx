import React, { useState, useEffect } from 'react'
import { useRouter } from '@tarojs/taro'
// import { View } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import CommodityGroup from '@/components/CommodityGroup'
import Loading from '@/components/Loading'
import { querySolutionDetails } from '@/apis/home'
import './index.scss'
// import { View } from '@tarojs/components'

const Solution: React.FC = () => {
  const router = useRouter()
  const [solutionInfo, setSolutionInfo] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    toQueryCommodityGroup()
  }, [])

  const toQueryCommodityGroup = async () => {
    setIsLoading(true)
    querySolutionDetails(router.params.id || '').then((res) => {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      setSolutionInfo(res)
    })
  }

  return (
    <BasePage className='solution' pageTitle={solutionInfo?.solutionName}>
      {!isLoading && solutionInfo.id && (
        <CommodityGroup
          info={solutionInfo}
          tabsName='newExtendGroupList'
          groupName='solutionName'
          title='value'
        />
      )}
      <Loading isShow={isLoading} />
    </BasePage>
  )
}

export default Solution
