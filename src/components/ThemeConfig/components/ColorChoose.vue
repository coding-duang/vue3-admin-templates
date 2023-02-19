<template>
  <div class="colorWrapper">
    <div
      :class="['colorItem', currentColorIndex === index && 'active']"
      v-for="(item, index) in colorChooseSettings"
      :key="item.color"
      :style="{ background: item.color }"
      @click="choose(index, item)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'
import { Emitter } from '@/object'
import { EventEnum } from '@/enum'
import { colorChooseSettings, ColorChooseSet } from '@/settings'

const themeStore = useThemeStore()
const { getThemeKey } = storeToRefs(themeStore)
const currentColorIndex = ref(0)

watchEffect(() => {
  const index = colorChooseSettings.findIndex(
    (item: ColorChooseSet) => item.themeType === getThemeKey.value
  )
  index > -1 && (currentColorIndex.value = index)
})

const emitter = inject<Emitter<EventEnum>>('emitter')

const choose = (index: number, item: ColorChooseSet) => {
  currentColorIndex.value = index
  emitter.emit(EventEnum.changeColor, item)
}
</script>

<style lang="scss" scoped>
.colorWrapper {
  margin: 8px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .colorItem {
    width: 30px;
    min-width: 30px;
    height: 30px;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 2px;
    margin: 0 8px 8px 0;
    text-align: center;
    transform: scale(1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &.active {
      transform: scale(1.2);
    }
  }
}
</style>
