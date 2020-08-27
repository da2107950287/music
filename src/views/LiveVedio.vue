<template>
 <div class="live-vedio">
  <div class="vedio">
    <div class="prism-player" id="player-con"></div>
    <div class="title-box">
      <div>{{catName}}</div>
      <div>用户ID：{{uid}}</div>
    </div>
  </div>
<chat-room class="chat"></chat-room>
 </div>
</template>
<script>
  import ChatRoom from "components/chat/ChatRoom"
  import RateComponent from "components/vedio/RateComponent/index.js";
  export default {
    data() {
      return {
        url: "",
        catName:'',
        uid:''
      };
    },
    mounted() {
      
      this.catName=this.$route.query.catName;
      this.url = this.$route.query.url;
      this.catId=this.$route.query.catId;
      this.uid=localStorage.getItem("uid");
      this.$post("/aliyun/enterLive",{catId:this.catId}).then(res=>{
        if(res.data==200){
          console.log(res.data)
        }
      })
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
          ],
        },
        function (player) {
          console.log("The player is created");
        }
      );
    },
    components:{
      ChatRoom
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
<style scoped>
  @import "https://g.alicdn.com/de/prismplayer/2.8.8/skins/default/aliplayer-min.css";
</style>