<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="currentTheme"
  >
    <!-- 全局注入loadingBar -->
    <n-loading-bar-provider>
      <!-- 全局注入dialog -->
      <n-dialog-provider>
        <!-- 全局注入notification -->
        <!-- <n-notification-provider> -->
        <!-- 全局注入message -->
        <n-message-provider>
          <suspense>
            <template #default>
              <router-view v-slot="{ Component }" v-if="isRouterAlive">
                <transition mode="out-in" name="slide" appear>
                  <component :is="Component"></component>
                </transition>
              </router-view>
            </template>
          </suspense>
        </n-message-provider>
        <!-- </n-notification-provider> -->
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
  <LockScreen v-show="getIsLocked" />
</template>

<script lang="ts" setup>
import { ref, provide, nextTick } from 'vue'
import { zhCN, dateZhCN } from 'naive-ui'
import { getCurrentTheme } from './config/theme'
import { storeToRefs } from 'pinia'
import { useLockStore } from '@/store'
import LockScreen from '@/components/LockScreen/index.vue'
// UI主题配置的hook
const { currentTheme } = getCurrentTheme()

const lockStore = useLockStore()
const { getIsLocked } = storeToRefs(lockStore)

// 全局注入路由组件刷新方法,inject接受调用即可
const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide<() => void>('reload', reload)
</script>
