/**
 * @author 小侯爷
 * @desc web
 */
import React, { useState, useEffect } from 'react'
import { useRouter } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import Events from '@/utils/event'

const Web: React.FC = () => {
  const router = useRouter()
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(router.params.url || '')
  }, [router])

  const handleMessage = (e) => {
    Events.$emit('onWebMessage', e.detail)
  }

  return (
    <WebView src={decodeURIComponent(url)} onMessage={handleMessage}></WebView>
  )
}

export default Web
