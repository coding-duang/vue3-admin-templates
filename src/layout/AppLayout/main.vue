<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition :name="getTransitionName" mode="out-in" appear>
        <!-- <KeepAlive v-if="keepAliveComponents" :include="keepAliveComponents">
            <component :is="Component" :key="route.fullPath"></component>
          </KeepAlive> -->
        <component :is="Component" :key="route.fullPath"></component>
      </transition>
    </template>
  </router-view>
</template>

<script lang="ts" setup>
import { unref, computed } from 'vue'
import { useProjectSetting } from '@/hook'

const { getIsPageAnimate, getPageAnimateType } = useProjectSetting()

const getTransitionName = computed(() =>
  unref(getIsPageAnimate) ? unref(getPageAnimateType) : ''
)
console.log(getTransitionName.value)
</script>

<style lang="scss" scoped></style>
