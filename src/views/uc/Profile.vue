<template>
  <div class="profile">
    <div class="profile-top">
      <div>基本资料</div>
      <span v-if="!isShow" @click="editProfile">编辑</span>
    </div>
    <display-profile v-if="!isShow" :userinfo="userinfo" @showPhoneForm="showPhoneForm" @bindWeChat="bindWeChat"
      @updateAvatar="updateAvatar" @unBindWeChat="unBindWeChat" />
    <div v-else>
      <!-- 修改用户信息 -->
      <div class="profile-bottom edit-form">
        <div>
          <span>昵称：</span>
          <el-input type="text" v-model="userinfo.nickname" maxlength="10"  show-word-limit></el-input>
        </div>
        <div>
          <span>性别：</span>
          <el-select v-model="userinfo.sex" placeholder="请选择">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div>
          <span>所在城市：</span>
          <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange" separator>
          </el-cascader>
        </div>
        <div>
          <span>简介：</span>
          <el-input type="text" v-model="userinfo.intro"></el-input>
        </div>
      </div>
      <div class="btn-box">
        <div class="btn cancel" @click="cancel">取消</div>
        <div class="btn save" @click="saveEdit">保存</div>
      </div>
    </div>
    <!-- 扫描二维码绑定微信 -->
    <el-dialog :visible.sync="dialogVisible1" width="340px" :before-close="handleClose1" center>
      <div slot="title" class="popup-title">扫描二维码绑定微信</div>
      <div id="wxCode"></div>
    </el-dialog>
    <!-- 绑定、更换手机号 -->
    <bind-phone :isShowForm="isShowForm" @hidePhoneForm="hidePhoneForm"></bind-phone>

  </div>
