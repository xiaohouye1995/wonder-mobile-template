import React, { useState, useEffect } from 'react'
import { ScrollView, View, Image } from '@tarojs/components'
import { navigateToPage, isRouterUrl } from '@/utils/common'
import { queySitesInfo } from '@/apis/home'
import Taro from '@tarojs/taro'
import BasePage from '@/components/BasePage'
import search from '@/assets/product_category/sousuo.png'
import './index.scss'

//获取不同设备屏幕高度
const NAVIGATOR_HEIGHT = 44
const TAB_BAR_HEIGHT = 50

const info: any = Taro.getSystemInfoSync()
const { windowHeight, statusBarHeight, titleBarHeight } = info
const tabBarHeight = TAB_BAR_HEIGHT || 0
let winHeight = 0

if (process.env.TARO_ENV === 'rn') {
  winHeight = windowHeight - statusBarHeight - NAVIGATOR_HEIGHT - tabBarHeight
} else if (process.env.TARO_ENV === 'h5') {
  winHeight = windowHeight - tabBarHeight
} else if (process.env.TARO_ENV === 'alipay') {
  winHeight =
    windowHeight - statusBarHeight - titleBarHeight + (TAB_BAR_HEIGHT || 0)
} else {
  winHeight = windowHeight
}

const ProductCategory: React.FC = () => {
  const [selectId, setSelectId] = useState('') //对应锚点的值
  const [navActive, setAavActive] = useState(0) //左侧点击选中的菜单栏下标
  //页面加载时执行的方法
  const [scrollVal, setScrollVal] = useState(0)
  const [heightArr, setHeightArr] = useState([])
  const [distance, setDistance] = useState(0)
  //渲染数据
  const [data, setData] = useState<any>([])
  // -------------------------------
  const [show, handleShow] = useState(false)
  const close = () => {
    handleShow(false)
  }
  // -------------------------------

  const selectHeight = () => {
    const arr = [] as any
    let h = 0
    const query = Taro.createSelectorQuery()
    query.selectAll('.outermost').boundingClientRect()
    query.exec(function (res) {
      res[0].forEach((item: any) => {
        h += item.height
        arr.push(h)
      })
      //获取每一块儿content_box的高度值存储起来
      setHeightArr(arr)
      //内容区滚动的高度,首次加载获取第一项
      if (navActive === 0) {
        setScrollVal(0)
      } else {
        setScrollVal(arr[navActive - 1])
      }
    })
  }

  //右侧滚动时方法
  const onscroll = (e) => {
    if (e.detail.scrollTop < 100) {
      selectHeight()
    }
    if (heightArr.length === 0) return
    const scrollTop = e.detail.scrollTop
    if (scrollTop >= distance) {
      if (
        navActive + 1 < heightArr.length &&
        scrollTop >= heightArr[navActive]
      ) {
        setAavActive(navActive + 1)
      }
    } else {
      //向上滚动
      if (navActive >= 0 && scrollTop + 1 < heightArr[navActive - 1]) {
        setAavActive(navActive - 1)
      }
    }
    setDistance(scrollTop)
  }

  //   左边菜单栏点击
  const navClick = (item: string, index: number) => {
    setAavActive(index)
    setSelectId(item + index)
  }

  useEffect(() => {
    if (selectId) {
      selectHeight()
    }
  }, [selectId])

  useEffect(() => {
    const siteNos = ['H5-product category']
    queySitesInfo(siteNos).then((res: any) => {
      if (res.length) {
        navClick(res[0].list[0].title, 0)
        setData(res[0].list)
      }
    })
  }, [])

  return (
    <BasePage className='product_category' pageTitle='产品分类'>
      <View className='productBox'>
        <View
          className='searchProduct'
          onClick={() => navigateToPage('/pages/search/index')}
        >
          <Image
            src={search}
            mode='widthFix'
            style={{ width: '12px', marginRight: '8px', top: '7px' }}
          />
          输入搜索产品名称
        </View>
      </View>
      <View className='content'>
        <ScrollView className='content_left'>
          {data.map((item, index) => {
            return (
              <View
                key={`${item.title}${index}`}
                style={{ position: 'relative' }}
              >
                <View
                  key={index}
                  className={`nav_title ${
                    index === navActive ? 'nav_active' : ''
                  }`}
                  onClick={() => navClick(item.title, index)}
                >
                  {item.title}
                </View>
              </View>
            )
          })}
        </ScrollView>
        <ScrollView
          className='content_scroll'
          style={{ height: `${winHeight}px` }}
          scrollY
          scrollWithAnimation
          scrollIntoView={selectId}
          enhanced
          bounces={false}
          onScroll={(e) => onscroll(e)}
          scrollTop={scrollVal}
        >
          <View style={{ paddingBottom: `${winHeight - 132}px` }}>
            {data.map((_, i) => {
              return (
                <View key={i} className='outermost'>
                  {data[i].childList.map((item, index) => {
                    return (
                      <View
                        key={`${item.title}${index}`}
                        className='content_box'
                      >
                        <View className='rectangle'>
                          <View className='content_title'>{item.title}</View>
                        </View>
                        {item.childList && item.childList.length > 0 ? (
                          <View className='content_center_box'>
                            {item.childList.map((ele, num) => {
                              return (
                                <View
                                  key={`${ele.title}${num}`}
                                  className='content_center'
                                  onClick={() => {
                                    isRouterUrl(ele.address, ele.type)
                                  }}
                                >
                                  <Image
                                    style={{ width: '50%' }}
                                    src={ele.icon || ''}
                                  />
                                  <View className='doctor_name'>
                                    {ele.title}
                                  </View>
                                </View>
                              )
                            })}
                          </View>
                        ) : (
                          '暂无数据'
                        )}
                      </View>
                    )
                  })}
                </View>
              )
            })}
          </View>
        </ScrollView>
      </View>
    </BasePage>
  )
}

export default ProductCategory
