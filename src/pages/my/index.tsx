import React, { useEffect } from 'react'
import BasePage from '@/components/BasePage'
import MineHeader from './Header/index'
import './index.scss'

const Mine: React.FC = () => {
  useEffect(() => {
    console.log('初始化')
  }, [])

  return (
    <BasePage
      className='mine px-28'
      pageTitle='我的'
      isTabPage
      navBgColor='#F6F6F6'
    >
      <MineHeader />
    </BasePage>
  )
}

export default Mine
