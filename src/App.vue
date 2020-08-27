<template>
  <div id="app">
    <!-- <keep-alive> -->
    <!-- " -->
    <!-- <keep-alive> -->
      <!-- v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" -->
    <router-view v-if="isRouterAlive" ></router-view>
    <!-- </keep-alive> -->
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
  @font-face {
    font-family: "PingFangSC-Medium";
    src: url("assets/font/PingFangSC-Medium.woff2") format("woff2"),
      url("assets/font/PingFangSC-Medium.woff") format("woff"),
      url("assets/font/PingFangSC-Medium.ttf") format("truetype"),
      url("assets/font/PingFangSC-Medium.eot") format("embedded-opentype"),
      url("assets/font/PingFangSC-Medium.svg") format("svg");
  }

  @font-face {
    font-family: "PingFangSC-Regular";
    src: url("assets/font/PingFangSC-Regular.woff2") format("woff2"),
      url("assets/font/PingFangSC-Regular.woff") format("woff"),
      url("assets/font/PingFangSC-Regular.ttf") format("truetype"),
      url("assets/font/PingFangSC-Regular.eot") format("embedded-opentype"),
      url("assets/font/PingFangSC-Regular.svg") format("svg");
  }

  @font-face {
    font-family: "sthupo";
    src: url("assets/font/sthupo.woff2") format("woff2"),
      url("assets/font/sthupo.woff") format("woff"),
      url("assets/font/sthupo.ttf") format("truetype"),
      url("assets/font/sthupo.eot") format("embedded-opentype"),
      url("assets/font/sthupo.svg") format("svg");
  }

  html,
  body,
  #app {
    min-width: 1200px;
    background-color: #F5F5F5;
    font-family:"PingFangSC-Regular","PingFang SC";
  }
</style>