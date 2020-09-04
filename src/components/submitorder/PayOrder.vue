<template>
  <div class="pay-order">
    <div class="title">
      <div>支付订单</div>
    </div>
    <div class="table">
      <div class="table-header">
        <span>在线支付</span>
        <span>(微信/支付宝支付)</span>
      </div>
      <div class="table-body">
        <el-radio-group v-model="payMethod" fill="$tc">
          <el-radio :label="1">
            <div class="btns">
              <div class="btn wx"></div>
              <span>微信支付</span>
            </div>
          </el-radio>
          <el-radio :label="2">
            <div class="btns">
              <div class="btn zfb"></div>
              <span>支付宝支付</span>
            </div>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="total">
      <span>应付总额：</span>
      <span class="price">&yen;{{totalPrice}}</span>
    </div>
    <div class="confirm-btn">
      <div @click="pay">确认付款</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        payMethod: 1,
      };
    },
    props: ["totalPrice"],
    methods: {
      pay() {
        this.$emit("pay", this.payMethod)
      }
    }
  };
</script>
<style lang="scss" scoped>
    @import "~assets/css/mixin";

  .pay-order {
    padding: 30px;
    margin: 10px 0 30px;
    box-sizing: border-box;
    background-color: $fc;

    .title {
     @include fa();
      position: relative;

      div:first-child {
        font-size: 20px;
        font-weight: 500;
        color: $tcolor;
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
      @include wh(4px,12px);
      @include pa(5px,-26px);
      position: absolute;

      display: inline-block;
    
      background-color: $tc;
      margin-right: 30px;
    }

    .table {
      margin-top: 30px;
      background-color: #f7f7f7;
      border: 1px solid #ddd;

      .table-header {

        @include wh(242px,50px);
        text-align: center;
        line-height: 50px;
        color: $tcolor;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;

        span:nth-child(2) {
          font-size: 12px;
          color: #9899a1;
        }
      }

      .table-body {
        padding: 30px 40px 40px;
        display: flex;

        .el-radio-group {
          display: flex;
        }

        .el-radio {
       @include fa();
        }

        .btns {
          @include fj(center);
          @include wh(146px,46px);
          margin-left: 10px;
          color: $tcolor;
          border: 1px solid #ddd;
          background-color: $fc;

          .btn {
            @include wh(32px,32px);
            margin-right: 10px;
            background-image: url(~assets/image/icon.png);

          }

          .wx {
            background-position: -440px -187px;
          }

          .zfb {
            background-position: -502px -187px;

          }
        }
      }
    }

    .total {
      @include fj(flex-end)
      margin-top: 30px;
  
      color: #9899a1;

      .price {
        color: $tcolor;
      }
    }

    .confirm-btn {
      @include fj(flex-end)


      div {
        @include wh(204px,56px);
        margin-top: 40px;

        line-height: 56px;
        text-align: center;
        font-size: 24px;
        color: $fc;
        background-color: $tc;
        border-radius: 2px;
        cursor: default;

      }
    }
  }

  .el-radio /deep/ .el-radio__label {
    padding: 0;
  }

  // 添加颜色类
  .el-radio /deep/ .el-radio__input.is-checked+.el-radio__label {
    color: $tc;
  }

  .el-radio /deep/ .el-radio__input.is-checked .el-radio__inner {
    background: $tc;
    border-color: $tc;
  }
</style>