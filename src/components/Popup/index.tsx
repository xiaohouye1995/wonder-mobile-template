/**
 * @author 小侯爷
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
   * @name 自定义CSS类名
   */
  className?: string
  /**
   * @name 自定义CSS样式
   */
  customStyle?: CSSProperties
  /**
   * @name 是否显示
   */
  show?: boolean
  /**
   * @name 弹出模式
   * @property {string} bottom 从底部弹出
   * @property {string} center 从中间弹出
   */
  mode: 'center' | 'bottom' | 'top'
  /**
   * @name 弹窗高度
   */
  height?: number
  /**
   * @name 是否可以点击遮罩关闭
   * @default true 可以关闭
   */
  maskClosable?: boolean | true
  hideClose?: boolean | false
  /**
   * @name 关闭弹窗事件
   */
  onClose?: () => void
}

const Popup: React.FC<IPopupProps> = (props) => {
  const {
    show,
    mode,
    height,
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
            mode || 'bottom',
            className,
          ].join(' ')}
          style={Object.assign(
            { '--popup-height': `${height || 450}rpx` },
            customStyle
          )}
        >
          <View
            className='mask popup-mask'
            onClick={() => maskClosable && handlePopupClose()}
          ></View>
          <View className='popup-wrapper pt-40'>
            {/* {!hideClose && (
              <Text
                className='iconfont icon-guanbi1 text-light bold'
                onClick={handlePopupClose}
              ></Text>
            )} */}
            {props.children}
          </View>
        </View>
      )}
    </>
  )
}

export default React.memo(Popup)
