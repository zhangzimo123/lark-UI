<template>
  <a-card :bordered="false" :style="{ height: '100%' }" title="角色信息">
    <a slot="extra" href="javascript:void(0)" @click="$emit('back')">返回</a>
    <a-form :form="form">
      <a-form-item label="唯一键识别码" v-bind="formItemStyle">
        <a-input v-decorator="[ 'code', {rules: [{ required: true, message: '请输入唯一识别码!' }]} ]" placeholder="唯一键识别码" />
      </a-form-item>
      <a-form-item label="角色名称" v-bind="formItemStyle">
        <a-input v-decorator="[ 'name', {rules: [{ required: true, message: '请输入角色名称!' }]} ]" placeholder="角色名称" />
      </a-form-item>
      <a-form-item label="状态" v-bind="formItemStyle">
        <a-select v-decorator="[ 'status', {rules: [{ required: true, message: '请选择状态!' }]} ]" placeholder="请选择状态">
          <a-select-option :value="1">正常</a-select-option>
          <a-select-option :value="2">禁用</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="备注说明" v-bind="formItemStyle">
        <a-textarea :row="3" v-decorator="[ 'describe', {rules: [{ required: true, message: '请输入备注说明!' }]} ]" placeholder="备注说明" />
        <a-button type="primary" style="float:right;margin-right:18px;" @click="saveRole">保存</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
import pick from 'lodash.pick'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'RoleForm',
  mixins: [mixinDevice],
  props: {
    formItemStyle: {
      type: Object,
      required: true
    },
    role: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    this.form.setFieldsValue(this.role)
  },
  methods: {
    saveRole () {
      this.$emit('success')
    },
    add () {
      this.edit({ id: 0 })
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      // 有权限表，处理勾选
      if (this.mdl.permissions && this.permissions) {
        // 先处理要勾选的权限结构
        const permissionsAction = {}
        this.mdl.permissions.forEach(permission => {
          permissionsAction[permission.permissionId] = permission.actionEntitySet.map(entity => entity.action)
        })

        console.log('permissionsAction', permissionsAction)
        // 把权限表遍历一遍，设定要勾选的权限 action
        this.permissions.forEach(permission => {
          const selected = permissionsAction[permission.id]
          permission.selected = selected || []
        })

        console.log('this.permissions', this.permissions)
      }

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'name', 'status', 'describe'))
      })
      console.log('this.mdl', this.mdl)
    }
  }
}
</script>
