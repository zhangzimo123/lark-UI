<template>
  <!-- 聊天消息框 -->
  <div class="message-piece receive">

    <!-- 消息时间 需要判断显示时间的条件 -->
    <div class="time-stamp">
      <span>{{ messageInfo.time | timeFormat }}</span>
    </div>

    <!-- 用户头像 需要添加点击事件，显示用户信息 -->
    <a-avatar class="message-avatar receive" shape="square" :src="messageInfo.avatar" :size="40">
      <span>{{ messageInfo.username }}</span>
    </a-avatar>

    <div class="message-content">

      <!-- 需要判断什么时候显示 -- 群消息 且 不是当前用户发送的 且 设置了显示群昵称的 -->
      <div class="message-nickname">
        <span>{{ messageInfo.username }}</span>
      </div>
      <!-- 判断消息类型：图片 文字 文件 -->
      <div class="message-bubble">
        <span>{{ messageInfo.content }}</span>
      </div>

      <div>{{ messageInfo }}</div>

    </div>

  </div>
</template>

<script>
import { toWeiXinString } from '@/utils/util'

export default {
  name: 'MessagePiece',
  props: {
    /** 消息对象 */
    messageInfo: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  filters: {
    timeFormat: toWeiXinString
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  // 接收到的消息样式
  .receive {
    float: left;
  }

  // 发送的消息样式
  .send {
    float: right;
    text-align: right;
  }

  .message-piece {
    width: 100%;
    display: block;

    .time-stamp {
      text-align: center;
      height: 24px;
      line-height: 24px;
    }

    .message-avatar {
      border-radius: 2px;
      cursor: pointer;
    }

    .message-content {
      overflow: hidden;

      .message-nickname {
        height: 20px;
        line-height: 22px;
        font-size: 12px;
        font-weight: 400;
        padding-left: 10px;
        color: #4f4f4f;
        width: 350px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }

      .message-bubble {
        background-color: #ffffff;
        margin: 0 10px;
        max-width: 500px;
        min-height: 1em;
        display: inline-block;
        vertical-align: top;
        position: relative;
        font-size: 14px;
        border-radius: 3px;

        &::before {
          position: absolute;
          right: 100%;
          top: 14px;
          border: 6px solid transparent;
          content: " ";
        }
      }
    }

  }
</style>
