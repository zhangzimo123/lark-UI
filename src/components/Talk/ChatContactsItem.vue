<template>
  <!-- recent contacts item -->
  <div class="chat-contacts">

    <div class="avatar">
      <img src="/avatar2.jpg">
      <a-badge
        :count="100"
        :overflowCount="99"
        :offset="[0, -20]"
        :numberStyle="{fontSize: '12px', padding: '0', boxShadow: 'none'}">
        <a href="#"></a>
      </a-badge>
    </div>

    <div class="extra">
      <p class="attr">12:30</p>
      <p class="attr">
        <a-icon type="eye-invisible" theme="filled" />
      </p>
    </div>

    <div class="info">
      <p class="nickname">字太多就会被隐藏掉字太多就会被隐藏掉</p>
      <p class="msg">字太多就会被自动隐藏字太多就会被自动隐藏</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ChatContactsItem',
  props: {
    // contacts information object
    contactsInfo: {
      type: Object,
      default: () => ({}),
      // required: true
      required: false
    },
    activated: {
      type: Boolean,
      default: false,
      // required: true
      required: false
    },
    isTop: {
      type: Boolean,
      default: false,
      required: false
    },
    isMuted: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>

  .activated {
    background-color: rgb(195, 197, 199);
  }

  .top {
    background-color: rgb(220, 222, 224);
  }

  .chat-contacts {
    width: 100%;
    height: 64px;
    min-height: 64px;
    max-height: 64px;
    cursor: pointer;
    overflow: hidden;
    padding: 12px 18px 11px;
    background-color: rgb(230, 232, 235);
    border-bottom: 1px solid rgb(218, 220, 223);

    &:hover {
      background-color: rgb(215, 217, 219);
    }
  }

  .avatar {
    float: left;
    width: 40px;
    height: 40px;
    margin-right: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 2px;
    }
  }

  .info {
    height: 40px;
    line-height: 20px;
    word-wrap: normal;
    white-space: nowrap;

    .nickname {
      margin: 0;
      font-size:16px;
      font-weight: 400;
      color: rgb(0, 0, 0);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .msg {
      margin: 0;
      font-size: 14px;
      color: rgb(140, 141, 143);
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .extra {
    float: right;
    height: 40px;
    width: 40px;
    font-size: 14px;
    text-align: right;
    color: rgb(140, 141, 143);

    .attr {
      height: 20px;
      margin: 0;
    }
  }
</style>
