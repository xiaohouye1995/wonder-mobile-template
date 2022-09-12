/**
 * @author 周俊阳
 * @desc 404页面
 */
import React from 'react'
import BasePage from '@/components/BasePage'
import NoData from '@/components/NoData'
import './index.scss'

const DemoPage: React.FC = () => {
  return (
    <BasePage className='' pageTitle='找不到页面'>
      <NoData desc='找不到页面'></NoData>
    </BasePage>
  )
}

export default DemoPage
