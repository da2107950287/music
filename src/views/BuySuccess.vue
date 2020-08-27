<template>
  <div class="buy-success">
    <div class="content">
      <img src="assets/image/icon_zfcg.png" alt />
      <div class="clues">购买成功，获取1000积分</div>
      <div class="text">有效期从今天开始计算、请合理安排学习时间</div>
      <div class="order-box">
        <span>订单号：9377800392</span>
        <span>查看详情</span>
      </div>
      <div class="money">
        <span>支付金额：</span>
        <span>&yen;299.00</span>
      </div>
      <div class="btn-box">
        <div class="to-home btn">返回课程首页</div>
        <div class="to-study btn">进入学习中心</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  width: 1200px;
  height: 453px;
  margin: 0 auto;
  padding: 60px 0;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
  color: #9899a1;
  line-height: 22px;
  font-weight: 400;
  .clues {
    margin-top: 20px;
    color: #36363a;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500px;
    font-family: "PingFangSC-Medium", "PingFang SC";
  }
  .text {
    margin-top: 10px;
  }
  .order-box {
    margin-top: 30px;
    span:nth-child(2) {
      margin-left: 10px;
      color: #0091ff;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .money {
    margin-top: 19px;
    span:nth-child(2) {
      color: #36363a;
    }
  }
  .btn-box {
      margin-top: 60px;
      display: flex;
      justify-content: center;
    .btn {
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-weight: 400;
      font-size: 14px;
      border-radius: 2px;
    }
    .to-home{
        box-sizing: border-box;
        color: #6A6A6F;
        background-color: #f7f7f7;
        border: 1px solid #e8e8e8;
    }
    .to-study{
        margin-left: 20px;
        color: #fff;
        background-color: #98B702;
    }
    
  }
}
</style>