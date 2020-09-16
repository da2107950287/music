<template>
  <div class="control-wrapper">
    <div v-if="!fullscreen" @click="fullScreen" class="icon full"></div>
    <div v-else class="control">
      <div class="control-left">
        <el-input v-model="message" equired placeholder="消息" class="sengTxt" ref="txtDom"
          @keypress.native.enter="onSendTextMsg">
          <div slot="suffix" class="send" @click="onSendTextMsg">发送</div>
        </el-input>
      </div>
      <div class="control-right">
        <div class="switch-panel" @click="isflag" :class="{'switch-left': flag,'switch-right': !flag}">
          <div v-show="!flag" class="switch">
            <span class="switch-ico left"></span>
            <div class="right-text">弹幕</div>
          </div>
          <div v-show="flag" class="switch">
            <div class="left-text">弹幕</div>
            <span class="switch-ico right"></span>
          </div>
        </div>
        <div @click="fullScreen">
          <div class="icon narrow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Mixins from "assets/js/mixins.js";
  import HuodeScene from "assets/js/live.js";
  export default {
    mixins: [Mixins],
    props: {
      fullscreen: {
        type: Boolean,
        default() {
          return false;
        },
      },
    },
    data() {
      return {
        message: "",
        input: "",
        flag: true,
      };
    },
    
    mounted() {
      this.hd = new HuodeScene();
    },
    methods: {
      isflag() {
        this.flag = !this.flag;
        this.hd.toggleBarrage(this.flag)
        return this.flag;
      },
      //发送弹幕
      onSendTextMsg() {
        if (this.message == "" || this.message == "\n") {
          this.message = "";
          return;
        }
        this.hd.sendPublicChatMsg(this.message);
        this.message = "";
      },
      //全屏/小屏
      fullScreen() {
        this.$emit("screenfull");
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .switch {
    @include fj();
    padding: 1px 2px;
    box-sizing: border-box;
  }

  .switch-panel {
    position: relative;
    transition: 1s;
    width: 60px;
    height: 24px;

    border-radius: 20px;
    background: #555;
    cursor: pointer;
    font-size: 14px;
  }

  .switch-ico {
    transition: 0.5s;
    float: left;
    margin-top: 1px;
    width: 16px;
    height: 16px;

    border-radius: 50%;
  }

  .left {
    background-color: #ccc;
    border: 2px solid #787878;
  }

  .right-text {
    padding-right: 4px;
    color: #ccc;
  }

  .right {
    background-color: #fb9715;
    border: 2px solid #7f6645;
  }

  .left-text {
    padding-left: 4px;
    color: #fb9715;
  }

  .switch-left {
    background: #555;
  }

  .switch-right {
    background: #555;
  }

  .switch-left .switch-ico {
    transform: translateX(0);
  }

  .switch-right .switch-ico {
    // transform: translateX(30px);
  }

  .control-wrapper {
    width: 100%;
    height: 48px;
    @include fa();
    position: relative;
    background: #36363a;

    .icon {
      @include wh(20px, 20px);
      background-image: url(~assets/image/icon.png);
    }

    .full {
      position: absolute;
      right: 30px;
      background-position: -881px -193px;
    }

    // opacity: 0.7;
    .control {
      width: 100%;
      position: relative;

      @include fj(center, center);
    }

    .control-left {
      width: 572px;
      height: 32px;

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

      .sengTxt {
        border-radius: 2px 0 0 2px;
      }

      .send {
        width: 50px;
        height: 34px;
        margin-right: -5px;
        line-height: 34px;
        text-align: center;
        font-size: 14px;
        color: $fc;
        background-color: $tc;
        border-radius: 0px 2px 2px 0px;
        cursor: default;
      }
    }

    .control-right {
      position: absolute;
      right: 30px;
      @include fa();

      .narrow {
        margin-left: 30px;
        background-position: -931px -193px;
      }
    }
  }
</style>