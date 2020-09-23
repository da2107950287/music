<template>
  <div class="good-info">
    <div class="title">
      <div>商品信息</div>
    </div>

    <div v-for="(item,index) in goodInfo.courses" :key="index">
      <div class="table" @click="seeCourse(item.couId,item.couType)">
        <div class="table-body">
          <div class="left">{{item.couName}}</div>
          <div class="right">
            <span>总课时：{{item.totalHours}}</span>
            <span v-if="item.isnotvip==0">&yen;{{item.price|priceFormat}}</span>
            <span v-else>&yen;{{item.pricevip|priceFormat}}</span>
            <span class="num">&times;{{item.number}}</span>
          </div>
        </div>
      </div>
      <div class="total">
        <span>合计：{{goodInfo.courses.length}}件商品</span>
        <span style="text-indent: 2rem;">积分抵扣：使用{{goodInfo.integral}}积分&nbsp&nbsp&nbsp抵扣&yen;{{maxPrice}}</span>
        <div>
          <span>共计：</span>
          <span class="price">&yen;{{goodInfo.payPrice|priceFormat}}</span>
        </div>
      </div>
      <div class="btn-box">
        <div class="cancel btn" v-if="goodInfo.olState==1" @click="cancelOrder(item.olId)">取消订单</div>
        <div class="pay btn" v-if="goodInfo.olState==1" @click="toPay(item.olId,item.couName)">去支付</div>
        <div class="cancel btn" v-show="goodInfo.olState==3" @click="confirm(item.olId)">确认收货</div>
        <div class="study btn" v-if="goodInfo.olState==2 ||goodInfo.olState==3 || goodInfo.olState==5"
          @click="toStudy(item.couId)">去学习</div>
        <div class="pay btn" v-if="goodInfo.olState==6" @click="buyAgain(item.couType,item.couId)">再次购买</div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    inject: ['reload'],
    props: {
      goodInfo: {
        type: Object,
        default() {
          return {}
        }
      }
      // courses: {
      //   type: Array,
      //   default() {
      //     return []
      //   }
      // },
      // olState: {
      //   type: String,
      //   default() {
      //     return ''
      //   }
      // },
      // payPrice: {},
      // payMethod: {}
    },
    filters: {
      priceFormat(value) {
        return Number(value).toFixed(2)
      }
    },
    computed: {
      maxPrice() {
        return this.goodInfo.integral / 1000;
      }
    },
    methods: {
      cancelOrder(olId) {
        this.$confirm('你确定要取消该订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$post("/orderlist/updateOrderlist", { olId, olState: 6 }).then(res => {
            if (res.code == 200) {
              this.reload()
            }
          })
        })
      },
      toPay(olId, couName) {
        if (this.goodInfo.payMethod == 1) {
          //支付宝支付
          this.$post("/alipay/buyOrderlist", {
            olId: olId,
            type: 1,
          }).then((res) => {
            if (res.code == 200) {
              this.qrLink = res.data;
              console.log(this.qrLink)
              const div = document.createElement("divform");
              div.innerHTML = res.data;
              document.body.appendChild(div);
              // document.forms[0].acceptCharset = 'GBK'; //保持与支付宝默认编码格式一致，如果不一致将会出现：调试错误，请回到请求来源地，重新发起请求，错误代码 invalid-signature 错误原因: 验签出错，建议检查签名字符串或签名私钥与应用公钥是否匹配
              document.forms[0].submit();
            }
          });
        } else if (this.goodInfo.payMethod == 2) {
          //跳转到微信支付
          this.$router.push({ path: '/index/scanPay', query: { olId, couName, totalPrice: this.goodInfo.payPrice } });
        } // this.$router.push({ path: '/index/scanPay', query: { olId,payMethod:this.payMethod, couName, totalPrice:this.payPrice } });

      },
      toStudy(couId) {
        this.$router.push({ path: '/index/courseLearning', query: { couId } })
      },
      buyAgain(payMethod, couId) {
        this.$router.push({ path: "/index/submitOrder", query: { payMethod, couId } })
      },

      seeCourse(couId, couType) {
        this.$router.push({ path: '/index/detail', query: { couId } })
      },
      //确认收货
      confirm(olId) {
        this.$confirm('你确认已收到货物?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {

          this.$post("/orderlist/updateOrderlist", { olId, olState: 4 }).then(res => {
            if (res.code == 200) {
              this.reload();
            }
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .good-info {
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
      @include pa(5px, -26px) @include wh(4px, 12px) display: inline-block;

      background-color: $tc;
      margin-right: 30px;
    }

    .table {
      margin-top: 20px;
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

          span:nth-child(2) {
            margin: 0 60px;
          }

          .num {
            color: #6A6A6F;
          }
        }
      }
    }

    .total,
    .btn-box {

      @include fj(flex-end, center);

      div {
        cursor: default;
      }
    }

    .total {
      margin: 30px 0;
      color: #9899a1;

      div {
       
        text-indent: 2rem;

        .price {
          color: $tcolor;
          font-family: "PingFangSC-Medium", "PingFang SC";
        }
      }
    }

    .btn-box {
      .btn {
        @include whl(108px, 32px, 32px);

        text-align: center;
        border-radius: 2px;
        margin-left: 15px;
        font-size: 14px;
      }

      .cancel {
        box-sizing: border-box;
        color: $tcolor;
        background-color: #f7f7f7;
        border: 1px solid #ddd;
      }

      .pay {
        color: $fc;
        background-color: $tc;
      }

      .study {
        color: $fc;
        background-color: #fb9715;
      }
    }
  }
</style>