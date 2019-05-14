<template>
  <!-- groups item -->
  <div :class="groupItemClasses">

    <div class="avatar">
      <a-avatar class="avatar-img" shape="square" :src="groupInfo.avatar" :size="30">
        <span>{{ groupInfo.name }}</span>
      </a-avatar>
    </div>

    <div class="extra">
      <p class="attr on-line">
        <!-- <a-icon type="check-circle" theme="filled" /> -->
      </p>
    </div>

    <div class="info">
      <p class="nickname">{{ groupInfo.name }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GroupItem',
  props: {
    /**
     * 群组信息数据结构
     * groupInfo = {
     *  id: 唯一标识符 String
     *  name: 群组名称 String
     *  avatar: 头像 String
     *  其他需要的信息
     * }
     */
    groupInfo: {
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
    groupItemClasses () {
      return {
        'group-item': true,
        'activated': this.activated
      }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .activated {
    background-color: rgb(195, 197, 199)!important;
  }
  .on-line {
    color: rgba(43, 162, 69, 1);
  }
  .group-item {
    width: 100%;
    height: 50px;
    min-height: 50px;
    max-height: 50px;
    cursor: pointer;
    overflow: hidden;
    padding: 10px 18px 9px;
    background-color: rgb(230, 232, 235);
    border-bottom: 1px solid rgb(218, 220, 223);

    &:hover {
      background-color: rgb(215, 217, 219);
    }

  }

  .avatar {
    float: left;
    width: 30px;
    height: 30px;
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
    height: 30px;
    line-height: 30px;
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
  }

  .extra {
    float: right;
    height: 30px;
    width: 30px;
    font-size: 12px;
    text-align: right;
    color: rgb(140, 141, 143);

    .attr {
      height: 30px;
      line-height: 30px;
      margin: 0;
    }
  }
</style>
