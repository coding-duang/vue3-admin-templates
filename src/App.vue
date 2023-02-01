<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="currentTheme"
  >
    <suspense>
      <template #default>
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="slide" appear>
            <component :is="Component"></component>
          </transition>
        </router-view>
      </template>
    </suspense>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { zhCN, dateZhCN } from 'naive-ui'
import { getCurrentTheme } from './config/theme'

const { currentTheme } = getCurrentTheme()
</script>
