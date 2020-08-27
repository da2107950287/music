<template>
 <div class="banner">
  <el-carousel height="480px" trigger="click" loop >
    <el-carousel-item v-for="(item,index) in banners" :key="index">
      <img v-lazy="item.pcurl" class="banner-img"/>
    </el-carousel-item>
  </el-carousel>
 </div>
</template>
<script>
export default {
 props:{
   banners:{
     type:Array,
     default(){
       return []
     }
   }
 }
};
</script>
<style scoped>
  .banner-img{
    height: 480px;
    width: 100%;
  }
.banner{
    margin-top: -30px;
}
</style>