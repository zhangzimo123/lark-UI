<template>
  <div class="talk-setting" ref="settingDrawer">
    <a-row :gutter="8" class="group-setting-row">
      <a-col :span="6">
        <span class="group-setting-title">组名称:</span>
      </a-col>
      <a-col :span="12">
        <span class="group-setting-content">
          <a-input
            v-if="editable"
            :value="text"
            class="group-setting-edit-box"
            @change="e => handleChange(e.target.value)"
          />
          <template v-else>{{ text }}</template>
        </span>
      </a-col>
      <a-col :span="6">
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
      <a-col :span="12">
        第一
      </a-col>
      <a-col :span="6">
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      editable: false,
      text: 'caonima'
    }
  },
  methods: {
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
    }
  },
  props: {
    talk: {
      type: Number,
      default: 0
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
  padding: 16px 16px 0;
  min-height: 18px;
}
</style>
