/**
 * @author 周俊阳
 * @desc 暂无数据组件
 */
import React from 'react'
import { View, Button, Image } from '@tarojs/components'
import { navigateToPage } from '@/utils/common'
import noDataImg from '@/assets/common/no_data.png'
import './index.scss'

interface IPageProps extends IProps {
  className?: string
  styleVal?: string
  img?: string
  desc?: string
  button?: string
  callback?: () => void
}

const NoData: React.FC<IPageProps> = (props: IPageProps) => {
  const { className, styleVal, img, desc, button, callback } = props
  const GotoIndex = () => {
    navigateToPage('/pages/home/index', 'switchTab')
  }
  return (
    <View
      className={['noData--page flex flex-col flex-center', className].join(
        ' '
      )}
      style={styleVal}
    >
      <Image className='noData-img' src={img || noDataImg} mode='aspectFit' />
      <View className='t2 font-normal text-999'>{desc}</View>
      <View className='noData-operator'>
        {button && (
          <Button
            className='button button-primary shadow square bold noData-btn'
            onClick={callback ? callback : GotoIndex}
          >
            {button}
          </Button>
        )}
        {props.children}
      </View>
    </View>
  )
}

export default NoData
