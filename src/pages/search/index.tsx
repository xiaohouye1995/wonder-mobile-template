import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  Input,
  ScrollView,
  RichText,
  Image,
} from '@tarojs/components'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import BasePage from '@/components/BasePage'
import NoData from '@/components/NoData'
import { queySitesInfo } from '@/apis/home'
import { isRouterUrl } from '@/utils/common'
import logoImg from '@/assets/product_category/sousuo.png'
import deleteImg from '@/assets/search/shanchu.png'

import '@/assets/icon/iconfont.css'
import './index.scss'

const Search: React.FC = () => {
  const useCustomNav = useSelector(
    (state: RootState) => state.global.useCustomNav
  )
  // 控制清空输入框按钮
  const [focus, setFocus] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchList, setSearchList] = useState<Array<any>>([])
  const [searchfilter, setSearchfilter] = useState<Array<any>>([])
  const [searchInput, setSearchInput] = useState('')
  const [data, setData] = useState<any>([])
  const inputRef = useRef<any>()
  // 搜索筛选数据

  useEffect(() => {
    const siteNos = ['H5-product category']
    queySitesInfo(siteNos).then((res: any) => {
      if (res.length) {
        console.log(res[0].list, 'datalist')
        setData(res[0].list)
      }
    })
  }, [])

  useEffect(() => {
    // console.log(searchValue, 'searchValue')
    if (searchValue) {
      setFocus(true)
      // setSearchfilter([])
    } else {
      setFocus(false)
      // setSearchfilter([])
      // console.log(66666)
    }
  }, [searchValue])

  // 深拷贝对象
  const deepClone = (obj) => {
    const _obj = JSON.stringify(obj),
      objClone = JSON.parse(_obj)
    return objClone
  }

  // 多层级模糊查询
  const filterlist = (value) => {
    // setSearchInput(value)
    const data1 = deepClone(data)
    const datafilter = data1
      .map((t) => {
        return (t.childList = t.childList
          .filter((z) => {
            return (z.childList = z.childList
              .filter((y) => {
                return y.title.indexOf(value) > -1
              })
              .filter((d) => {
                return d !== undefined
              }))
          })
          .filter((c) => {
            return c.childList.length > 0
          }))
      })
      .filter((n) => {
        return n.length > 0
      })
    setSearchList(datafilter)
    console.log(datafilter, 'datafilter')
  }

  useEffect(() => {
    setSearchfilter([])
  }, [searchInput])

  // 键盘搜索
  const search = (value) => {
    console.log(value, 'keyword')
    if (value) {
      const data1 = deepClone(data)
      const datafilter = data1
        .map((t) => {
          return (t.childList = t.childList
            .filter((z) => {
              return (z.childList = z.childList
                .filter((y) => {
                  return y.title.indexOf(value) > -1
                })
                .filter((d) => {
                  return d !== undefined
                }))
            })
            .filter((c) => {
              return c.childList.length > 0
            }))
        })
        .filter((n) => {
          return n.length > 0
        })
      setSearchfilter(datafilter)
      if (datafilter) {
        setSearchList([])
      }
    }
  }

  // 关键字改变颜色
  const reg = new RegExp(searchValue, 'g')

  return (
    <BasePage
      className={`search ${useCustomNav ? 'customNav' : ''}`}
      pageTitle='搜索'
    >
      <View className='search-fixed flex flex-y-center'>
        <View className='search-bar'>
          <View className=' search-bar-wrap'>
            <View className='logo'>
              <Image
                src={logoImg}
                mode='widthFix'
                style={{ width: '12px', top: '1px' }}
              />
            </View>
            <Input
              className='search-input'
              ref={inputRef}
              value={searchValue}
              placeholder='请输入内容'
              onInput={(e) => {
                setSearchValue(e.detail.value)
                filterlist(e.detail.value)
                setSearchfilter([])
                if (!e.detail.value) {
                  setSearchList([])
                }
              }}
              onConfirm={(e) => {
                console.log('完成按钮')
                search(e.detail.value)
              }}
              confirmType='search'
            />
            {focus && (
              <View
                className='delete'
                onClick={() => {
                  setFocus(false)
                  setSearchValue('')
                  setSearchfilter([])
                  setSearchList([])
                }}
              >
                <Image
                  src={deleteImg}
                  mode='widthFix'
                  style={{ width: '12px' }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <ScrollView className='search-content' scrollY>
        {searchList.length === 0 &&
          searchfilter.length === 0 &&
          searchValue && <NoData desc='暂无数据'></NoData>}
        <View className='search-list'>
          {searchfilter &&
            searchList &&
            searchList.map((i) => {
              return i.map((t) => {
                return t.childList.map((y, index) => {
                  return (
                    <View
                      className='search-list-item'
                      key={'list' + index}
                      onClick={() => {
                        isRouterUrl(y.address, y.type)
                      }}
                    >
                      <Image
                        src={logoImg}
                        mode='widthFix'
                        style={{
                          width: '12px',
                          top: '1px',
                          transform: 'translateY(-1px)',
                        }}
                      />
                      <View className='search-list-content'>
                        <RichText
                          nodes={y.title.replace(
                            reg,
                            `<span style='color:#B42D2D'>${searchValue}</span>`
                          )}
                        />
                      </View>
                    </View>
                  )
                })
              })
            })}
          {/* 图标搜索 */}
          {searchfilter &&
            searchfilter.map((i) => {
              return i.map((t, index) => {
                return (
                  <View className='search-list-diff' key={'searchlit' + index}>
                    <View className='search-list-diff-header'>
                      <Text className='search-list-diff-title'>{t.title}</Text>
                    </View>
                    <View className='diff-content'>
                      {t.childList.map((z, zindex) => {
                        return (
                          <View
                            className='diff-box'
                            key={'diffbox' + zindex}
                            onClick={() => {
                              isRouterUrl(z.address, z.type)
                            }}
                          >
                            <Image className='box-logo' src={z.icon}></Image>
                            <RichText
                              className='box-title'
                              nodes={z.title.replace(
                                reg,
                                `<span style='color:#B42D2D'>${searchValue}</span>`
                              )}
                            />
                          </View>
                        )
                      })}
                    </View>
                  </View>
                )
              })
            })}
        </View>
      </ScrollView>
    </BasePage>
  )
}

export default Search
