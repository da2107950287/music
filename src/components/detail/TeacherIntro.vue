<!-- 老师介绍 -->
<template>
  <div class="teacher-intro">
    <div class="intro-item" v-for="(item,index) in teacherList" :key="index">
      <div class="left">
        <img v-lazy="item.headportrait" />
      </div>
      <div class="right">
        <div class="nickname">{{item.username}}</div>
        <div>
          <span>授课内容：</span>
          <span>精品竖笛进阶课程</span>
        </div>
        <div class="intro-text">{{item.intro}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      teacherList: {
        type: Array,
        default() {
          return []
        }
      }
    },
  };
</script>
<style lang="scss" scoped>
    @import "~assets/css/mixin";

  .teacher-intro {
    padding: 0 30px 30px;
  }

  .intro-item {
    padding: 30px;
    margin-top: 30px;
    display: flex;
    background-color: #f7f7f7;

    .left {
      @include wh(177px,210px);
     

      img {
        @include wh(177px,210px);

      }
    }

    .right {
      width: 883px;
      margin-left: 20px;

      .nickname {
        color: $tcolor;
        font-size: 24px;
        font-family: "PingFangSC-Medium", "PingFang SC";
        font-weight: 500;
        margin-bottom: 15px;
      }

      div {
        color: #6A6A6F;
        font-size: 14px;
        line-height: 22px;
      }

      div.intro-text {
        margin-top: 15px;
      }
    }
  }
</style>