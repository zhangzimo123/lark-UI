<template>
  <div class="main-content">
    <!-- keep-alive  -->
    <route-view></route-view>
  </div>
</template>

<script>
import RouteView from './RouteView'

export default {
  name: 'GeneralContent',
  components: {
    RouteView
  }
}
</script>

<style lang="less" scoped>

.main-content{
    margin: -24px 0 0;
}
</style>
