<template>
  <!-- group info component -->
  <div class="group-info">

    <div v-if="Object.keys(selected).length == 0" class="unselected-tip">
      <a-icon type="team" style="fontSize: 160px; color: #d7d9db" />
      <p>未选中群组</p>
    </div>

    <div v-else class="selected-info">
      <div class="info-wrapper">
        <div class="name-and-org">
          <p>我是一个螺丝钉</p>
          <p>二部五百二十室(add chat limit)</p>
        </div>

        <img src="/avatar2.jpg">

      </div>

      <div class="info-wrapper">
        <div class="info-list">
          <div v-for="(item, index) in data" :key="index">
            <p class="attr">{{ item.attribute }}</p>

            <span class="val">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <a-button class="send-msg-btn">发消息</a-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GroupInfo',
  props: {
    // the selected group
    selected: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data () {
    return {
      data: [
        { key: '1', attribute: '主题', value: '测试的测试的测试的测试的测试的测试的测试的测试的测试的测试的测试的测试的测试的测试的测试的测试的测试的测试的测试的测试的' },
        { key: '2', attribute: '创建时间', value: '2018-12-20' },
        { key: '3', attribute: '创建人', value: '谁家的小谁' },
        { key: '4', attribute: '其他', value: '其他的内容' }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .group-info {
    height: 100%;
    text-align: center;
  }

  .unselected-tip {
    padding-top: 20%;
    color: #a5a7a9;
    font-size: 16px;
  }

  .selected-info {
    height: 100%;
    padding-top: 15%;

    .info-wrapper {
      margin: 0 auto;
      width: 420px;
      position: relative;
      border-bottom: 1px solid #dadcdf;

      .name-and-org  {
        height: 115px;
        line-height: 35px;
        text-align: left;
        margin-right: 80px;

        p {
          margin: 0;
          overflow: hidden;

          &:first-child {
            font-size: 22px;
            font-weight: 400;
            color: black;
            wordWrap: normal;
            white-space: nowrap;
            text-overflow: ellipsis;

          }

          &:nth-child(2) {
            font-size: 13px;
            color: rgb(140, 141, 143);
          }
        }

      }

      img {
        position: absolute;
        right: 0;
        top: 0;
        width: 70px;
        height: 70px;
        border-radius: 2px;
      }

      .info-list {
        padding: 40px 0 30px 0;
        text-align: left;
        div {
          display: flex;
          .attr {
            width: 80px;
            min-width: 80px;
            color: rgba(153, 153, 153, 1);
          }
          .val {
            color: black;
          }
        }
      }
    }

    .send-msg-btn {
      margin-top: 40px;
      padding: 10px 28px 28px 28px;
      background-color: #2ba245;
      border-color: #2ba245;
      color: #fff;
    }
  }
</style>
