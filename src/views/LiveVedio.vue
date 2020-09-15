<template>
  <div class="live">
    <fullscreen ref="fullscreen" @change="fullscreenChange" class="livePlayer">
      <div id="livePlayer" class="livePlayer"></div>
      <danmu ref="danmu" class="danmaku"></danmu>
      <div class="title-box">
        <div>{{catName}}</div>
        <div>用户ID：{{getUid}}</div>
      </div>
      <controls  class="controls" :fullscreen="fullscreen" @isFlag="isFlag" @screenfull="screenfull">
      </controls>
    </fullscreen>
    <!-- 聊天室 -->
    <chat @sendDanmaku="sendDanmaku"></chat>
  </div>
</template>
<script>
  import Fullscreen from "vue-fullscreen/src/component.vue"
  import HuodeScene from "assets/js/live.js";
  import Controls from "components/live/Control";
  import Chat from "components/live/Chat";
  import Mixins from "assets/js/mixins.js";
  import { mapGetters } from 'vuex'
  import Danmu from "components/live/Danmaku"
  import flash from "assets/js/flash.js"
  export default {
    mixins: [Mixins],
    components: {
      Controls,
      Chat,
      Fullscreen,
      Danmu
    },
    data() {
      return {
        catName: '',//课程名
        nickname: '',//用户名
     
        fullscreen: false,
        hd:null,
        
      }
    },
    computed: {
      ...mapGetters([
        'getUserId',
        "getUid",
        "getNickname"
      ]),
    },
    mounted() {
      this.init();
      this.hd.toggleBarrage(true)
    },
    methods: {
      screenfull() {
        this.$refs['fullscreen'].toggle()
      },
      
      fullscreenChange(fullscreen) {
        this.fullscreen = fullscreen;
      },
      init() {
        this.hd = new HuodeScene();
        this.login();
        flash.init("player");
        this.$refs.danmu.handleStart()
      },
      login() {
        var options = this.$route.query;
        this.catName = options.catName;
        // this.nickname = localStorage.getItem("nickname");
        console.log(this.getNickname)
        this.hd.login({
          userId: this.getUserId,
          roomId: options.catId,
          viewerName: this.getNickname,//用户名称
          // fastMode: true,
          success: result => {
            console.log(result)
            localStorage.setItem("viewerid", result.viewer.id);
            console.log("登录成功")
          },
          fail: error => {
            console.log(error)
            console.log("登录失败")
          }
        })
      },
      sendDanmaku(message) {
        this.$refs.danmu.sendDanmaku(message)
      },
      isFlag(flag){
        if(flag){
        this.$refs.danmu.handleStart()

        }else{
          this.$refs.danmu.handlePause();
          this.hd.toggleBarrage(flag)

        }
      }
      
    }
  }
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .live {
    display: flex;
    position: relative;
    width: 1570px;
    background-color: #fff;

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
    left: 0;
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