<template>
  <a-row :class="prefixCls">
    <a-col :span="23">
      <slot></slot>
    </a-col>
    <a-col :span="1" style="float: left">
      <slot name="extra">{{ extra }}</slot>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'FooterToolBar',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-footer-toolbar'
    },
    extra: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>
