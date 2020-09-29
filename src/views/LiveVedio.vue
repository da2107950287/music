<template>
  <div class="live-vedio">
    <div class="title-box">
      <div>{{option.catName}}</div>
      <div>用户ID：{{getUid}}</div>
    </div>
    <iframe :src="url" height="100%" width="1200px" allow="microphone;camera;midi;encrypted-media;" frameborder="0"> </iframe>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import flash from "assets/js/flash.js"
  export default {

    computed: {
      ...mapGetters([
        "getUserId",
        "getNickname",
        "getUid"
      ])
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        flash.init("player")
        this.option = this.$route.query;
        this.url = `https://view.csslcloud.net/api/view/index?roomid=${this.option.catId}&userid=${this.getUserId}&autoLogin=true&viewername=${this.getNickname}`
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .live-vedio {
    display: flex;
    flex-direction: column;
    min-width: 1200px;
    /* width: 1570px; */
    height: 100%;
    margin: 0 auto;
    margin-bottom: 30px;

    .title-box {
      @include wh(100%, 48px);
      @include fj();
      padding: 0 30px;
      box-sizing: border-box;
      background-color: $tcolor;
      opacity: 0.7;
      color: $fc;
      font-family: "PingFangSC-Medium", "PingFang SC";
      font-weight: 500;
    }

  }
</style>