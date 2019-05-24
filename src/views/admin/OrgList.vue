<template>
  <div>
    <a-card :bordered="false">
    <a-row :gutter="8" >
      <a-col :span="6">
        <a-card :bordered="true" title="组织树">
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="18">
              <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" />
            </a-col>
            <a-col :span="1">
              <a-icon type="plus-circle" @click="addOrg" style="color:#1890ff;font-size:20px" theme="twoTone"/>
            </a-col>
            <a-col :span="1">
              <a-icon type="delete" @click="delOrg" style="color:#1890ff;font-size:20px" theme="twoTone"/>
            </a-col>
          </a-row>
          <a-tree
            @expand="onExpand"
            :expandedKeys="expandedKeys"
            :autoExpandParent="autoExpandParent"
            :treeData="orgTree"
            @select="selectOrg"
            ref ="orgtree"
          >
            <template slot="title" slot-scope="{title}">
              <span v-if="title.indexOf(searchValue) > -1">
                {{title.substr(0, title.indexOf(searchValue))}}
                <span style="color: #f50">{{searchValue}}</span>
                {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
              </span>
              <span v-else>{{title}}</span>
            </template>
          </a-tree>
        </a-card> 
      </a-col>
      <a-col :span="18" >
        <a-card :bordered="true" :title="cardname">
          <a-row>
            <a-col :span="20">
              <a-form :form="editForm">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="组织名称"
                >
                  <a-input
                  placeholder="组织名称"
                  v-decorator="[
                  'orgname',
                  {rules: [{ required: true, message: '请输入组织名称信息' },
                  { max:20,message:'长度不能超过20个字'}]}]"/>
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="组织类型"
                >
                  <a-select
                  v-decorator="[
                  'orgtype',
                  {rules: [{ required: true, message: '请选择组织类型信息' }]}]"
                  placeholder="请选择">
                    <a-select-option value="1">集团</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="主要负责人"
                >
                  <a-input-search
                    enterButton
                    v-decorator="['incharge']"
                    @search="$refs.model.beginTalk()"
                  />
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="描述"
                >
                  <a-textarea :rows="5" v-decorator="['description']"/>
                </a-form-item>
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="状态"
                >
                  <a-switch defaultChecked v-decorator="['status']"/>
                </a-form-item>
              </a-form>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="16">
            </a-col>
            <a-col :span="8">
              <a-button type="primary" @click="saveOrginfo">
                保存
              </a-button>
            </a-col>
          </a-row>
          <user-transfer ref="model"  @ok="handleSaveOk" @close="handleSaveClose"/>
        </a-card>
      </a-col>
    </a-row>
    </a-card>
  </div>
