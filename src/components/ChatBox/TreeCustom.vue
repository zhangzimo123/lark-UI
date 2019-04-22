<template>
  <div>
    <div class="tree-custom">
      <div :style="indent" @click="toggleChildren">
        <div v-if="!headImg && label" style="display: flex;align-items: center">
          <img class="tree-list-arrow" :src="showChildren ? require('@/assets/arrow-down.png') : require('@/assets/arrow-right.png')" alt="">
          <span class="tree-list-group-label">{{ label }}</span>
        </div>
        <div v-if="headImg" class="tree-list-contacts-item" @click="getCurrentInfo(label,headImg,pkid)">
          <img class="tree-list-head-image" :src="headImg" />
          <span class="tree-list-label" >{{ label }}</span>
          <a-checkbox class="tree-list-checkbox" @change="checkBoxSelectChange"></a-checkbox>
        </div>
      </div>
      <tree-custom
        :key="children.key"
        v-for="children in treeData"
        v-if="showChildren"
        :treeData="children.children"
        :label="children.title"
        :headImg="children.head"
        :pkid="children.key"
        :depth="depth+1"
      >
      </tree-custom>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TreeCustom',
  data () {
    return {
      showChildren: true,
      currentInfoData: {}
    }
  },
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: () => ''
    },
    depth: {
      type: Number,
      default: () => 0
    },
    headImg: {
      type: String,
      default: () => ''
    },
    pkid: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    indent () {
      return { transform: `translate(${(this.depth - 1) * 15}px)` }
    }
  },
  methods: {
    toggleChildren () {
      this.showChildren = !this.showChildren
    },
    checkBoxSelectChange (e) {
      console.log('checkBox e:', e)
      console.log('currentInfoData', this.currentInfoData)
      console.log('this', this)
    },
    getCurrentInfo (label, headImg, pkid) {
      console.log('label:', label)
      this.currentInfoData = {
        title: label,
        key: pkid,
        head: headImg
      }
    }
  }
}

</script>

<style lang="less">
  .tree-list-head-image{
    width: 29px;
    height: 29px;
    border-radius: 50%;
    margin-right: 11px;
  }
  .tree-list-label{
    font-size: 11px;
    color: #444444;
  }
  .tree-custom .ant-checkbox-inner {
    border-radius: 50%!important;
  }
  .tree-list-contacts-item{
    position: relative;
    width: 160px;
    margin: 7px 0 7px 0;
  }
  .tree-list-checkbox{
    position: absolute;
    right: 10px;
    top: 2px;
  }
  .tree-list-arrow{
    height: 12px;
  }
  .tree-list-group-label{
    margin-left: 10px;
  }
</style>
