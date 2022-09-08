/**
 * @author 小侯爷
 * @desc 初始页面组件
 */
import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import BindPhoneWrapper from '@/components/BindPhoneWrapper'
import NoData from '@/components/NoData'
import userImg from '@/assets/common/logo_2x.png'
import './index.scss'

interface IPageProps extends IProps {
  needPhone?: boolean
  loading?: boolean
  className?: string
  styleVal?: string
  onBinded?: () => void
  showContact?: boolean
  pageTitle?: string // 页面标题
  pageColor?: string // 页面背景色
  isTabPage?: boolean // 是否是底部tab页
}

const BasePage: React.FC<IPageProps> = (props: IPageProps) => {
  const {
    loading,
    onBinded,
    needPhone,
    className,
    styleVal,
    pageTitle,
    isTabPage,
    pageColor,
  } = props
  const userInfo: Store.User.IUser = useSelector(
    (state: RootState) => state.userInfo
  )
  const useCustomNav = useSelector(
    (state: RootState) => state.global.useCustomNav
  )
  const systemInfo = useSelector((state: RootState) => state.global.systemInfo)
  const styleVars = `
    --textarea-inside-margin: ${systemInfo.platform === 'ios' ? '-6px' : '0px'};
    --safe-top-padding: ${systemInfo.safeArea?.top}px;
    
  `
  useEffect(() => {
    if (userInfo.info?.phone) {
      onBinded && onBinded()
    }
  }, [userInfo.info?.phone])

  return (
    <View
      className={`state-page ${isTabPage ? 'area-bottom' : ''} ${
        useCustomNav ? 'pt-92' : ''
      }`}
    >
      {useCustomNav && (
        <View
          className='custom-navigation flex flex-center'
          style={{ background: pageColor || '#fff' }}
        >
          {!isTabPage && (
            <View
              onClick={() => Taro.navigateBack()}
              className='iconfont icon-Back custom-navigation-icon t3 text-dark'
            />
          )}
          <View className='t2'>{pageTitle}</View>
        </View>
      )}
      {needPhone && (!userInfo || !userInfo.info?.phone) && (
        <NoData img={userImg} desc='登录发现更多'>
          <BindPhoneWrapper>
            <Button className='button button-primary btn-login mt-20'>
              立即登录
            </Button>
          </BindPhoneWrapper>
        </NoData>
      )}
      {(!needPhone || (userInfo && userInfo.info?.phone)) && (
        <View className={className} style={styleVars + styleVal}>
          {loading && <View className='glass-cover'></View>}
          {props.children}
        </View>
      )}
    </View>
  )
}

export default BasePage
