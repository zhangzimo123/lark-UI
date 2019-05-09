<template>
    <a-carousel :autoplay="true" >
      <div v-for="(item,index) in list" :key="'image-news-'+index">
        <div :style="carouselStyle(item)" >
          <div class="image_title">
            <span style="font-size: 18px;">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </a-carousel>
</template>
<script>
import { getNews } from '../../../../api/news'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      var vm = this
      getNews().then((data) => {
        vm.list = [].concat(data.content)
      })
    },
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
