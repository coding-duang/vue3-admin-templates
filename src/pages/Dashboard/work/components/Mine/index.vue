<template>
  <div class="Mine">
    <n-grid
      :cols="4"
      :x-gap="20"
      :y-gap="20"
      item-responsive
      responsive="screen"
    >
      <n-grid-item span="4 m:2 l:3">
        <TechnicalSelection />
        <MyDynamics />
      </n-grid-item>
      <n-grid-item span="4 m:2 l:1">
        <FastOperation />
        <Rotation />
        <Announcement />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import { TechnicalSelection } from './TechnicalSelection'
import { FastOperation } from './FastOperation'
import { Rotation } from './Rotation'
import { Announcement } from './Announcement'
import { MyDynamics } from './MyDynamics'
</script>

<style lang="scss" scoped>
.Mine {
  margin-top: 20px;
}
</style>
