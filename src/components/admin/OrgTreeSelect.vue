<template>
  <div>
    <a-tree-select
      showSearch
      :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
      :treeData="orgTree"
      treeDefaultExpandAll
      allowClear
      :value="inputvalue"
      @change="onChange"
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
      inputvalue: this.pvalue
    }
  },
  created () {
    // 获取树形组织信息
    getOrgTree().then(res => {
      this.orgTree = res.result
    })
  },
  props: {
    pvalue: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    /**
         * change事件
         */
    onChange (value) {
      this.$emit('change', value)
      this.inputvalue = value
    }
  }
}
</script>
