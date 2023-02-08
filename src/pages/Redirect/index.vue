<script lang="tsx">
import { NEmpty } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { defineComponent, onBeforeMount } from 'vue'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()
    onBeforeMount(() => {
      const { params, query } = route
      const { path } = params
      router.replace({
        path: '/' + (Array.isArray(path) ? path.join('/') : path),
        query,
      })
    })
    return () => <NEmpty />
  },
})
</script>
