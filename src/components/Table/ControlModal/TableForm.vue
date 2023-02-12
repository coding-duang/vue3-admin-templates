<template>
  <n-form>
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="标题" path="title">
        <n-input v-model:value="modelReactive.title" placeholder="请输入标题" />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="头像" path="avatar">
        <n-upload
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :default-file-list="fileList"
          list-type="image-card"
          :on-update:file-list="updateFile"
        >
          修改头像
        </n-upload>
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="自我介绍" path="content">
        <n-input
          v-model:value="modelReactive.content"
          placeholder="请输入介绍"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="自我介绍" path="content">
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { useForm } from '@/hook'
import { TableItem } from '@/types'
import { CRUD } from '@/enum'
import { componentSetting } from '@/settings'
import { UploadFileInfo } from 'naive-ui'

const props = defineProps({
  actionType: {
    type: String as PropType<CRUD>,
    default: 'create',
  },
  tableItem: {
    type: Object as PropType<TableItem>,
    default: () => componentSetting.tableItem,
  },
})

const showModalRef = ref(false)
const previewImageUrlRef = ref('')
const handlePreview = (file: UploadFileInfo) => {
  const { url } = file
  previewImageUrlRef.value = url as string
  showModalRef.value = true
}
const fileList = ref([])
props.tableItem.avatar &&
  fileList.value.push({
    id: props.tableItem.id,
    name: props.tableItem.title,
    status: 'finished',
    url: props.tableItem.avatar,
  })

const updateFile = (fileList: UploadFileInfo[]) => {
  console.log(fileList)
}
const { modelReactive } = useForm<TableItem>(props.tableItem)
</script>

<style lang="scss" scoped></style>
