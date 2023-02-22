<template>
  <div class="main">
    <AccessAnalysis />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useInterval } from '@/hook'
import { AccessAnalysis } from './components/AccessAnalysis'

const version = ref(0)

// useInterval(() => version.value++)
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  background-color: var(--theme-global-bg-color);
}
</style>
