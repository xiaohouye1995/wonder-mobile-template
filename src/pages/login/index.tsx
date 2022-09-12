import React, { useState, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import { store } from '@/store/index'
import { View, Image, Input, Button } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import { verifyCodeGenerate } from '@/apis/login'
import { navigateToPage } from '@/utils/common'
// import { H5Login } from '@/apis/common'
import { encrypt } from '@/utils/jsencrypt'
import logoImg from '@/assets/login/logo.png'

import './index.scss'

const Login: React.FC = () => {
  const [state, setState] = useState(true)
  const [loginInfo, setLoginInfo] = useState({
    phone: '',
    code: '',
    password: '',
    capycha: '',
  })
  const [hasPhone, setHasPhone] = useState(false)
  const [isCheck, setIsCheck] = useState(false)
  const [isPhone, setIsPhone] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [isVerifyCode, setIsVerifyCode] = useState(false)
  const phoneRef: any = useRef()
  const handlechange = () => {
    setState(!state)
    setIsVerifyCode(false)
    setIsPhone(false)
  }
  // 手机号码加密
  const phonenumber = 15211112345
  const encryption = (phone) => {
    const reg = /(\d{3})\d{4}(\d{4})/ //正则表达式
    return phone.toString().replace(reg, '$1****$2')
  }
  // 验证码倒计时
  const [btnTitle, setBtnTitle] = useState<string>('发送验证码')
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
  const [time, setTime] = useState<number>(60)
  useEffect(() => {
    clearInterval(phoneRef.current)
    return () => {
      clearInterval(phoneRef.current)
    }
  }, [])

  useEffect(() => {
    if (btnDisabled && time > 0 && time < 60) {
      setBtnTitle(`${time}s后重发`)
    } else {
      setBtnTitle('获取验证码')
      setBtnDisabled(false)
      setTime(60)
      // clearInterval(timeFun)
    }
  }, [time])

  const sendVerifCode = () => {
    clearInterval(phoneRef.current)
    if (!btnDisabled && hasPhone) {
      phoneRef.current = setInterval(() => {
        setTime((count) => {
          if (count === 0) {
            clearInterval(phoneRef.current)
            return count
          }
          return count - 1
        })
      }, 1000)
      setBtnDisabled(true)
      // 验证码接口
      verifyCodeGenerate(loginInfo.phone).then((res) => {
        localStorage.setItem('key', res.key)
        console.log(res, 'res')
      })
    }
  }

  // 手机号验证

  const isMobile = (mobile) => {
    return /^1[3-9]\d{9}$/.test(mobile)
  }

  const handleInput = (e) => {
    setPhoneNumber(e)
    if (e.length === 11) {
      setLoginInfo({ ...loginInfo, phone: e })
      setHasPhone(true)
    }
  }

  useEffect(() => {
    if (isMobile(phoneNumber)) {
      setIsPhone(true)
    } else {
      setIsPhone(false)
    }
  }, [phoneNumber])

  const handlecode = (e) => {
    setLoginInfo({ ...loginInfo, code: e })
    setVerifyCode(e)
    if (e.length === 6) {
      setIsVerifyCode(true)
    }
  }

  const check = () => {
    setIsCheck(!isCheck)
  }

  // 登录
  const handleLogin = () => {
    if (!isCheck) {
      Taro.showToast({
        title: '用户协议未勾选',
        icon: 'none',
        duration: 2000,
      })
    }
    if (!isVerifyCode) {
      Taro.showToast({
        title: '请输入正确的验证码',
        icon: 'none',
        duration: 2000,
      })
    }
    if (!isPhone) {
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      })
    }
    if (isPhone && verifyCode === '000000') {
      sessionStorage.setItem('token', '757575')
      navigateToPage('/pages/my/index')
    }
  }
  // 一键登录
  const handleOneLogin = () => {
    if (!isCheck) {
      Taro.showToast({
        title: '用户协议未勾选',
        icon: 'none',
        duration: 2000,
      })
    }
  }

  // 跳转用户协议
  const agree = () => {
    navigateToPage('/pages/agree/index')
  }

  return (
    <BasePage className='login px-62 ' pageTitle='登录' pageColor='#FFFFFF'>
      {/* <View>登录页面</View> */}
      <Image src={logoImg} className='logo' />
      {state ? (
        <View className='number-login'>
          <View className='login-content'>
            <Input
              placeholderTextColor='#333333'
              placeholder='请输入手机号码'
              className='login-input login-phone'
              type='number'
              maxlength={11}
              onInput={(e) => {
                handleInput(e.detail.value)
              }}
            />
            <Input
              placeholder='请输入手机验证码'
              className='login-input login-verificationCode'
              type='number'
              maxlength={6}
              onInput={(e) => {
                handlecode(e.detail.value)
              }}
            >
              <View
                className='code'
                onClick={() => {
                  sendVerifCode()
                }}
              >
                {btnTitle}
              </View>
            </Input>
          </View>
          <View className='login-placeholder'>
            <View
              className={` ${isCheck ? 'isCheck' : 'checkbox'}`}
              onClick={() => {
                check()
              }}
            ></View>
            <span>勾选同意</span>
            <span
              onClick={() => {
                agree()
              }}
            >
              《用户服务协议》
            </span>
          </View>
          <Button
            className='button button-primary shadow square bold login-btn'
            hover-class='none'
            onClick={() => {
              handleLogin()
            }}
          >
            登录
          </Button>
        </View>
      ) : (
        <View className='code-login'>
          <View className='login-content'>
            <View className='userphone'>{encryption(phonenumber)}</View>
          </View>
          <View className='login-placeholder'>
            <View
              className={` ${isCheck ? 'isCheck' : 'checkbox'}`}
              onClick={() => {
                check()
              }}
            ></View>
            <span>勾选同意</span>
            <span
              onClick={() => {
                agree()
              }}
            >
              《用户服务协议》
            </span>
          </View>
          <Button
            className='button button-primary shadow square bold login-btn'
            onClick={() => {
              handleOneLogin()
            }}
          >
            一键登录
          </Button>
        </View>
      )}

      {state ? (
        <View
          className='mynumber'
          onClick={() => {
            handlechange()
          }}
        >
          本机号码一键登录
        </View>
      ) : (
        <View
          className='mynumber'
          onClick={() => {
            handlechange()
          }}
        >
          短信验证码登录
        </View>
      )}
    </BasePage>
  )
}

export default Login
