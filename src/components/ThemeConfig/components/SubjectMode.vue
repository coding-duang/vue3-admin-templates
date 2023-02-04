<template>
  <div class="modeWrapper">
    <n-tooltip placement="bottom">
      <template #trigger>
        <n-switch v-model:value="darkTheme" class="dark-theme-switch">
          <template #checked>
            <n-icon size="14" color="#ffd93b">
              <SunnySharp />
            </n-icon>
          </template>
          <template #unchecked>
            <n-icon size="14" color="#ffd93b">
              <Moon />
            </n-icon>
          </template>
        </n-switch>
      </template>
      <span>{{ darkTheme ? '深' : '浅' }}色主题</span>
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useThemeStore } from '@/store'
import { Moon, SunnySharp } from '@vicons/ionicons5'

const darkTheme = ref(false)
const themeStore = useThemeStore()

watch(
  () => darkTheme.value,
  () => themeStore.setDarkTheme()
)
</script>

<style lang="scss" scoped>
.modeWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
}
</style>
