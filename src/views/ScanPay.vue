<template>
  <div>
    <div class="scan-pay">
      <div class="header">
        <div>
          <div>
            <span>课程：</span>
            <span>{{couName}}</span>
          </div>
          <div class="payee">
            <span>收款方：</span>
            <span>北京锐智互动网络科技有限公司</span>
          </div>
        </div>
        <div>
          <span>应付总额：</span>
          <span>&yen;{{totalPrice}}</span>
        </div>
      </div>
      <div class="content">
        <div class="left">
          <div class="text1">使用微信扫一扫支付，方便快捷！</div>
          <div class="text2">用微信扫一扫我支付哦！</div>
          <div id="qrcode" class="qrcode" ref="qrcode"></div>
          <img class="img" src="~assets/image/img_sys.png" alt />
        </div>
        <img src="~assets/image/img_sjmx.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
  import QRCode from "qrcodejs2";
  export default {
    data() {
      return {
        couName: "",//课程名称
        couId: "",//课程id
        integral: "",//积分
        // payMethod: "",//支付方式
        qrLink: "",//生成二维码的链接
        olId: "",//订单号
        totalPrice: "",//总价 
      };
    },
    //
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (from.path == "/") {//刷新页面
          vm.refresh()
        } else {
          vm.pay()
        }
      })
    },
    created() {
      //刷新页面前调用
      window.addEventListener("beforeunload", () => {
        localStorage.setItem("olId", this.olId)
      })
    },
    methods: {
      pay() {
       
        this.couName = this.$route.query.couName;
        this.fullname=this.$route.query.fullname;
        this.address=this.$route.query.address;
        this.mobile=this.$route.query.mobile;
        this.totalPrice = this.$route.query.totalPrice;
        if (!this.$route.query.hasOwnProperty("olId")) {//第一次支付
          this.couId = this.$route.query.couId;
          this.integral = this.$route.query.integral;
          // this.payMethod = this.$route.query.payMethod;
          // if (this.payMethod == 1) {
            this.wxPay();
          // } else {
          //   this.aliPay();
          // }
        } else {//再次支付
          this.olId = this.$route.query.olId;
          // this.payMethod = this.$route.query.payMethod;
          this.payAgain()
        }
      },
      //微信支付
      wxPay() {
        this.$post("/wx/buyCourse", {
          couId: this.couId,
          integral: this.integral,
          fullname: this.fullname,
          address: this.address,
          mobile: this.mobile,
          type: 1,
        }).then((res) => {
          if (res.code == 200) {
            this.qrLink = res.data.content;
            this.olId = res.data.olId;
            if (this.qrLink != "") {
              this.$nextTick(() => {
                this.qrcode();
              });
            }
          }
        });
      },
      // //支付宝支付
      // aliPay() {
      //   this.$post("/alipay/buyCourse", {
      //     couId: this.couId,
      //     integral: this.integral,
      //     type: 1,
      //   }).then((res) => {
      //     if (res.code == 200) {
      //       this.qrLink = res.data;
      //       const div = document.createElement("divform");
      //       div.innerHTML = res.data;
      //       document.body.appendChild(div);
      //       // document.forms[0].acceptCharset='GBK'; //保持与支付宝默认编码格式一致，如果不一致将会出现：调试错误，请回到请求来源地，重新发起请求，错误代码 invalid-signature 错误原因: 验签出错，建议检查签名字符串或签名私钥与应用公钥是否匹配
      //       document.forms[0].submit();
      //     }
      //   });
      // },
      
      //生成二维码
      
      qrcode() {
     
        let qr = new QRCode("qrcode", {
          width: 180,
          height: 180,
          text: this.qrLink,
        });
        this.getOrderstate()
      },
      //刷新页面
      refresh() {
        //刷新页面，拿到订单id，查询是否是待支付状态，如果是待支付，就调用再支付方法，如果订单状态已取消？？？
        this.olId = localStorage.getItem("olId");
        // this.payMethod = localStorage.getItem("payMethod")
        this.$post("/orderlist/showOrderlist", { olId: this.olId }).then(res => {
          if (res.code == 200) {
            if (res.data.olState == 1) {//订单状态待支付
              this.couId = res.data.olId;
              // this.payMethod = res.data.payMethod;
              this.couName = res.data.orderlistCourse[0].couName;
              this.totalPrice = res.data.payPrice;
              this.payAgain();
            }
          }
        })
      },
      //再次支付
      payAgain() {
        this.$post("/wx/buyOrderlist", { olId: this.olId, type: 1 }).then(res => {
          if (res.code == 200) {
            this.qrLink = res.data.content;
            if (this.qrLink != "") {
              this.$nextTick(() => {
                this.qrcode();
              });
            }
          }
        })
      },
      //轮询是否支付成功
      getOrderstate() {
        let num = 3 * 60;
        window.timer = setInterval(() => {
          num--;
          this.$post("/orderlist/showOrderlist", { olId: this.olId }).then(res => {
            if (res.code == 200) {
              if (res.data.olState != 1 && res.data.olState != 6) {
                  console.log("支付完成")
                this.$post("/orderlist/showOrderlist", { olId: this.olId }).then(res => {
                  if (res.code == 200) {
                    this.$router.push({ path: '/index/paySuccess', query: { olId: this.olId, totalPrice: this.totalPrice } });
                    clearInterval(timer)
                  }
                })
              } else {
                console.log(888)
              }
            }
          })
          if (num < 0) {
            clearInterval(timer);
          }
        }, 5000)
      }
    },
    destroyed() {
      if (window.timer) {
        clearInterval(timer)
      }

    }
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";
  .scan-pay {
    width: 1200px;
    margin: auto;
    background-color: $fc;
    margin-bottom: 30px;
  }

  .header {
    padding: 30px;
   @include fj()
    line-height: 22px;
    color: #9899a1;
    border-bottom: 1px solid #ddd;

    .payee {
      margin-top: 10px;
    }

    div {
      span:nth-child(2) {
        color: $tcolor;
      }
    }
  }

  .content {
    display: flex;
    padding: 42px 200px 49px;
    justify-content: space-between;

    .left {
      display: flex;
      flex-direction: column;
      align-items: center;

      .qrcode {

        margin: 20px 0;
        padding: 10px;
        border: 1px solid #ddd;
      }

      .text1 {
        color: #7e7b7e;
        font-size: 26px;

      }

      .text2 {
        margin-top: 20px;
        color: #9899a1;
      }

      .img {
        @include wh(200px,67px);

      }
    }
  }
</style>