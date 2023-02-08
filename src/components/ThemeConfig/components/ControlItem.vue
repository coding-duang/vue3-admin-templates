<template>
  <div class="controlWrapper">
    <div class="label">{{ label }}</div>
    <div class="content">
      <n-switch v-bind="$attrs" v-if="!options"></n-switch>
      <n-select
        v-bind="$attrs"
        :options="options"
        v-else
        :style="{ marginTop: 0 }"
      ></n-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { SelectOption } from 'naive-ui'

defineProps({
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Object as PropType<SelectOption[]>,
    default: null,
  },
})
</script>

<style lang="scss" scoped>
.controlWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .label {
    font-size: 14px;
    flex: 1;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
