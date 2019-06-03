<template>
  <div>
    <user-chat :chatInfo="currentChat"/>
  </div>
</template>
<script>
import { Chat as UserChat } from '@/components/Talk'
export default {
  name: 'ChatBox',
  components: {
    UserChat
  },
  data () {
    return {
      currentChat: {}
    }
  },
  created () {
    console.log('路由')
    console.log(this.$route.query)
    this.currentChat = this.$route.query
  }
}
</script>
<style lang="less" scoped>

</style>
