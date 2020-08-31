<template>
  <div class="share-course">
    <div class="top">
      <div>打开APP购买课程</div>
      <div class="open">打开</div>
    </div>
    <img :src="courseinfo.cover" alt />
    <div class="info">
      <div class="info1">
        <div class="cou-type-name">{{courseinfo.couTypeName}}</div>
        <div class="cou-name">{{courseinfo.couName}}</div>
        <div class="audition">试听</div>
      </div>
      <div class="total-hours font12">总课时：{{courseinfo.totalHours}}课时</div>
      <div class="userinfo">
        <div>
          <img class="avator" :src="userinfo.headportrait" alt />
          <span class="font12">{{userinfo.nickname}}</span>
        </div>
        <div>
          <img src="~assets/image/icon_vip .png" class="vip-icon" />
          <span class="font12">&yen;{{courseinfo.pricevip}}</span>
          <span class="price">&yen;{{courseinfo.price}}</span>
        </div>
      </div>
      <div class="course">
        <div class="item" v-for="(item,index) in options" @click="select(index)" :key="index">
          <div :class="{'active-text':index==currentIndex}" class="item-text">{{item}}</div>
          <div :class="{active:index==currentIndex}"></div>
        </div>
      </div>
      <div class="block"></div>
      <div v-if="currentIndex==0" v-html="courseinfo.lecturerIntro"></div>
      <div v-else-if="currentIndex==1" class="catalogue">
        <div v-for="(el,index) in catalogue" :key="index">
          <div class="num">{{index+1}}</div>
          <div>
            <div class="cat-name">{{el.catName}}</div>
            <div class="flex">
              <span class="font12">主讲人：{{el.lecturer}}</span>
              <div class="font12">
                <span  v-if="el.catType==1">【直播】</span>
                <span  v-else>【录播】</span>
              </div>
              <div v-if="el.audition==1" class="audition">试听</div>
              <div class="font12" v-else>
                <span  v-if="el.catType==1">{{el.catTime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else v-html="courseinfo.lecturerIntro"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      couId: "20200320183310082303",
      courseinfo: {},
      userinfo: {},
      currentIndex: 0,
      options: ["教材介绍", "教材大纲", "讲师介绍"],
    };
  },
  created() {
    this.$post("/course/showCourse", { couId: this.couId }).then((res) => {
      if (res.code == 200) {
        this.courseinfo = res.data;
        console.log(this.courseinfo);
      }
    });
    this.$post("/userinfo/showUserinfo", {}).then((res) => {
      if (res.code == 200) {
        this.userinfo = res.data.userinfo;
      }
    });
    this.$post("/course/getCatalogue", { couId: this.couId }).then((res) => {
      if (res.code == 200) {
        this.catalogue = res.data;
      }
    });
  },
  methods: {
    select(index) {
      this.currentIndex = index;
    },
  },
};
</script>
<style lang="scss" scoped>
.share-course {
  width: 375px;
  .font12 {
    color: #9899a1;
    font-size: 12px;
  }
  .top {
    height: 40px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #98b702;
    color: #fff;
    .open {
      width: 52px;
      height: 23px;
      text-align: center;
      line-height: 23px;
      background-color: #fff;
      color: #36363a;
      font-size: 12px;
      font-family: "PingFangSC-Medium", "PingFang SC";
    }
  }
  .info {
    padding: 17px 15px;
    .info1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cou-type-name {
      width: 36px;
      height: 18px;
      color: #fff;
      font-size: 11px;
      text-align: center;
      line-height: 18px;
      background-color: #98b702;
      border-top-left-radius: 9px;
      border-bottom-right-radius: 9px;
    }
    .cou-name {
      font-size: 16px;
      font-family: "PingFangSC-Semibold", "PingFang SC";
      font-weight: 600;
      color: #333333;
    }
    .audition {
      width: 50px;
      height: 24px;
      font-size: 14px;
      text-align: center;
      line-height: 24px;
      border-radius: 24px;
      color: #fff;
      background-color: #fb9715;
    }
  }
  .total-hours {
    margin-top: 10px;
  }
  .userinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    div:nth-child(1) {
      display: flex;
      align-items: center;

      .avator {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    }
    div:nth-child(2) {
      display: flex;
      align-items: center;
      .vip-icon {
        width: 16px;
        height: 9px;
      }
      .price {
        margin-left: 10px;
        font-size: 24px;
        font-family: "DINAlternate-Bold", "DINAlternate";
        font-weight: bold;
        color: #36363a;
      }
    }
  }
  .course {
    margin-top: 10px;
    padding: 16px 35px 0;
    display: flex;
    justify-content: space-between;
    .item {
      height: 34px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #9899a1;
      cursor: default;
    }
    .item:nth-child(2) > .item-text:after {
      content: "视听";
      display: inline-block;
      width: 30px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      font-size: 12px;
      color: #fff;
      background-color: #fb9715;
      border-top-left-radius: 9px;
      border-bottom-right-radius: 9px;
    }
    .active {
      margin-top: 11px;
      height: 3px;
      width: 20px;
      background-color: #98b702;
    }
    .active-text {
      font-family: "PingFangSC-Medium", "PingFang SC";
      font-weight: 500;
      color: #36363a;
    }
  }
  .block {
    color: #eee;
    height: 1px;
  }
  .catalogue {
    > div {
      display: flex;
      margin-top: 20px;
      align-items: center;

      .num {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        color: #fff;
        background-color: #98b702;
        border-top-left-radius: 10px;
        margin-right: 10px;
      }
      .cat-name {
        margin-bottom: 5px;
        font-size: 14px;
        font-family: "PingFangSC-Medium", "PingFang SC";
        font-weight: 500;
        color: #36363a;
      }
      .flex{
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>