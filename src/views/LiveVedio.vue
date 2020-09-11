<template>
  <div class="live">
    <fullscreen ref="fullscreen" @change="fullscreenChange" class="livePlayer">
      <div id="livePlayer" class="livePlayer"></div>
      <div class="title-box">
        <div>{{catName}}</div>
        <div>用户ID：{{}}</div>
      </div>
      <controls class="controls" :fullscreen="fullscreen" @dankamu="dankamu" @screenfull="screenfull">
      </controls>
    </fullscreen>
    <!-- 聊天室 -->
    <chat :flag="flag"></chat>
  </div>
</template>
<script>
  import Fullscreen from "vue-fullscreen/src/component.vue"
  import HuodeScene from "assets/js/live.js";
  import Controls from "components/live/Control";
  import Chat from "components/live/Chat";
  import Mixins from "assets/js/mixins.js";
  import { mapGetters } from 'vuex'
  // import FullScreen from "assets/js/fullscreen.js"
  export default {
    mixins: [Mixins],
    components: {
      Controls,
      Chat,
      Fullscreen

    },
    data() {
      return {
        catName: '',//课程名
        fullscreen: false,
        flag:false
      }
    },
    computed: {
      ...mapGetters([
        'getUserId'
      ]),
     
    },
    mounted() {
      this.init();
    },
    methods: {
      dankamu(flag) {
        this.flag = flag;
      },
      screenfull() {
        this.$refs['fullscreen'].toggle()
      },
      fullscreenChange(fullscreen) {
        this.fullscreen = fullscreen;
      },
      init() {
        this.hd = new HuodeScene();
        this.login();

      },
      login() {
        console.log()
        var options = this.$route.query;
        this.catName = options.catName;
        this.hd.login({
          userId: this.getUserId,
          roomId: options.catId,
          viewerName: options.viewername,//用户名称
          // viewerToken: options.viewertoken,
          success: result => {
            localStorage.setItem("viewerid", result.viewer.id);
            console.log(result.viewer.id)
            console.log("登录成功")
          },
          fail: error => {
            console.log(error)
            console.log("登录失败")
          }
        })
      },
      configPlayerAndDocument() {
        this.hd.showControl(false);//	控制条显示隐藏
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .live {
    display: flex;
    position: relative;
    width: 1570px;

    margin: 0 auto;
    margin-bottom: 30px;

    .title-box {
      @include wh(100%, 48px);
      @include fj();
      @include pa();
      padding: 0 30px;
      box-sizing: border-box;
      background-color: $tcolor;
      opacity: 0.7;
      color: $fc;
      font-family: "PingFangSC-Medium", "PingFang SC";
      font-weight: 500;
    }
  }

  .danmaku {
    position: absolute;
    top: 48px;
  }

  .livePlayer {
    position: relative;
    width: 1200px;
    height: 675px;
    margin-right: 10px;
  }

  .controls {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>