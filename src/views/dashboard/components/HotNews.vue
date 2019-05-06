<template>
  <a-carousel :autoplay="true" >
    <div v-for="(item,index) in list" :key="'image-news-'+index">
      <div :style="carouselStyle(item)">
        <div>
          <span style="font-size: 18px;">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </a-carousel>
</template>
<script>
import { getNews } from '../../../api/news'
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
        backgroundImage: 'url(' + '../../../../public/' + item.imageUrl + ')',
        // backgroundImage: 'url(' + this.publicPath + item.imageUrl + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  }
}
</script>
<style scoped>

</style>
