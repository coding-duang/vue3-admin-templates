<template>
  <n-menu
    v-model:value="activeKey"
    v-bind="$attrs"
    :accordion="true"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
  />
</template>

<script lang="ts" setup>
import { useMenu } from './hook/useMenu'

const { activeKey, menuOptions } = useMenu()
</script>
