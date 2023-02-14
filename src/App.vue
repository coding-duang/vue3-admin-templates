<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="theme"
    :theme-overrides="getCurrentTheme"
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
          <transition name="zoom-fade">
            <LockScreen v-show="getIsLocked" />
          </transition>
        </n-message-provider>
        <!-- </n-notification-provider> -->
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { ref, computed, provide, nextTick } from 'vue'
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { Emitter } from '@/object'
import { EventEnum } from '@/enum'
import { useLockStore, useThemeStore } from '@/store'
import LockScreen from '@/components/LockScreen/index.vue'
import { ColorChooseSet } from '@/settings'

const emitter = new Emitter<EventEnum>()

// UI主题配置的hook
const themeStore = useThemeStore()
const { getDarkTheme, getCurrentTheme } = storeToRefs(themeStore)

const theme = computed(() => (getDarkTheme.value ? darkTheme : undefined))

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
provide<Emitter<EventEnum>>('emitter', emitter)

emitter.on(EventEnum.changeColor, (item: ColorChooseSet) => {
  themeStore.setTheme(item.themeType)
})
</script>

<style lang="scss">
@import './style/index.scss';
</style>
