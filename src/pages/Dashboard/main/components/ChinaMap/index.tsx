import { defineComponent, ref } from 'vue'
import { NGrid, NGridItem } from 'naive-ui'
import { Card } from '../Trend'
import { createChinaMapData } from './config'
import { registerMap } from './china'

export const ChinaMap = defineComponent({
  name: 'ChinaMap',
  setup() {
    registerMap()
    const loading = ref(true)

    setTimeout(() => {
      loading.value = false
    }, 1500)

    const configData = createChinaMapData()

    return () => (
      <div>
        <NGrid
          cols="4"
          x-gap={12}
          y-gap={8}
          item-responsive
          responsive="screen"
        >
          <NGridItem span="4 m:4 l:4">
            <Card
              cardProps={{
                contentStyle: {
                  background: 'linear-gradient(to right, #404a59, #404a31)',
                },
                headerStyle: {
                  color: '#fff',
                  background: 'linear-gradient(to right, #404a59, #404a31)',
                },
              }}
              loading={loading.value}
              options={configData}
            />
          </NGridItem>
        </NGrid>
      </div>
    )
  },
})
