<template>
  <div class="shareCircle">
    <div class="top">
      <div>下载查看更多</div>
      <router-link to="/download" class="open">下载</router-link>
    </div>
    <div class="dynamic-details flex">
      <img class="avator" v-lazy="dynamicDetails.headportrait" alt />
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

          <div v-if="dynamicDetails.dyType==2" class="imgs">
            <img
              v-for="(item,index) in dynamicDetails.picture"
              v-lazy="item"
              :key="index"
              :class="{'one':dynamicDetails.picture.length<=2,'four':dynamicDetails.picture.length==4}"
              class="picture"
            />
          </div>
          <video v-else :src="dynamicDetails.picture" class="video"></video>
        </div>
        <div class="circle flex">
          <div class="flex" v-if="dynamicDetails.circleEntity">
            <img v-lazy="dynamicDetails.circleEntity.cirCover" class="avator" />
            <div class="circle-name">{{dynamicDetails.circleEntity.cirName}}</div>
          </div>
          <div class="dy-time">发布于 {{dynamicDetails.dyTime}}</div>
        </div>
      </div>
    </div>
    <div class="comment">
      <div class="number">评论（{{number}}）</div>
      <div class="flex" v-for="(item,index) in comment" :key="index">
        <img class="avator" v-lazy="item.headportrait" alt />
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
import { getRequest } from "assets/js/utils.js";
export default {
  name:"sharecircle",
  data() {
    return {
      dyId: "",
      dynamicDetails: {},
      comment: [],
      PageNumber: 1,
      PageSize: 10,
      number: 0,
    };
  },
  created() {
    this.dyId = getRequest().dyId;
    this.$post("/circle/showDynamic", { dyId: this.dyId }).then((res) => {
      if (res.code == 200) {
        this.dynamicDetails = res.data;
        if(this.dynamicDetails.picture){
          this.dynamicDetails.picture = this.dynamicDetails.picture.split(",");

        }else{
          this.dynamicDetails.picture=[]
        }
        this.dynamicDetails.dyTime = this.dynamicDetails.dyTime.substr(0, 16);
      }
    });
    this.$post("/circle/getOneDynamicComment", {
      dyId: this.dyId,
      PageNumber: this.PageNumber,
      PageSize: this.PageSize,
    }).then((res) => {
      if (res.code == 200) {
        this.comment = res.data.list;
        this.number = res.data.number;
        this.comment.forEach((item, index) => {
          this.comment[index].dc2Time = item.dc2Time.substr(0, 16);
        });
      }
    });
  },
};
</script>
<style lang="scss" scoped>
  a{
  text-decoration: none;
}
.shareCircle {
  width: 100%;
  height: 100%;

  .top {
    height: 40px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #00CDFF;
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
      color: #36363a;
    }

    > .flex {
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
        background-color: #00CDFF;
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
      width: 100%;
      margin-top: 15px;
      display: flex;
      flex-wrap: wrap;

      img {
        width: 33%;
        height: 33%;

        margin-right: 0.3%;
        margin-top: 0.3%;
      }
      
      .one {
        flex-grow: 1;
      }
      img.four {
        width: 49%;
      }
    }
    video {
      width: 100%;
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
          color: #36363a;
        }
      }

      .dy-time {
        font-size: 11px;
        font-family: "PingFangSC-Regular", "PingFang SC";
        font-weight: 400;
        color: #9899a1;
      }
    }
  }
}

.auth {
  width: 18px;
  height: 18px;
}
</style>