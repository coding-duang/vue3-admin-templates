<script lang="tsx">
import { defineComponent, ref } from 'vue'
import BigfileUpload from '@/components/BigfileUpload/index.vue'

export default defineComponent({
  name: '',
  setup(props, { attrs, emit, expose, slots }) {
    const variable = ref(null)

    return () => <BigfileUpload></BigfileUpload>
  },
})
</script>

<style lang="scss" scoped></style>
