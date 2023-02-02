<template>
  <div class="layoutWrapper">
    <AppHeader />
    <n-layout has-sider>
      <AppSider />
      <n-layout>
        <router-view></router-view>
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '../AppHeader/index.vue'
import AppSider from '../AppSider/index.vue'
</script>

<style lang="scss" scoperd>
.layoutWrapper {
  padding-top: 60px;
}
</style>
