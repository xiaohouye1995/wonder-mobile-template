import React, {
  useEffect,
  useState,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { isRouterUrl } from '@/utils/common'
import SwiperItem from './SwiperItem'
import useRect from './hooks/useRect'
import useSwiper from './hooks/useSwiper'
import useVisibility from './hooks/useVisibility'
import useEventListener from './hooks/useEventListener'
import useTouch from './hooks/useTouch'
import useResize from './hooks/useResize'
import SwiperDots from './SwiperDots'
import './index.scss'

export interface SwiperRef {
  next: () => void
  prev: () => void
  slideTo: (to: number, swiping?: boolean) => void
}

export interface SwiperProps {
  onSlideChange?: (current: number) => void
  autoplay?: number
  duration?: number
  initialSwiper?: number
  loop?: boolean
  showIndicators?: boolean
  vertical?: boolean
  touchable?: boolean
  style?: React.CSSProperties
  children: React.ReactNode
  onBindClick?: (val) => void
}

export const Swiper = React.forwardRef<SwiperRef, SwiperProps>((props, ref) => {
  const {
    initialSwiper = 0,
    vertical = false,
    duration = 500,
    autoplay = 3000,
    touchable = true,
    loop = true,
    onSlideChange,
    onBindClick,
    showIndicators = true,
  } = props
  const timer = useRef<NodeJS.Timeout | null>(null)
  const touch = useTouch()
  const count = useMemo(
    () => React.Children.count(props.children),
    [props.children]
  )
  const { size, root, changeSize } = useRect<HTMLDivElement>([count])
  const itemSize = useMemo(
    () => (vertical ? size.height : size.width),
    [size, vertical]
  )
  const itemKey = useMemo(() => (vertical ? 'height' : 'width'), [vertical])
  const itemStyle = useMemo(
    () => ({ [itemKey]: itemSize }),
    [itemKey, itemSize]
  )
  const wrappStyle = useMemo(
    () => ({ [itemKey]: itemSize * count }),
    [count, itemSize, itemKey]
  )

  // 核心方法
  const { setRefs, slideTo, next, prev, current, swiperRef, loopMove } =
    useSwiper({ count, vertical, duration, size: itemSize, loop })

  const onPlay = () => {
    if (count <= 1) return
    if (!autoplay) return
    timer.current = setTimeout(() => {
      loopMove()
    }, autoplay)
  }

  const onPause = () => {
    timer.current && clearTimeout(timer.current)
    timer.current = null
  }

  const onTouchStart = (event: React.TouchEvent | TouchEvent) => {
    if (!touchable) return
    onPause()
    touch.start(event)
  }

  const onTouchMove = (event: React.TouchEvent | TouchEvent) => {
    if (!touchable) return
    touch.move(event)
    const { deltaX, deltaY } = touch.getDelta()
    slideTo({ swiping: true, offset: vertical ? deltaY : deltaX })
  }

  const onTouchEnd = (event: React.TouchEvent | TouchEvent) => {
    if (!touchable) return
    const { deltaX, time, deltaY } = touch.end()
    const delta = vertical ? deltaY : deltaX
    const step =
      itemSize / 2 < Math.abs(delta) || Math.abs(delta / time) > 0.25
        ? delta > 0
          ? -1
          : 1
        : 0
    slideTo({ swiping: false, step })
    onPlay()
  }

  useEffect(() => {
    if (itemSize) {
      slideTo({ step: initialSwiper - current, swiping: true })
    }
  }, [itemSize, initialSwiper])

  useEffect(() => {
    if (itemSize) {
      onPlay()
    }
    return () => {
      onPause()
    }
  }, [count, autoplay, current, itemSize])

  useEffect(() => {
    onSlideChange && onSlideChange(current)
  }, [current])

  const hidden = useVisibility()
  useEffect(() => {
    hidden ? onPause() : onPlay()
  }, [hidden])

  useEventListener(
    'touchmove',
    (event) => {
      if (vertical) {
        event.preventDefault()
      }
    },
    { passive: false, target: swiperRef.current }
  )

  useResize(() => {
    onPause()
    changeSize()
    onPlay()
  })

  useImperativeHandle(ref, () => {
    return {
      next() {
        onPause()
        next()
        onPlay()
      },
      prev() {
        onPause()
        prev()
        onPlay()
      },
      slideTo(to: number, swiping?: boolean) {
        onPause()
        slideTo({ step: to - current, swiping })
        onPlay()
      },
    }
  })

  return (
    <div
      ref={root}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchCancel={onTouchEnd}
      onTouchEnd={onTouchEnd}
      style={props.style}
      onClick={() => {
        // e.stopPropagation()
        // onPause()
        console.log('current', current)
        // onTouchEnd()
        slideTo({ swiping: true })
        onBindClick && onBindClick(current)
      }}
      className='swiper'
    >
      <div
        ref={swiperRef}
        style={wrappStyle}
        className={`swiper__container ${vertical ? 'swiper__vertical' : ''}`}
      >
        {React.Children.map(props.children, (child, index) => {
          if (!React.isValidElement(child)) return null
          if (child.type !== SwiperItem) return null
          return React.cloneElement(child, {
            style: itemStyle,
            vertical: vertical,
            ref: setRefs(index),
          })
        })}
      </div>
      {showIndicators && (
        <SwiperDots current={current} vertical={vertical} count={count} />
      )}
    </div>
  )
})

export default Swiper
