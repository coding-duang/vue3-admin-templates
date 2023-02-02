<template>
  <div class="groupWrapper">
    <n-popover
      placement="top-start"
      trigger="hover"
      v-for="item in icons"
      :key="item.key"
    >
      <template #trigger>
        <n-button text style="font-size: 24px; margin-right: 20px">
          <n-icon size="20">
            <component :is="item.icon"></component>
          </n-icon>
        </n-button>
      </template>
      {{ item.name }}
    </n-popover>
  </div>
</template>

<script lang="ts" setup>
import { Refresh, LockClosedOutline } from '@vicons/ionicons5'
import { FullscreenFilled, SettingsSuggestOutlined } from '@vicons/material'

const icons = [
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
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
