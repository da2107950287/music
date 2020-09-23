<template>
  <div class="pay-success">
    <div>
      <img src="../assets/image/icon_zfcg.png" alt />
      <div class="integral">购买成功，获得{{integral}}积分</div>
      <div class="tip">有效期从今天开始计算、请合理安排学习时间</div>
      <div class="order">
        <span>订单号：{{olId}}</span>
        <span @click="seeOrderDetail" class="default">查看详情</span>
      </div>
      <div class="pay-money">
        <span>支付金额：</span>
        <span>&yen;{{totalPrice}}</span>
      </div>
      <div class="btn">
        <div @click="go('/index/home')"  class="default">返回课程首页</div>
        <div @click="go('/index/user/course')"  class="default">进入学习中心</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        olId:"",
        totalPrice:null,
        integral:''
            
      }
    },
    created(){
      this.olId=this.$route.query.olId;
      this.totalPrice=this.$route.query.totalPrice;
      this.getIntegral()
    },
    methods:{
      go(link){
        this.$router.push({path:link})
      },
      seeOrderDetail(){
        this.$router.push({path:'/index/orderDetail',query:{olId:this.olId}});
      },
      getIntegral(){
        this.$post("/orderlist/showOrderlistIntegral",{olId:this.olId}).then(res=>{
          if(res.code==200){
            this.integral=res.data;
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

.pay-success {
  width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
  text-align: center;
  background-color: $fc;
  color: #9899a1;
  img {
  @include wh(60px,60px)
  }

  .integral {
    margin-top: 20px;
    color: $tcolor;
    font-size: 20px;
    line-height: 28px;
    font-family: "PingFangSC-Medium", "PingFang SC";
    font-weight: 500;
  }

  .tip {
    line-height: 22px;
    font-weight: 400;
  }
  .order {
    margin-top: 30px;
    line-height: 22px;
    span:nth-child(2) {
      margin-left: 10px;
      color: #0091ff;
    }
  }
  .pay-money {
    margin-top: 20px;
    line-height: 22px;

    span:nth-child(2) {
      color: $tcolor;
      font-family: "PingFangSC-Medium", "PingFang SC";
    }
  }
  .btn {
    margin-top: 60px;
    @include fj(center,center)
    div {
      @include whl(120px,40px,40px)
      text-align: center;
      font-size: 14px;
    }
    div:nth-child(1) {
      color: #6a6a6f;
      border: 1px solid #e8e8e8;
      background-color: #f7f7f7;
      box-sizing: border-box;
    }
    div:nth-child(2) {
      margin-left: 20px;
      background-color: $tc;
      color: $fc;
    }
  }
  .default{
    cursor: default;
  }
}
</style>