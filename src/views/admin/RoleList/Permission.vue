<template>
  <a-card :bordered="false" :style="{ height: '100%' }" title="权限信息">
    <a slot="extra" href="javascript:void(0)" @click="$emit('back')">返回</a>
    <a-form :form="form" :layout="isMobile() ? 'vertical' : 'horizontal'">
      <a-form-item label="拥有权限" v-bind="formItemStyle">
        <a-row :gutter="16" v-for="(permission, index) in permissions" :key="index">
          <a-col :xl="4" :lg="24">
            {{ permission.name }}：
          </a-col>
          <a-col :xl="20" :lg="24">
            <a-checkbox
              v-if="permission.actionsOptions.length > 0"
              :indeterminate="permission.indeterminate"
              :checked="permission.checkedAll"
              @change="onChangeCheckAll($event, permission)">
              全选
            </a-checkbox>
            <a-checkbox-group :options="permission.actionsOptions" v-model="permission.selected" @change="onChangeCheck(permission)" />
          </a-col>
        </a-row>
        <a-button type="primary" style="float:right;margin-right:18px;" @click="savePermission">保存</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
import { getPermissions } from '@/api/manage'
import { actionToObject } from '@/utils/permissions'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'RolePermission',
  mixins: [mixinDevice],
  props: {
    formItemStyle: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      permissions: []
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    this.loadPermissions()
  },
  methods: {
    loadPermissions () {
      getPermissions().then(res => {
        const result = res.result
        this.permissions = result.map(permission => {
          const options = actionToObject(permission.actionData)
          permission.checkedAll = false
          permission.selected = []
          permission.indeterminate = false
          permission.actionsOptions = options.map(option => {
            return {
              label: option.describe,
              value: option.action
            }
          })
          return permission
        })
      })
    },
    onChangeCheck (permission) {
      permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
      permission.checkedAll = permission.selected.length === permission.actionsOptions.length
    },
    onChangeCheckAll (e, permission) {
      Object.assign(permission, {
        selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
        indeterminate: false,
        checkedAll: e.target.checked
      })
    },
    savePermission () {
      this.$emit('success')
    }
  }
}
</script>
