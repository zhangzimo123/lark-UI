<template>
  <div @remove="test" >
    <a-row>
      <a-col span="12">
        <hot-news></hot-news>
      </a-col>
      <a-col span="12">
        <news-window @remove="$emit('remove')"></news-window>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import HotNews from './HotNewsWindows/HotNews'
import NewsWindow from './HotNewsWindows/NewsWindow'
export default {
  data () {
    return {
    }
  },
  components: {
    HotNews,
    NewsWindow
  },
  methods: {
  }
}
</script>
