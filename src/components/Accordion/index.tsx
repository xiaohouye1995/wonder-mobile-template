/**
 * @author 周俊阳
 * @desc 手风琴折叠组件
 */
import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import icon_arrow_down from '@/assets/common/icon_arrow_down.png'
import './index.scss'

interface IPageProps extends IProps {
  title?: string
  className?: string
  onBindChange?: () => void
}

const Accordion: React.FC<IPageProps> = (props: IPageProps) => {
  const { title, className, onBindChange } = props
  const [isShow, setIsShow] = useState(false)

  return (
    <View className={['accordion', className].join(' ')}>
      <View
        className={[
          'accordion__container pt-32',
          isShow ? 'pb-26' : 'pb-32',
        ].join(' ')}
      >
        <View
          className='accordion__head'
          onClick={() => {
            setIsShow(!isShow)
            onBindChange && onBindChange()
          }}
        >
          <View>{title}</View>
          <Image
            className={[
              'icon_arrow_down',
              isShow && 'icon_arrow_down--up',
            ].join(' ')}
            src={icon_arrow_down}
          />
        </View>
        <View
          className={[
            'accordion__content',
            isShow && 'accordion-box-show',
          ].join(' ')}
        >
          {props.children}
        </View>
      </View>
    </View>
  )
}

export default Accordion
