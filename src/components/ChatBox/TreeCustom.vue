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
          <a-checkbox class="tree-list-checkbox" @change="checkBoxSelectChange" :checked="selectStatus" ></a-checkbox>
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
        :selectStatus="children.selectStatus"
        v-bind="$attrs"
        v-on="$listeners"
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
    },
    selectStatus: {
      type: Boolean,
      default: () => null
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
      const checked = e.target.checked
      if (checked) {
        this.$listeners.addSelectedData(this.currentInfoData)
      }
      if (!checked) {
        this.$listeners.deleteSelectedData(this.currentInfoData)
      }
    },
    getCurrentInfo (label, headImg, pkid) {
      this.currentInfoData = {
        key: pkid,
        title: label,
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
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 100px;
  }
  .tree-list-contacts-item{
    position: relative;
    width: 175px;
    margin: 7px 0 7px 0;
    display: flex;
    align-items: center;
  }
  .tree-list-checkbox{
    position: absolute;
    right: 10px;
    top: 2px;
  }
  .tree-list-arrow{
    height: 15px;
  }
  .tree-list-group-label {
    margin: 5px 0 5px 15px;
  }
</style>
