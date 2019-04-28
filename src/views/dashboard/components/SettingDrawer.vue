<template>
  <div class="setting-drawer" ref="plusDrawer">
    <a-drawer
      width="367"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :getContainer="() => $refs.plusDrawer"
      :style="{}"
      wrapClassName="footer"
    >
      <div class="setting-drawer-index-content">
        <div :style="{ marginBottom: '24px' }">
          <div class="setting-drawer-title">添加面板</div>
          <grid-layout
            :layout.sync="layout"
            :col-num="12"
            :row-height="2"
            :max-rows="12"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
          >
            <grid-item
              v-for="grid in layout"
              v-if="grid.show !== true"
              dragIgnoreFrom=".card-content"
              :minH="cardSize.minH"
              :maxH="cardSize.maxH"
              :minW="cardSize.minW"
              :key="grid.id"
              :x="grid.x"
              :y="grid.y"
              :w="grid.w"
              :h="grid.h"
              :i="grid.i"
            ><a-button @click="grid.show=true" class="title"><span class="plus-icon" >+</span>{{ grid.title }}</a-button></grid-item>
          </grid-layout>
          <!--<div class="bottom-line"></div>-->
        </div>
      </div>
      <div class="setting-drawer-index-handle" @click="toggle">
        <a-icon type="plus" v-if="!visible"/>
        <a-icon type="close" v-else/>
      </div>
    </a-drawer>
  </div>
</template>

<script>

export default {
  props: {
    layout: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      visible: true,
      cardSize: { maxH: 5, minH: 5, maxW: 12, minW: 3 }
    }
  },
  mounted () {
    const vm = this
    setTimeout(() => {
      vm.visible = false
    }, 16)
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    toggle () {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="less">
  .setting-drawer-index-handle {
    position: absolute;
    bottom: 380px;
    background: #322aff;
    width: 48px;
    height: 48px;
    right: 367px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    z-index: 1001;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;

    i {
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
  }

  .setting-drawer-title {
    line-height: 35px;
    margin-bottom: 12px;
    font-size:20px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(8,8,8,1);
    margin-left: 29px;
    margin-top: 10px;
  }

  .setting-drawer-index-content {
    .vue-grid-item>.vue-resizable-handle{
      display: none;
    }

    .title{
      width:135px;
      height:43px;
      background:rgba(24,144,255,1);
      border-radius:4px;
      font-size:18px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      margin: 0 17px 0 17px;
    }

    .plus-icon{
      font-size:24px;
      margin-right: 10px;
    }

    .ant-drawer-body{
      padding: 0!important;
    }

    .bottom-line{
      width:299px;
      height:2px;
      background:rgba(234,245,255,1);
      margin-left: 25px;
    }
  }
</style>
