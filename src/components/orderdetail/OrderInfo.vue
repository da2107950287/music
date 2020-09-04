<template>
  <div class="good-info">
    <div class="title">
      <div>订单信息</div>
    </div>
    <div class="table">
      <div class="table-body">
        <div class="list" v-if="detail.olState==5">
          <div>
            <span>订单编号：</span>
            <span>{{detail.olId}}</span>
          </div>
          <div>
            <span>下单时间：</span>
            <span>{{detail.olTime}}</span>
          </div>
          <div>
            <span>支付时间：</span>
            <span>{{detail.payTime}}</span>
          </div>
          <div>
            <span>支付方式：</span>
            <span v-if="detail.payMethod==1">支付宝</span>
            <span v-else-if="detail.payMethod==2">微信</span>
            <span v-else>苹果内购</span>
          </div>
          <div>
            <span>支付金额：</span>
            <span>&yen;{{detail.payPrice}}</span>
          </div>
        </div>
        <div class="list" v-else>
          <div>
            <span>下单号码：</span>
            <span>{{detail.olId}}</span>
          </div>
          <div>
            <span>下单时间：</span>
            <span>{{detail.olTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props:{
      detail:{
        type:Object,
        default(){
          return {}
        }
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
      font-family:"PingFangSC-Medium","PingFang SC";
    }
    div:nth-child(2) {
      margin-left: 10px;
      color: #ff4545;
    }
  }
  .title::before {
    content: "";
    @include pa(5px,-26px);
    @include wh(4px,12px);
    display: inline-block;
    background-color: $tc;
    margin-right: 30px;
  }
  .table {
    margin-top: 20px;
    border: 1px solid #eee;
    .table-body {
      padding:  0 30px 30px;
      @include fj();
      .list{
         
          div{
              margin-top: 30px;
              color: $tcolor;
              span:nth-child(1){
                  margin-right: 30px;
                  color:#6A6A6F
              }
          }
      }
    }
  }
}
</style>