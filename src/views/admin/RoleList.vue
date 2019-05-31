<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="8" type="flex" justify="end">
          <a-col :md="5" :sm="24">
            <a-form-item label="角色标识">
              <a-input placeholder="请输入" v-model="queryParam.id"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24" :offset="1">
            <a-form-item label="状态">
              <a-select placeholder="请选择" v-model="queryParam.status">
                <a-select-option value="1">正常</a-select-option>
                <a-select-option value="2">禁用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="3" :sm="24" :offset="1">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchRole">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="stable"
      size="default"
      :columns="columns"
      :data="loadData"
    >
      <div
        slot="expandedRowRender"
        slot-scope="record"
        style="margin: 0">
        <a-row
          :gutter="24"
          :style="{ marginBottom: '12px' }">
          <a-col :span="12" v-for="(role, index) in record.permissions" :key="index" :style="{ marginBottom: '12px' }">
            <a-col :lg="4" :md="24">
              <span>{{ role.title }}：</span>
            </a-col>
            <a-col :lg="20" :md="24" v-if="role.actionEntitySet.length > 0">
              <a-tag color="cyan" v-for="(action, k) in role.actionEntitySet" :key="k">{{ action.description }}</a-tag>
            </a-col>
            <a-col :span="20" v-else>-</a-col>
          </a-col>
        </a-row>
      </div>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="handlePermission(record)">权限</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="rolesDetail(record)">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="rolesdisabled(record)">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="rolesDelete(record)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>
    <a-modal
      title="操作"
      style="top: 100px;"
      :width="800"
      v-model="editVisible"
      @ok="handleEditOk"
    >
      <a-form :form="editForm">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="角色标识"
        >
          <a-input placeholder="唯一识别码" disabled="disabled" v-decorator="['id']"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="角色名称"
          hasFeedback
        >
          <a-input placeholder="起一个名字" v-decorator="['name',{rules: [{ required: true, message: '请填写角色名称' }]}]" :disabled="detailModel"/>
        </a-form-item>
        <!--
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态"
          hasFeedback
          validateStatus="warning"
        >
          <a-select v-model="mdl.status">
            <a-select-option value="1">正常</a-select-option>
            <a-select-option value="2">禁用</a-select-option>
          </a-select>
        </a-form-item>
        -->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述"
          hasFeedback
        >
          <a-textarea :rows="5" placeholder="..." v-decorator="['describe']" :disabled="detailModel"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建人"
          hasFeedback
          v-if="detailModel"
        >
          <a-input v-decorator="['creatorId']" :disabled="detailModel"/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="创建时间"
          hasFeedback
          v-if="detailModel"
        >
          <a-input v-decorator="['createTime']" :disabled="detailModel"/>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="操作"
      style="top: 100px;"
      :width="800"
      v-model="perVisible"
      @ok="handlePerOk">
      <a-form>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拥有权限"
          hasFeedback
        >
          <a-row :gutter="16" v-for="(permission, index) in mdl.permissions" :key="index">
            <a-col :span="4">
              {{ permission.title }}：
            </a-col>
            <a-col :span="20">
              <a-checkbox-group :options="permission.actionsOptions" v-model="permission.selected"/>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getRoleList, getRolePermission, updateRole, delRole, disabledRole } from '@/api/admin'
