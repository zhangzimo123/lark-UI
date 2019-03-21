<template>
  <div class="talk-setting" ref="settingDrawer">
    <a-input
      v-if="editable"
      style="margin: -5px 0"
      :value="text"
      @change="e => handleChange(e.target.value)"
    />
    <template v-else>{{ text }}</template>
    <a class="edit" @click="() => edit()">修改</a>
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

</style>
