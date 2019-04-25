<template>
  <div class="setting-drawer" ref="plusDrawer">
    <a-drawer
      width="300"
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
          <h3 class="setting-drawer-index-title">添加面板</h3>
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
            ><a-button @click="grid.show=true"><a-icon type="plus"/>{{ grid.title }}</a-button></grid-item>
          </grid-layout>
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

<style lang="less" scoped>
  .setting-drawer-index-handle {
    position: absolute;
    bottom: 120px;
    background: #8b8d2c;
    width: 28px;
    height: 28px;
    right: 300px;
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
</style>
