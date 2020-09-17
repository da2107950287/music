<template>
  <div class="vedio">
    <div class="playback" id="playbackPlayer"></div>
    <!-- <div  id="player-con"></div> -->
    <div class="title-box">
      <div>{{options.catName}}</div>
      <div>用户ID：{{getUid}}</div>
    </div>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import flash from "assets/js/flash.js"
  export default {
    computed: {
      ...mapGetters([
        "getUserId",
        "getUid"
      ]),
    },
    data() {
      return {
        options: {},
        startTime: '',
        totalTime: ''
      };
    },
    mounted() {
      this.options = this.$route.query;
      this.init()
    },
    methods: {
      init() {
        let that = this;
        flash.init("player")
        $.DW.config({
          userId: this.getUserId,
          roomId: this.options.catId,
          recordId: this.options.recordId,
        });
        window.on_cc_login_error = function (err) {
          console.log(err)
          console.log("登录失败")
        }
        window.on_cc_login_success = function () {
          console.log("登陆成功")
          that.startTime = new Date().getTime();
        }
        window.on_cc_live_player_load = function () {
          this.totalTime = $.DW.getDuration()// 获取视频总时长单位:秒
        }
      }
    },
    beforeDestroy() {
      var rateOfLearning = ((($.DW.getPlayerTime() / this.totalTime).toFixed(2)) * 100);
      if (this.options.rateOfLearning > rateOfLearning) {
        var endTime = new Date().getTime();
        var accLeaTime = ((endTime - this.startTime) / 60000).toFixed(0)
        this.$post("/course/insertStudyTime", {
          couId: this.options.couId,
          catId: this.options.catId,
          rateOfLearning,
          accLeaTime
        }).then(res => {
          if (res.code == 200) {
            console.log(res)

          }
        })
      }





    }

  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .vedio {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
    position: relative;

    .playback {
      height: 675px;
    }
  }

  .title-box {
    @include wh(1200px, 48px);
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

  /* 组件样式 */
  .player-hidden {
    display: none !important;
  }

  .rate-components {
    float: right;
    color: $fc;
    height: 35px;
    position: relative;
    box-sizing: border-box;
    margin-top: 5px;
  }

  .current-rate {
    @include fj(center, center) @include wh(70px, 100%) cursor: pointer;
  }

  .rate-list {
    position: absolute;
    bottom: 46px;
    display: none;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      text-align: center;
      width: 70px;
      line-height: 30px;
      background-color: rgba(0, 0, 0, 0.6);
      cursor: pointer;

      &.current {
        color: $tc;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
</style>