</template>
<script>
import UserTransfer from '@/components/admin/UserTransfer'
import { getOrgTree, addorg, updateorg, delorg } from '@/api/admin'
import { getUserList } from '@/api/admin'
export default {
  name: 'OrgList',
  components: {
    UserTransfer
  },
  data () {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      orgTree: [],
      dataList: [],
      // 当前点击树节点
      currentitem: '',
      pareOrg: '',
      cardname: '组织信息',
      // 查询参数
      queryParam: {},
      // 默认不显示编辑页面
      visible: false,
      // 响应式布局
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12, offset: 1 }
      },
      editForm: this.$form.createForm(this),
      // 1 新增2 修改
      type: ''
    }
  },
  created () {
    // 获取树形组织信息
    getOrgTree().then(res => {
      // 获取组织机构信息
      this.orgTree = res.result
      generateList(this.orgTree)
    })
    // 将树型结构信息转成列表形式，用于组织信息搜索
    const generateList = (data) => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const key = node.title
        this.dataList.push({ key, title: key })
        if (node.children) {
          generateList(node.children, node.key)
        }
      }
    }
    
  },
  methods: {
    
    /**
     * 展开/收起节点时触发
     */
    onExpand  (expandedKeys) {
      // 展开指定树节点
      this.expandedKeys = expandedKeys
      // this.autoExpandParent = false
    },
    /**
     * 搜索组织信息
     */
    onChange (e) {
      const value = e.target.value
      const expandedKeys = this.dataList.map((item) => {
        if (item.key.indexOf(value) > -1) {
          return this.getParentKey(item.key, this.orgTree)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    },
    /**
     * 获取父节点
     */
    getParentKey (key, tree) {
      let parentKey
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          if (node.children.some(item => item.title === key)) {
            parentKey = node.key
          } else if (this.getParentKey(key, node.children)) {
            parentKey = this.getParentKey(key, node.children)
          }
        }
      }
      return parentKey
    },
    /**
     * 点击树节点进入编辑模式
     */
    selectOrg (selectedKeys, e) {
      this.currentitem = e.node._props.dataRef
      this.editForm.setFieldsValue({
        orgname: this.currentitem.title,
        orgtype: this.currentitem.orgtype,
        incharge: this.currentitem.incharge,
        description: this.currentitem.description,
        status: this.currentitem.status
      })
      this.cardname = '修改组织信息'
    },
    /**
     * 点击新增按钮进入新增模式
     */
    addOrg (item) {
      this.editForm.resetFields()
      this.type = '1'
      this.cardname = '新增组织信息'
    },
    /**
     * 单条删除组织机构信息
     */
    delOrg () {
      if (this.currentitem === '') {
        this.$notification['warning']({
          message: '请选择一个组织单元',
          duration: 2
        })
        return
      }
      this.$confirm({
        title: '警告',
        content: `确认要删除 ${this.currentitem.title} 的及以下组织信息吗?`,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          // 在这里调用删除接口
          return delorg(
            this.currentitem
          ).then(
            res => {
              if (res.status === '200') {
                this.$notification['success']({
                  message: '删除成功',
                  duration: 2
                })
              } else {
                this.$notification['error']({
                  message: res.message,
                  duration: 4
                })
              }
            }
          ).catch(() =>
            this.$notification['error']({
              message: '删除异常，请联系系统管理员',
              duration: 4
            })
          )
        },
        onCancel: () => {
          this.$notification['info']({
            message: '取消删除操作',
            duration: 4
          })
        }
      })
    },
    /**
     * 组件主要负责人点击保存触发
     */
    handleSaveOk (data) {
      alert(data)
      let inchargearr =[]
      // 根据返回的id查询人员信息
      getUserList({'id': data}).then((res) => {
        res.result.data.forEach(item =>{
          inchargearr.push(item.name)
        })
        this.editForm.setFieldsValue({
          incharge: inchargearr.join(",")
        })
      })
      
    },
    /**
     * 组件主要负责人点击取消触发
     */
    handleSaveClose () {

    },
    /**
     * 保存组织表单信息
     */
    saveOrginfo () {
      if (this.currentitem === '') {
        this.$notification['warning']({
          message: '请选择一个组织单元',
          duration: 2
        })
        return
      }
      this.editForm.validateFields((err, values) => {
        if (!err) {
          if (this.type === '1') {
            // 在这里调用新增接口
            return addorg(
              values
            ).then(
              res => {
                if (res.status === '200') {
                  this.$notification['success']({
                    message: '保存成功',
                    duration: 2
                  })
                } else {
                  this.$notification['error']({
                    message: res.message,
                    duration: 4
                  })
                }
              }
            ).catch(() =>
              this.$notification['error']({
                message: '保存失败，出现异常',
                duration: 4
              })
            )
          } else {
            // 在这里调用修改接口
            return updateorg(
              values
            ).then(
              res => {
                if (res.status === '200') {
                  this.$notification['success']({
                    message: '保存成功',
                    duration: 2
                  })
                } else {
                  this.$notification['error']({
                    message: res.message,
                    duration: 4
                  })
                }
              }
            ).catch(() =>
              this.$notification['error']({
                message: '保存失败，出现异常',
                duration: 4
              })
            )
          }
        }
      })
    }
  }
}
</script>
