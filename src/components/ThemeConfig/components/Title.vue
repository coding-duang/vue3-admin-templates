<template>
  <div class="titleWrapper">
    <div class="line line-left"></div>
    <div class="title">{{ title }}</div>
    <div class="line line-right"></div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.titleWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  .line {
    background-color: rgb(239, 239, 245);
    border: none;
    height: 1px;
    flex: 1;
    margin: 0;
  }
  .title {
    font-size: 15px;
    margin-left: 12px;
    margin-right: 12px;
    white-space: nowrap;
  }
}
</style>
