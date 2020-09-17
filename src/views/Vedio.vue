<template>
  <div class="vedio">
    <div class="prism-player" id="player-con"></div>
    <div class="title-box">
      <div>{{option .catName}}</div>
      <div>用户ID：{{getUid}}</div>
    </div>
  </div>
</template>
<script>
  import RateComponent from "components/vedio/RateComponent/index.js";
  import { mapGetters } from "vuex"
  export default {
    data() {
      return {
        totalTime: '',
        startTime: '',
        option: {}
      };
    },
    computed: {
      ...mapGetters([
        'getUid'
      ])
    },
    mounted() {

      let that = this;
      this.option = this.$route.query;
      this.player = new Aliplayer(
        {
          id: "player-con",
          source: this.option.url,
          width: "1200px",
          height: "675px",
          autoplay: true,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: "hover",
          useH5Prism: true,
          skinLayout: [
            {
              name: "H5Loading",
              align: "cc",
            },
            {
              name: "errorDisplay",
              align: "tlabs",
              x: 0,
              y: 0,
            },
            {
              name: "infoDisplay",
            },
            {
              name: "tooltip",
              align: "blabs",
              x: 0,
              y: 56,
            },
            {
              name: "thumbnail",
            },
            {
              name: "tooltip",
              align: "blabs",
              x: 0,
              y: 56,
            },
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 0,
              children: [
                {
                  name: "progress",
                  align: "blabs",
                  x: 0,
                  y: 44,
                },
                {
                  name: "playButton",
                  align: "tl",
                  x: 15,
                  y: 12,
                },
                {
                  name: "fullScreenButton",
                  align: "tr",
                  x: 10,
                  y: 12,
                },
                {
                  name: "timeDisplay",
                  align: "tl",
                  x: 10,
                  y: 7,
                },
              ],
            },
          ],
          components: [
            {
              name: "RateComponent",
              type: RateComponent,
            },
          ],
        },
        function (player) {
          that.startTime = new Date().getTime();
          console.log("The player is created");
        },
      );
      that.player.on("ready", function () {
        that.totalTime = that.player.getDuration();//获取视频总时长
      })
    },
    beforeDestroy() {
      var rateOfLearning = (((this.player.getCurrentTime() / this.totalTime).toFixed(2)) * 100);
      var endTime = new Date().getTime();
      var accLeaTime = ((endTime - this.startTime) / 60000).toFixed(0)
      if (this.option.rateOfLearning < rateOfLearning) {
        this.$post("/course/insertStudyTime", { couId: this.option.couId, catId: this.option.catId, rateOfLearning, accLeaTime }).then(res => {
          if (res.code == 200) {
            console.log(res)
          }
        })
      }
    }
  };
</script>
<style lang="scss">
  .vedio {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
    position: relative;
  }

  .title-box {
    width: 1200px;
    height: 48px;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;
    background-color: #36363A;
    opacity: 0.7;
    color: #fff;
    font-family: "PingFangSC-Medium", "PingFang SC";
    font-weight: 500;
  }

  /* 组件样式 */
  .player-hidden {
    display: none !important;
  }

  .rate-components {
    float: right;
    color: #fff;
    height: 35px;
    position: relative;
    box-sizing: border-box;
    margin-top: 5px;
  }

  .current-rate {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    width: 70px;
    cursor: pointer;
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
        color: #98b702;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
</style>
<style scoped>
  @import "https://g.alicdn.com/de/prismplayer/2.8.8/skins/default/aliplayer-min.css";
</style>