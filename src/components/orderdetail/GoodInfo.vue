<template>
  <div class="good-info">

    <div class="title">
      <div>商品信息</div>
    </div>
    <div v-for="(item,index) in courses" :key="index">
      <div class="table" @click="seeCourse(item.couId,item.couType)">
        <div class="table-body">
          <div class="left">{{item.couName}}</div>
          <div class="right">
            <span>总课时：{{item.totalHours}}</span>
            <span v-if="item.isnotvip==0">&yen;{{item.price}}</span>
            <span v-else>&yen;{{item.pricevip}}</span>
            <span class="num">&times;{{item.number}}</span>
          </div>
        </div>
      </div>
      <div class="total">
        <span>合计：{{courses.length}}件商品</span>
        <div>
          <span>共计：</span>
          <span class="price">&yen;{{payPrice}}</span>
        </div>
      </div>
      <div class="btn-box">
        <div class="cancel btn" v-if="olState==1" @click="cancelOrder(item.olId)">取消订单</div>
        <div class="pay btn" v-if="olState==1" @click="toPay(item.olId,item.couName)">去支付</div>
        <div class="study btn" v-if="olState==5" @click="toStudy(item.couType,item.couId)">去学习</div>
        <div class="pay btn" v-if="olState==6" @click="buyAgain(item.couType,item.couId)">再次购买</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    inject: ['reload'],
    props: {
      courses: {
        type: Array,
        default() {
          return []
        }
      },
      olState: {
        type: String,
        default() {
          return ''
        }
      },
      payPrice:{
     
      },
      payMethod:{
   
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
      toPay(olId,couName) {
        this.$router.push({ path: '/index/scanPay', query: { olId,payMethod:this.payMethod, couName, totalPrice:this.payPrice } });

      },
      toStudy() {
        this.$router.push({ path: "/index/detail", query: { couType, couId } })
      },
      buyAgain(payMethod, couId) {
        this.$router.push({ path: "/index/submitOrder", query: { payMethod, couId } })
      },

      seeCourse(couId, couType) {
        this.$router.push({ path: '/index/detail', query: { couId } })
      }

    }
  }
</script>
<style lang="scss" scoped>
  .good-info {
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
      margin-top: 20px;
      border: 1px solid #eee;

      .table-body {
        padding: 30px;
        display: flex;
        justify-content: space-between;

        .left {
          color: #36363a;
          font-weight: 500;
          font-family:"PingFangSC-Medium","PingFang SC";
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
      display: flex;
      justify-content: flex-end;

      div {
        cursor: default;
      }
    }

    .total {
      margin: 30px 0;
      color: #9899a1;

      div {
        margin-left: 30px;

        .price {
          color: #36363a;
          font-family:"PingFangSC-Medium","PingFang SC";
        }
      }
    }

    .btn-box {
      .btn {
        width: 108px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 2px;
        margin-left: 15px;
        font-size: 14px;
      }

      .cancel {
        box-sizing: border-box;
        color: #36363a;
        background-color: #f7f7f7;
        border: 1px solid #ddd;
      }

      .pay {
        color: #fff;
        background-color: #98b702;
      }

      .study {
        color: #fff;
        background-color: #fb9715;
      }
    }
  }
</style>