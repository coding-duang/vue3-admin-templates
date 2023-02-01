<template>
  <div class="ag-header">
    <div class="ag-top-bar">
      <n-row gutter="12">
        <n-col :span="12">
          <div class="left-panel">
            <n-breadcrumb separator=">">
              <n-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index">
                {{ item }}
              </n-breadcrumb-item>
            </n-breadcrumb>
          </div>
        </n-col>
        <n-col :span="12">
          <div class="right-panel">
            <n-dropdown :options="userOptions">
              <div class="user-info">
                <n-avatar
                  round
                  src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
                <div class="user-name">
                  <span>admin</span>
                </div>
              </div>

            </n-dropdown>
          </div>
        </n-col>
      </n-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'


export default defineComponent({
  name: 'AgTopBar',
  components: {
  },
  setup() {

    // 面包屑
    const breadcrumbList = ref(['北京', '上海'])

    // userInfo

    const userOptions = ref([
      {
        'label': '个人中心',
        'key': 'userInfo'
      },
      {
        'label': '退出',
        'key': 'logout',
      }
    ])

    return {
      breadcrumbList,
      userOptions,
    }
  }
})
</script>

<style lang="scss" scoped>
.ag-header {

}

.ag-top-bar {

}

.left-panel {
  display: flex;
  align-items: center;
  justify-items: center;
  height: 60px;
}

.right-panel {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;

  .user-info {
    display: flex;
    align-items: center;

    .user-name {
      margin: 0 8px;
    }
  }
}
</style>
