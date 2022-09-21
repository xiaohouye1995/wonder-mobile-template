/**
 * @author 周俊阳
 * @desc 初始页面组件
 */
import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import './index.scss'

interface IPageProps extends IProps {
  className?: string
  styleVal?: string
  pageTitle?: string // 页面标题
  navBgColor?: string // 自定义导航条背景色
  isTabPage?: boolean // 是否是底部tab页
}

const BasePage: React.FC<IPageProps> = (props: IPageProps) => {
  const { className, styleVal, pageTitle, isTabPage, navBgColor } = props

  const useCustomNav = useSelector(
    (state: RootState) => state.global.useCustomNav
  )
  const systemInfo = useSelector((state: RootState) => state.global.systemInfo)
  const styleVars = `
    --textarea-inside-margin: ${systemInfo.platform === 'ios' ? '-6px' : '0px'};
    --safe-top-padding: ${systemInfo.safeArea?.top}px;
  `

  return (
    <View
      className={[
        'state-page',
        process.env.TARO_ENV === 'h5' && isTabPage && 'area-bottom',
      ].join(' ')}
    >
      {useCustomNav && (
        <View
          className='custom-navigation flex flex-center'
          style={{ background: navBgColor || '#fff' }}
        >
          {!isTabPage && (
            <View
              onClick={() => Taro.navigateBack()}
              className='iconfont icon-fangxiang-zuo custom-navigation-icon t3 text-dark'
            />
          )}
          <View className='t2'>{pageTitle}</View>
        </View>
      )}
      <View className={className} style={styleVars + styleVal}>
        {props.children}
      </View>
    </View>
  )
}

export default BasePage
