/**
 * @author 小侯爷
 * @desc 业务组件-商品组详情
 */
import React, { useState, useEffect } from 'react'
import Taro, { usePageScroll } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { View, Image, Button, RichText, ScrollView } from '@tarojs/components'
import { navigateToPage, rpxToPx } from '@/utils/common'
import NoData from '@/components/NoData'
import AccordionPages from './AccordionPages'
// import Order from '../../pages/order'
import './index.scss'

interface IPageProps extends IProps {
  info: Store.Home.IQueryCommodityGroup
  offsetTop?: number
  offsetHeight?: number
  className?: string
  groupName?: string //页面标题
  tabsName?: string //tab名称
  title?: string //模块标题
}

const CommodityGroup: React.FC<IPageProps> = (props: IPageProps) => {
  const {
    info,
    offsetTop = 0,
    offsetHeight = 0,
    className,
    groupName = 'commodityGroupName',
    tabsName = 'subTexts',
    title = 'title',
  } = props
  const useCustomNav = useSelector(
    (state: RootState) => state.global.useCustomNav
  )
  const [tabsActive, setTabsActive] = useState(0)
  const [tabsItemH, setTabsItemH] = useState<number[]>([])
  const [currentScrollTop, setCurrentScrollTop] = useState(0)
  const [isTabsGradient, setIsTabsGradient] = useState(false)
  const [tabsTop, setTabsTop] = useState(0)
  const [tabsW, setTabsW] = useState(0)
  const [tabsScrollLeft, setTabsScrollLeft] = useState(0)
  const [show, handleShow] = useState(false)
  const tabsHeightPx = rpxToPx(useCustomNav ? 92 + offsetTop : offsetTop)

  useEffect(() => {
    if (info.status === 2) {
      return
    }
    let isMounted = true
    if (isMounted) {
      Taro.pageScrollTo({
        scrollTop: 0,
        duration: 300,
        complete: () => {
          initTabsItemH()
        },
      })
      // 获取元素距顶部高度
      Taro.createSelectorQuery()
        .select('#commodityGroupTabs')
        .boundingClientRect((rect) => {
          setTabsTop(rect.top)
          setTabsW(rect.width)
        })
        .exec()
    }
    return () => {
      isMounted = false
    }
  }, [])

  usePageScroll((res) => {
    if (tabsTop === 0) {
      return
    }
    if (res.scrollTop >= tabsTop - 100) {
      setIsTabsGradient(true)
    } else {
      setIsTabsGradient(false)
    }
    // 滚动与菜单联动
    if (res.scrollTop >= currentScrollTop) {
      if (
        tabsActive + 1 < tabsItemH.length &&
        res.scrollTop >=
          tabsItemH[tabsActive] + rpxToPx(528 + 24 + offsetHeight - offsetTop)
      ) {
        // 528是banner高度24是间距
        toTabsScrollX(tabsActive + 1)
      }
    } else {
      //向上滚动
      if (tabsActive >= 0 && res.scrollTop + 1 < tabsItemH[tabsActive - 1]) {
        toTabsScrollX(tabsActive - 1)
      }
    }
    setCurrentScrollTop(res.scrollTop)
  })

  const toTabsScrollX = (index) => {
    Taro.createSelectorQuery()
      .select(`#tabsItem-${index}`)
      .boundingClientRect((rect) => {
        const left = rect.left - tabsW / 2 + rect.width / 2
        // console.log('left', left)
        setTabsScrollLeft(left)
        setTabsActive(index)
      })
      .exec()
  }

  const toTabsItem = (val, index) => {
    toTabsScrollX(index)
    Taro.pageScrollTo({
      selector: `#top-${val.id}`,
      offsetTop: -(tabsHeightPx + rpxToPx(86)),
      duration: 300,
    })
  }

  const initTabsItemH = () => {
    setTimeout(() => {
      const arr: number[] = []
      let h = 0
      for (const item of info[tabsName]) {
        Taro.createSelectorQuery()
          .select(`#top-${item.id}`)
          .boundingClientRect((rect) => {
            if (!rect) {
              return
            }
            h += rect.height
            arr.push(h)
          })
          .exec()
      }
      setTabsItemH(arr)
    }, 500)
  }

  const close = () => {
    handleShow(false)
  }

  return (
    <View>
      {info.status === 1 && (
        <View className={['commodityGroup pb-68', className].join(' ')}>
          <View className='commodityGroup-banner flex flex-col mb-24'>
            <Image
              className='commodityGroup-banner-img'
              mode='aspectFill'
              src={info.fileUrl}
            />
            <View className='commodityGroup-banner-content'>
              <View className='bold text-000 ml-32 mt-48'>
                {info[groupName]}
              </View>
              <View className='commodityGroup-banner-desc t6 text-595959 mt-16 ml-32'>
                {info.description}
              </View>
              {!info.groupRelationVos && (
                <Button
                  className='button button-primary shadow square bold ml-24 mt-26'
                  onClick={() => navigateToPage('/pages/negotiate/index')}
                >
                  预约洽谈
                </Button>
              )}
              {info.groupRelationVos && (
                <>
                  <Button
                    className='button button-primary shadow square bold ml-24 mt-26'
                    onClick={() => {
                      handleShow(true)
                    }}
                  >
                    立即购买
                  </Button>
                  <Button
                    className='button button-hollow bold ml-24 mt-26'
                    onClick={() => navigateToPage('/pages/negotiate/index')}
                  >
                    预约洽谈
                  </Button>
                  {['精品宽带', '互联网专线'].indexOf(
                    info.commodityGroupName
                  ) !== -1 && (
                    <Button
                      className='button button-hollow button-width shadow square bold ml-24 mt-26'
                      onClick={() => navigateToPage('/pages/internet/index')}
                    >
                      网络资源查询
                    </Button>
                  )}
                </>
              )}
            </View>
          </View>
          {info[tabsName] && info[tabsName].length !== 0 && (
            <ScrollView
              id='commodityGroupTabs'
              className={[
                'commodityGroup-tabs',
                isTabsGradient ? 'bg-white' : '',
              ].join(' ')}
              style={{
                top: `${tabsHeightPx - 1}px`,
              }}
              scrollLeft={tabsScrollLeft}
              scrollX
              scrollWithAnimation
            >
              {info[tabsName].map((item, index) => {
                return (
                  <View
                    key={item.id}
                    id={`tabsItem-${index}`}
                    className={[
                      'commodityGroup-tabs-item mr-48 pb-6',
                      index === tabsActive
                        ? 'commodityGroup-tabs-active t2'
                        : '',
                    ].join(' ')}
                    onClick={() => toTabsItem(item, index)}
                  >
                    {item[title]}
                  </View>
                )
              })}
            </ScrollView>
          )}
          {info[tabsName].map((item) => {
            return (
              <View
                key={item.id}
                id={`top-${item.id}`}
                className='commodityGroup-item mx-24 round-xs pt-32'
              >
                <View className='flex flex-center t2 text-C83232 mb-32'>
                  <View className='commodityGroup-horizontalLine' />
                  <View className='mx-16'>{item[title]}</View>
                  <View className='commodityGroup-horizontalLine' />
                </View>

                {/* 商品组部分 */}
                {item.content && (
                  <View className='commodityGroup-item-card py-32 px-24'>
                    <RichText
                      className='commodityGroup-richText'
                      nodes={item.content}
                    />
                  </View>
                )}
                {item.child &&
                  item.child.map((item2) => {
                    return (
                      <AccordionPages
                        key={item2.id}
                        title={item2.title}
                        content={item2.content}
                        initTabsItemH={() => initTabsItemH()}
                      />
                    )
                  })}

                {/* 解决方案部分 */}
                {item.modules &&
                  item.value !== '应用场景' &&
                  item.modules.map((itm) => {
                    return (
                      <View key={itm.id}>
                        {itm.contentDto && (
                          <View
                            className={[
                              'commodityGroup-item-card py-32 px-24',
                              item.modules[0]?.type !== 1 ? 'mt-24' : '',
                            ].join(' ')}
                          >
                            <RichText
                              className='commodityGroup-richText'
                              nodes={itm.contentDto.introduction}
                            />
                          </View>
                        )}

                        {itm.tabs?.map((item3) => {
                          return (
                            <AccordionPages
                              key={item3.id}
                              title={item3.tabName}
                              content={item3.introduction}
                              initTabsItemH={() => initTabsItemH()}
                            />
                          )
                        })}
                      </View>
                    )
                  })}

                {item.modules &&
                  item.value === '应用场景' &&
                  item.modules.map((item4) => {
                    return (
                      <View key={item4.id} className='scenarios'>
                        {item4.contentDto?.imgUrl && (
                          <Image
                            mode='aspectFill'
                            src={item4.contentDto.imgUrl}
                            className='sceImg'
                          />
                        )}
                        <View className='sceFooter'>
                          <View className='sceHead'>
                            {item4.contentDto.title}
                          </View>
                          <View className='sceContent'>
                            {item4.contentDto.introduction}
                          </View>
                        </View>
                      </View>
                    )
                  })}
              </View>
            )
          })}
          {/* 立即购买弹窗 */}
          {/* <Order show={show} onClose={close} /> */}
        </View>
      )}
      {info.status === 2 && <NoData desc='暂无内容' />}
    </View>
  )
}

export default CommodityGroup
