<template>
  <!-- recent contacts item -->
  <div class="recent-contacts">
    <div class="avatar">
      <img src="/avatar2.jpg">
    </div>
    <div class="extra">
      <p class="attr">12:30</p>
      <!--<p class="attr">-->
      <!--<a-icon type="eye-invisible" theme="filled" />-->
      <!--</p>-->
    </div>
    <div class="info">
      <div class="nameInfo">
        <p class="nickname">字太多就会被自动隐藏字太多就会被自动隐藏</p>
        <p class="unreadTip">1</p>
      </div>
      <!--<a-badge-->
      <!--:count="10"-->
      <!--:overflowCount="99"-->
      <!--:offset="[-5, -20]"-->
      <!--:numberStyle="{padding: '0', boxShadow: 'none', height: '16px', minWidth: '16px', lineHeight: '16px'}">-->
      <!--<a href="#"></a>-->
      <!--</a-badge>-->
      <div class="msg">字太多就会被自动隐藏字太多就会被自动隐藏</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentContactsItem',
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

    img {
      width: 43px;
      height: 43px;
      margin-top: 4px;
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
