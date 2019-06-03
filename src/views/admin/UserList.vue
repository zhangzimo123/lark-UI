<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="5">
        <a-card :bordered="true" title="组织树" v-show="cardvisible">
          <a-row>
            <a-col :span="6">
              <a-tree
                ref="orgtree"
                :treeData="orgTree"
                @select="handleClick"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="19">
        <a-card :bordered="true" title="人员信息列表" v-show="cardvisible">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="32">
                <a-col :span="6">
                  <a-form-item label="姓名">
                    <a-input v-model="queryParam.name"/>
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="状态">
                    <a-select placeholder="请选择" v-model="queryParam.inservice">
                      <a-select-option value="1">在职</a-select-option>
                      <a-select-option value="2">离职</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item label="密级">
                    <a-select placeholder="请选择" v-model="queryParam.status">
                      <a-select-option value="1">一般</a-select-option>
                      <a-select-option value="2">重要</a-select-option>
                      <a-select-option value="2">核心</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <span class="table-page-search-submitButtons">
                    <a-button type="primary" @click="searchUser">查询</a-button>
                    <a-button type="primary" style="margin-left: 8px" @click="openEditModal('','1')">新增用户</a-button>
                    <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                  </span>
                </a-col>
              </a-row>
              <a-row>
                <s-table
                  ref="stable"
                  size="default"
                  :columns="columns"
                  :data="loadData"
                  :alert="false"
                >
                  <span slot="action" slot-scope="text, record">
                    <template>
                      <a @click="openEditModal(record,'2')">编辑</a>
                      <a-divider type="vertical"/>
                    </template>
                    <template>
                      <a @click="handleDel(record)">删除</a>
                    </template>
                  </span>
                </s-table>
              </a-row>
            </a-form>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-card :bordered="true" title="人员基础信息" v-show="editvisible">
        <a href="#" slot="extra" @click="cacenlEdit">返回</a>
        <a-form :form="editForm">
          <a-row>
            <a-col :span="10" :offset="1">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="姓名"
              >
                <a-input v-decorator="['name',{rules: [{ required: true, message: '请输入姓名' },{ max:10,message:'长度不能超过10个字'}]}]"/>
              </a-form-item>
            </a-col>
            <a-col :span="10" :offset="1">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="密级"
              >
                <a-select placeholder="请选择" v-decorator="['slevel',{rules: [{ required: true, message: '请选择密级' }]}]">
                  <a-select-option value="1">一般</a-select-option>
                  <a-select-option value="2">重要</a-select-option>
                  <a-select-option value="3">核心</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="10" :offset="1">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="身份证号"
              >
                <a-input
                  v-decorator="['cardno',{rules: [{ required: true, message: '请输入身份证号' },{pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '身份证输入格式有误'}]}]"/>
              </a-form-item>
            </a-col>
            <a-col :span="10" :offset="1">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="在职状态"
              >
                <a-select placeholder="请选择" v-decorator="['inservice',{rules: [{ required: true, message: '请选择在职状态' }]}]">
                  <a-select-option value="1">在职</a-select-option>
                  <a-select-option value="2">离职</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="10" :offset="1">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="状态"
              >
                <a-switch defaultChecked v-decorator="['status']"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :bordered="true" title="组织信息" v-show="editvisible">
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="所属组织"
            >
              <org-treeSelect :values="userinfo.orgid" :dataSource="orgTree"></org-treeSelect>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <a-card :bordered="true" title="角色信息" v-show="editvisible">
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="选择角色"
            >
              <Role-checked :values="rolechecked"></Role-checked>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="end">
          <a-col>
            <a-button type="primary" @click="saveUserInfo">保存</a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-row>
  </div>
