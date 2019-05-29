<template>
  <div>
    <!-- <a-divider v-if="isMobile()" /> -->
    <role-list v-if="showRoleList" :searchFormItemStyle="formItemStyle" @toCreate="toCreate" @edit="editRole" @permission="editPermission"/>
    <role-form v-if="showRoleForm" :role="selectedRole" :formItemStyle="formItemStyle" @back="hideForm" @success="modifySuccess"/>
    <role-permission v-if="showRolePermission" :formItemStyle="formItemStyle" @back="hidePermission" @success="permissionSuccess" />
  </div>
</template>
<script>

import RoleList from './List.vue'
import RoleForm from './Form.vue'
import RolePermission from './Permission.vue'

export default {
  components: {
    RoleList,
    RoleForm,
    RolePermission
  },
  data () {
    return {
      formItemStyle: {
        labelCol: { span: 4, offset: 2 },
        wrapperCol: { span: 16 }
      },
      showRoleList: true,
      showRoleForm: false,
      showRolePermission: false,
      isCreateForm: false,
      selectedRole: {}
    }
  },
  methods: {
    showForm () {
      this.showRoleList = false
      this.showRoleForm = true
    },
    hideForm () {
      this.showRoleList = true
      this.showRoleForm = false
    },
    showPermission () {
      this.showRoleList = false
      this.showRolePermission = true
    },
    hidePermission () {
      this.showRoleList = true
      this.showRolePermission = false
    },
    toCreate () {
      this.selectedRole = {}
      this.showForm()
      this.isCreateForm = true
    },
    editRole (role) {
      this.selectedRole = Object.assign({}, role)
      this.showForm()
      this.isCreateForm = false
    },
    editPermission (role) {
      this.selectedRole = Object.assign({}, role)
      this.showPermission()
      this.isCreateForm = false
    },
    modifySuccess () {
      this.hideForm()
    },
    permissionSuccess () {
      this.hidePermission()
    }
  }
}
</script>
