<template>
  <n-menu
    v-model:value="activeKey"
    :accordion="true"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
  />
</template>

<script lang="ts" setup>
import { useMenu } from './hook/useMenu'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const { activeKey, menuOptions } = useMenu()
</script>

<style lang="scss" scoped>
// @import './index.scss';
</style>
