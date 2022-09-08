import React, { useState, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import BasePage from '@/components/BasePage'

import './index.scss'

const Agree: React.FC = () => {
  return (
    <BasePage className='agree' pageTitle='用户协议' pageColor='#FFFFFF'>
      <View>
        <p className='title'>
          <strong>用户服务协议</strong>
        </p>
        <p>
          <strong>&nbsp;&nbsp;&nbsp;&nbsp;尊敬的用户：</strong>
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;感谢您注册并使用认证平台，认证平台（以下简称“本平台”）根据四川省统一身份认证平台《用户服务协议》（以下简称“本协议”）为您提供服务。
          <strong>
            您点击平台页面上的“已阅读并同意协议（具体措辞详见注册页面）”或您进行注册、使用、获取用户账号、登录及使用相关服务的行为或者以其他任何明示或者默示方式表示接受本协议的，均视为您已阅读并同意签署本协议，本协议即构成对您和本平台有约束力的法律文件。如果您不同意本协议的条款，请停止注册、登录及使用本平台服务。
          </strong>
        </p>
      </View>
    </BasePage>
  )
}

export default Agree
