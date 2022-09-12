import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { Swiperpro, SwiperItempro } from '@/components/Swiper'
import BasePage from '@/components/BasePage'
import { navigateToPage, isRouterUrl } from '@/utils/common'
import { toIndexAllData } from '@/utils/toIndexAllData'
import { queySitesInfo } from '@/apis/home'

import './index.scss'

const Home: React.FC = () => {
  interface DataBaseValue {
    BannerData: any
    ZoneData: Array<any>
    HotData: Array<any>
    MidBannerData: Array<any>
    NetworkData: Array<any>
    ServiceData: Array<any>
    PlatformData: Array<any>
    solutionData: Array<any>
  }

  const [currentIndex, setcurrentIndex] = useState(0)
  const [tabShow, settabShow] = useState(1)
  const [IndexDataBase, setIndexDataBase] = useState<DataBaseValue>()
  const [imgFlag, setImgFlag] = useState<any>([])

  useEffect(() => {
    const siteNos = [
      'H5-home-top-banner',
      'H5-home-zone',
      'H5-home-mid-banner',
      'H5-home-hot',
      'H5-home-network',
      'H5-home-service',
      'H5-home-platform',
      'H5-home-solution',
    ]
    queySitesInfo(siteNos).then((res) => {
      setImgFlag(res)
      setIndexDataBase(toIndexAllData(res))
    })
  }, [])

  const pointChange = (e) => {
    setcurrentIndex(e.detail.current)
  }

  return (
    <BasePage
      className='home px-28 mt-24'
      pageTitle='首页'
      isTabPage
      pageColor='#F6F6F6'
    >
      {/* 首页轮播图 */}
      {IndexDataBase ? (
        IndexDataBase?.BannerData.length > 1 ? (
          <>
            <Swiper className='home-swiper round' circular autoplay>
              {IndexDataBase?.BannerData.map((item, index) =>
                item.img ? (
                  <SwiperItem key={item.elementId}>
                    <View className='database-banner'>
                      <Image
                        mode='aspectFill'
                        className='bannerImg'
                        src={item.img}
                        onClick={() => {
                          console.log(index)
                          isRouterUrl(item.address, item.type)
                        }}
                      />
                    </View>
                  </SwiperItem>
                ) : (
                  ''
                )
              )}
            </Swiper>
          </>
        ) : (
          <View>
            <Image
              className='bannerImg'
              src={IndexDataBase?.BannerData[0].img}
              onClick={() => {
                // navigateToPage(IndexDataBase?.BannerData[0].address)
                isRouterUrl(
                  IndexDataBase?.BannerData[0].address,
                  IndexDataBase?.BannerData[0].type
                )
              }}
            />
          </View>
        )
      ) : (
        <View className='bannerSkeleton' />
      )}

      {/* 首页分区导航 */}
      {IndexDataBase ? (
        <View className='navigation mb-6'>
          {IndexDataBase.ZoneData.map((item, index) => {
            return (
              <View
                className='textCenter'
                key={'zone' + index}
                onClick={() => {
                  // toClick(item.title)
                  isRouterUrl(item.address, item.type)
                }}
              >
                <Image
                  mode='aspectFill'
                  className='navTopImg'
                  src={item.icon}
                />
                <View>{item.title}</View>
              </View>
            )
          })}
        </View>
      ) : (
        <View className='navSkBox'>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <View key={index} className='navSkeleton' />
          ))}
        </View>
      )}
      {/* 首页二级banner轮播图 */}
      {IndexDataBase ? (
        IndexDataBase?.MidBannerData.length > 1 ? (
          <Swiper
            style={{
              height: 'auto',
              borderRadius: '5px',
              transform: 'translateY(0)',
              overflow: 'hidden',
            }}
            circular
            autoplay
          >
            {IndexDataBase?.MidBannerData.map((item, index) =>
              item.img ? (
                <SwiperItem key={'Swiper' + index}>
                  <View className='advertiseBanner'>
                    <Image
                      mode='aspectFill'
                      className='advertising'
                      src={item.img}
                      onClick={() => {
                        isRouterUrl(item.address, item.type)
                      }}
                    />
                  </View>
                </SwiperItem>
              ) : null
            )}
          </Swiper>
        ) : (
          <View className='midbanner-one'>
            <Image
              mode='aspectFill'
              className='advertising'
              src={IndexDataBase?.MidBannerData[0].img}
              onClick={() => {
                isRouterUrl(
                  IndexDataBase?.MidBannerData[0].address,
                  IndexDataBase?.MidBannerData[0].type
                )
              }}
            />
          </View>
        )
      ) : (
        <View className='advertisingSk' />
      )}

      {/* 爆款/主推 */}
      <View className='title'>
        {IndexDataBase?.HotData.length ? IndexDataBase?.HotData[0].title : ''}
      </View>
      <View className='hotImgBox'>
        {IndexDataBase
          ? IndexDataBase?.HotData &&
            IndexDataBase?.HotData.length > 0 &&
            IndexDataBase?.HotData[0].childList.map((item) => {
              console.log(item, 'item')
              return (
                <View
                  className='hotimg'
                  key={item.elementId}
                  onClick={() => {
                    isRouterUrl(item?.address, item?.type)
                  }}
                >
                  <h3>{item.title}</h3>
                  <h4>{item.subTitle}</h4>
                  <Image
                    mode='aspectFill'
                    className='networkbg'
                    src={item.img}
                  />
                  <Image
                    mode='aspectFill'
                    className='networkhot'
                    src={item.cornerAddress}
                  />
                </View>
              )
            })
          : [1, 2].map((_, index) => <View key={index} className='hotimgSk' />)}
      </View>
      {/* 算网设施 */}
      <View className='flex flex-between flex-y-center'>
        {IndexDataBase?.NetworkData.length ? (
          <>
            <View className='title'>
              {IndexDataBase?.NetworkData[0]?.title}
            </View>
            <View
              className='more'
              onClick={() => {
                isRouterUrl(
                  IndexDataBase?.NetworkData[0].address,
                  IndexDataBase?.NetworkData[0].type
                )
              }}
            >
              更多
            </View>
          </>
        ) : (
          ''
        )}
      </View>
      {IndexDataBase ? (
        IndexDataBase.NetworkData.length ? (
          <View className='swiperBox'>
            <View className='left pt-24 pb-40'>
              {IndexDataBase?.NetworkData[0]?.childList.length > 0 && (
                <View className='mb-54 ml-36 left-content'>
                  {IndexDataBase?.NetworkData[0]?.childList[0]?.title}
                </View>
              )}
              {IndexDataBase?.NetworkData[0]?.childList.length > 0 && (
                <Swiper
                  indicatorColor='#D8D8D8'
                  indicatorActiveColor='#DF3939'
                  onChange={pointChange}
                  style={{ height: 'auto' }}
                >
                  {IndexDataBase?.NetworkData[0]?.childList[0]?.childList.map(
                    (item) => {
                      return (
                        <SwiperItem key={item.elementId}>
                          <View
                            className='text-center'
                            onClick={() => {
                              isRouterUrl(item.address, item.type)
                            }}
                          >
                            <Image
                              mode='aspectFill'
                              className='swiperImg'
                              src={item.icon}
                            />
                            <View className='swiperText'>{item.title}</View>
                          </View>
                        </SwiperItem>
                      )
                    }
                  )}
                </Swiper>
              )}
              {IndexDataBase?.NetworkData[0]?.childList.length > 0 && (
                <View className='spot-pagination'>
                  {IndexDataBase?.NetworkData[0]?.childList[0]?.childList.map(
                    (item, index) => (
                      <View
                        key={item.elementId}
                        className={
                          'spot-pagination-bullet ' +
                          (currentIndex === index
                            ? 'spot-pagination-bullet-active'
                            : '')
                        }
                        onClick={() => {
                          isRouterUrl(item.address, item.type)
                        }}
                      ></View>
                    )
                  )}
                </View>
              )}
            </View>
            <View className='right'>
              <View className='rightBox bg-white pt-24 pr-32 pb-16 pl-24 mb-16'>
                <View className='mb-10'>
                  {IndexDataBase?.NetworkData[0]?.childList.length > 0 &&
                    IndexDataBase?.NetworkData[0]?.childList[1]?.title}
                </View>
                <View className='swiperRightCon'>
                  {IndexDataBase?.NetworkData[0]?.childList.length > 0 &&
                    IndexDataBase?.NetworkData[0]?.childList[1]?.childList.map(
                      (item) => {
                        return (
                          <View
                            key={item.elementId}
                            onClick={() => {
                              isRouterUrl(item.address, item.type)
                            }}
                            className='swiperRightCon-content'
                          >
                            <Image
                              mode='aspectFill'
                              className='swiperRightImg'
                              src={item.icon}
                            />
                            <View className='swiperRightText'>
                              {item.title}
                            </View>
                          </View>
                        )
                      }
                    )}
                </View>
              </View>
              {IndexDataBase?.NetworkData[0]?.childList.length > 0 && (
                <View className='rightBox bg-white pt-24 pr-32 pb-16 pl-24'>
                  <View className='mb-10'>
                    {IndexDataBase?.NetworkData[0]?.childList[2] &&
                      IndexDataBase?.NetworkData[0]?.childList[2]?.title}
                  </View>

                  <View className='swiperRightCon'>
                    {IndexDataBase?.NetworkData[0]?.childList[2]?.childList.map(
                      (item) => {
                        return (
                          <View
                            key={item.elementId}
                            onClick={() => {
                              isRouterUrl(item.address, item.type)
                            }}
                            className='swiperRightCon-content'
                          >
                            <Image
                              mode='aspectFill'
                              className='swiperRightImg'
                              src={item.icon}
                            />
                            <View className='swiperRightText'>
                              {item.title}
                            </View>
                          </View>
                        )
                      }
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
        ) : (
          ''
        )
      ) : (
        <View className='swiperBox'>
          <View className='leftSk' />
          <View className='right'>
            <View className='rightSk' />
            <View className='rightSk' />
          </View>
        </View>
      )}

      {/* 应用服务 */}
      <View className='flex flex-between flex-y-center'>
        {IndexDataBase?.ServiceData.length ? (
          <>
            <View className='title'>
              {IndexDataBase?.ServiceData[0]?.title}
            </View>
            <View
              className='more'
              onClick={() => {
                isRouterUrl(
                  IndexDataBase?.ServiceData[0].address,
                  IndexDataBase?.ServiceData[0].type
                )
              }}
            >
              更多
            </View>
          </>
        ) : (
          ''
        )}
      </View>

      <View className='appServiceBox flex mb-24'>
        {IndexDataBase?.ServiceData[0]?.childList.map((item, index) => {
          return (
            <View
              key={'service' + index}
              className={tabShow === index + 1 ? 'tabActive' : 'tab'}
              onClick={() => {
                settabShow(index + 1)
              }}
            >
              {item.title}
            </View>
          )
        })}
      </View>
      <View className='tabContent flex  flex-between'>
        {IndexDataBase?.ServiceData &&
          IndexDataBase?.ServiceData.length > 0 &&
          IndexDataBase?.ServiceData[0].childList[tabShow - 1].childList.map(
            (item) => {
              return (
                <View
                  className='tabContent-block'
                  key={item.elementId}
                  style={{
                    background: `url(${item.img}) no-repeat center`,
                    backgroundSize: 'cover',
                  }}
                  onClick={() => {
                    isRouterUrl(item.address, item.type)
                  }}
                >
                  <Image
                    mode='aspectFit'
                    className='appServiceImg mr-38 ml-40'
                    src={item.icon}
                  />
                  <View className='tabtitle'>{item.title}</View>
                </View>
              )
            }
          )}
      </View>

      {/* 解决方案*/}
      <View className='flex flex-between flex-y-center'>
        {IndexDataBase?.solutionData && IndexDataBase?.solutionData.length ? (
          <>
            <View className='title'>
              {IndexDataBase?.solutionData.length > 0 &&
                IndexDataBase?.solutionData[0].title}
            </View>
            <View
              className='more'
              onClick={() => {
                isRouterUrl(
                  IndexDataBase?.solutionData[0].address,
                  IndexDataBase?.solutionData[0].type
                )
              }}
            >
              更多
            </View>
          </>
        ) : (
          ''
        )}
      </View>
      <View className='solveOutermost'>
        {IndexDataBase?.solutionData[0]?.childList.map((item) => {
          return (
            <View
              className='solveBox'
              key={item.elementId}
              onClick={() => {
                isRouterUrl(item.address, item.type)
              }}
            >
              <Image mode='aspectFill' className='solveBg' src={item.img} />
              <View className='solveText'>
                <View className='flex flex-y-center'>
                  <View className='solveText-icon'></View>
                  <View className='solveTextTit'>{item.title}</View>
                  <View className='solveTextCon t6'>{item.subTitle}</View>
                </View>
              </View>
            </View>
          )
        })}
      </View>

      {/* 行业平台 */}
      <View className='flex flex-between flex-y-center'>
        {IndexDataBase?.PlatformData && IndexDataBase?.PlatformData.length ? (
          <>
            <View className='title'>
              {IndexDataBase?.PlatformData[0].title}
            </View>
            <View
              className='more'
              onClick={() => {
                isRouterUrl(
                  IndexDataBase?.PlatformData[0].address,
                  IndexDataBase?.PlatformData[0].type
                )
              }}
            >
              更多
            </View>
          </>
        ) : (
          ''
        )}
      </View>
      <View>
        {IndexDataBase?.PlatformData &&
          IndexDataBase?.PlatformData.length > 0 &&
          IndexDataBase?.PlatformData[0].childList.map((item) => {
            return (
              <View
                className='platformBox mb-24'
                key={item.elementId}
                onClick={() => {
                  isRouterUrl(item.address, item.type)
                }}
              >
                <Image
                  mode='aspectFill'
                  className='platformImg'
                  src={item.img}
                />
                <View className='platformContent ml-24'>
                  <View className='mr-8'>{item.title}</View>
                  <Image
                    mode='aspectFill'
                    className='arrowImg'
                    src={require('../../assets/home/arrow.png')}
                  />
                </View>
              </View>
            )
          })}
      </View>
    </BasePage>
  )
}

export default Home
