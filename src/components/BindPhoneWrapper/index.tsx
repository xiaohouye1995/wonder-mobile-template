/**
 * @author 小侯爷
 * @desc 绑定登录组件
 */
import React, { CSSProperties, useState } from 'react'
import Taro from '@tarojs/taro'
import {
  View,
  Button,
  BaseEventOrig,
  ButtonProps,
  Image,
} from '@tarojs/components'
import { RootState, Dispatch } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import { completeUserInfo } from '@/apis/common'
// import { navigateToPage } from '@/utils/common'
import Popup from '@/components/Popup'
import logoImg from '@/assets/common/logo_2x.png'
import './index.scss'

interface IWrapperProps extends IProps {
  customStyle?: CSSProperties
  onSuccess?: () => void
}

const BindPhoneWrapper: React.FC<IWrapperProps> = (props: IWrapperProps) => {
  const { customStyle, onSuccess } = props
  const userInfo: Store.User.IUserInfo = useSelector(
    (state: RootState) => state.userInfo.info
  )
  const dispatch = useDispatch<Dispatch>()

  const hasMobile = userInfo && !!userInfo.phone
  const [show, setShow] = useState(false)

  const handleCompletePhone = async (
    e: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>
  ) => {
    await dispatch.userInfo.completeUserMobile(e.detail)
    setShow(false)
    onSuccess && onSuccess()
  }

  const handleCompleteUserInfo = () => {
    Taro.getUserProfile({
      desc: '用于餐饮红黑榜内个性化展示',
      success: async (res) => {
        if (!userInfo) {
          await dispatch.userInfo.initUserInfo()
        }
        const user = res.userInfo
        const { code } = await Taro.login()
        Taro.setStorageSync('code', code)
        completeUserInfo(user.nickName, user.avatarUrl).then(() => {
          setShow(true)
          onSuccess && onSuccess()
        })
      },
    })
  }

  return (
    <View className='complete-info_wrapper' style={customStyle}>
      {props.children}
      {!hasMobile && (
        <View
          className='complete-info_fixed-btn'
          onClick={() => handleCompleteUserInfo()}
        ></View>
      )}
      <Popup
        show={show}
        maskClosable={false}
        hideClose
        mode='bottom'
        height={500}
      >
        <View>
          <View className='flex flex-y-center px-24 mb-32'>
            <Image
              className='logo mr-8'
              src={logoImg}
              mode='aspectFill'
            ></Image>
            <View className='t4'>餐饮红黑榜</View>
          </View>
          <View className='t6 text-light px-24 mb-28 text-left'>
            完善您的信息
          </View>
          <View className='t1 px-24 text-left'>请绑定您的手机号</View>
          <View className='px-24 btn-phone'>
            <Button
              openType='getPhoneNumber'
              className='button button-success row'
              onGetPhoneNumber={handleCompletePhone}
            >
              一键绑定
            </Button>
          </View>
        </View>
      </Popup>
    </View>
  )
}

export default BindPhoneWrapper
