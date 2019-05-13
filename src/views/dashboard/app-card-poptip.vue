<template>
  <a-popconfirm trigger="hover" :placement="placementPosition">
    <div>
      <slot></slot>
    </div>
    <div
      style="z-index:900;"
      class="app-poptip-details"
      slot="content"
    >
      <div class="app-title">
        <span>工具简介</span>
      </div>
      <div style="width:100%;">
        <p>{{ app.description }}</p>
      </div>
      <div class="app-subscript">
        <span>评分情况</span>
      </div>
      <div style="width:100%;">
        <Rate v-model="app.rate" disabled/>
      </div>
      <div style="width:100%;text-align:right;">
        <router-link :to="'/tool-details-'+app.id">详细信息</router-link>
      </div>
    </div>
  </a-popconfirm>
</template>
<script>
export default {
  props: {
    file: {
      type: Object,
      require: true,
      default: function () {
      }
    },
    column: {
      type: Number,
      default: 4
    },
    position: {
      type: Number,
      default: 0
    }
  },
  data () {
    const vm = this
    return {
      downloading: false,
      downloadPercent: 20,
      app: Object.assign({}, vm.file)
    }
  },
  computed: {
    placementPosition () {
      if (this.position < this.column / 2) {
        return 'right-start'
      } else if (this.position < this.column) {
        return 'left-start'
      } else if (this.position % this.column < this.column / 2) {
        return 'right-end'
      } else if (this.position % this.column < this.column) {
        return 'left-end'
      }
      return 'top'
    }
  },
  methods: {
    downloadApp (app) {
      this.downloading = true
    },
    imageSrc (icon) {
      return this.publicPath + 'images/index/' + icon + '.jpg'
    }
  }
}
</script>
<style scoped>
.app-poptip-details {
  width: 180px;
  /* height: 160px; */
  margin: 0;
  padding: 5px;
}
.app-title {
  font-size: 15px;
  font-weight: 800;
  padding: 3px 8px 3px 8px;
  margin: 0 0 3px 0;
  text-align: left;
}
.app-subscript {
  font-size: 13px;
  font-weight: 800;
  padding: 3px 8px 3px 8px;
  margin: 0 0 3px 0;
  text-align: left;
}
</style>
