<template>
  <div class="groupWrapper">
    <n-popover
      placement="top-start"
      trigger="hover"
      v-for="item in icons"
      :key="item.key"
    >
      <template #trigger>
        <n-button
          text
          style="font-size: 24px; margin-right: 20px"
          @click="handleClick(item.key)"
        >
          <n-icon size="20">
            <component :is="item.icon"></component>
          </n-icon>
        </n-button>
      </template>
      {{ item.name }}
    </n-popover>

    <ThemeConfig v-model:show="themeConfig" />
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue'
import ThemeConfig from '@/components/ThemeConfig/index.vue'
import { fullScreen } from '@/utils'
import { useMessage } from 'naive-ui'
import { useLockStore } from '@/store'
import { Refresh, LockClosedOutline } from '@vicons/ionicons5'
import { FullscreenFilled, SettingsSuggestOutlined } from '@vicons/material'
import { EleOfArr, ButtonGroupConfig } from '@/types'

const reload = inject<() => void>('reload')

const themeConfig = ref(false)

const lockStore = useLockStore()

const message = useMessage()

const icons: ButtonGroupConfig[] = [
  {
    key: 'LockCloseOutLine',
    icon: LockClosedOutline,
    name: '锁屏',
  },
  {
    key: 'SettingsSuggestOutlined',
    icon: SettingsSuggestOutlined,
    name: '全局配置',
  },
  {
    key: 'FullscreenFilled',
    icon: FullscreenFilled,
    name: '全屏',
  },
  {
    key: 'Refresh',
    icon: Refresh,
    name: '刷新',
  },
]

const handleClick = (key: EleOfArr<typeof icons>['key']) => {
  console.log(key)
  switch (key) {
    case 'LockCloseOutLine':
      lockStore.setIsLocked(true)
      break
    case 'FullscreenFilled':
      fullScreen()
      break
    case 'SettingsSuggestOutlined':
      themeConfig.value = true
      break
    case 'Refresh':
      reload && reload()
      message.success('刷新完成!')
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
