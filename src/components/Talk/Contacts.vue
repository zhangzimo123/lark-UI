<template>
  <a-tree
    :treeData="treeData"
    showIcon
    defaultExpandAll
    :defaultSelectedKeys="['0-0-0']"
  >
    <a-icon slot="smile" type="smile-o" />
    <a-icon slot="meh" type="smile-o" />
    <template slot="custom">
      <a-avatar size="small" icon="user"/>
    </template>
  </a-tree>
</template>
<script>
const treeData = [{
  title: 'parent 1',
  key: '0-0',
  slots: {
    icon: 'smile'
  },
  children: [
    { title: 'leaf', key: '0-0-0', slots: { icon: 'meh' } },
    { title: 'leaf', key: '0-0-1', scopedSlots: { icon: 'custom' } }]
}]

export default {
  data () {
    return {
      treeData
    }
  },
  methods: {
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck (checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    }
  }
}

</script>
