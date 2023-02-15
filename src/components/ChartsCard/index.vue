<template>
  <n-card
    :title="title"
    size="small"
    :segmented="{
      content: true,
    }"
  >
    <slot></slot>
  </n-card>
</template>

<script lang="ts" setup>
defineProps({
  title: String
})
</script>

<style lang="scss" scoped>

</style>
