<template>
  <a-modal
    title="选择人员"
    :visible="memberVisible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    width="1500px"
    :destroyOnClose="destroyOnClose"
  >
    <a-row :gutter="10">
      <a-col :span="6">
        <a-card title="组织信息">
          <a-tree
            ref="orgtreeref"
              :treeData="orgTree"
              @select="handleClick"
            />
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-spin :spinning="tLoading">
          <a-transfer
            :titles="['可选择人员', '已选择人员']"
            :dataSource="ds"
            showSearch
            @search="usersFilter"
            :listStyle="{
              width: '430px',
              height: '430px',
            }"
            :targetKeys="targetKeys"
            @change="handleChange"
            :render="renderItem"
            :operations="['添加','移除']"
          >
          </a-transfer>
        </a-spin>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { getUserList, getOrgTree } from '@/api/admin'

export default {
  data () {
    return {
      orgTree:[],
      userMap: new Map(),
      ds:[],
      pageSize: 10,
      totals: 0,
      props: 'props',
      targetKeys: [],
      memberVisible: false,
      confirmLoading: false,
      tLoading: false,
      destroyOnClose: true
    }
  },
  mounted () {
   
  },
  created () {
    // 获取树形组织信息
    getOrgTree().then(res => {
      this.orgTree = res.result
    })
  },
  props: {
  
  },
  methods: {
    handleClick (item, e) {
      this.tLoading = true
      console.log('item', item, e)
      // 限制点击根节点触发后台请求操作
      if (item.length > 0 && item[0] === 'key-01') {
        return
      }
      let orgid = item[0]
      // 获取组织节点对应的人员信息
      this.getUsers(item[0])
      
    },
    /**
     * 根据人员姓名检索人员信息
     * 如需其他检索项，可在parameter中添加项目
     */
    usersFilter (t, searchvalue) {
      console.log('item',t,searchvalue)
      if (t === 'left') {
        this.ds.filter((item) => {item.title.match(searchvalue)})
      } else {
        console.log('this.targetKeys', this.targetKeys)
        this.targetKeys.filter((item) => {item.title.match(searchvalue)})
      }
    },
    /**
     * 根据组织机构id号获取人员信息
     */
    getUsers (orgid) {
      getUserList({'orgid':orgid}).then((res) => {
        const members = res.result.data
        let arr = []
        console.log('this.userMap.get(orgid)', this.userMap.get(orgid))
        // 已获取的组织人员信息不重复获取
        if (this.userMap.get(orgid) === undefined) {
          members.forEach((item) => {
            item.key = item.id
            item.title = item.name
            arr.push(item)
          })
          this.userMap.set(orgid, arr)
          } else {
          arr = this.userMap.get(orgid)
        }
        this.tLoading = false
        this.ds = arr
      })
    },
    beginTalk: function () {
      this.memberVisible = true
    },
    close () {
      this.$emit('close')
      this.memberVisible = false
    },
    handleOk () {
      this.$emit('ok', this.targetKeys)
      this.memberVisible = false
    },
    handleCancel () {
      this.close()
    },
    renderItem (item) {
      const customLabel = (
        <span class="custom-item">
          {item.title} - {item.orgname}
        </span>
      )
      return {
        label: customLabel, // for displayed item
        value: item.title // for title and filter matching
      }
    },
    /**
     * 点击新增/撤销
     */
    handleChange (targetKeys, direction, moveKeys) {
      console.log('handleChange', targetKeys, direction, moveKeys)
      // 按优先选择的信息放着前面的方式展现
      if (direction === 'right'){
        moveKeys.forEach(item => {
          this.targetKeys.push(item)
        })
      } else {
        this.targetKeys = targetKeys
      }
    }
  }
}
</script>
