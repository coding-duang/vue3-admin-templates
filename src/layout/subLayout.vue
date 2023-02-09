<template>
  <div class="routerWrapper">
    <suspense>
      <router-view></router-view>
    </suspense>
  </div>
</template>

<style lang="scss" scoped>
.routerWrapper {
  padding: 20px;
  background-color: #f7f7f7;
}
</style>
