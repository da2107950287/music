<template>
  <el-dialog :visible.sync="isShowForm" width="480px" :before-close="handleClose" center>
    <el-form :model="phoneForm" :rules="rules" ref="phoneForm" class="demo-loginForm form">
      <div class="popup-title bind-phone">绑定、更换手机号</div>
      <el-form-item prop="phone">
        <el-input v-model.number="phoneForm.phone" maxlength="11" placeholder="请输入新的手机号"></el-input>
      </el-form-item>
      <el-form-item prop="graphicsCode" class="pass graphics-code-box">
        <el-input v-model="phoneForm.graphicsCode" placeholder="请输入图形验证码" class="graphics-code-input"></el-input>
        <div @click="refreshCode" class="graphics-code">
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
      </el-form-item>
      <el-form-item prop="smsCode" class="pass">
        <el-input v-model="phoneForm.smsCode" placeholder="请输入短信验证码"></el-input>
        <div class="code" @click="codeClick">{{codeMsg}}</div>
      </el-form-item>
      <div @click="bindPhone" class="login-button">确 定</div>
    </el-form>
  </el-dialog>
</template>
<script>
  import SIdentify from "components/identify/Identify";
  export default {
    props: {
      isShowForm: {
        type: Boolean,
        default() {
          return false;
        },
      },
    },
    data() {
      // 手机号自定义验证规则
      var validatePhone = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入新的手机号"));
        } else {
          var isPhone = /^[1][0-9][0-9]{9}$/;
          if (!isPhone.test(value)) {
            callback(new Error("手机号输入错误"));
          } else {
            this.canClick = true;
            callback();
          }
        }
      };
      //图形验证码自定义验证规则
      const validategraphicsCode = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入图形验证码"));
        } else if (
          value.toLowerCase().trim() !== this.identifyCode.toLowerCase().trim()
        ) {
          this.refreshCode();
          callback(new Error("图形验证码不正确!"));
        } else {
          callback();
        }
      };
      //短信验证码自定义验证规则
      var validateSmsCode = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入短信验证码！"));
        } else {
          callback();
        }
      };
      return {
        codeMsg: "获取验证码",
        rules: {
          phone: [{ validator: validatePhone, trigger: "blur" }],
          graphicsCode: [{ validator: validategraphicsCode, trigger: "blur" }],
          smsCode: [{ validator: validateSmsCode, trigger: "blur" }],
        },
        identifyCodes: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        identifyCode: "",
        canClick: false, //短信验证码开关
        totalTime: 60,
        phoneForm: {
          phone: "",
          graphicsCode: "",
          smsCode: "",
        },
      };
    },
    created() {
      this.refreshCode();
    },
    methods: {
      handleClose() {
        this.$emit("hidePhoneForm");
      },
      // 生成随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },

      // 切换验证码
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },

      // 生成四位随机验证码
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ];
        }
      },
      //获取短信验证码
      codeClick() {
        if (!this.canClick) return;
        this.canClick = false;
        this.codeMsg = this.totalTime + "s";
        let clock = window.setInterval(() => {
          this.totalTime--;
          this.codeMsg = this.totalTime + "s";
          if (this.totalTime < 0) {
            window.clearInterval(clock);
            this.codeMsg = "重新发送验证码";
            this.totalTime = 60;
            this.canClick = true; //这里重新开启
          }
        }, 1000);
        this.$post("/userinfo/send_sms", { account: this.phoneForm.phone }).then(
          (res) => {
            switch (res.code) {
              case "200":
                this.$message.success(res.msg);
                break;
              case "500":
                this.$message.error(res.msg);
                break;
              default:
                console.log(res.msg);
            }
          }
        );
      },
      //确定绑定手机号
      bindPhone() {
        this.$refs.phoneForm.validate((valid) => {
          if (valid) {
            this.$post("/userinfo/bindAccount2", {
              account: this.phoneForm.phone,
              verify: this.phoneForm.smsCode,
            }).then((res) => {
              switch (res.code) {
                case 200:
                  this.$message.success(res.msg);
                  this.$emit("hidePhoneForm");
                  break;
                default:
                  this.$message.success(res.msg);
              }
            });
          }
        });
      },
    },
    components: {
      SIdentify,
    },
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .form {
    @include fa();
    flex-direction: column;


    .bind-phone {
      margin: 15px 0 40px;
      color: $tcolor;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      font-family: "PingFangSC-Medium";
    }

    /deep/.el-form-item__content {
      height: 40px;
    }

    /*修改el-input样式 */
    .el-input /deep/ .el-input__inner {
      width: 300px;
      border: none;
      border: 1px solid #ddd;
      font-size: 14px;
      color: $tcolor;
      border-radius: 2px;
      background-color: #f7f7f7;
    }

    .pass {
      position: relative;

      .code {
        @include pa(0,20px)
        font-size: 14px;
        font-family: "PingFangSC-Regular", "PingFang SC";
        font-weight: 400;
        color: $tc;
        cursor: default;
      }

      .can-click {
        color: $tc;
      }
    }

    .graphics-code-box {
      width: 300px;

      /deep/ .el-form-item__content {
        display: flex;
      }

      /deep/ .el-input,
      .graphics-code-input /deep/ .el-input__inner {
        width: 188px;
      }

      .graphics-code {
        margin-left: 10px;
      }
    }

    .login-button {
      @include wh(300px,40px)
      background-color: $tc;
      border-radius: 2px;
      border: 0;
      color: $fc;
      font-size: 16px;
      font-weight: 500;
      margin: 12px 0;
      text-align: center;
      line-height: 40px;
      cursor: default;
    }
  }
</style>