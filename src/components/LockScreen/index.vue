<template>
  <div class="lockWrapper">
    <div
      class="lock-background"
      :style="{
        backgroundImage: `url(${getBgImage})`,
      }"
    ></div>
    <div class="lock-content">
      <div class="titleWrapper">
        <img :src="getUserinfo.avatar" alt="avatar" class="avatar" />
        <div class="iconBox">
          <n-icon size="40">
            <LockRound />
          </n-icon>
        </div>
        <div class="desc">累了适当的休息一下，喝杯咖啡!</div>
      </div>
      <div class="formWrapper">
        <n-input-group>
          <n-input
            v-model:value="password"
            type="password"
            show-password-on="mousedown"
            placeholder="请输入解锁密码(同登陆密码)"
            :maxlength="8"
          />
          <n-button type="primary" @click="unlock">
            <template #icon>
              <n-icon>
                <LockOpenRound />
              </n-icon>
            </template>
            解锁
          </n-button>
        </n-input-group>
      </div>
      <n-button type="primary" round @click="lockStore.setIndex"
        >切换壁纸</n-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { createDiscreteApi } from 'naive-ui'
import { useLockStore, useUserStore } from '@/store'
import { LockRound, LockOpenRound } from '@vicons/material'

const { message } = createDiscreteApi(['message'])

const lockStore = useLockStore()
const userStore = useUserStore()
const { getBgImage, getPassword } = storeToRefs(lockStore)

const password = ref(getPassword.value)

const { getUserinfo } = storeToRefs(userStore)

const unlock = () => {
  if (!password.value || password.value !== getPassword.value) {
    message.error('解锁密码错误!')
    return
  }
  lockStore.setIsLocked(false)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
