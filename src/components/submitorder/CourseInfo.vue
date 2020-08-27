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
        <div>积分抵扣：共{{detail.integral}}积分 可抵扣{{detail.integral/100}}</div>
        <div class="select"></div>
      </div>
      <div class="total-right">
        <span>合计：1件商品</span>
        <div>
          <span>共计：</span>
          <span v-if="detail.vip==0" class="price">&yen;{{detail.price}}</span>
          <span v-else class="price">{{detail.pricevip}}</span>
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
    }
  }
</script>
<style lang="scss" scoped>
  .course-info {
    padding: 30px;
    margin-top: 10px;
    box-sizing: border-box;
    background-color: #fff;

    .title {
      display: flex;
      align-items: center;
      position: relative;

      div:first-child {
        font-size: 20px;
        font-weight: 500;
        color: #36363a;
        font-family:"PingFangSC-Medium","PingFang SC";

      }

      div:nth-child(2) {
        margin-left: 10px;
        font-size: 16px;
        color: #ff4545;
      }
    }

    .title::before {
      content: "";
      position: absolute;
      top: 5px;
      left: -26px;
      display: inline-block;
      width: 4px;
      height: 12px;
      background-color: #98b702;
      margin-right: 30px;
    }

    .table {
      margin-top: 30px;
      border: 1px solid #eee;

      .table-body {
        padding: 30px;
        display: flex;
        justify-content: space-between;

        .left {
          color: #36363a;
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
      display: flex;
      justify-content: space-between;
      color: #9899a1;

      .total-left {
        display: flex;
        align-items: center;
        color: #fb9715;

        .select {
          width: 16px;
          height: 16px;
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
            color: #36363a;
          }
        }
      }
    }
  }
</style>