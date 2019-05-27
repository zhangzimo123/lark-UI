<template>
  <a-modal
    title="选择人员"
    :visible="memberVisible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    width="1300px"
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
            @selectChange="selectChange"
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
      orgTree: [],
      // key orgid value userJson
      orgUserMap: new Map(),
      // key userid value userinfo
      // 用于存储人员信息
      userMap: new Map(),
      // 页2 transfer左侧绑定数据源
      ds: [],
      // 页3 transfer右侧绑定数据源
      targetKeys: [],
      props: 'props',
      memberVisible: false,
      confirmLoading: false,
      tLoading: false,
      destroyOnClose: true,
      // 临时记录父组件传值，作为组件的标志区分，用于一个页多次不同场景调用子组件的场景
      pdata: '1',
      queryparamter: {}
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
    /**
     * 打开人员选择器
     * keys 非必填 已选择人员id
     *      类型：字符串 多个人员id半角逗号隔开
     * oinfo 非必填 临时记录父组件传值，作为组件的标志区分，用于一个页多次不同场景调用子组件的场景
     *      类型：字符串
     */
    beginChoose: function (keys, oinfo) {
      this.queryparamter = { 'id': keys }
      this.initUsers()
      console.log('openChooseP', keys)
      const keyarr = keys.split(',')
      this.targetKeys = keyarr
      this.pdata = oinfo
      this.memberVisible = true
    },
    /**
     * 点击组织机构树，获取该组织下人员信息
     */
    handleClick (item, e) {
      this.tLoading = true
      console.log('item', item, e)
      // 限制点击根节点触发后台请求操作
      if (item.length > 0 && item[0] === 'key-01') {
        return
      }
      this.queryparamter = { 'orgid': item[0] }
      // 获取组织节点对应的人员信息
      this.getUsers()
    },
    /**
     * 根据人员姓名检索人员信息
     * 如需其他检索项，可在parameter中添加项目
     * TODO 检索项添加时，这里需要调整
     */
    usersFilter (t, searchvalue) {
      if (t === 'left') {
        this.ds.filter(item => {
          return item.title.indexOf(searchvalue) > -1
        })
      } else {
        // 右侧数据只能绑定key值，需要将信息补全后进行过滤
        this.targetKeys.filter((item) => {
          const userinfo = this.userMap.get(item)
          if (userinfo.title.indexOf(searchvalue) > -1) {
            return true
          }
        })
      }
    },
    /**
     * 请求后台获取人员信息
     */
    getUsers () {
      this.tLoading = true
      const orgid = this.queryparamter.orgid
      getUserList(this.queryparamter).then((res) => {
        const members = res.result.data
        let arr = []
        // 已获取的组织人员信息不重复获取
        if (this.orgUserMap.get(orgid) === undefined) {
          members.forEach((item) => {
            item.key = item.id
            item.title = item.name
            arr.push(item)
          })
          this.orgUserMap.set(orgid, arr)
        } else {
          arr = this.orgUserMap.get(orgid)
        }
        this.tLoading = false
        this.ds = arr
      }).catch(() =>
        this.$notification['error']({
          message: '出现异常，请联系系统管理员',
          duration: 4
        })
      )
    },
    /**
     * 根据父组件传值，显示已选中信息
     */
    initUsers () {
      this.tLoading = true
      getUserList(this.queryparamter).then((res) => {
        const members = res.result.data
        const arr = []
        members.forEach((item) => {
          item.key = item.id
          item.title = item.name
          arr.push(item)
          this.userMap.set(item.key, item)
        })
        this.tLoading = false
        this.ds = arr
      })
    },
    /**
     * 选中条目的事件
     * 根据key存入员工完整信息
     */
    selectChange (sourceSelectedKeys, targetSelectedKeys) {
      if (sourceSelectedKeys.length > 0) {
        sourceSelectedKeys.forEach((userkey) => {
          this.ds.some((item) => {
            if (item.key === userkey) {
              this.userMap.set(item.key, item)
            }
          })
        })
      }
    },
    /**
     * 点击新增/撤销
     */
    handleChange (targetKeys, direction, moveKeys) {
      // 按优先选择的信息放着前面的方式展现
      if (direction === 'right') {
        moveKeys.forEach(item => {
          // 目标区域绑定人员
          this.targetKeys.push(item)
        })
      } else {
        this.targetKeys = targetKeys
      }
    },
    close () {
      this.$emit('close')
      this.memberVisible = false
    },
    /**
     * 确定按钮
     * 传参到父组件
     * 返回参数
     * 参数1 选中的人员信息 类型 人员信息json数组
     * 参数2 父组件传的字符串标识信息
     */
    handleOk () {
      // 点击确定返回人员基础信息，根据人员主键获取人员信息
      const userarr = []
      const tk = this.targetKeys
      tk.forEach(item => { userarr.push(this.userMap.get(item)) })
      this.$emit('ok', userarr, this.pdata)
      this.memberVisible = false
    },
    handleCancel () {
      this.close()
    },
    renderItem (item) {
      const customLabel = (
        <span class="custom-item">
          {item.title} - {item.orgname} - {item.slevel}
        </span>
      )
      return {
        label: customLabel, // for displayed item
        value: item.title // for title and filter matching
      }
    }
  }
}
</script>
