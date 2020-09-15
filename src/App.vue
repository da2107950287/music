<template>
  <div id="app">
    <!-- <keep-alive> -->
      <!-- v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" -->
    <router-view v-if="isRouterAlive" ></router-view>
    <!-- </keep-alive> -->
  

  </div>
</template>
<script>

  import { mapGetter } from 'vuex';
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
      loading() {
        return this.$store.getters.loading;
      }
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
  html,
  body,
  #app {
    min-width: 1200px;
    background-color: #F5F5F5;
    font-family:"PingFangSC-Regular","PingFang SC,sthupo";
  }
</style>