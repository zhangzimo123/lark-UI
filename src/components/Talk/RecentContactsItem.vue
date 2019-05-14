<template>
  <!-- recent contacts item -->
  <div :class="recentContactsClasses">

    <div class="avatar">
      <a-badge
        :dot="contactsInfo.isMute"
        :count="contactsInfo.unreadNum"
        :overflowCount="99"
        :offset="badgeoffset"
        :numberStyle="badgeNumStyle">

        <a-avatar class="avatar-img" shape="square" :src="contactsInfo.avatar" :size="40">
          <span>{{ contactsInfo.name }}</span>
        </a-avatar>

      </a-badge>
    </div>

    <div class="extra">
      <p class="attr">{{ contactsInfo.time }}</p>
      <p class="attr">
        <a-icon v-show="contactsInfo.isMute && contactsInfo.isGroup" type="eye-invisible" theme="filled" />
      </p>
    </div>

    <div class="info">
      <p class="nickname">{{ contactsInfo.name }}</p>
      <p class="msg">
        <span v-show="contactsInfo.atMe && contactsInfo.isGroup" class="at-me">[有人@我]</span>
        <!-- 群组被静音后提示未读消息条数 -->
        <span v-show="contactsInfo.isGroup && contactsInfo.isMute && contactsInfo.unreadNum">[{{ contactsInfo.unreadNum }}条]</span>
        <!-- 群组提示消息发送者姓名 -->
        <span v-show="contactsInfo.sender && contactsInfo.isGroup">{{ contactsInfo.sender }}:</span>

        {{ contactsInfo.lastMessage }}
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'RecentContactsItem',
  props: {
    /* contacts information object
      contactsInfo = {
        id: 唯一标识符 String
        lastMessage: 最后一条消息 String
        name: 联系人/群组名称 String
        sender: 发送者姓名 String
        avatar: 头像 String
        time: 时间 String
        atMe: 是否有人@我 Boolean
        isTop: 是否置顶 Boolean
        isMute: 是否免打扰 Boolean
        isGroup: 是否群组 Boolean
      }
    */
    contactsInfo: {
      type: Object,
      default: () => ({}),
      required: true
    },
    activated: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {}
  },
  computed: {
    recentContactsClasses () {
      return {
        'recent-contacts': true,
        'activated': this.activated,
        'top': this.contactsInfo.isTop
      }
    },
    badgeoffset () {
      return this.contactsInfo.isMute ? [] : [ -5, 5 ]
    },
    badgeNumStyle () {
      return this.contactsInfo.isMute
        ? {}
        : { padding: '0', boxShadow: 'none', height: '16px', minWidth: '16px', lineHeight: '16px' }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>

  .activated {
    background-color: rgb(195, 197, 199)!important;
  }

  .top {
    background-color: rgb(220, 222, 224)!important;
  }

  .recent-contacts {
    width: 100%;
    height: 64px;
    min-height: 64px;
    max-height: 64px;
    cursor: pointer;
    overflow: hidden;
    padding: 12px 18px 11px;
    background-color: #fff;
    /*border-bottom: 1px solid rgb(218, 220, 223);*/

    &:hover {
      background-color: rgb(215, 217, 219);
    }
  }

  .avatar {
    float: left;
    width: 43px;
    height: 43px;
    margin-right: 10px;

    &-img {
      border-radius: 2px;
      background-color: rgb(0, 162, 174);
      span {
        color: #fff;
      }
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
      color:rgba(68,68,68,1);
      overflow: hidden;
      text-overflow: ellipsis;
      width: 140px;
    }

    .msg {
      margin-top: 8px;
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(153,153,153,1);
      overflow: hidden;
      text-overflow: ellipsis;
      .at-me {
        color: red;
      }
    }
  }

  .extra {
    float: right;
    height: 40px;
    // width: 40px;
    font-size: 12px;
    text-align: right;
    color: rgb(140, 141, 143);

    .attr {
      height: 20px;
      margin: 0;
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(153,153,153,1);
    }
  }

  .unreadTip{
    position: absolute;
    top: 0px;
    right: 46px;
    width:20px;
    height:20px;
    background:rgba(232,0,0,1);
    border-radius:50%;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nameInfo{
    position: relative;
  }
</style>
