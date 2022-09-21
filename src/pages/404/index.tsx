/**
 * @author 周俊阳
 * @desc 404页面
 */
import React from 'react'
import BasePage from '@/components/BasePage'
import NoData from '@/components/NoData'
import './index.scss'

const PageNotFound: React.FC = () => {
  return (
    <BasePage pageTitle='找不到页面' className='pageNotFound flex flex-center'>
      <NoData desc='找不到页面'></NoData>
    </BasePage>
  )
}

export default PageNotFound
