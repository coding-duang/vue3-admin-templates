<template>
  <div>
    <vue-json-pretty :path="'res'" :data="props.graphData"> </vue-json-pretty>
  </div>
</template>
<script lang="ts" setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const props = defineProps<{
  graphData: any
}>()
</script>
