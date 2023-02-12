<template>
  <n-drawer
    v-model:show="showModal"
    width="60%"
    placement="right"
    :resizable="true"
    v-bind="$attrs"
  >
    <n-drawer-content title="增删改查" closable>
      <template #footer>
        <n-button>确认</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<style lang="scss" scoped></style>
