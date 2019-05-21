<template>
  <a-carousel :autoplay="true" >
    <div v-for="(item,index) in showList" :key="'image-news-'+index">
      <div :style="carouselStyle(item)" >
        <div class="image_title">
          <span style="font-size: 18px;">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </a-carousel>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    showList () {
      return this.data.content.slice(0, 5)
    }
  },
  methods: {
    carouselStyle (item) {
      return {
        backgroundImage: 'url(' + this.publicPath + item.imageUrl + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        height: '305px'
      }
    }
  }
}
</script>
<style scoped>
  .image_title {
    padding-top: 260px;
    padding-left: 15px;
    font-size: 15px;
    font-weight: 900;
    color: white;
  }
</style>
