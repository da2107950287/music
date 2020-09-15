<template>
  <div style="width: 600px;height: 100px;display: flex;">
    <!-- <div> -->
    <div id="livePlayer" style="width: 600px;height: 100px;"></div>
    <input type="text" v-model="msg">
    <div @click="send">发送</div>
    <!-- </div> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: ''
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        DWLive.init({
          userid: '81C632A3B425FBC2',//必须参数
          roomid: '68491F2B453E0F509C33DC5901307461',//必须参数

        });

        // 接收公聊
        DWLive.onPublicChatMessage = function (j) {
          console.log(j);
          DWLive.barrage(j, '0xffffff'); // 发送弹幕
        }
      },
      send() {
    

      }
    }
  }
</script>