// v-model="permission.selected"
export default {
  name: 'Rolelist',
  components: {
    STable
  },
  data () {
    return {
      // 编辑弹出框
      editVisible: false,
      // 权限弹出框
      perVisible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      editForm: this.$form.createForm(this),
      // 角色行信息
      mdl: {},
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '角色标识',
          dataIndex: 'id'
        },
        {
          title: '角色名称',
          dataIndex: 'name'
        },
        {
          title: '角色描述',
          dataIndex: 'describe'
        },
        {
          title: '状态',
          dataIndex: 'status'
        },
        {
          title: '操作',
          width: '200px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getRoleList(parameter)
          .then(res => {
            res.result.data.forEach(item => {
              item.permissions = this.rolePermissions.filter(role => role.roleId === item.id)
            })
            return res.result
          })
      },
      // 角色权限map <key 角色id value 角色权限 json数组>
      rolePerMap: new Map(),
      rolePermissions: [],
      detailModel: false
    }
  },
  created () {
    // 获取所有角色对应权限
    getRolePermission()
      .then(res => {
        console.log('getRolePermission res', res)
        const resData = res.result.data
        this.rolePermissions = resData.map(permission => {
          permission.actionsOptions = permission.actionEntitySet.map(option => {
            return {
              label: option.description,
              value: option.method
            }
          })
          return permission
        })
        console.log('this.rolePermissions', this.rolePermissions)
      })
  },
  methods: {
    /**
     * 搜索
     */
    searchRole () {
      this.$refs.stable.loadData({}, this.queryParam, {})
    },
    /**
     * 编辑弹出框
     */
    handleEdit (record) {
      this.detailModel = false
      this.mdl = Object.assign({}, record)
      setTimeout(() => {
        this.editForm.setFieldsValue({
          id: record.id,
          name: record.name,
          describe: record.describe
        })
      }, 0)
      this.editVisible = true
    },
    /**
     * 权限分配弹出框
     */
    handlePermission (record) {
      this.mdl = Object.assign({}, record)
      this.mdl.permissions = this.rolePermissions.filter(role => role.roleId === record.id)
      // 先处理要勾选的权限结构
      const permissionsAction = {}
      this.mdl.permissions.forEach(permission => {
        const defaultcheck = permission.actionEntitySet.filter(entity => entity.defaultCheck === 1)
        permissionsAction[permission.menuId] = defaultcheck.map(entity => entity.method)
      })
      // 把权限表遍历一遍，设定要勾选的权限 action
      this.mdl.permissions.forEach(permission => {
        const selected = permissionsAction[permission.menuId]
        permission.selected = selected || []
      })
      this.perVisible = true
    },
    /**
     * 编辑保存
     */
    handleEditOk () {
      this.editForm.validateFields((err, values) => {
        if (!err) {
          return updateRole(
            values
          ).then(
            res => {
              if (res.status === '200') {
                this.$notification['success']({
                  message: '修改成功',
                  duration: 2
                })
                // 关闭编辑框
                this.editVisible = false
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
      })
    },
    /**
     * 编辑权限信息保存
     */
    handlePerOk () {
      return updateRole(
        this.mdl.permissions
      ).then(
        res => {
          if (res.status === '200') {
            this.$notification['success']({
              message: '修改成功',
              duration: 2
            })
            // 关闭编辑框
            this.editVisible = false
          } else {
            this.$notification['error']({
              message: res.message,
              duration: 4
            })
          }
        }
      )
    },
    /**
     * 详情
     */
    rolesDetail (record) {
      this.detailModel = true
      this.mdl = Object.assign({}, record)
      setTimeout(() => {
        this.editForm.setFieldsValue({
          id: record.id,
          name: record.name,
          describe: record.describe,
          creatorId: record.creatorId,
          createTime: record.createTime
        })
      }, 0)
      this.editVisible = true
    },
    /**
     * 禁用用户
     */
    rolesdisabled (record) {
      this.$confirm({
        title: '警告',
        content: `确认要禁用 ${record.name} 吗?`,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          // 在这里调用接口
          return disabledRole(
            record.id
          ).then(
            res => {
              if (res.status === '200') {
                this.$notification['success']({
                  message: '禁用成功',
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
              message: '出现异常，请联系系统管理员',
              duration: 4
            })
          )
        },
        onCancel: () => {
          this.$notification['info']({
            message: '取消操作',
            duration: 4
          })
        }
      })
    },
    /**
     * 删除用户
     */
    rolesDelete (record) {
      this.$confirm({
        title: '警告',
        content: `确认要删除 ${record.name} 吗?`,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          // 在这里调用删除接口
          return delRole(
            record.id
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
              message: '出现异常，请联系系统管理员',
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
    }
  }
}
</script>
