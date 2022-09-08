import React from 'react'
import { View, RichText } from '@tarojs/components'
import Accordion from '@/components/Accordion'
import './index.scss'

interface IPageProps extends IProps {
  title: string
  content: string
  initTabsItemH: () => void
}

const AccordionPages: React.FC<IPageProps> = (props: IPageProps) => {
  const { title, content, initTabsItemH } = props

  return (
    <Accordion
      title={title}
      className='mt-24 round-xs'
      onBindChange={() => {
        initTabsItemH()
      }}
    >
      <View className='px-24'>
        <RichText className='commodityGroup-richText' nodes={content} />
      </View>
    </Accordion>
  )
}

export default AccordionPages
