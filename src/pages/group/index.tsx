import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Canvas from '@antv/f2-react'
import { Chart, Interval, Axis, Legend } from '@antv/f2'
import BasePage from '@/components/BasePage'
import { rpxToPx, navigateToPage } from '@/utils/common'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

import group_1 from '@/assets/group/group_1@2x.png'
import group_2 from '@/assets/group/group_2@2x.png'
import group_3 from '@/assets/group/group_3@2x.png'
import group_4 from '@/assets/group/group_4@2x.png'
import group_5 from '@/assets/group/group_5@2x.png'
import group_6 from '@/assets/group/group_6@2x.png'
import group_7 from '@/assets/group/group_7@2x.png'
import group_8 from '@/assets/group/group_8@2x.png'
import group_9 from '@/assets/group/group_9@2x.png'
import group_down from '@/assets/group/group_down@2x.png'
import group_chat from '@/assets/group/group_chat@2x.png'
import yanjing_xianshi_o from '@/assets/group/yanjing_xianshi_o@2x.png'
import yanjing_yincang from '@/assets/group/yanjing_yincang@2x.png'
import './index.scss'

const Group: React.FC = () => {
  const useCustomNav = useSelector(
    (state: RootState) => state.global.useCustomNav
  )
  const [isShowFunds, setIsShowFunds] = useState(false)
  const [isCollapse, setIsCollapse] = useState(false)
  const [currentGroup, setCurrentGroup] = useState('')
  const [isShowAccountBalance, setIsShowAccountBalance] = useState(false)

  // test

  useEffect(() => {
    console.log('初始化')
  }, [])

  const groupInfoArr = [
    {
      title: '集团建档',
      icon: group_1,
      link: '/pages/groupinfo/index',
    },
    {
      title: '集团授权人管理',
      icon: group_2,
      link: '/pages/groupauth/index',
    },
  ]

  const data = [
    {
      name: '账单金额',
      month: '1月',
      price: 1890,
    },
    {
      name: '账单金额',
      month: '2月',
      price: 2880,
    },
    {
      name: '账单金额',
      month: '3月',
      price: 3930,
    },
    {
      name: '账单金额',
      month: '4月',
      price: 4770,
    },
    {
      name: '账单金额',
      month: '5月',
      price: 8140,
    },
    {
      name: '账单金额',
      month: '6月',
      price: 5470,
    },
    {
      name: '销账金额',
      month: '1月',
      price: 1240,
    },
    {
      name: '销账金额',
      month: '2月',
      price: 2320,
    },
    {
      name: '销账金额',
      month: '3月',
      price: 3450,
    },
    {
      name: '销账金额',
      month: '4月',
      price: 1997,
    },
    {
      name: '销账金额',
      month: '5月',
      price: 5430,
    },
    {
      name: '销账金额',
      month: '6月',
      price: 7820,
    },
  ]

  const groupData = [
    {
      title: '中国移动通信集团浙江有限公司杭州分公司',
    },
    {
      title: '',
    },
  ]

  const toClick = (link) => {
    // Taro.showToast({
    //   title: '暂未开放',
    //   icon: 'none',
    //   duration: 2000,
    // })
    navigateToPage(link)
  }

  const renderWorkOrderItem = (icon, name, price, classNameVal?) => {
    return (
      <View className={classNameVal}>
        <View className='flex'>
          <Image className='group-card-icon-40' src={icon} />
          <View className='ml-4'>{name}</View>
        </View>
        <View className='t0 mt-16 text-center'>{price}</View>
      </View>
    )
  }

  const renderProductItem = (icon, name, num) => {
    return (
      <View className='flex'>
        <Image className='group-product-icon mr-6' src={icon} />
        <View className='flex flex-col flex-center'>
          <View className='text-gray'>{name}</View>
          <View className='t0 mt-24'>{num}</View>
        </View>
      </View>
    )
  }

  const renderProductMaturityItem = (name, num) => {
    return (
      <View className='flex flex-col flex-center'>
        <View className='text-gray'>{name}</View>
        <View className='t0 mt-32'>{num}</View>
      </View>
    )
  }

  const renderFundsItem = (icon, name, price, isShow) => {
    return (
      <View className='flex'>
        <Image className='group-funds-icon' src={icon} />
        <View className='ml-16'>
          <View
            className='flex flex-y-center'
            onClick={() => {
              if (name === '资金金额(元)') {
                setIsShowFunds(!isShowFunds)
              } else {
                setIsShowAccountBalance(!isShowAccountBalance)
              }
            }}
          >
            <View className='text-gray'>{name}</View>
            <Image
              className={`ml-8 ${
                isShow ? 'icon-yanjing_xianshi_o' : 'icon-yanjing_yincang'
              }`}
              src={isShow ? yanjing_xianshi_o : yanjing_yincang}
            />
          </View>
          <View className='group-funds-num t0 mt-12 letter-spacing_-4'>
            {isShow ? price : '*********'}
          </View>
        </View>
      </View>
    )
  }

  return (
    <BasePage
      className={`group pt-86 pb-24 ${useCustomNav ? 'customNav' : ''}`}
      pageTitle='集团视图'
      isTabPage
    >
      {!currentGroup && (
        <View
          onClick={() =>
            setCurrentGroup('中国移动通信集团浙江有限公司杭州分公司')
          }
          className='group-flag group-flag--notCertified flex flex-center'
        >
          暂无认证集团，点击<Text className='text-427FD4'>立即认证</Text>吧
        </View>
      )}
      {currentGroup && (
        <View
          onClick={() => setIsCollapse(true)}
          className='group-flag group-flag--certification flex flex-between flex-y-center'
        >
          <View className='flex flex-y-center ml-24'>
            <View>{groupData[0].title}</View>
            <Image className='group-icon-down ml-8' src={group_down} />
          </View>
          <Image className='group-icon-chat mr-24' src={group_chat} />
        </View>
      )}
      <View className={`group-collapse ${isCollapse ? 'show' : 'hide'}`}>
        <View
          className='group-collapse-mask'
          onTouchMove={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onClick={() => setIsCollapse(false)}
        ></View>
        <View
          onClick={() => setIsCollapse(!isCollapse)}
          className='group-collapse-header group-flag--certification flex flex-between flex-y-center'
        >
          <View className='flex flex-y-center ml-24'>
            <View>{groupData[0].title}</View>
            <Image className='group-icon-down ml-8' src={group_down} />
          </View>
          <Image className='group-icon-chat mr-24' src={group_chat} />
        </View>
        <View className='group-collapse-content pb-24'>
          {groupData.map((item) => {
            return (
              <View
                key={item.title}
                className='flex flex-between mt-24 mx-24'
                onClick={() => {
                  setIsCollapse(false)
                  setCurrentGroup(item.title)
                }}
              >
                <View className='flex-1'>{item.title || '暂无认证集团'}</View>
                {item.title === currentGroup && <View className=''>√</View>}
              </View>
            )
          })}
        </View>
      </View>
      <View className='group-card mx-24 px-24 round-xs'>
        <View className='group-card-head flex flex-y-center'>
          <View className='t2'>集团信息</View>
        </View>
        <View className='group-card-content pb-40'>
          {groupInfoArr.map((item) => {
            return (
              <View
                className='flex flex-y-center mt-40'
                onClick={() => toClick(item.link)}
                key={item.title}
              >
                <Image className='group-card-icon' src={item.icon} />
                <View className='flex-1 ml-12'>{item.title}</View>
                <View className='iconfont icon-arrow text-gray'></View>
              </View>
            )
          })}
        </View>
      </View>
      <View className='group-card mt-24 mx-24 round-xs'>
        <View className='group-card-head mx-24 flex flex-y-center'>
          <View className='t2'>工单</View>
          <View className='flex-1 ml-16 text-gray'>在途工单：100</View>
          <View className='text-gray ml-16' onClick={() => toClick()}>
            查看全部工单<Text className='iconfont icon-arrow text-gray'></Text>
          </View>
        </View>
        <View className='group-card-content pb-40 px-40 pt-40 flex'>
          {renderWorkOrderItem(group_3, '待支付', 0)}
          <View className='group-vertical-line ml-38 mr-56'></View>
          {renderWorkOrderItem(group_4, '处理中', 0)}
          <View className='group-vertical-line ml-56 mr-36'></View>
          {renderWorkOrderItem(group_5, '可下单', 0)}
        </View>
      </View>
      {currentGroup && (
        <View className='group-card mt-24 mx-24 round-xs'>
          <View className='group-card-head mx-24 flex flex-y-center'>
            <View className='t2'>产品</View>
          </View>
          <View className='group-card-content pb-40'>
            <View className='mt-48 flex flex-center'>
              {renderProductItem(group_6, '在用产品', 67)}
              <View className='group-vertical-line mx-90'></View>
              {renderProductItem(group_7, '可用优惠卷', 37)}
            </View>
            <View className='mt-48 flex flex-center'>
              {renderProductMaturityItem('1个月折扣到期', 18)}
              <View className='group-vertical-line ml-18 mr-26'></View>
              {renderProductMaturityItem('2个月折扣到期', 8)}
              <View className='group-vertical-line ml-28 mr-10'></View>
              {renderProductMaturityItem('3个月折扣到期', 8)}
            </View>
          </View>
        </View>
      )}
      {currentGroup && (
        <View className='group-card mt-24 mx-24 round-xs'>
          <View className='group-card-head mx-24 flex flex-y-center'>
            <View className='t2'>资金总览</View>
          </View>
          <View className='group-card-content flex flex-center pb-40 pt-50'>
            {renderFundsItem(group_8, '资金金额(元)', 874521309, isShowFunds)}
            <View className='group-vertical-line ml-34 mr-24'></View>
            {renderFundsItem(
              group_9,
              '账户余额(元)',
              874521309,
              isShowAccountBalance
            )}
          </View>
        </View>
      )}
      {currentGroup && (
        <View className='group-card mt-24 mx-24 round-xs'>
          <View className='group-card-head mx-24 flex flex-y-center'>
            <View className='t2 flex-1'>近六个月账单与销账</View>
            <View className='text-gray ml-16' onClick={() => toClick()}>
              查看更多<Text className='iconfont icon-arrow text-gray'></Text>
            </View>
          </View>
          <View className='group-card-content flex flex-center pb-20'>
            <Canvas
              className='group-canvas'
              pixelRatio={Taro.getSystemInfoSync().pixelRatio}
            >
              <Chart data={data}>
                <Legend
                  height={rpxToPx(50)}
                  marker='square'
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                  nameStyle={{
                    fontSize: rpxToPx(24),
                    fill: '#333',
                  }}
                />
                <Axis
                  field='month'
                  style={{
                    label: {
                      fontSize: rpxToPx(24),
                      fill: '#333',
                    },
                    line: {
                      lineWidth: rpxToPx(2),
                      fill: '#F6F6F6',
                    },
                    grid: {
                      lineWidth: 0,
                    },
                  }}
                />
                <Axis
                  field='price'
                  style={{
                    label: {
                      fontSize: rpxToPx(24),
                      fill: '#333',
                    },
                    line: {
                      lineWidth: 0,
                    },
                    grid: {
                      lineWidth: rpxToPx(2),
                      lineDash: [3],
                    },
                  }}
                />
                <Interval
                  x='month'
                  y='price'
                  color={[
                    'name',
                    ['l(90) 0:#FFB779 1:#FD8044', 'l(90) 0:#FFEAAA 1:#FFD171'],
                  ]}
                  style={{
                    radius: [rpxToPx(2), rpxToPx(2), 0, 0],
                  }}
                  adjust={{
                    type: 'dodge',
                    marginRatio: 0, // 设置分组间柱子的间距
                  }}
                />
              </Chart>
            </Canvas>
          </View>
        </View>
      )}
    </BasePage>
  )
}

export default Group
