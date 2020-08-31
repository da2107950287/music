<template>
  <div class="live-vedio">
    <div class="vedio">
      <div class="prism-player" id="player-con"></div>
      <div class="title-box">
        <div>{{catName}}</div>
        <div>用户ID：{{uid}}</div>
      </div>
    </div>
    <test @onSendTextMsg="onSendTextMsg" class="chat"></test>
  </div>
</template>
<script>

  import Test from "components/chat/Test"
  import RateComponent from "components/vedio/RateComponent/index.js";
  import AliplayerDanmuComponent from "components/vedio/AliplayerDanmuComponent/index.js";
  export default {
    data() {
      return {
        url: "",//直播推流地址
        catName: '',//课程名
        uid: '',//用户id
        player: '',
        fullscrean:true,
      };
    },
    watch:{
      fullscrean(){
        if(this.fullscrean==false){
          document.querySelector('.ali-danmu-input-wrap').style.visibility="hidden"
        }else{
          document.querySelector('.ali-danmu-input-wrap').style.visibility="visible"
        }
      }
    },
    mounted() {
      let _this = this;
      this.catName = this.$route.query.catName;
      this.url = this.$route.query.url;
      this.catId = this.$route.query.catId;

      this.uid = localStorage.getItem("uid");
      this.$post("/aliyun/enterLive", { catId: this.catId }).then(res => {
        if (res.data == 200) {
          console.log(res.data)
        }
      })
      var danmukuList = []
      var player = new Aliplayer(
        {
          id: "player-con",
          source: "//player.alicdn.com/video/editor.mp4",
          width: "1200px",
          height: "675px",
          autoplay: true,
          isLive: true,
          
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
            // {
            //   name: "RateComponent",
            //   type: RateComponent,
            // },
            {
              name: "AliplayerDanmuComponent",
              type: AliplayerDanmuComponent,
              args: [danmukuList]
            }
          ],
        },
        function (player) {
          _this.player = player;
          _this.fullscrean=player.fullscreenService.getIsFullScreen();
          var handleRequestFullScreen=function(){
          _this.fullscrean=player.fullscreenService.getIsFullScreen();
          };
          var handleCancelFullScreen=function(){
          _this.fullscrean=player.fullscreenService.getIsFullScreen();

          }
          player.on("requestFullScreen",handleRequestFullScreen);
          player.on("cancelFullScreen",handleCancelFullScreen)
          console.log("The player is created");
        }
      );
    },
    methods: {
      onSendTextMsg(message) {
        this.player.getComponent("AliplayerDanmuComponent").sendDanmuHandle(message)
      }
    },
    components: {
      Test
    }
  };
</script>
<style lang="scss">
  .live-vedio {
    width: 1570px;
    margin: 0 auto;
    margin-bottom: 30px;
    display: flex;

  }

  .vedio {
    width: 1200px;
    position: relative;
    margin-right: 10px;
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