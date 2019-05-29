<template>
  <a-card :bordered="false" :style="{ height: '100%' }">
    <a-form :layout="isMobile() ? 'vertical' : 'inline'" style="text-align:right;">
      <a-form-item label="唯一识别码" v-bind="searchFormItemStyle">
        <a-input v-model="queryParam.code"></a-input>
      </a-form-item>
      <a-form-item label="状态" v-bind="searchFormItemStyle">
        <a-select v-model="queryParam.status" style="width:180px;" allowClear>
          <a-select-option :value="1">正常</a-select-option>
          <a-select-option :value="2">禁用</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <span class="table-page-search-submitButtons">
          <a-button style="margin-left: 8px;" type="primary" @click="fetchData">查询</a-button>
          <a-button style="margin-left: 8px;" @click="() => queryParam = {}">重置</a-button>
        </span>
      </a-form-item>
      <a-form-item>
        <a-button style="margin-left: 8px;" type="primary" icon="plus" @click="$emit('toCreate')">新增一个角色</a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :dataSource="roles">
      <template slot="operation" slot-scope="text,row">
        <a href="javascript:void(0)" @click="$emit('edit',row)">编辑</a>
        <a href="javascript:void(0)" style="margin-left:8px;" @click="$emit('permission',row)">权限</a>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { getRoleList } from '@/api/manage'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'RoleList',
  mixins: [mixinDevice],
  props: {
    searchFormItemStyle: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      queryParam: {},
      columns: [
        {
          title: '唯一识别码',
          dataIndex: 'code'
        },
        {
          title: '角色名称',
          dataIndex: 'name'
        },
        {
          title: '状态',
          dataIndex: 'status'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'id',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      roles: []
    }
  },
  beforeCreate () {
    this.searchForm = this.$form.createForm(this)
  },
  created () {
    this.fetchData(1)
  },
  methods: {
    fetchData (pageNo) {
      const vm = this
      getRoleList().then((res) => {
        vm.roles = [].concat(res.data.content)
      })
    }
  }
}
</script>

<style scoped>

</style>
