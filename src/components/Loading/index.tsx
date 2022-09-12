/**
 * @author 周俊阳
 * @desc loading组件
 */
import React, { useState, useEffect } from 'react'
import { Parser, Player } from 'svga'
// import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { loadingSvga } from '@/utils/loadingSvga'
// import loadingGif from '@/assets/common/loading.gif'
import './index.scss'

interface IPageProps {
  // title?: string
  isShow?: boolean
  className?: string
  styleVal?: string
}

const Loading: React.FC<IPageProps> = (props: IPageProps) => {
  const { isShow, className, styleVal } = props
  const useCustomNav = useSelector(
    (state: RootState) => state.global.useCustomNav
  )
  // const [isLoading, setIsLoading] = useState(false)
  const [canvasPlayer, setCanvasPlayer] = useState<any>()
  const parser = new Parser()

  useEffect(() => {
    let time: any = null
    if (isShow) {
      time = setTimeout(() => {
        toSetParser()
        // setIsLoading(true)
      }, 300)
    } else {
      canvasPlayer && canvasPlayer.stop()
      canvasPlayer && canvasPlayer.clear()
      parser.destroy()
    }
    return () => {
      clearTimeout(time)
      canvasPlayer && canvasPlayer.stop()
      canvasPlayer && canvasPlayer.clear()
      parser.destroy()
    }
  }, [isShow])

  // useEffect(() => {
  //   // const time = setTimeout(() => {
  //   //   setIsLoading(true)
  //   // }, 3000)
  //   if (isShow) {
  //     setTimeout(() => {
  //       setIsLoading(true)
  //     }, 1000)
  //   }
  //   return clearTimeout()
  // }, [isShow])

  const toSetParser = async () => {
    const canvas: any = document.getElementById('canvas')
    const player = new Player(canvas)
    setCanvasPlayer(player)
    // const svga = await parser.load('/svga/%E6%B0%B4%E6%99%B6%E9%9E%8B.svga')
    // const svga = await parser.load('../../assets/common/loading3.svga')
    // const svga = await parser.load('https://github.com/svga/SVGA-Samples/raw/master/angel.svga')
    const svga = await parser.load(loadingSvga)
    // const canvas: any = Taro.createSelectorQuery().select('#canvas')
    await player.mount(svga)
    player.onStart = () => console.log('onStart')
    player.onProcess = () => console.log('onProcess')
    player.start()
  }

  return (
    <View
      className={[
        'loading',
        className,
        useCustomNav ? 'customNav' : '',
        isShow ? 'loading-show' : 'loading-hide',
      ].join(' ')}
      style={styleVal}
    >
      {/* <View className='loading-box'></View> */}
      {/* {title && <View className='ml-8 t7plus'>{title}</View>} */}
      <canvas id='canvas' className='demoCanvas' />
      {/* {isLoading && <Canvas id="canvas" canvasId='canvas' className='demoCanvas' />} */}
      {/* {isLoading && <Image className='demoCanvas' src={loadingGif} />} */}
    </View>
  )
}

export default Loading
