import { defineComponent } from 'vue'
import { NDataTable } from 'naive-ui'
import styles from './index.module.scss'
import { ColumnItem, createColumns } from './createColumn'

export const PrintTable = defineComponent({
  name: 'PrintTable',
  setup() {
    const { columns, tableData } = createColumns<ColumnItem>()

    return () => {
      return (
        <div class={styles.printTable}>
          <NDataTable columns={columns} data={tableData} />
        </div>
      )
    }
  },
})
