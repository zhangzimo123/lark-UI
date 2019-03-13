<template>
  <div>
    <ul class="faces">
      <li v-for="item in faceList" :key="item">
        <img :src="faceMap[item]" :alt="item" :title="item" @click="insertFace(item)"/>
      </li>
    </ul>
    <div class="clear"></div>
  </div>
</template>
<script>
const { faceUtils } = require('../../utils/talk/chatUtils')

export default {
  name: 'Faces',
  components: {},
  data () {
    return {
      faceList: faceUtils.alt,
      faceMap: faceUtils.faces()
    }
  },
  methods: {
    insertFace: function (item) {
      this.$emit('insertFace', item)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
