<template>
  <a-modal
    id="modal"
    title="创建会议"
    :mask="false"
    v-model="createMeeted"
    @on-visible-change="visibleChange"
    :footer-hide="false">
    <a-row class="marginTop" type="flex" justify="center">
      <div>
        会议名称：
        <a-input v-model="meeting.name" placeholder="输入会议名称" style="width: 210px"/>
      </div>
    </a-row>
    <a-row class="marginTop" type="flex" justify="center">
      <div>
        会议时间：
        <a-date-picker v-model="meeting.date" showTime placeholder="输入会议时间" style="width: 210px"></a-date-picker>
      </div>
    </a-row>
    <a-row class="marginTop" type="flex" justify="center">
      <div>
        会议地点：
        <a-input v-model="meeting.address" placeholder="输入会议地点" style="width: 210px"/>
      </div>
    </a-row>
    <a-row class="marginTop" type="flex" justify="center">
      <div>
        参会成员：
        <a-input v-model="meeting.member" placeholder="输入会议成员" style="width: 210px"/>
      </div>
    </a-row>
    <a-row class="marginTop" type="flex" justify="center">
      <div>
        会议说明：
        <a-input v-model="meeting.description" placeholder="输入会议说明" style="width: 210px"/>
      </div>
    </a-row>
  </a-modal>

</template>
<script>
export default {
  data () {
    return {
      meeting: {}

    }
  },
  props: {
    createMeeted: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancel () {
      this.$nextTick(() => {
        this.loading = true
      })
    },
    visibleChange () {
      // alert(this.createMeeted);
      // console.log(this.createMeeted)
    }
  },
  watch: {
    createMeeted (val) {
      this.createMeeted = val
      this.$emit('createMeeted', this.createMeeted)
    }
  }
}
</script>
<style scoped>
  .marginTop {
    margin-top: 5px;
  }

  p {
    font-size: 13px;
  }
</style>
