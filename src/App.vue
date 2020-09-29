<template>
  <div id="app">
    <!-- <keep-alive> -->
    <!-- v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" -->
    <router-view v-if="isRouterAlive"></router-view>
    <!-- </keep-alive> -->


  </div>
</template>
<script>

  import { mapGetters } from 'vuex';
  export default {
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true,
      }
    },
    computed: {
      ...mapGetters(["loading"])
      // loading() {
      //   return this.$store.getters.loading;
      // }
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      }
    },
  }
</script>
<style>
  @import "~assets/css/font.css";

  html,body {
    height: 100%;
   width: 100%;
    margin: 0;
    background-color: #f7f7f7;
    font-family: "PingFangSC-Regular", "PingFang SC,sthupo";

  }


  #app {
    /* min-width: 1200px; */
    height: 100%;
   width: 100%;

    /* background-color: #F5F5F5; */
  }
</style>