<template>
  <div class="top-header-box">
    <div class="top-header" id="top-header">
      <div class="left">
        <div class="logo">芥末</div>
        <div class="title">芥末音乐</div>
      </div>
      <div class="top-center">
        <div :class="{ active: $route.path == '/index/home' }" class="item" @click="select('/index/home')">
          推荐课程
        </div>
        <div v-for="(item, index) in list" :key="index" class="item"
          :class="{ active: $route.query.couType === item.dicId }"
          @click="select('/index/courses', item.dicId, index + 1)">
          {{ item.dicName }}
        </div>
      </div>
      <div class="right">
        <div @click="go('/index/user/news')" class="notification">
          <div class="notification-message"></div>
          <div class="red-box" v-if="notReadNum > 0">{{ notReadNum }}</div>
        </div>
        <div v-if="isShow" class="login" @click="showLoginBox">
          <div class="login-icon"></div>
          <span class="login-text">点击登录</span>
        </div>
        <!-- 个人下拉菜单 -->
        <el-dropdown v-else @command="handleCommand" placement="bottom-end">
          <div class="login">
            <img v-lazy="getHeadportrait" class="login-icon" />
            <span class="login-text">{{ getNickname }}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in menu" :command="item.link" :key="index">{{ item.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 登录弹窗 -->
    <LoginBox :dialogFormVisible="dialogFormVisible" @hideLoginBox="hideLoginBox" />
  </div>
</template>
<script>
  import LoginBox from "components/component/LoginBox";
  import { mapGetters, mapActions } from "vuex";

  export default {
    inject: ["reload"],
    data() {
      return {
        dialogFormVisible: false, //登录弹窗开关
        isShowMenu: false, //菜单开关
        notReadNum: 0, //未读消息数量
        list: [],
        menu: [
          { title: "我的资料", link: "profile" },
          { title: "我的课程", link: "course" },
          { title: "我的订单", link: "order" },
          { title: "我的收藏", link: "collect" },
          { title: "我的消息", link: "news" },
          { title: "我的积分", link: "integral" },
          { title: "退出登录", link: "home" },
        ],
      };
    },
    computed: {
      ...mapGetters(["getToken", "getHeadportrait", "getNickname", "getForm"]),
      isShow() {
        if (this.getToken == null) {
          return true;
        } else {
          return false;
        }
      },
    },
    created() {
      //获取头部课程类别
      this.$post("/other/getDictionary", { dicType: "smd1" }).then((res) => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
      //获取未读消息
      this.$post("/other/getNotReadNumber", {}).then((res) => {
        if (res.code == 200) {
          this.notReadNum = res.data;
        }
      });
    },
    methods: {
      ...mapActions(["setForm"]),
      //选择课程类型
      select(link, couType, index) {
        if (couType) {
          this.$router.push({ path: link, query: { couType } });
        } else {
          this.$router.push(link);
        }
        if (index) {
          let sWidth = document.querySelectorAll(".item")[index - 1].offsetWidth;
          document.querySelector(".top-center").scrollLeft += sWidth;
        }
      },
      //跳转到我的消息页面
      go(link) {
        if (this.getToken) {
          this.$router.push(link);
        } else {
          this.$message.warning("对不起，请登录后再进行操作！");
        }
      },
      //隐藏登录框
      hideLoginBox() {
        this.dialogFormVisible = false;
        // this.setForm(false)
      },
      //显示登录框
      showLoginBox() {
        // this.setForm(true)
        this.dialogFormVisible = true;
      },
      handleCommand(command) {
        console.log(command);
        if (command.includes("home")) {
          this.$router.push("/index/home");
          localStorage.clear();
          window.location.reload();
        } else {
          this.$router.push("/index/user/" + command);
        }
      },
    },
    components: {
      LoginBox,
    },
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .top-header-box {
    width: 100%;
    height: 100px;
    margin-bottom: 30px;
    background-color: $fc;
    box-shadow: 1px 1px 1px #e8e8e8;
  }

  .top-header {
    @include wh(1200px, 100px);
    @include fj(flex-start);
    position: relative;
    margin-left: auto;
    margin-right: auto;

    .top-center {
      @include fj();
      overflow-x: scroll;
      scrollbar-width: none; // firefox下滚动条不显示
      -ms-overflow-style: none; // IE下滚动条不显示

      //设置侧边栏滚动条不显示 chrome
      &::-webkit-scrollbar {
        display: none;
      }

      width: 845px;
      margin-left: 60px;
      text-align: center;
      font-weight: 500;
      font-family: $family;

      .item {
        // @include whl(120px, 100px, 100px);
        // line-height: 100px;
        white-space: nowrap;
        padding: 39px 28px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 16px;

        color: $tcolor;
        background-color: $fc;
      }

      .active {
        background: $tc;
        color: $fc;
      }
    }
  }

  .left {
    @include fj();
    text-align: center;

    .logo {
      @include whl(60px, 60px, 60px);
      font-weight: 600;
      font-size: 18px;
      background: $fc;
      box-shadow: 0px 0px 6px 0px rgba(129, 156, 2, 0.4);
      border-radius: 10px;
      color: $tc;
    }

    .title {
      @include whl(96px, 25px, 25px);
      font-size: 24px;
      color: $tc;
      margin-left: 10px;
      font-family: "sthupo";
    }
  }

  .notification {
    position: relative;
    display: flex;

    .notification-message {
      width: 24px;
      height: 24px;
      background-image: url(~assets/image/icon.png);
      background-position: -66px -88px;
    }

    .red-box {
      @include whl(14px, 14px, 14px);
      background-color: #ff4545;
      border-radius: 50%;
      @include pa(-5px, 15px);
      font-size: 10px;
      text-align: center;
      color: $fc;
    }
  }

  .right {
    width: 160px;
    @include fa();

    margin-right: 0;
    margin-left: 30px;

  }

  .login {
    @include fa();
    margin-left: 30px;
  }

  .login-icon {
    @include wh(24px, 24px);
    cursor: default;
    background-image: url(~assets/image/icon.png);
    background-position: -120px -88px;
    border-radius: 50%;
  }

  .login-text {
    margin-left: 5px;
    line-height: 60px;
    width: 65px;
    cursor: default;
    overflow: hidden; // 超出的文本隐藏
    text-overflow: ellipsis; // 溢出用省略号显示
    white-space: nowrap; // 溢出不换行
  }

  /deep/ .el-form-item.is-error .el-input__inner {
    border-color: $tc;
  }

  .el-dropdown-menu__item:not(.is-disabled):hover {
    color: $tc;
    background-color: $fc;
  }

  .el-dropdown-menu {
    padding: 10px 20px;
  }
</style>