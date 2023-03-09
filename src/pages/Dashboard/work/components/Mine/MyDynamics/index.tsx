import { defineComponent, PropType } from 'vue'
import { NCard, NIcon } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import { ChevronRightRound } from '@vicons/material'
import styles from './index.module.scss'

type MyDynamicsDataType = {
  description: string
  time: string | number
}

const myDynamicsData: MyDynamicsDataType[] = [
  {
    time: '2023-03-03 09:30:12',
    description: '九月的早晨，微风吹过，树叶沙沙作响。'
  },
  {
    time: '2023-03-04 09:30:12',
    description: '一朵花在路边，等待着阳光的降临。'
  },
  {
    time: '2023-03-05 09:30:12',
    description: '这是一个宁静的夜晚，只有星星和月亮为伴。'
  },
  // {
  //   time: '2023-03-06 09:30:12',
  //   description: '大海的风景令人心醉，蔚蓝的海水和蔚蓝的天空融为一体。'
  // },
  // {
  //   time: '2023-03-07 09:30:12',
  //   description: '我喜欢在雨天里看书，听雨声打在窗户上，感觉很舒服。'
  // },
  // {
  //   time: '2023-03-08 09:30:12',
  //   description: '在这个美好的季节里，花朵绽放，草地上充满了生机。'
  // },
  // {
  //   time: '2023-03-09 09:30:12',
  //   description: '我的梦想是环游世界，看看不同国家的文化和人民。'
  // }
]

export const MyDynamics = defineComponent({
  name: 'MyDynamics',
  setup() {
    return () => <div class={ styles.myDynamics }>
      <NCard title='我的动态' hoverable>
        {{
          'header-extra': () => <div class={ styles.more }>
            更多动态
            <NIcon size="20" component={ ChevronRightRound } />
          </div>,
          default: () => <div class={ styles.list }>
            { myDynamicsData.map(item => <ListItem data={ item } />)}
          </div>
        }}
      </NCard>
    </div>
  }
})

const ListItem = defineComponent({
  name: 'ListItem',
  props: {
    data: {
      type: Object as PropType<MyDynamicsDataType>,
      default: () => ({})
    }
  },
  setup(props) {
    const { getUserinfo } = storeToRefs(useUserStore())

    return () => <div class={ styles.listItem }>
      <img src={ getUserinfo.value.avatar } alt="avatar" class={ styles.avatar } />

      <div class={ styles.listItemContent }>
        <div class={ styles.listItemDescription }>{ props.data.description }</div>
        <div class={ styles.listItemTime }>{ props.data.time }</div>
      </div>
    </div>
  }
})
