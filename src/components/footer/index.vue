<template>
  <footer class="ag-footer">
    Copyright
    <i class="copyright-line">&copy;</i>
    {{ year }} Vue3 Admin By NativeUI
  </footer>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AgFooter',
  setup() {
    const year = computed(() => {
      return new Date().getFullYear()
    })

    return {
      year,
    }
  },
})
</script>

<style lang="scss" scoped>
.ag-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 55px;
  padding: 0 20px 0 20px;
  color: rgba(0, 0, 0, 0.45);
  border-top: 1px dashed #dcdfe6;
  background: rgba(255, 255, 255, 1); // TODO
}

.copyright-line {
  margin: 0 5px;
  font-style: normal;
  &::before {
    content: '';
  }
}
</style>
