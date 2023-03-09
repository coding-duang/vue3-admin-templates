<script setup lang="ts">
// imports
import { IDomEditor, IToolbarConfig } from '@wangeditor/editor'
import { Toolbar } from '@wangeditor/editor-for-vue'
import { onMounted, PropType, ref } from 'vue'

// props
const props = defineProps({
  hideToolbar: {
    type: Boolean,
    default: false,
  },
  editorRef: {
    type: Object as PropType<IDomEditor>,
  },
  mode: {
    type: String,
    default: 'single',
  },
  toolbarStyle: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
  toolbarConfig: {
    type: Object as PropType<Partial<IToolbarConfig>>,
    default: () => ({}),
  },
})

// state
</script>
<template>
  <Toolbar
    v-if="!props?.hideToolbar"
    :editor="props.editorRef"
    :defaultConfig="props.toolbarConfig"
    :mode="props?.mode"
    :style="props?.toolbarStyle"
  />
</template>
<style></style>
