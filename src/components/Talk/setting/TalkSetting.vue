<template>
  <a-drawer
    class="unpop-modal"
    title="研讨组设置"
    wrapClassName="talk-setting"
    :mask="showMask"
    :width="360"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px', marginTop: '64px' }"
    getContainer="#talkSetting"
  >
    <div class="talk-setting" ref="settingDrawer">
      <a-row :gutter="8" class="group-setting-row">
        <a-col :span="6">
          <span class="group-setting-title">组名称:</span>
        </a-col>
        <a-col :span="10">
          <span class="group-setting-content">
            <a-input
              v-if="editable"
              :value="text"
              class="group-setting-edit-box"
              @change="e => handleChange(e.target.value)"
            />
            <template v-else>{{ setting.name }}</template>
          </span>
        </a-col>
        <a-col :span="8">
          <span v-if="editable">
            <a @click="() => save()">保存</a>
            <a-divider type="vertical" />
            <a @click="() => cancel()">取消</a>
          </span>
          <span v-else>
            <a class="edit" @click="() => edit()">修改</a>
          </span>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="group-setting-row">
        <a-col :span="6">
          <span class="group-setting-title">管理员:</span>
        </a-col>
        <a-col :span="10">
          {{ setting.admin }}
        </a-col>
        <a-col :span="8">
          <span v-if="editable">
            <a @click="() => save()">保存</a>
            <a-divider type="vertical" />
            <a @click="() => cancel()">取消</a>
          </span>
          <span v-else>
            <a class="edit" @click="() => edit()">修改</a>
          </span>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="group-setting-row">
        <a-col :span="6">
          <span class="group-setting-title">组类型:</span>
        </a-col>
        <a-col :span="18">
          <a-select defaultValue="研发" style="width: 160px">
            <a-select-option value="研发">研发</a-select-option>
            <a-select-option value="管理">管理</a-select-option>
            <a-select-option value="生活">生活</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="group-setting-row">
        <a-col :span="16">
          <span class="group-setting-title">消息免打扰:</span>
        </a-col>
        <a-col :span="8">
          <a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked/>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="group-setting-row">
        <a-col :span="16">
          <span class="group-setting-title">研讨组置顶:</span>
        </a-col>
        <a-col :span="8">
          <a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked/>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="group-setting-row">
        <a-col :span="16">
          <span class="group-setting-title">加入验证:</span>
        </a-col>
        <a-col :span="8">
          <a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked/>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="group-setting-row">
        <a-col :span="16">
          <span class="group-setting-title">新成员可查看研讨历史:</span>
        </a-col>
        <a-col :span="8">
          <a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked/>
        </a-col>
      </a-row>
      <a-row :gutter="8" class="group-setting-row">
        <a-col :span="10">
          <span class="group-setting-title">组成员:{{ teamMembersNum }}人</span>
        </a-col>
        <a-col :span="10">
          <a @click="() => addMember()">+添加新成员</a>
        </a-col>
        <a-col :span="4">

        </a-col>
      </a-row>
      <div class="group-setting-person">
        <a-list
          :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
          :dataSource="setting.members"
        >
          <a-list-item slot="renderItem" slot-scope="item" class="group-setting-people">
            <a-avatar size="large" style="color: #f56a00; backgroundColor: #fde3cf">{{ item.name }}</a-avatar>
            <div class="user-name">{{ item.name }}</div>
          </a-list-item>
        </a-list>
      </div>
    </div>
    <div
      :style="{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
      }"
    >
      <a-button type="danger" @click="onClose" block>退出研讨组</a-button>
    </div>
  </a-drawer>
</template>
<script>
const data = ['1', '2', '1', '2', '1', '2']
export default {
  data () {
    return {
      showMask: false,
      editable: false,
      text: 'caonima',
      teamMembersNum: 12,
      data,
      visible: false,
      setting: {}
    }
  },
  methods: {
    showSetting (talkId) {
      this.visible = true
      this.$http.get('/talk/talk-setting', {
        params: talkId
      }).then(res => {
        this.setting = res.result
      })
    },
    handleChange (value) {
      console.log(value)
      this.text = value
    },
    edit () {
      this.editable = true
      // row = Object.assign({}, row)
    },
    save () {
      this.editable = false
    },
    cancel () {
      this.editable = false
    },
    onClose () {
      this.visible = false
    },
    addMember () {

    }
  },
  props: {
    talk: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.one-line{
  display: inline;
}
.group-setting-title{
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}
.group-setting-row{
  position: relative;
  padding: 16px 0 0;
  min-height: 18px;
}
.group-setting-person{
  clear: both;
  padding: 20px 9.5px
}
.group-setting-people{
  position: relative;
    margin-right: 8px;
    margin-left: 7px;
    margin-bottom: 1em;
    float: left;
    text-align: center;
    cursor: pointer;
    width: 48px;
    height: 64px;
    overflow: hidden;
    .user-name{
      display: block;
      max-width: 40px;
      margin: 2px auto 0;
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 16px;
    }
}
</style>
