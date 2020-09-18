<template>
  <div class="top-detail">
    <div class="left">
      <img v-lazy="topDetail.cover" alt />
    </div>
    <div class="right">
      <div class="title">
        <span>{{topDetail.couName}}</span>
        <div
          class="bgc-img isnotcollected"
          v-if="topDetail.courseCollState==0 || collected"
          @click="collectCourse"
        ></div>
        <div class="bgc-img iscollected" v-else></div>
      </div>
      <div class="price">
        <div class="member-price">
          <span>会员价：&yen;</span>
          <span>{{topDetail.priceVip}}</span>
        </div>
        <div class="orgin-price">原价：&yen;{{topDetail.price}}</div>
      </div>
      <div>
        <div class="common">
          <div class="img-icon img1"></div>
          <span>总 课 时：</span>
          <span>{{topDetail.totalHours}}</span>
        </div>
        <div class="blank"></div>
        <div class="common">
          <div class="img-icon img2"></div>
          <span>有 效 期：</span>
          <span>{{topDetail.termOfValidity}}月</span>
        </div>
        <div class="blank"></div>
        <div class="common">
          <div class="img-icon img3"></div>
          <span>授课老师：</span>
          <span>{{topDetail.lecturer}}</span>
        </div>
      </div>
      <div class="btn-box">
        <div v-if="topDetail.buyState==0" @click="buy">立即购买</div>
        <div v-else-if="topDetail.buyState==1">已购买</div>
        <div @click="audition">免费试听</div>
      </div>
    </div>
  </div>
</template>
<script>
    import { mapGetters,mapActions } from "vuex"

export default {
  props: {
    topDetail: {
      type: Object,
      default() {
        return {};
      },
    },
    collected: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  computed:{
...mapGetters([
  "getToken"
])
  },
  methods: {
    ...mapActions([
      "setForm"
    ]),
    collectCourse() {
      if (this.getToken) {
        this.$emit("collectCourse");
      } else {
        // this.setForm(true)
        this.$message.warning("对不起，请登录后再进行操作！");
       
      }
    },
    buy() {
        this.$emit("buy");
    },
    //试听
    audition() {
      this.$bus.$emit("audition");
    },
  },
};
</script>
<style lang="scss" scoped>
    @import "~assets/css/mixin";

.top-detail {
  @include wh(1200px,440px);
  padding: 30px;
  display: flex;
  box-sizing: border-box;
  background-color: $fc;
}


.left > img {
  @include wh(580px,380px);
}

.right {
  margin-left: 20px;
  width: 538px;
}

.title {
 @include fj();
  font-size: 22px;
  color: $tcolor;
  .bgc-img {
    @include wh(20px,20px);
    margin-left: 52px;
    background-image: url(~assets/image/icon.png);
  }
  .iscollected {
    background-position: -470px -90px;
  }
  .isnotcollected {
    background-position: -420px -90px;
  }
}

.title > img {
  @include wh(20px,20px);
  margin-left: 52px;
}

.price {
  @include fa();
  height: 70px;
  margin: 35px 0 20px;
  background: rgba(251, 151, 21, 0.15);
  padding-left: 20px;
  /* opacity: 0.15; */
}

.member-price {
  color: $tcolor;
  @include fa();
 
}

.member-price > span:nth-child(1) {
  font-size: 18px;
}

.member-price > span:nth-child(2) {
  font-size: 32px;
}

.orgin-price {
  margin-left: 20px;
  font-size: 14px;
  color: #9899a1;
  text-decoration: line-through;
}

.img-icon {
  @include wh(16px,16px);
  margin-right: 3px;
  background-image: url(~assets/image/icon.png);
}
.img1 {
  background-position: -174px -92px;
}
.img2 {
  background-position: -220px -92px;
}
.img3 {
  background-position: -266px -92px;
}

.common {
  text-align: left;
  display: flex;
}

.common > span:nth-child(2) {
  color: #9899a1;
}

.common > span:nth-child(3) {
  color: #6a6a6f;
}

.blank {
  @include wh(1px,20px);
  background-color: #ccc;
  margin-left: 8px;
}

.btn-box {
  margin-top: 58px;
  display: flex;
}

.btn-box > div {

  @include whl(200px,55px,55px);
  text-align: center;
  border-radius: 3px;
  font-size: 18px;
  border: none;
  cursor: default;
}

.btn-box > div:nth-child(1) {
  background-color: $tc;
  color: $fc;
}

.btn-box > div:nth-child(2) {
  box-sizing: border-box;
  margin-left: 20px;
  background: rgba(251, 151, 21, 0.1);
  color: #fb9715;
  border: 1px solid #fb9715;
}
</style>