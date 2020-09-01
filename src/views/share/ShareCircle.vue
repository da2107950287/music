<template>
  <div class="shareCircle">
    <div class="dynamic-details flex">
      <img class="avator" :src="dynamicDetails.headportrait" alt />
      <div class="right">
        <div class="right-top flex">
          <div class="releaseinfo flex">
            <div>{{dynamicDetails.nickname}}</div>
            <div v-if="dynamicDetails.vip!=0" class="level">{{dynamicDetails.vip}}</div>
            <img src="~assets/image/icon_rz.png" v-if="dynamicDetails.auth!=0" class="auth" />
          </div>
          <div class="add-attention">+关注</div>
        </div>
        <div class="right-content">
          <div class="content">{{dynamicDetails.content}}</div>
          <div class="imgs">
            <img v-for="(item,index) in dynamicDetails.picture" :src="item" :key="index" class="picture" />
          </div>
        </div>
        <div class="circle flex">
          <div class="flex" v-if="dynamicDetails.circleEntity">
          
            <img :src="dynamicDetails.circleEntity.cirCover" class="avator">
            <div class="circle-name">{{dynamicDetails.circleEntity.cirName}}</div>
          </div>
          <div class="dy-time">发布于 {{dynamicDetails.dyTime}}</div>
        </div>
      </div>
    </div>
    <div class="comment">
      <div class="number">评论（{{number}}）</div>
      <!--  -->
      <div class=" flex" v-for="(item,index) in comment" :key="index">
        <img class="avator" :src="item.headportrait" alt />
        <div class="right">
          <div class="right-top flex">
            <div class="releaseinfo flex">
              <div>{{item.nickname}}</div>
              <div v-if="item.vip!=0" class="level">{{dynamicDetails.vip}}</div>
            </div>
          </div>
          <div class="right-content">
            <div class="content">{{item.content}}</div>
          </div>
          <div class="circle flex">
            <div class="dy-time">{{item.dc2Time}}</div>
            <div class="dy-time">回复</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dyId: "20200729145536t2eaa0",
        dynamicDetails: {},
        comment:[],
        PageNumber: 1,
        PageSize: 10,
        number: 0
      };
    },
    created() {
      this.$post("/circle/showDynamic", { dyId: this.dyId }).then((res) => {
        if (res.code == 200) {
          this.dynamicDetails = res.data;
          this.dynamicDetails.picture = this.dynamicDetails.picture.split(",");
          this.dynamicDetails.dyTime = this.dynamicDetails.dyTime.substr(0, 16)
        }
      });

      this.$post("/circle/getOneDynamicComment", { dyId: this.dyId, PageNumber: this.PageNumber, PageSize: this.PageSize }).then((res) => {
        if (res.code == 200) {
          this.comment = res.data.list;
          this.number = res.data.number;
          this.comment.forEach((item,index) => {
            this.comment[index].dc2Time=item.dc2Time.substr(0, 16)
          });
        }
      });
    },
  };
</script>
<style lang="scss" scoped>
  .shareCircle {
    width: 375px;

    .flex {
      display: flex;
    }

    .dynamic-details {
      padding: 15px;

    }

    .comment {
      margin-top: 10px;
      padding: 15px;
      box-sizing: border-box;
      
      .number {

        font-size: 14px;
        font-family: "PingFangSC-Medium", "PingFang SC";
        font-weight: 500;
        color: #36363A;
      }
      >.flex{
        width: 100%;
        margin-top: 15px;
      }
    }

    .avator {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .right {
      margin-left: 10px;
      width: 100%;
      .right-top {
        justify-content: space-between;

        .releaseinfo {
          align-items: center;
          font-size: 14px;
          font-family: "PingFangSC-Medium", "PingFang SC";
          font-weight: 500;
          color: #36363a;

          .level {
            width: 34px;
            height: 18px;
            margin: 0 2px;
            text-indent: 21px;
            line-height: 20px;
            font-size: 10px;
            font-family: " PingFangSC-Semibold", "PingFang SC";
            font-weight: 600;
            color: #ffffff;
            background-image: url(~assets/image/icon_vip_bg.png);
            background-size: 100% 100%;
          }

          .auth {
            width: 18px;
            height: 18px;
          }
        }

        .add-attention {
          width: 46px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 11px;
          font-family: "PingFangSC-Medium", " PingFang SC";
          font-weight: 500;
          background-color: #98b702;
          border-radius: 10px;
          color: #fff;
        }
      }

      .content {
        margin-top: 6px;

        font-size: 14px;
        font-family: "PingFangSC-Regular", "PingFang SC";
        font-weight: 400;
        color: #6a6a6f;
      }

      .imgs {
        margin-top: 15px;

        img {
          width: 303px;
        }
      }

      .circle {
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;

        .flex {
          align-items: center;

          .circle-name {
            margin-left: 5px;

            font-size: 11px;
            font-family: "PingFangSC-Medium", "PingFang SC";
            font-weight: 500;
            color: #36363A;
          }
        }

        .dy-time {

          font-size: 11px;
          font-family: "PingFangSC-Regular", "PingFang SC";
          font-weight: 400;
          color: #9899A1;
        }

      }
    }
  }


  .auth {
    width: 18px;
    height: 18px;
  }
</style>