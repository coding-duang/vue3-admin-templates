<template>
  <n-form :model="modelReactive" :rules="rules" ref="formRef">
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="标题" path="title">
        <n-input
          v-model:value="modelReactive.title"
          placeholder="请输入标题"
          :disabled="type === 'inquiry'"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="头像" path="avatar">
        <n-upload
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :default-file-list="fileList"
          list-type="image-card"
          :on-update:file-list="updateFile"
          @preview="handlePreview"
          :disabled="type === 'inquiry'"
        >
          <n-modal
            v-model:show="showModalRef"
            preset="card"
            style="width: 600px"
            title="一张很酷的图片"
          >
            <img :src="previewImageUrlRef" style="width: 100%" />
          </n-modal>
        </n-upload>
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="自我介绍" path="content">
        <n-input
          v-model:value="modelReactive.content"
          placeholder="请输入介绍"
          type="textarea"
          :disabled="type === 'inquiry'"
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="状态" path="status">
        <n-select
          v-model:value="modelReactive.status"
          placeholder="请选择状态"
          :disabled="type === 'inquiry'"
          :options="selectOptions"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="大卖" path="open">
        <n-switch
          v-model:value="modelReactive.open"
          :disabled="type === 'inquiry'"
        >
          <template #checked>是</template>
          <template #unchecked>否</template>
        </n-switch>
      </n-form-item-gi>

      <n-form-item-gi :span="24" :offset="22">
        <n-button v-if="showAction" type="primary" @click="submit"
          >确定</n-button
        >
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script lang="ts" setup>
import { ref, useAttrs, computed } from 'vue'
import { useForm, useTableContext } from '@/hook'
import { getRemote } from '@/http'
import { TableItem, ModalComponentProps } from '@/types'
import { componentSetting, selectOptions } from '@/settings'
import { UploadFileInfo } from 'naive-ui'

// 因为是属性透传，所以直接使用attrs拿传入的组件属性即可类型是<ModalComponentProps>
const attrs = useAttrs() as ModalComponentProps
const type = attrs?.activeType || 'create'

const tableContext = useTableContext<TableItem>()

const rules = {
  title: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入标题',
  },
  content: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入简介',
  },
}

const tableItem =
  type === 'inquiry' || type === 'edit'
    ? attrs?.tableItem
    : componentSetting.tableItem
const { modelReactive, validateForm, formRef } = useForm<TableItem>(tableItem)

const showAction = computed(() => type === 'create' || type === 'edit')

const submit = async (e: MouseEvent) => {
  e.preventDefault()
  const http = type === 'create' ? getRemote.tableCreate : getRemote.tableUpdate
  formRef.value?.validate(async errors => {
    if (!errors) {
      await http(modelReactive.value)
      await tableContext.fetchList()
    }
    console.log('errors')
  })
}

// 以下代码是因为upload相关，所以代码稍多，不然不必再做变量逻辑
const showModalRef = ref(false)
const previewImageUrlRef = ref('')
const handlePreview = (file: UploadFileInfo) => {
  const { url } = file
  previewImageUrlRef.value = url as string
  showModalRef.value = true
}
const fileList = ref([])
attrs?.tableItem?.avatar &&
  fileList.value.push({
    id: attrs.tableItem.id,
    name: attrs.tableItem.title,
    status: 'finished',
    url: attrs.tableItem.avatar,
  })

const updateFile = (list: UploadFileInfo[]) => {
  list.shift()
  fileList.value = list
}
</script>

<style lang="scss" scoped></style>
