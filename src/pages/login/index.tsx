import React, { useState, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Input, Button, Text } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import { navigateToPage, isMobile } from '@/utils/common'
import logoImg from '@/assets/login/logo.png'
import './index.scss'

const Login: React.FC = () => {
  const [isCheck, setIsCheck] = useState(false)
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  // 验证码倒计时
  const [btnTitle, setBtnTitle] = useState('获取验证码')
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [time, setTime] = useState(60)

  const phoneRef: any = useRef()

  useEffect(() => {
    return clearInterval(phoneRef.current)
  }, [])

  useEffect(() => {
    if (btnDisabled && time !== 0) {
      setBtnTitle(`${time}s后重发`)
    } else {
      setBtnTitle('获取验证码')
      setBtnDisabled(false)
      setTime(60)
      clearInterval(phoneRef.current)
    }
  }, [time])

  const sendVerifyCode = () => {
    if (!btnDisabled) {
      phoneRef.current = setInterval(() => {
        setTime((count) => count - 1)
      }, 1000)
      setBtnDisabled(true)
    }
  }

  // 登录
  const handleLogin = () => {
    if (!isCheck) {
      Taro.showToast({
        title: '用户协议未勾选',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!isMobile(phone)) {
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!code) {
      Taro.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    Taro.showToast({
      title: '登录成功',
      icon: 'none',
      duration: 2000,
    })
    navigateToPage('/pages/home/index', 'switchTab')
  }

  return (
    <BasePage className='login px-62' pageTitle='登录'>
      <View className='flex flex-x-center'>
        <Image className='logo' src={logoImg} />
      </View>
      <View className='login-content'>
        <Input
          placeholder='请输入手机号码'
          className='login-input flex flex-y-center'
          type='number'
          maxlength={11}
          onInput={(e) => {
            setPhone(e.detail.value)
          }}
        />
        <Input
          placeholder='请输入手机验证码'
          className='login-input flex flex-y-center'
          type='number'
          maxlength={6}
          onInput={(e) => {
            setCode(e.detail.value)
          }}
        >
          <View className='code' onClick={() => sendVerifyCode()}>
            {btnTitle}
          </View>
        </Input>
      </View>
      <View className='mt-46 flex flex-y-center'>
        <View
          className={`checkbox mr-24 ${isCheck && 'isCheck'}`}
          onClick={() => setIsCheck(!isCheck)}
        ></View>
        <View>
          勾选同意 <Text className='text-link'>《用户服务协议》</Text>
        </View>
      </View>
      <Button
        className='button button-primary shadow bold login-btn mt-48'
        onClick={() => handleLogin()}
      >
        登录
      </Button>
    </BasePage>
  )
}

export default Login
