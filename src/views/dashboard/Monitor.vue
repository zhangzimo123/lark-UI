<template>
  <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="isDesktop() ? 'desktop' : ''">
    <a-row :gutter="24">
      <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
        <a-card :loading="loading" :bordered="false" title="研讨消息" :style="{ marginTop: '6px', minHeight: '360px' }">

        </a-card>
      </a-col>
      <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
        <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="待办事项" :style="{ marginTop: '6px', minHeight: '360px' }">

        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
export default {
  name: 'Monitor',
  mixins: [mixinDevice]
}
</script>

<style lang="less" scoped>
  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;

    &.desktop div[class^=ant-col]:last-child {
      position: absolute;
      right: 0;
      height: 100%;
    }
  }
</style>
