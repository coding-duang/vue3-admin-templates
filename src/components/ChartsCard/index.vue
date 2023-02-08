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
import { defineProps } from 'vue'
defineProps({
  title: String
})
</script>

<style lang="scss" scoped>

</style>
