<template>
  <div class="link-ant-row">
    <div v-for="(item,index) in data.content" :key="'link-'+index" class="link-ant-item">
      <img class="link-ant-card-img" :src="item.img"/>
    </div>
  </div>
  <!--<a-row :gutter="5" class="link-ant-row">-->
    <!--<a-col :span="2" v-for="(item,index) in data.content" :key="'link-'+index">-->
      <!--<a :href="item.link" target="_blank">-->
        <!--<a-card hoverable class="link-ant-card">-->
          <!--<img class="link-ant-card-img" slot="cover" :title="item.name" :src="item.img"/>-->
          <!--<span>{{ item.name }}</span>-->
        <!-- <a-card-meta :title="item.name" :description="item.description" style="backgrounp:blue;"> -->
        <!-- <template slot="description">{{ item.description }}</template> -->
        <!--&lt;!&ndash; </a-card-meta> &ndash;&gt;-->
        <!--</a-card>-->
      <!--</a>-->
    <!--</a-col>-->
  <!--</a-row>-->
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
  /*height: 48px;*/
  /*float: left;*/
  /*height: 70px;*/
  width: 70px;

}
.link-ant-row{
  /*white-space:nowrap;*/
  /*overflow-x:hidden;*/
  /*overflow:auto;*/
  width: 100%;
  /*overflow-x:scroll;*/
  overflow-y:scroll;
  height: 100px;
  /*background-color: blue;*/
  padding-bottom: 28px;
}
.link-ant-item{
  white-space:nowrap;
  display: inline-block;
}
</style>
