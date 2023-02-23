<template>
  <div class="main">
    <AccessAnalysis />
    <Trend />
    <ChinaMap />
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { useConfig } from './components/AccessAnalysis/config'
import { AccessAnalysis } from './components/AccessAnalysis'
import { Trend } from './components/Trend'
import { ChinaMap } from './components/ChinaMap'
import { ConfigData } from './components/AccessAnalysis/type'

const { configData } = useConfig()

provide<ConfigData>('configData', configData)
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  background-color: var(--theme-global-bg-color);
}
</style>
