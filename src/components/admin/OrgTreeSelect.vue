<template>
  <div>
    <a-tree-select
      :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
      :treeData="orgTree"
      treeDefaultExpandAll
      allowClear
      :value="orgid"
      @change="onChange"
      style="width:100%"
    ></a-tree-select>
  </div>
</template>
<script>
import { getOrgTree } from '@/api/admin'
export default {
  name: 'OrgTreeSelect',
  components: {
    getOrgTree
  },
  data () {
    return {
      orgTree: [],
      orgid: ''
    }
  },
  created () {
    if (this.dataSource.length === 0) {
      // 获取树形组织信息
      getOrgTree().then(res => {
        this.orgTree = res.result
      })
    } else {
      this.orgTree = this.dataSource
    }
  },
  props: {
    // 树选择器选中内容 非必填可传递
    values: {
      type: String,
      default: ''
    },
    // 树选择器下拉框内容 非必填可传递
    dataSource: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    values (val) {
      this.orgid = val
    }
  },
  methods: {
    /**
     * change事件
     */
    onChange (value) {
      this.$emit('changOrg', value)
      this.orgid = value
    }
  }
}
</script>
