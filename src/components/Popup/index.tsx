/**
 * @author 周俊阳
 * @desc 弹出层组件
 */
import React, { CSSProperties, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

/**
 * @interface 弹窗配置项
 */
interface IPopupProps extends IProps {
  /**
   * @name 是否显示
   */
  show: boolean
  /**
   * @name 关闭弹窗事件
   */
  onClose: () => void
  /**
   * @name 弹出模式
   * @property {string} bottom 从底部弹出
   * @property {string} center 从中间弹出
   */
  mode?: 'center' | 'bottom'
  /**
   * @name 自定义CSS类名
   */
  className?: string
  /**
   * @name 自定义CSS样式
   */
  customStyle?: CSSProperties
  /**
   * @name 是否可以点击遮罩关闭
   * @default true 可以关闭
   */
  maskClosable?: boolean | true
  /**
   * @name 是否可以隐藏关闭图标
   * @default false 不隐藏
   */
  hideClose?: boolean | false
}

const Popup: React.FC<IPopupProps> = (props) => {
  const {
    show,
    mode,
    className,
    customStyle,
    hideClose,
    maskClosable,
    onClose,
  } = props

  const handlePopupClose = () => {
    onClose && onClose()
  }

  useEffect(() => {
    if (show) {
      Taro.hideTabBar()
    } else {
      Taro.showTabBar()
    }
  }, [show])

  return (
    <>
      {show && (
        <View
          className={[
            'popup',
            show ? 'popup-show' : 'popup-hide',
            mode || 'center',
            className,
          ].join(' ')}
          style={customStyle}
        >
          <View
            className='popup-mask'
            onClick={() => maskClosable && handlePopupClose()}
          ></View>
          <View className='popup-wrapper'>{props.children}</View>
          {!hideClose && (
            <View
              className='iconfont icon-cuowu popup-icon-close'
              onClick={handlePopupClose}
            ></View>
          )}
        </View>
      )}
    </>
  )
}

export default React.memo(Popup)
