<template>
  <div class="headerWrapper">
    <div class="header">
      <n-grid cols="4" :item-responsive="true">
        <n-grid-item span="0 600:2 800:2">
          <div class="horizontalBox" v-if="getNavMode === 'horizontal'">
            <div class="logoWrapper">
              <img :src="vueSvg" class="logo" />
              <div class="title">Vue3 Admin Template</div>
            </div>
            <AppSider />
          </div>
        </n-grid-item>

        <n-grid-item span="0 600:2 800:2">
          <div class="logWrapper">
            <ButtonGroup />
            <n-dropdown
              trigger="hover"
              :options="options"
              @select="handleSelect"
            >
              <div class="contentBox">
                <img :src="getUserinfo.avatar" class="avatar" alt="avatar" />
                <div class="username">{{ getUserinfo?.username }}</div>
              </div>
            </n-dropdown>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useProjectSetting } from '@/hook'
import { useUserStore } from '@/store'
import { renderIcon, clearToken } from '@/utils'
import AppSider from '../AppSider/index.vue'
import ButtonGroup from './ButtonGroup.vue'
import vueSvg from '@/assets/dashboard/1.svg'
import { PersonOutlineFilled, LogOutRound } from '@vicons/material'

const userStore = useUserStore()
const { getUserinfo } = storeToRefs(userStore)

const { getNavMode } = useProjectSetting()

const router = useRouter()

const options = [
  {
    label: '个人中心',
    key: 'user-center',
    icon: renderIcon(PersonOutlineFilled),
  },
  {
    label: '退出登陆',
    key: 'logout',
    icon: renderIcon(LogOutRound),
  },
]

const handleSelect = (key: string | number) => {
  switch (key) {
    case 'logout':
      userStore.removeToken()
      router.push({ path: '/login' })
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
