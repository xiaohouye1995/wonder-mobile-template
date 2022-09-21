/**
 * @author 周俊阳
 * @desc 搜索栏组件
 */
import React, { useState } from 'react'
import { View, Image, Input } from '@tarojs/components'
import searchIcon from '@/assets/common/sousuo.png'
import './index.scss'

interface IPageProps extends IProps {
  placeholder?: string
  className?: string
  bindConfirm?: (val) => void
}

const HeadSearchBar: React.FC<IPageProps> = (props: IPageProps) => {
  const { placeholder, className, bindConfirm } = props
  const [searchFocus, setSearchFocus] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  return (
    <View
      className={['headSearchBar-search flex flex-center', className].join(' ')}
      onClick={() => setSearchFocus(true)}
    >
      <View
        className={[
          'headSearchBar-search-box flex flex-center',
          searchFocus ? 'headSearchBar-left' : '',
        ].join(' ')}
      >
        <Image
          className='headSearchBar-search-box-icon mr-12'
          src={searchIcon}
        />
        <View className='t6 text-999 mt-2'>
          {searchFocus ? '' : placeholder}
        </View>
        <Input
          className={[
            'headSearchBar-search-input mt-2 t6 text-dark',
            !searchFocus ? 'headSearchBar-hide' : 'headSearchBar-show',
          ].join(' ')}
          focus={searchFocus}
          confirmType='search'
          onBlur={() => {
            if (searchVal) {
              return
            }
            setSearchFocus(false)
          }}
          onConfirm={(e) => bindConfirm && bindConfirm(e.detail.value)}
          onInput={(e) => setSearchVal(e.detail.value)}
          type='text'
        />
      </View>
    </View>
  )
}

export default HeadSearchBar
