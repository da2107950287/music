<template>
  <div class="chat">
    <div class="title">聊天室</div>
    <div class="messagebox-content" ref="chat">
      <div v-for="(item,i) in messages" :key="i" class="msg-box" :style="{'float':item.type ? 'right':'left'}">
        <div :style="{'text-align':item.type ? 'right':'left'}" class="nickname">{{item.userName}}</div>
        <div style="user-select: text" v-html="item.content" :class="{ 'byself': item.type}" class="text"></div>
      </div>
    </div>
    <div class="messagebox-footer">
      <div class="footer-icon">
        <!-- 表情组件 -->
        <ChatEmoji class="chatemoji" @selectEmoji="selectEmoji" :inpMessage="message" />
        <div @click="interaction">语音</div>
      </div>
      <div class="fotter-send">
        <el-input v-model="message" equired placeholder="消息" class="sengTxt" ref="txtDom"
          @keypress.native.enter="SendTextMsg">
          <div slot="suffix" class="send" @click="SendTextMsg">发送</div>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
  import ChatEmoji from "components/live/ChatEmoji";
  import HuodeScene from "assets/js/live.js";
  import Mixins from "assets/js/mixins.js";
  import { shieldEmoticon, showEm } from "assets/js/utils.js"
  export default {
    mixins: [Mixins],
    components: {
      ChatEmoji,
    },
    data() {
      return {
        message: "",
        messages: [],
        hd:null,
      };
    },
    mounted() {
      this.hd = new HuodeScene();
      this.getMessages();
    },
    methods: {
      // 接收公聊
      getMessages() {
        this.hd.onPublicChatMessage((message) => {
          const _msg = JSON.parse(message);
   
          const type = localStorage.getItem("viewerid") === _msg.userid;
          // 聊天信息数据结构
          const formatMsg = {
            userAvatar: _msg.useravatar,
            userName: _msg.username,
            content: _msg.msg,
            userId: _msg.userid,
            userRole: _msg.userrole,
            userCustomMark: _msg.usercustommark,
            groupId: _msg.groupId,
            time: _msg.time,
            status: _msg.status,
            chatId: _msg.chatId,
            type: type,
          };
          // 发送弹幕
          
console.log(message)
          // this.$emit("sendDanmaku", formatMsg);
          this.hd.sendBarrage(shieldEmoticon(formatMsg.content)); // 发送弹幕
          formatMsg.content = showEm(formatMsg.content);
          // 将接收到的聊天信息数据添加到信息池中
          this.messages.push(formatMsg);
          this.scrollBottom()
        });
      },
      //选择表情包
      selectEmoji(v) {
        this.message = v;
        this.$refs.txtDom.focus();
      },
      scrollBottom() {
        this.$nextTick(() => {
          let msg = this.$refs.chat// 获取对象
          msg.scrollTop = msg.scrollHeight // 滚动高度
        })
      },
      //发送文本消息
      SendTextMsg() {
        if (this.message == "" || this.message == "\n") {
          this.message = "";
          return;
        }
        this.hd.sendPublicChatMsg(this.message);
        this.message = "";
   

      },
      interaction() {
        console.log(888)
        var isVideo = true;
        var isAudio = false;
        this.hd.requestInteraction({
          video: isVideo,
          audio: isAudio
        })
      }
    },
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .chat {
    height: 675px;
    width: 360px;
    background-color: $fc;
    position: relative;

    .title {
      @include whl(100%, 48px, 48px);
      background-color: $tc;
      color: $fc;
      text-align: center;
    }

    .messagebox-content {
      width: 100%;
      height: calc(100% - 148px);
      top: 50px;
      background: $fc;
      overflow-y: scroll;
      scrollbar-width: none; // firefox下滚动条不显示
      -ms-overflow-style: none; // IE下滚动条不显示

      //设置侧边栏滚动条不显示 chrome
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .messagebox-footer {
      position: absolute;
      bottom: 0;
      height: 97px;
      margin-top: 10px;
      box-shadow: 0px 0px 6px 0px rgba(54, 54, 58, 0.1);

      .footer-icon {
        height: 42px;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        display: flex;

        .chatemoji {
          margin-right: 10px;
        }
      }
    }

    .fotter-send {
      width: 330px;
      height: 34px;
      margin: 10px 15px;
      box-sizing: border-box;
      border-radius: 2px;

      .el-input,
      /deep/ .el-input__inner {
        height: 34px;
        background-color: #f9f9f9;
      }

      /deep/ .el-input__inner:focus,
      /deep/ .el-input__inner:hover,
      /deep/ .el-input__inner {
        border-color: #eee;
      }

      .send {
        width: 50px;
        height: 34px;
        margin-right: -4px;
        line-height: 34px;
        text-align: center;
        font-size: 14px;
        color: $fc;
        background-color: $tc;
        border-radius: 0px 4px 4px 0px;
        cursor: default;
      }
    }

    .msg-box {
      margin: 15px 15px 10px;
      font-size: 14px;
      box-sizing: border-box;
      clear: both;
      word-break: break-all;

      .nickname {
        color: #9899a1;
      }

      .text {
        display: flex;
        align-items: center;
        padding: 10px;
        margin-top: 10px;
        background-color: rgba(187, 187, 187, 0.2);
        color: #6a6a6f;
        line-height: 23px;
        border-radius: 4px;
      }

      .byself {
        background: $tc;
        color: $fc;
        float: right;
      }
    }
  }
</style>