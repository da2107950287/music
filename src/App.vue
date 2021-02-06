<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
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
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: #f7f7f7;
    font-family: "PingFangSC-Regular", "PingFang SC,sthupo";

  }


  #app {
    height: 100%;
    width: 100%;
  }
</style>