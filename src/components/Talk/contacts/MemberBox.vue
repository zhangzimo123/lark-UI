<template>
  <a-modal
    title="选择成员"
    :memberVisible="memberVisible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    width="720px"
  >
    <a-spin :spinning="confirmLoading">
      <a-transfer
        :dataSource="mockData"
        showSearch
        :listStyle="{
          width: '310px',
          height: '310px',
        }"
        :targetKeys="targetKeys"
        @change="handleChange"
        :render="renderItem"
      >
      </a-transfer>
    </a-spin>
  </a-modal>
</template>
<script>
import { getTalkMembers } from '@/api/chat'

export default {
  data () {
    return {
      mockData: [],
      targetKeys: [],
      memberVisible: false,
      confirmLoading: false
    }
  },
  mounted () {
    getTalkMembers(this.chat.id).then((res) => {
      const members = res.result.data
      console.log('this.roles', this.members)
      const tempData = members
      const targetKeys = tempData.filter(function (element) {
        return element.chosen
      })
      this.mockData = tempData
      this.targetKeys = targetKeys
    })
  },
  props: {
    chat: {
      type: Object,
      default: function () {
        return { message: '没东西' }
      }
    }
  },
  methods: {
    beginTalk () {
      this.memberVisible = true
    },
    close () {
      this.$emit('close')
      this.memberVisible = false
    },
    handleOk () {
    },
    handleCancel () {
      this.close()
    },
    renderItem (item) {
      const customLabel = (
        <span class="custom-item">
          {item.title} - {item.description}
        </span>
      )

      return {
        label: customLabel, // for displayed item
        value: item.title // for title and filter matching
      }
    },
    handleChange (targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys)
      this.targetKeys = targetKeys
    }
  }
}
</script>
