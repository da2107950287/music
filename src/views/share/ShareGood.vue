<template>
  <div class="shareGood">
    <div class="top">
      <div>下载APP购买商品</div>
      <router-link to="/download" class="open">下载</router-link>
    </div>
    <el-carousel height="200px" indicator-position="inside">
      <el-carousel-item v-for="item in goodDetail.cdyPurl" :key="item">
        <img v-lazy="item" alt class="slideshow" />
      </el-carousel-item>
    </el-carousel>
    <div class="good-detail">
      <div class="good-name">{{goodDetail.cdyName}}</div>
      <div>
        <div class="flex price-box">
          <span class="font12">邮费{{goodDetail.postage}}，会员包邮</span>
          <div class="flex">
            <img src="~assets/image/icon_vip.png" class="vip-icon" />
            <span class="font12 pricevip">&yen;{{goodDetail.pricevip}}</span>
            <span class="font12 price">&yen;{{goodDetail.price}}</span>
          </div>
        </div>
        <div class="flex tag">
          <div class="flex">
            <img src="~assets/image/icon_xz.png" class="tag-img" alt />
            <span class="font12">7天无理由退货</span>
          </div>
          <div class="flex">
            <img src="~assets/image/icon_xz.png" alt />
            <span class="font12">正品保证</span>
          </div>
          <div class="flex">
            <img src="~assets/image/icon_xz.png" alt />
            <span class="font12">极速退款</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="intro">
      <span class="title">商品详情</span>
      <div v-html="goodDetail.intro" class="html-img"></div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="title">商品评价（{{number}}）</div>
      <div>
        <div class="coment-content-box" v-for="(item,index) in comment" :key="index">
          <div class="flex coment-content">
            <img v-lazy="item.headportrait" alt class="avator" />
            <div class="comment-right">
              <div class="flex">
                <div>
                  <span class="nickname">{{item.nickname}}</span>
                  <el-rate v-model="item.star"></el-rate>
                </div>
                <div class="ce-time">{{item.ceTime}}</div>
              </div>
              <div>
                <div class="content">{{item.content}}</div>
              
                <div class="imgs">
                  <img v-for="(el,index) in item.cePurl" :class="{'one':item.cePurl.length<=2,'four':item.cePurl.length==4}"
                    v-lazy="el" :key="index" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getRequest } from "assets/js/utils.js"
  export default {
    name: "sharegood",
    data() {
      return {
        cdyId: "",
        goodDetail: {},
        PageNumber: 1,
        PageSize: 10,
        comment: [],
        number: 0,
      };
    },
    created() {
      this.cdyId = getRequest().cdyId;
      this.$post("/commodity/showCommodity", { cdyId: this.cdyId }).then(
        (res) => {
          if (res.code == 200) {
            this.goodDetail = res.data;
            console.log(this.goodDetail.cdyPurl);
            this.goodDetail.cdyPurl = this.goodDetail.cdyPurl.split(",");
          }
        }
      );
      this.$post("/commodity/getCommodityEvaluate", {
        cdyId: this.cdyId,
        PageNumber: this.PageNumber,
        PageSize: this.PageSize,
      }).then((res) => {
        if (res.code == 200) {
          this.comment = res.data.list;
          this.number = res.data.count;
          this.comment.forEach((item, index) => {
            this.comment[index].ceTime = item.ceTime.substr(0, 10);
            if( this.comment[index].cePurl){

              this.comment[index].cePurl = item.cePurl.split(",");

            }else{
              this.comment[index].cePurl=[]
            }
          });
        }
      });
    },
  };
</script>
<style lang="scss" scoped>
  a {
    text-decoration: none;
  }

  .html-img /deep/ div {
    width: 100% !important;
    box-sizing: border-box;


  }

  .html-img /deep/ video {
    width: 100% !important;

  }

  .html-img /deep/ img {
    width: 100%;


  }

  .slideshow {
    width: 100%;
    height: 200px;
  }

  .shareGood {

    width: 100%;
    height: 100%;

    .top {
      height: 40px;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #98b702;
      color: #fff;

      .open {
        display: inset-block;
        width: 52px;
        height: 23px;

        border-radius: 2px;
        text-align: center;
        line-height: 23px;
        background-color: #fff;
        color: #36363a;
        font-size: 12px;
        font-family: "PingFangSC-Medium", "PingFang SC";
      }
    }

    .flex {
      display: flex;
      align-items: center;
    }

    .good-detail {
      padding: 15px;

      .good-name {
        font-family: "PingFangSC-Semibold", "PingFang SC";
        font-weight: 600;
        color: #333333;
      }

      .font12 {
        font-size: 12px;
        font-family: "PingFangSC-Regular", "PingFang SC";
        font-weight: 400;
        color: #6a6a6f;
      }

      .price-box {
        margin-top: 10px;
        justify-content: space-between;

        .vip-icon {
          width: 16px;
          height: 9px;
        }

        .pricevip {
          font-size: 10px;
        }

        .price {
          margin-left: 10px;
          font-size: 24px;
          font-family: "DINAlternate-Bold", "DINAlternate";
          font-weight: bold;
          color: #36363a;
        }
      }

      .tag {
        margin-top: 24px;
        justify-content: space-between;

        .tag-img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }

    .title {
      padding: 20px 15px 15px;

      font-family: "PingFangSC-Medium", "PingFang SC";
      font-weight: 500;
      color: #36363a;
    }

    .intro {}

    .comment {
      padding: 0 15px;

      .title {
        padding-left: 0;
      }

      .coment-content-box {
        margin-bottom: 15px;
      }

      .coment-content {
        align-items: flex-start;
      }

      .avator {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        border-radius: 50%;
      }

      .comment-right {
        width: 100%;

        .flex {
          justify-content: space-between;
          align-items: center;
        }

        .nickname {
          font-size: 14px;
          font-weight: 400;
          color: #36363a;
        }

        .ce-time {
          font-size: 12px;

          font-weight: 400;
          color: #9899a1;
          line-height: 17px;
        }

        .content {
          margin-bottom: 10px;

          font-size: 14px;

          font-weight: 400;
          color: #6a6a6f;
        }

        .imgs {
          /* display: flex;
          flex-wrap: wrap; */
          img {
            width: 28.6%;
            height: 80px;
            margin-right: 2%;
            margin-top: 2%;
          }
          .one {
            flex-grow: 1;
          }

          .four {
            width: 48%;
          }

        }


      }
    }
  }
</style>