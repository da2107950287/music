<template>
 <div class="live-vedio">
  <div class="vedio">
    <div class="prism-player" id="player-con"></div>
    <div class="title-box">
      <div>{{catName}}</div>
      <div>用户ID：{{uid}}</div>
    </div>
  </div>
<test class="chat"></test>
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
        catName:'',//课程名
        uid:''//用户id
      };
    },
    mounted() {
 
      this.catName=this.$route.query.catName;
      this.url = this.$route.query.url;
      this.catId=this.$route.query.catId;
      console.log(this.url)
      this.uid=localStorage.getItem("uid");
      this.$post("/aliyun/enterLive",{catId:this.catId}).then(res=>{
        if(res.data==200){
          console.log(res.data)
        }
      })
      var danmukuList = [{
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 2000,
    "size": 25,
    "color": 0xff0000
  }, {
    "mode": 1,
    "text": "test",
    "stime": 30000,
    "size": 25,
    "color": 0xff0000
  }, {
    "mode": 1,
    "text": "test",
    "stime": 4000,
    "size": 25,
    "color": 0x00c1de
  }, {
    "mode": 1,
    "text": "test",
    "stime": 5000,
    "size": 25,
    "color": 0x00c1de
  }, {
    "mode": 1,
    "text": "test",
    "stime": 10000,
    "size": 25,
    "color": 0x00c1de
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }, {
    "mode": 1,
    "text": "test",
    "stime": 1000,
    "size": 25,
    "color": 0xffffff
  }]
      var player = new Aliplayer(
        {
          id: "player-con",
          source: this.url,
          width: "1200px",
          height: "675px",
          autoplay: true,
          isLive: true,
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
            {
              name:"AliplayerDanmuComponent",
              type:AliplayerDanmuComponent,
              args: [danmukuList]
            }
          ],
        },
        function (player) {
          console.log("The player is created");
        }
      );
    },
    components:{
      Test
    }
  };
</script>
<style lang="scss">
  .live-vedio{
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
<style>
  .aliplayer-danmuku {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &.abp {
    position: absolute;
    .container {
      z-index: 0;
    }
  }
  .danmu {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

.ali-danmuku-control {
  float: right;
  color: #fff;
  margin-right: 5px;
  position: relative;
  display: table-cell;
  margin-top: 8px;
  .iconfont {
    font-size: 35px;
    cursor: pointer;
    vertical-align: middle;
    user-select: none;
    line-height: initial;
    &.icon-danmu-close {
      display: inline-block;
    }
  }
  .player-tooltip {
    &.close, &.open {
      right: -12px;
    }
  }
  @media (min-width: 768px) {
    .icon-danmu-close:hover + .player-tooltip {
      display: block;
    }
    .icon-danmu-open:hover + .player-tooltip {
      display: block;
    }
  }
  .ali-danmu-input-wrap {
    width: 200px;
    display: none;
  }
}
.ali-danmu-input {
  position: relative;
  width: 100%;
  display: inline-block;
  input {
    display: inline-block;
    width: 100%;
    padding-right: 40px;
    box-sizing: border-box;
    padding: 5px 40px 5px 5px;
    background-color: rgba(130, 132, 138, .4);
    border: 1px solid #c0c4cc;
    font-size: 14px;
    color: #fff;
    border-radius: 3px;
    &:focus {
      outline: none;
      border-color: #0f84fd;
    }
  }
  .danmu-input-enter {
    position: absolute;
    right: 0;
    top: 0;
    border: 1px solid;
    color: #fff;
    background-color: #0f84fd;
    border-color: #0f84fd;
    font-size: 12px;
    padding: 6px 7px;
    display: inline-block;
    height: 28px;
    border-radius: 0 3px 3px 0;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: #288df5;
      border-color: #288df5;
    }
  }
}

</style>
<style scoped>
  @import "https://g.alicdn.com/de/prismplayer/2.8.8/skins/default/aliplayer-min.css";
</style>