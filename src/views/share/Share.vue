<template>
  <div class="bgi" @touchstart="gotouchstart" @touchmove="gotouchmove" @touchend="gotouchend">
    <div class="code">您的邀请码为：<span>{{code}}</span></div>
    <div class="qrcode-box">
      <img class="qrcode" src="~assets/image/img_qr.png" alt="">
      <div class="">长按图片复制链接在浏览器中打开下载APP</div>
    </div>
    <div class="tips">1.点击右上角分享邀请链接，朋友通过连接注册<br />
      2.分享专属邀请二维码，朋友扫码注册
    </div>
  </div>
</template>
<script>
  import QRCode from "qrcodejs2";
  import { getRequest } from "assets/js/utils.js"
  export default {
    data() {
      return {
        // qrLink: '',
        code: '',
        timeOutEvent: 0
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // this.qrLink = getRequest().qrLink;
        this.code = getRequest().code;
        // this.$nextTick(() => {
        //   this.qrcode()
        // })
      },
      //生成二维码
      qrcode() {
        let qr = new QRCode("qrcode", {
          width: 180,
          height: 180,
          text: this.qrLink,
        });

      },
      gotouchstart() {
        let that = this;
        clearTimeout(this.timeOutEvent);//清除定时器
        this.timeOutEvent = 0;
        this.timeOutEvent = setTimeout(()=> {
          //执行长按要执行的内容，
          // this.copyText("nihao")
          this.copy()
        }, 6000);//这里设置定时
      },
      //   //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
      gotouchend() {
        clearTimeout(this.timeOutEvent);
        if (this.timeOutEvent != 0) {
          //这里写要执行的内容（尤如onclick事件）
         this.copy()
        }
      },
      //   //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按 
      gotouchmove() {
        clearTimeout(this.timeOutEvent);//清除定时器
        this.timeOutEvent = 0;
      },
      copy(){
        this.$copyText("123456").then(function (e) {
               console.log('Copied')
               console.log(e)
           }, function (e) {
               console.log('Can not copy')
               console.log(e)
           })
      },
      /**复制文本 */
      copyText(node) {
        console.log(node)
        if (!node) {
          return;
        }
        var result;
        // 将复制内容添加到临时textarea元素中
        var tempTextarea = document.createElement('textarea');
        document.body.appendChild(tempTextarea);
        if (typeof (node) == 'object') {
          // 复制节点中内容
          // 是否表单
          if (node.value) {
            tempTextarea.value = node.value;
          } else {
            tempTextarea.value = node.innerHTML;
          }
        } else {
          // 直接复制文本
          tempTextarea.value = node;
        }
        // 判断设备
        var u = navigator.userAgent;
        if (u.match(/(iPhone|iPod|iPad);?/i)) {
          // iOS
          // 移除已选择的元素
          window.getSelection().removeAllRanges();
          // 创建一个Range对象
          var range = document.createRange();
          // 选中
          
          range.selectNode(tempTextarea);
          // 执行选中元素
          window.getSelection().addRange(range);
          // 复制
          result = document.execCommand('copy');
          // 移除选中元素
          window.getSelection().removeAllRanges();

        } else {
          // 选中    
          tempTextarea.select();
          // 复制
          result = document.execCommand('Copy');
        }
        // 移除临时文本域
        document.body.removeChild(tempTextarea);
        // if (result) {
        //   alert('复制成功', {
        //     removeTime: 1000
        //   })
        // } else {
        //   alert('复制失败', {
        //     removeTime: 1000
        //   })
        // }

        return result;
      }
      
    }
  }
</script>
<style lang="scss" scoped>
 *{
-webkit-user-select: auto;
}
  .bgi {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(~assets/image/bg_yqhy.png);
    background-size: 100% 100%;
  }

  .code {
    position: absolute;
    top: 37.5%;
    left: 21%;
    font-family: "PingFangSC-Semibold", "PingFang SC";
    font-weight: 600;
    color: #98B702;

    span {
      color: #FB9715;
    }
  }

  .qrcode-box {
    position: absolute;
    top: 54%;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #999999;
    line-height: 17px;


    .qrcode {
      width: 130px;
      height: 130px;

      margin-bottom: 10px;
    }
  }

  .tips {
    position: absolute;
    bottom: 5%;
    left: 5.3%;
    line-height: 30px;
    font-size: 14px;
    color: #ffffff;
  }
</style>