import { defineComponent } from 'vue'
import { NGrid, NGridItem, NCard } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import styles from './index.module.scss'
import Weather from '@/components/Weather/index.vue'

export const WorkTable = defineComponent({
  name: 'WorkTable',
  setup() {
    return () => <div class={ styles.workTable }>
      <NCard hoverable>
        <NGrid cols={ 6 } x-gap={ 12 } y-gap={ 8 } item-responsive responsive="screen">
          <NGridItem span="6 m:3 l:4">
            <InfoArea />
          </NGridItem>
          <NGridItem span="6 m:3 l:2">
            <Item />
          </NGridItem>
        </NGrid>
      </NCard>
    </div>
  }
})

const InfoArea = defineComponent({
  name: 'InfoArea',
  setup() {
    const userStore = useUserStore()
    const { getUserinfo } = storeToRefs(userStore)

    return () => <div class={ styles.InfoArea }>
      <img src={ getUserinfo.value?.avatar } alt="avatar" class={ styles.avatar } />
      <div class={ styles.content }>
        <div class={ styles.welcome }>早上好{ getUserinfo.value?.username },千里之行，始于足下，关爱天天陪伴你!</div>
        <div class={ styles.desc }>{ getUserinfo.value?.post } | { getUserinfo.value?.belong }</div>
      </div>
    </div>
  }
})

const Item = defineComponent({
  name: 'Item',
  setup() {
    const data = [
      {
        title: '项目数',
        num: 58
      },
      {
        title: '待办',
        num: '8/28'
      },
      {
        title: '消息',
        num: 8
      }
    ]

    return () => <div class={ styles.itemWrapper }>
      { data.map(item => <div class={ styles.item }>
        <div class={ styles.title }>{ item.title }</div>
        <div class={ styles.num }>{ item.num }</div>
      </div>)}
    </div>
  }
})
