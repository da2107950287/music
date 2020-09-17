<template>
  <div class="banner">
    <el-carousel :interval="5000" height="480px" trigger="click" loop>
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img v-lazy="item.pcurl" class="banner-img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
  export default {
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .banner-img {
    @include wh(100%,480px)
  }

  .banner {
    margin-top: -30px;
  }
</style>