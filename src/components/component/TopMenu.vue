<template>
  
    <div class="top-menu">
      <div v-for="(item,index) in menu" :key="index" @click="handleClick(item.link)"
        :class="{'active':$route.path.includes(item.link)&&$route.path.includes('/user')}">{{item.title}}</div>
    </div>
  
</template>
<script>
  export default {
    inject:['reload'],
    data() {
      return {
        menu: [
          { title: "我的资料", link: "/profile" },
          { title: "我的课程", link: "/course" },
          { title: "我的订单", link: "/order" },
          { title: "我的收藏", link: "/collect" },
          { title: "我的消息", link: "/news" },
          { title: "我的积分", link: "/integral" },
          { title: "退出登录", link: "/home" },
        ],
      };
    },
    methods: {
      //鼠标离开就隐藏
      leave(){
        // let timer=setTimeout(()=>{
          this.$emit('hideMenu');
        //   clearTimeout(timer)
        // },2000)
      },
      //跳转到对应的页面
      handleClick(link) {
        this.$emit('hideMenu');
        if (link.includes("/home")) {
          this.$router.push("/index/home");
          localStorage.clear();
          this.reload()
        } else {
          this.$router.push("/index/user" + link);
        }
      },
    },
  };
</script>
<style lang="scss" scoped>

  .top-menu {
    z-index: 999;
    padding: 10px 30px;
    position: absolute;
    top: 70px;
    background-color: #fff;
    box-shadow: 0 0 1px #36363a;

    div {
      display: block;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      color: #36363a;
      cursor: default;
    }

    .active {
      color: #98b702;
    }
  }
</style>