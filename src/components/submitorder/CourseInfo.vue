<template>
  <div class="course-info">
    <div class="title">
      <div>课程信息</div>
    </div>
    <div class="table">
      <div class="table-body">
        <div class="left">{{detail.couName}}</div>
        <div class="right">
          <span>主讲：{{detail.lecturer}}</span>
          <span>总课时：{{detail.totalHours}}</span>
          <span v-if="detail.vip==0">&yen;{{detail.price}}</span>
          <span v-else>&yen;{{detail.pricevip}}</span>
          <span class="num">&times;1</span>
        </div>
      </div>
    </div>
    <div class="total">
      <div class="total-left">
        <div>积分抵扣：共{{detail.integral}}积分 可抵扣{{detail.maxPrice}}</div>
        <div  class="select"></div>
      </div>
      <div class="total-right">
        <span>合计：1件商品</span>
        <div>
          <span>共计：</span>
          <span class="price">&yen;{{detail.totalPrice}}</span>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      detail: {
        type: Object,
        default() {
          return {}
        }
      }
    },
  
    created() {
      console.log(this.detail)
    },
    // methods: {
    //   init() {
    //     if (this.detail.vip == 0) {
    //       this.get(this.detail.price)
    //     } else {
    //       this.get(this.detail.pricevip)
    //     }
    //   },
    //   get(price) {
    //     var max;
    //     if (this.detail.integral >= 10) {
    //       max = price * 1.15
    //       this.maxPrice = (this.detail.integral / 1000).toFixed(2)
    //       if (this.maxPrice >= max) {
    //         this.price = price - max;
    //       } else {
    //         this.price = price - this.maxPrice;
    //       }
    //     } else {
    //       this.maxPrice = 0;
    //       this.price = price;
    //     }
    //   }
    // }
  }

</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .course-info {
    padding: 30px;
    margin-top: 10px;
    box-sizing: border-box;
    background-color: $fc;

    .title {
      @include fa();
      position: relative;

      div:first-child {
        font-size: 20px;
        font-weight: 500;
        color: $tcolor;
        font-family: "PingFangSC-Medium", "PingFang SC";

      }

      div:nth-child(2) {
        margin-left: 10px;
        font-size: 16px;
        color: #ff4545;
      }
    }

    .title::before {
      content: "";
      @include pa(5px, -26px);
      @include wh(4px, 12px);
      display: inline-block;
      background-color: $tc;
      margin-right: 30px;
    }

    .table {
      margin-top: 30px;
      border: 1px solid #eee;

      .table-body {
        padding: 30px;
        @include fj();

        .left {
          color: $tcolor;
          font-weight: 500;
          font-family: "PingFangSC-Medium", "PingFang SC";
        }

        .right {
          color: #9899a1;

          span {
            margin-right: 60px;
          }

          span:last-child {
            margin: 0;
          }

          .num {
            color: #6a6a6f;
          }
        }
      }
    }

    .total {
      margin-top: 30px;
      @include fj();

      color: #9899a1;

      .total-left {
        @include fa();

        color: #fb9715;

        .select {
          @include wh(16px, 16px);

          margin-left: 5px;
          background-image: url(~assets/image/icon.png);
          background-position: -520px -92px;
        }
      }

      .total-right {
        display: flex;

        div {
          margin-left: 30px;

          .price {
            color: $tcolor;
          }
        }
      }
    }
  }
</style>