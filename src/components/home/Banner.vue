<template>
  <div class="banner">
    <el-carousel :interval="5000" height="480px" trigger="click" loop>
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img v-lazy="item.pcurl" class="banner-img" @click="go(item.banType,item.content,item.banId)" />
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
    },
    methods: {
      go(banType, content,banId) {
        if (banType == 1) {
          this.$router.push({ path: '/index/detail', query: { couId: content } })
        } else if(banType==3){
          this.$router.push({ path: '/index/about', query: {banId} })
          
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";
/deep/ .el-carousel__arrow i{
  font-size: 26px;
}
  .banner-img {
    @include wh(100%, 480px)
  }

  .banner {
    margin-top: -30px;
  }
</style>