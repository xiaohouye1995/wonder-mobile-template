import React, { useImperativeHandle, useMemo, useRef, useState } from 'react'
import { SwiperProps } from './Swiper'
import './index.scss'

export interface SwipeItemRef {
  setOffset: React.Dispatch<React.SetStateAction<number>>
}

export interface SwipeItemProps {
  readonly vertical?: SwiperProps['vertical']
  readonly style?: React.CSSProperties
  children: React.ReactNode
}

export const SwiperItem = React.forwardRef<SwipeItemRef, SwipeItemProps>(
  (props, ref) => {
    const { children, style, vertical } = props
    const [offset, setOffset] = useState(0)
    const swipeItemRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => {
      return {
        setOffset,
      }
    })

    const itemStyle = useMemo(() => {
      return {
        transform: offset
          ? `translate${props.vertical ? 'Y' : 'X'}(${offset}px)`
          : '',
        ...style,
      }
    }, [offset, style, vertical])

    return (
      <div ref={swipeItemRef} className='swipe__item' style={itemStyle}>
        {children}
      </div>
    )
  }
)

export default SwiperItem
