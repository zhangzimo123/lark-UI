<template>
  <a-card class="app-card  app-card-tools">
    <img :src="publicPath+'images/icon/download.png'" @click="downloadApp" class="tool-download-image" />
    <div class="card-body-inner">
      <app-poptip :file="app" :column="column" :position="position">
        <img :src="imageSrc(app.icon)" class="tool-image">
      </app-poptip>
      <div class="app-name app-name-nowrap" >
        <span>{{ app.name }}</span>
      </div>
    </div>
  </a-card>
</template>
<script>
import AppPoptip from './app-card-poptip'
export default {
  props: {
    file: {
      type: Object,
      require: true,
      default: () => {}
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
  components: {
    AppPoptip
  },
  data () {
    const vm = this
    return {
      downloading: false,
      downloadPercent: 20,
      app: Object.assign({}, vm.file)
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
  /*.app-card {*/
    /*width: 100%;*/
    /*height: 105px;*/
    /*margin: 5px 0 5px 0;*/
    /*padding: 5px 0 5px 0;*/
  /*}*/
  .app-card-tools {
    width: 90%;
    height: 90px;
    /*margin: 5px 0 5px 0;*/
    /*padding: 8px 0 8px 0;*/
  }
  .tool-download-image {
    width: 22px;
    height: 14px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
  .tool-image {
    /* margin: 5px 25px 5px 5px; */
    width: 54px;
    height: 54px;
  }
  .app-name {
    font-size: 14px;
    font-weight: 800;
    margin: 0 0 3px 0;
  }
  .app-name-nowrap {
    white-space: nowrap;
  }
  .card-body-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 5px;
    left: 0px;
    padding: 5px;
    text-align: center;
  }
</style>