</template>
<script>
  import {
    provinceAndCityData,
    regionData,
    provinceAndCityDataPlus,
    regionDataPlus,
    CodeToText,
    TextToCode,
  } from "element-china-area-data";
  import BindPhone from "components/profile/BindPhone";
  import DisplayProfile from "components/profile/DisplayProfile";
  import QRCode from "qrcodejs2";
  import { mapGetters, mapActions } from "vuex"
  import { getRequest } from "assets/js/utils.js";
  import { wxpost } from "assets/js/axios.js";
  export default {
    inject: ['reload'],
    data() {
      return {
        dialogVisible1: false,
        isShowForm: false,
        sexOptions: [
          { value: "男", label: "男" },
          { value: "女", label: "女" },
        ],
        value: "",
        options: provinceAndCityData,
        selectedOptions: [],
        isShow: false,
        userinfo: {}, //用户信息
        code: "",
        openid: ''
      };
    },
    computed: {
      ...mapGetters([
        "getAppid",
        "getSecret"
      ])
    },
    watch: {
      $route(to, from) {
        this.code = getRequest().code;
        if (this.code && !this.userinfo.wx) {
          this.dialogVisible1 = false;
          this.$post("/userinfo/bindWx", { code: this.code, type: 1 }).then(res => {
            if (res.code == 200) {
              this.getUserinfo()
              this.$message.success(res.msg)
            }else{
              this.$message.error(res.msg)
            }
          })
        }
      }
    },
    created() {
      this.init();
      console.log("cre")
    },
    methods: {
      init() {
        this.getUserinfo()

      },
      getUserinfo() {
        //查询用户信息
        this.$post("/userinfo/showUserinfo", {}).then((res) => {
          if (res.code == 200) {
            this.userinfo = res.data.userinfo;
            this.selectedOptions.push(TextToCode[this.userinfo.province].code);
            this.selectedOptions.push(TextToCode[this.userinfo.province][this.userinfo.city].code);
            console.log(!this.userinfo.wx)
          }
        });
      },
      unBindWeChat() {
        this.getUserinfo()
      },
      handleChange(arr) {
        this.userinfo.province = CodeToText[arr[0]];
        this.userinfo.city = CodeToText[arr[1]];
      },

      editProfile() {
        this.isShow = true;
      },
      hidePhoneForm() {
        this.isShowForm = false;
      },
      changeImg() { },

      // 绑定微信
      bindWeChat() {
        let that = this
        this.dialogVisible1 = true;
        const s = document.createElement('script')
        s.type = 'text/javascript'
        s.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
        const wxElement = document.body.appendChild(s)
        wxElement.onload = function () {
          var obj = new WxLogin({
            id: 'wxCode', // 需要显示的容器id
            appid: that.getAppid, // 公众号appid wx*******
            scope: 'snsapi_login', // 网页默认即可
            redirect_uri: encodeURIComponent('http://music.dragonworld.top/dist/index.html#/index/user/profile'), // 授权成功后回调的url
            state: Math.ceil(Math.random() * 1000), // 可设置为简单的随机数加session用来校验
            style: 'black', // 提供"black"、"white"可选。二维码的样式
            href: '' // 外部css文件url，需要https
          })
        }

      },

      handleClose1() {
        this.dialogVisible1 = false;
      },
      //修改手机号
      showPhoneForm() {
        this.isShowForm = true;
      },

      // 保存用户信息修改
      saveEdit() {
        this.$post('/userinfo/updateUserinfo', {
          nickname: this.userinfo.nickname,
          headportrait: this.userinfo.headportrait,
          sex: this.userinfo.sex,
          intro: this.userinfo.intro,
          province: this.userinfo.province,
          city: this.userinfo.city,
          background: this.userinfo.background
        }).then(res => {
          if (res.code == 200) {
            
            localStorage.setItem("nickname", this.userinfo.nickname)
            localStorage.setItem("sex", this.userinfo.sex)
            this.getUserinfo()
            this.isShow = false;
            window.location.reload()
          }
        })
      },
      updateAvatar(imgUrl) {
        this.userinfo.headportrait = imgUrl
      },
      cancel() {
        this.isShow = false;
      }
    },
    components: {
      DisplayProfile,
      BindPhone,
    },
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .profile {

    @include wh(950px, 622px);
    padding: 24px 60px;
    box-sizing: border-box;
    background-color: $fc;
    margin-bottom: 30px;
  }

  .profile-top {
    @include fj();
    margin-bottom: 30px;

    div {
      color: $tcolor;
      font-size: 16px;
      font-weight: 500;
      font-family: "PingFangSC-Medium", "PingFang SC";
    }

    span {
      color: #ff4545;
      font-size: 14px;
      line-height: 20px;
      cursor: default;
    }
  }

  .profile-bottom {
    @include wh(830px, 446px);
    padding: 0 60px;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #e8e8e8;

    >div {
      margin-top: 30px;
      font-size: 16px;

      span:nth-child(1) {
        width: 80px;
        display: inline-block;
        color: #9899a1;
        cursor: default;
        text-align-last: justify;
        text-align: justify;
      }

      span:nth-child(2) {
        color: $tcolor;
        margin-left: 20px;
        cursor: default;
      }

      span:nth-child(3) {
        margin-left: 10px;
        color: $tc;
        cursor: default;
      }
    }

    .personal-icon {
      position: absolute;
      top: 40px;
      right: 60px;

      img:nth-child(1) {
        @include wh(100px, 100px)
      }

      img:nth-child(2) {
        position: absolute;
        bottom: 0;
        right: 8px;
      }
    }
  }

  .edit-form {
    div {
      display: flex;
      /* // align-items: center; */
      height: 40px;
      line-height: 40px;
    }

    /deep/ .el-input__inner,
    /deep/ .el-input {
      @include wh(400px, 40px);
    }
  }

  .btn-box {
    margin-top: 30px;
    display: flex;
    justify-content: center;

    .btn {
      @include whl(100px, 40px, 40px);
      border-radius: 3px;
      text-align: center;
      font-size: 14px;
      cursor: default;
    }

    .cancel {
      background-color: #f7f7f7;
      border: 1px solid #ddd;
      color: $tcolor;
    }

    .save {
      background-color: $tc;
      border: 1px solid $tc;
      color: $fc;
      margin-left: 16px;
    }
  }

  .popup-title {
    color: $tcolor;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    font-family: "PingFangSC-Medium";
  }
</style>