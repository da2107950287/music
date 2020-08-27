<template>
  <div class="user-box">
    <div class="user">
      <div class="user-left">
        <div class="left-top">
          <img :src="avatar" alt />
          <div>
            <span class="nickname">{{nickName}}</span>
            <div v-if="sex=='女'" class="sex-icon female"></div>
            <div v-else-if="sex=='男'" class="sex-icon male"></div>
          </div>
        </div>
        <div class="left-bottom">
          <div v-for="(item,index) in menu" :key="index" @click="handleClick(item)"
            :class="{'active':$route.path.includes(item.link)}">{{item.title}}</div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    inject:['reload'],
    data() {
      return {
        menu: [
          { title: "我的资料", link: '/profile' },
          { title: "我的课程", link: '/course' },
          { title: "我的订单", link: '/order' },
          { title: "我的收藏", link: '/collect' },
          { title: "我的消息", link: '/news' },
          { title: "我的积分", link: '/integral' },
          { title: "退出登录", link: '/home' },
        ],

      };
    },
    computed: {
      avatar() {
        return localStorage.getItem("headportrait")
      },
      nickName() {
        return localStorage.getItem("nickName")
      },
      sex(){
        return localStorage.getItem("sex")
      }
    },
    methods: {
      handleClick(item) {
        if (item.link.includes("/home")) {
          this.$router.push('/index/home');
          this.reload()
          localStorage.clear();
        } else {
          this.$router.push('/index/user' + item.link)

        }

      },
    },
  };
</script>
<style lang="scss" scoped>
  .user-box {
    .user {
      width: 1200px;
      margin: 0 auto;
      display: flex;
    }
  }

  .user-left {
    width: 240px;
    text-align: center;
    margin-right: 10px;

    .left-top {
      height: 180px;
      padding: 34px 0;
      box-sizing: border-box;
      background-color: #fff;

      >img {
        width: 80px;
        height: 80px;
      }

      >div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        color: #6a6a6f;
        font-size: 16px;
        font-family: "PingFangSC-Regular", "PingFang SC";
      }

      .sex-icon {
        width: 16px;
        height: 16px;
        background-image: url(~assets/image/icon.png); 
      }
      .female{
        background-position: -66px -195px;
      }
      .male{
        background-position: -112px -195px;
      }
    }

    .left-bottom {
      margin-top: 10px;
      background-color: #fff;
      font-family: "PingFangSC-Medium", "PingFang SC";
      margin-bottom: 30px;

      >div {
        height: 60px;
        line-height: 60px;
        text-align: left;
        cursor: pointer;
        color: #6A6A6F;
      }

      >div::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 32px;
        background-color: #fff;
        vertical-align: middle;
        margin-right: 80px;
      }

      .active {
        background: rgba(152, 183, 2, 0.1);
        color: #98b702;
      }

      .active::before {
        background-color: #98b702;
      }
    }
  }
</style>