import React, { FC, useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import { navigateToPage } from '@/utils/common'
import { getUserInfo } from '@/apis/home'
import groupone from '@/assets/server/groupone.png'
import grouptwo from '@/assets/server/grouptwo.png'
import groupthree from '@/assets/server/groupthree.png'
import groupfour from '@/assets/server/groupfour.png'
import billone from '@/assets/server/billone.png'
import billtwo from '@/assets/server/billtwo.png'
import billthree from '@/assets/server/billthree.png'
import billfour from '@/assets/server/billfour.png'
import '@/styles/index.scss'
import './index.scss'

const mokList = [
  {
    title: '集团管理',
    children: [
      { img: groupone, title: '成员维护' },
      { img: grouptwo, title: '集团资料管理' },
      { img: groupthree, title: '管理员授权' },
      { img: groupfour, title: '授权人管理' },
    ],
  },
  {
    title: '账单管理',
    children: [
      { img: billone, title: '集团账单查询' },
      { img: billtwo, title: '集团账单明细' },
      { img: billthree, title: '集团对账单' },
      { img: billfour, title: '发票开具' },
    ],
  },
  {
    title: '我的服务',
    children: [
      { img: billone, title: '集团账单查询' },
      { img: billtwo, title: '集团账单明细' },
      { img: billthree, title: '集团对账单' },
      { img: billfour, title: '发票开具' },
    ],
  },
]

interface listRole {
  title: string
  children: Array<any>
}

// const Serverblock = (value: listRole) => {
//   console.log(value)
//   return (
//     <View className='server-boxWrap mt-20'>
//       <View className='title'>
//         <Text className='ml-21 title-info t4'>{value.title}</Text>
//       </View>
//       <View className='content px-10'>
//         {value?.children.map((item, index) => {
//           ; <View className='content-info mr-6' key={index}>
//             <Image className='logo' src={item.img}></Image>
//             <View className='ceontent-info-title t6 mt-6'>{item.title}</View>
//           </View>
//         })}
//       </View>
//     </View>
//   )
// }

const Serve: React.FC = () => {
  const [showMask, setShowMask] = useState(false)

  useEffect(() => {
    console.log('初始化')
  }, [])

  const toGetUserInfo = () => {
    getUserInfo().then((res) => {
      console.log('getUserInfo', res)
    })
  }

  return (
    <BasePage className='serve px-20 bg-gray' pageTitle='服务' isTabPage>
      {/* <View className='px-40 mt-60 t2'>服务</View> */}
      {/* <Serverblock value={list} /> */}
      <View className='server-boxWrap mt-20 px-24'>
        <View className='title'>
          <Text className='t2'>集团管理</Text>
        </View>
        <View className='content px-10'>
          {mokList[0].children.map((item, index) => {
            return (
              <View key={index} className='content-info mr-6'>
                <Image className='logo' src={item.img}></Image>
                <View className='ceontent-info-title t6 mt-6'>
                  {item.title}
                </View>
              </View>
            )
          })}
        </View>
      </View>
      <View className='server-boxWrap mt-20 px-24'>
        <View className='title'>
          <Text className='t2'>账单管理</Text>
        </View>
        <View className='content px-10'>
          {mokList[1].children.map((item, index) => {
            return (
              <View key={index} className='content-info mr-6'>
                <Image className='logo' src={item.img}></Image>
                <View className='ceontent-info-title t6 mt-6'>
                  {item.title}
                </View>
              </View>
            )
          })}
        </View>
      </View>
      <View className='server-boxWrap mt-20 px-24'>
        <View className='title'>
          <Text className='t2'>我的管理</Text>
        </View>
        <View className='content px-10'>
          {mokList[2].children.map((item, index) => {
            return (
              <View key={index} className='content-info mr-6'>
                <Image className='logo' src={item.img}></Image>
                <View className='ceontent-info-title t6 mt-6'>
                  {item.title}
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </BasePage>
  )
}

export default Serve
