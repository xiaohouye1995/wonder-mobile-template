/**
 * @author 小侯爷
 * @desc 返回上一页组件
 */
import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

interface IPageProps {
  title?: string
  className?: string
  styleVal?: string
}

const Loading: React.FC<IPageProps> = (props: IPageProps) => {
  const { title, className, styleVal } = props
  return (
    <View className={['loading', className].join(' ')} style={styleVal}>
      <View className='loading-box'></View>
      {title && <View className='ml-8 t7plus'>{title}</View>}
    </View>
  )
}

export default Loading
