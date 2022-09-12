import React from 'react'
import './index.scss'

interface SwipeDotsProps {
  current: number
  count: number
  vertical: boolean
}

const SwipeDots: React.FC<SwipeDotsProps> = (props) => {
  const { current, vertical, count } = props

  if (count <= 1) {
    return null
  }

  return (
    <div className={vertical ? 'swiper__dots--vertical' : 'swiper__dots'}>
      {new Array(count).fill(1).map((_, index) => (
        <div
          className={
            current === index
              ? 'swiper__dot' + ' ' + 'swiper__dot--active'
              : 'swiper__dot'
          }
          key={index}
        ></div>
      ))}
    </div>
  )
}

export default SwipeDots
