<template>
  <div>
    <div class="messagebox">
      <div class="title">
        <img src="~assets/image/pho_kf.png" class="avator">
        <div class="nickname">芥末——刘老师</div>
        <div class="close" @click="hideChat"></div>
      </div>
      <div class="messagebox-content" ref="msgContent">
        <div v-for="(item,i) in msgList" :key="i" class="msg-box" :style="{'float':item.bySelf ? 'right':'left'}">
          <div :style="{'text-align':item.bySelf ? 'right':'left'}" class="nickname">{{item.from}}</div>
          <!-- 图片消息 -->
          <img :key="item.msg" :src="item.msg?item.msg:''" v-if="item.type === 'img'" class="img-style" />
          <!-- 聊天消息 -->
          <div style="user-select: text" v-else v-html="renderTxt(item.msg)" :class="{ 'byself': item.bySelf}"
            class="text"></div>
        </div>
      </div>
      <div class="messagebox-footer">
        <div class="footer-icon">
          <!-- 表情组件 -->
          <ChatEmoji class="chatemoji" @selectEmoji="selectEmoji" :inpMessage="message" />
          <!-- 上传图片组件 -->
          <UpLoadImage :type="chatType" :chatId="chatId" />
        </div>
        <div class="fotter-send">
          <el-input v-model="message" equired placeholder="消息" class="sengTxt" ref="txtDom">
            <div slot="suffix" class="send" @click="onSendTextMsg">发送</div>
          </el-input>
        </div>
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>

</style>
<script>

  import ChatEmoji from "components/chat/ChatEmoji";
  import emoji from "assets/js/emoji";
  import UpLoadImage from "components/chat/UpLoadImage";
  import { mapActions, mapGetters } from "vuex";

  export default {
    data() {
      return {
        chatId: '123',
        chatType: 'contact',
        password: '123456',
        uid: '',
        message: '',
      }
    },
    computed: {
      ...mapGetters({
        msgList: 'onGetCurrentChatObjMsg'
      })
    },
    mounted() {
      //获取用户uid
      this.$post("/userinfo/showUserinfo").then(res => {
        if (res.code == 200) {
          this.uid = res.data.userinfo.uid
          // 登录
          this.onLogin({
            username: this.uid,
            password: this.password
          })
        }
      })

    },
    updated() {
      this.scollBottom();
    },
    methods: {
      ...mapActions([
        "onLogin",
        "onSendText"
      ]),
      //发送文本消息
      onSendTextMsg() {
        if (this.message == "" || this.message == "\n") {
          this.message = "";
          return;
        }
        this.onSendText({
          chatType: this.chatType,
          chatId: this.chatId,
          message: this.message,
        });
        this.message = "";
      },
      //选择表情包
      selectEmoji(v) {
        this.message = v;
        this.$refs.txtDom.focus();
      },



      customEmoji(value) {
        return `<img src="${require(`../../static/faces/${value}`)}" style="width:20px"/>`
      },
    
      
      
      renderTxt(txt = "") {
        let rnTxt = [];
        let match = null;
        const regex = /(\[.*?\])/g;
        let start = 0;
        let index = 0;
        while ((match = regex.exec(txt))) {
          index = match.index;
          if (index > start) {
            rnTxt.push(txt.substring(start, index));
          }
          if (match[1] in emoji.obj) {
            const v = emoji.obj[match[1]];
            rnTxt.push(this.customEmoji(v));
          } else {
            rnTxt.push(match[1]);
          }
          start = index + match[1].length;
        }
        rnTxt.push(txt.substring(start, txt.length));
        return rnTxt.join("");
      },
      scollBottom() {
        setTimeout(() => {
          const dom = this.$refs.msgContent;
          if (!dom) return;
          dom.scrollTop = dom.scrollHeight;
        }, 0);
      },

      hideChat() {

      },
    },
    components: {
      ChatEmoji,
      UpLoadImage
    }
  };
</script>
<style lang="scss" scoped>
  .updateMsgList {
    height: 250px;
  }

  .messagebox-content {
    width: 100%;
    height: calc(100% - 250px);
    top: 50px;
    background: #fff;
    overflow-y: scroll;
    scrollbar-width: none; // firefox下滚动条不显示
    -ms-overflow-style: none; // IE下滚动条不显示

    //设置侧边栏滚动条不显示 chrome
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .messagebox {
    width: 400px;
    height: 600px;
    background-color: #fff;

    .title {
      height: 80px;
      position: relative;
      display: flex;
      text-align: center;
      align-items: center;
      background-color: #98b702;
      color: #fff;
      font-family: "PingFangSC-Medium", "PingFang SC";
      font-weight: 500;

      .avator {
        width: 50px;
        height: 50px;
        margin-left: 30px;
      }

      .nickname {
        margin-left: 10px;
      }

      .close {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 10px;
        right: 10px;
        background-image: url(~assets/image/icon.png);
        // background-size: 100%;
        background-position: -835px -195px;
      }
    }

    .msg-box {
      margin: 15px 15px 0;
  
      font-size: 14px;
      box-sizing: border-box;
      clear: both;
      word-break: break-all;

      .nickname {
        color: #9899a1;
      }

      .text {
        padding: 10px;
        margin-top: 10px;
        background-color: rgba(187, 187, 187, 0.2);
        color: #6a6a6f;
        line-height: 23px;
        border-radius: 4px;
      }

      .byself {
        background: #98b702;
        color: #fff;
        float: right;
      }
    }

    .messagebox-footer {
      height: 97px;
      margin-top: 10px;
      box-shadow: 0px 0px 6px 0px rgba(54, 54, 58, 0.1);

      .footer-icon {
        height: 42px;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;

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
        color: #fff;
        background-color: #98b702;
        border-radius: 0px 4px 4px 0px;
        cursor: default;
      }
    }
  }
</style>