</template>
<script>
import STable from '@/components/table/'
import OrgTreeSelect from '@/components/admin/OrgTreeSelect'
import RoleChecked from '@/components/admin/RoleChecked'
import { setTimeout } from 'timers'
import { getUserList, adduser, updateuser, deluser, getOrgTree } from '@/api/admin'
export default {
  name: 'UserList',
  components: {
    STable,
    OrgTreeSelect,
    RoleChecked
  },
  data () {
    return {
      expandedKeys: ['key-01'],
      // 查询参数
      queryParam: {},
      // 默认不显示编辑页面
      visible: false,
      cardvisible: true,
      editvisible: false,
      // 编辑页面信息传递
      userinfo: {},
      // 响应式布局
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16, offset: 1 }
      },
      editForm: this.$form.createForm(this),
      // 表头
      columns: [
        {
          title: '账号',
          dataIndex: 'accout'
        },
        {
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '密级',
          dataIndex: 'slevel'
        },
        {
          title: '身份证号',
          dataIndex: 'cardno'
        },
        {
          title: '在职状态',
          dataIndex: 'inservice'
        },
        {
          title: '状态',
          dataIndex: 'status'
        },
        {
          title: '操作',
          width: '120px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getUserList(Object.assign(parameter, this.queryParam)).then(res => {
          const result = res.result
          return result
        })
      },
      orgTree: [],
      // 用户对应角色
      rolechecked: [],
      editType: ''
    }
  },
  created () {
    // 获取树形组织信息
    console.log('getOrgTree')
    getOrgTree().then(res => {
      this.orgTree = res.result
    })
  },
  methods: {
    /**
     * 点击树节点刷新人员信息
     */
    handleClick (item, e) {
      this.queryParam = {
        'orgname': item[0]
      }
      this.$refs.stable.refresh(true)
    },
    /**
     * 查询用户信息
     */
    searchUser () {
      this.$refs.stable.loadData({}, this.queryParam, {})
    },
    /**
     * 保存修改内容
     */
    saveUserInfo () {
      this.editForm.validateFields((err, values) => {
        // 如果有必填项限制，在这里加 TODO，且需要有对应的提醒信息，tab页无法动态设置展示
        values.orgid = this.userinfo.orgid
        values.role = this.rolechecked
        if (!err) {
          if (this.editType === '1') {
            return adduser(
              values
            ).then(
              res => {
                if (res.status === '200') {
                  this.editvisible = false
                  this.cardvisible = true
                  this.$notification['success']({
                    message: '新增成功',
                    duration: 2
                  })
                  // 关闭编辑框
                  // this.visible = false
                  this.editvisible = false
                  this.cardvisible = true
                  // 刷新员工列表
                  this.$refs.stable.refresh(true)
                } else {
                  this.$notification['error']({
                    message: res.message,
                    duration: 4
                  })
                }
              }
            )
          } else {
            return updateuser(
              values
            ).then(
              res => {
                if (res.status === '200') {
                  this.$notification['success']({
                    message: '修改成功',
                    duration: 2
                  })
                  // 关闭编辑框
                  // this.visible = false
                  this.editvisible = false
                  this.cardvisible = true
                  // 刷新员工列表
                  this.$refs.stable.refresh(true)
                } else {
                  this.$notification['error']({
                    message: res.message,
                    duration: 4
                  })
                }
              }
            )
          }
        }
      })
    },
    /**
     * 编辑页取消按钮
     */
    cacenlEdit () {
      this.editvisible = false
      this.cardvisible = true
      this.$notification['info']({
        message: '取消操作',
        duration: 2
      })
    },
    /**
     * 打开编辑用户信息弹出框
     */
    openEditModal (item, type) {
      this.editType = type
      // edit
      if (type === '2') {
        // 拷贝选中信息内容到userinfo
        this.userinfo = Object.assign({}, item)
        this.rolechecked = []
        // 角色多选项选中
        const userrole = this.userinfo.role
        userrole.forEach((r) => {
          this.rolechecked.push(r.id)
        })
        setTimeout(() => {
          this.editForm.setFieldsValue({
            name: this.userinfo.name,
            inservice: this.userinfo.inservice,
            slevel: this.userinfo.slevel,
            cardno: this.userinfo.cardno,
            status: this.userinfo.status === '启用'
          })
        }, 0)
      } else {
        // add
        setTimeout(() => {
          this.editForm.setFieldsValue({
            name: '',
            inservice: '',
            slevel: '',
            cardno: '',
            status: true
          })
        }, 0)
        this.userinfo.orgid = ''
        this.rolechecked = []
      }
      this.editvisible = true
      this.cardvisible = false
    },
    /**
     * 单条删除用户信息
     */
    handleDel (item) {
      this.$confirm({
        title: '警告',
        content: `确认要删除 ${item.name} 的信息吗?`,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          // 在这里调用删除接口
          return deluser(
            item
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
    changOrg (value) {
      this.userinfo.orgid = value
    },
    changerolecheck (value) {
      this.rolechecked = value
    }
  }
}
</script>
<style>
</style>
