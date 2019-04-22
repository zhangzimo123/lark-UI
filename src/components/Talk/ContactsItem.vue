<template>
  <!-- groups and contacts item -->
  <div class="contacts-item">

    <div class="avatar">
      <img src="/avatar2.jpg">
    </div>

    <div class="extra">
      <p class="attr on-line">
        <a-icon type="check-circle" theme="filled" />
      </p>
    </div>

    <div class="info">
      <p class="nickname">我就是这个联系人的名字啊啦啦啦啦啦啦</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ContactsItem',
  props: {
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .on-line {
    color: rgba(43, 162, 69, 1);
  }
  .contacts-item {
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

    img {
      width: 30px;
      height: 30px;
      border-radius: 2px;
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
    font-size: 14px;
    text-align: right;
    color: rgb(140, 141, 143);

    .attr {
      height: 30px;
      line-height: 30px;
      margin: 0;
    }
  }
</style>
