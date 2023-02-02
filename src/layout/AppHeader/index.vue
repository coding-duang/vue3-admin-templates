<template>
  <div class="headerWrapper">
    <div class="header">
      <n-grid cols="4" :item-responsive="true">
        <n-grid-item span="0 600:2 800:2">
          <div class="logoWrapper">
            <n-icon :size="40" :component="LogoVue"></n-icon>
            <div class="title">Vue3 Admin Template</div>
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
                <img
                  src="https://i.pinimg.com/564x/72/c5/97/72c597c706a505aef484b514930f0f3a.jpg"
                  class="avatar"
                  alt="avatar"
                />
                <div class="username">admin</div>
              </div>
            </n-dropdown>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LogoVue, PersonOutline, LogOutOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils'
import ButtonGroup from './ButtonGroup.vue'

const options = [
  {
    label: '个人中心',
    key: 'user-center',
    icon: renderIcon(PersonOutline),
  },
  {
    label: '退出登陆',
    key: 'logout',
    icon: renderIcon(LogOutOutline),
  },
]

const handleSelect = (key: string | number) => {
  console.log(key)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
