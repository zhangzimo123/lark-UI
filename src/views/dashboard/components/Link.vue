<template>
  <a-row :gutter="5">
    <a-col :span="2" v-for="(item,index) in data.content" :key="'link-'+index">
      <a :href="item.link" target="_blank">
        <a-card hoverable class="link-ant-card">
          <img class="link-ant-card-img" slot="cover" :title="item.name" :src="item.img"/>
          <span>{{ item.name }}</span>
        <!-- <a-card-meta :title="item.name" :description="item.description" style="backgrounp:blue;"> -->
        <!-- <template slot="description">{{ item.description }}</template> -->
        <!-- </a-card-meta> -->
        </a-card>
      </a>
    </a-col>
  </a-row>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
.link-ant-card{
  width:96px;
}
.link-ant-card >
div.ant-card-body{
  background-color: royalblue;
  padding: 0px 3px 3px 3px !important;
  text-align: center;
  font-weight: 600;
}
.link-ant-card-img{
  height: 48px;
}
</style>
