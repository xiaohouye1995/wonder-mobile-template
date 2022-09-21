/**
 * @author 周俊阳
 * @desc loading组件
 */
import React, { useState, useEffect } from 'react'
import { Parser, Player } from 'svga'
import { View } from '@tarojs/components'
import { loadingSvga } from '@/utils/loadingSvga'
import './index.scss'

interface IPageProps {
  title?: string
  isLoading?: boolean // 控制loading展示与隐藏
  isSvga?: boolean // 使用svga进行loading加载
  className?: string
  styleVal?: string
}

const Loading: React.FC<IPageProps> = (props: IPageProps) => {
  const { isLoading, className, styleVal, isSvga = true, title } = props
  const [canvasPlayer, setCanvasPlayer] = useState<any>()
  const parser = new Parser()

  useEffect(() => {
    if (!isSvga) {
      return
    }
    let time: any = null
    if (isLoading) {
      time = setTimeout(() => {
        toSetParser()
      }, 300)
    } else {
      canvasPlayer && canvasPlayer.stop()
      canvasPlayer && canvasPlayer.clear()
      parser.destroy()
    }
    return () => {
      time && clearTimeout(time)
      canvasPlayer && canvasPlayer.stop()
      canvasPlayer && canvasPlayer.clear()
      parser.destroy()
    }
  }, [isLoading])

  const toSetParser = async () => {
    const canvas: any = document.getElementById('canvas')
    const player = new Player(canvas)
    setCanvasPlayer(player)
    const svga = await parser.load(loadingSvga)
    await player.mount(svga)
    player.onStart = () => console.log('onStart')
    player.onProcess = () => console.log('onProcess')
    player.start()
  }

  return (
    <View
      className={['loading', className, !isLoading && 'loading-hide'].join(' ')}
      style={styleVal}
    >
      {!isSvga && (
        <View className='flex'>
          <View className='loading-box mr-20'></View>
          {title && <View className='ml-8 text-light'>{title}</View>}
        </View>
      )}
      {isSvga && <canvas id='canvas' className='svga-canvas' />}
    </View>
  )
}

export default Loading
