<template>
  <div>
    <a-row :gutter="24" >
      <a-col :span="6">
        <a-card :bordered="true" title="组织树">
          <a-row :gutter="24" type="flex" justify="space-around" align="middle">
            <a-col :span="18">
              <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" />
            </a-col>
            <a-col :span="6">
              <a-icon type="plus-circle" @click="addOrg" style="font-size:20px" theme="twoTone"/>
              <!-- <a-icon type="delete" @click="delOrg" style="margin-left:8px; font-size:20px" theme="twoTone"/> -->
            </a-col>
          </a-row>
          <a-tree
            @expand="onExpand"
            :expandedKeys="expandedKeys"
            :autoExpandParent="autoExpandParent"
            :treeData="orgTree"
            @select="selectOrg"
            ref="orgtree"
          >
            <template slot="title" slot-scope="{title}">
              <span v-if="title.indexOf(searchValue) > -1">
                {{ title.substr(0, title.indexOf(searchValue)) }}
                <span style="color: #f50">{{ searchValue }}</span>
                {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
              </span>
              <span v-else>{{ title }}</span>
            </template>
          </a-tree>
        </a-card>
      </a-col>
      <a-col :span="18" >
        <a-card :bordered="true" :title="cardname" v-show="formvisable">
          <a-row :gutter="24">
            <a-form :form="editForm">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="上级组织"
              >
                <a-input v-decorator="['preorgname']" :disabled="disabled"/>
              </a-form-item>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="组织名称"
              >
                <a-input
                  placeholder="组织名称"
                  v-decorator="['orgname',{rules: [{ required: true, message: '请输入组织名称信息' },{ max:20,message:'长度不能超过20个字'}]}]"/>
              </a-form-item>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="组织类型"
              >
                <a-select
                  v-decorator="['orgtype',{rules: [{ required: true, message: '请选择组织类型信息' }]}]"
                  placeholder="请选择">
                  <a-select-option value="1">集团</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="人员排序一"
              >
                <a-input-search
                  enterButton
                  v-decorator="['people1']"
                  @search="$refs.model.beginChoose(people1id, '1')"
                />
              </a-form-item>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="人员排序二"
              >
                <a-input-search
                  enterButton
                  v-decorator="['people2']"
                  @search="$refs.model.beginChoose(people2id, '2')"
                />
              </a-form-item>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="人员排序三"
              >
                <a-input-search
                  enterButton
                  v-decorator="['people3']"
                  @search="$refs.model.beginChoose(people3id, '3')"
                />
              </a-form-item>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="人员排序四"
              >
                <a-input-search
                  enterButton
                  v-decorator="['people4']"
                  @search="$refs.model.beginChoose(people4id, '4')"
                />
              </a-form-item>
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="人员排序五"
              >
                <a-input-search
                  enterButton
                  v-decorator="['people5']"
                  @search="$refs.model.beginChoose(people5id, '5')"
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
          </a-row>
          <a-row>
            <a-button type="primary" @click="saveOrginfo">
              保存
            </a-button>
            <a-button type="default" @click="delOrg" style="margin-left: 8px">
              删除
            </a-button>
          </a-row>
          <user-transfer ref="model" @ok="handleSaveOk" @close="handleSaveClose"/>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import UserTransfer from '@/components/admin/UserTransfer'
import { getOrgTree, addorg, updateorg, delorg } from '@/api/admin'
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
      type: '',
      people1id: '',
      people2id: '',
      people3id: '',
      people4id: '',
      people5id: '',
      // 右侧form表单默认不显示
      formvisable: false,
      disabled: true
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
      this.formvisable = true
      this.currentitem = e.node._props.dataRef
      this.editForm.setFieldsValue({
        orgname: this.currentitem.title,
        orgtype: this.currentitem.orgtype,
        people1: this.currentitem.people1name,
        people2: this.currentitem.people2name,
        people3: this.currentitem.people3name,
        people4: this.currentitem.people4name,
        people5: this.currentitem.people5name,
        description: this.currentitem.description,
        status: this.currentitem.status,
        preorgname: this.currentitem.preorgname
      })
      this.cardname = '修改组织信息'
      this.people1id = this.currentitem.people1id
      this.people2id = this.currentitem.people2id
      this.people3id = this.currentitem.people3id
      this.people4id = this.currentitem.people4id
      this.people5id = this.currentitem.people5id
    },
    /**
     * 点击新增按钮进入新增模式
     */
    addOrg () {
      if (this.currentitem === '') {
        this.$notification['warning']({
          message: '请选择一个组织单元',
          duration: 2
        })
        return
      }
      this.formvisable = true
      this.editForm.resetFields()
      this.editForm.setFieldsValue({
        preorgname: this.currentitem.preorgname
      })
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
        content: `确认要删除 ${this.currentitem.title} 的组织信息吗?`,
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
    handleSaveOk (returnData, type) {
      console.log('returning Data', returnData)
      const username = []
      const userid = []
      returnData.forEach(item => {
        username.push(item.name)
        userid.push(item.id)
      })
      if (type === '1') {
        this.people1id = userid.join(',')
        this.editForm.setFieldsValue({
          'people1': username.join(',')
        })
      } else if (type === '2') {
        this.people2id = userid.join(',')
        this.editForm.setFieldsValue({
          'people2': username.join(',')
        })
      } else if (type === '3') {
        this.people3id = userid.join(',')
        this.editForm.setFieldsValue({
          'people3': username.join(',')
        })
      } else if (type === '4') {
        this.people4id = userid.join(',')
        this.editForm.setFieldsValue({
          'people4': username.join(',')
        })
      } else if (type === '5') {
        this.people5id = userid.join(',')
        this.editForm.setFieldsValue({
          'people5': username.join(',')
        })
      }
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
