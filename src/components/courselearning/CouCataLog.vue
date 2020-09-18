<template>
  <div class="course-catalog">
    <div v-show="catalogue.length==0" class="none">暂无数据</div>
    <div v-for="(item,index) in catalogue" :key="index">
      <!-- <div class="title">第 1 章 ：基础夯实</div> -->
      <div class="lists">
        <div class="list" @click="go(item)">
          <div>
            <span>第 {{index+1}} 讲</span>
            <div v-if="item.catType==1" class="play live"></div>
            <div v-if="item.catType==2" class="play record"></div>
            <span>{{item.catName}}</span>
          </div>
          <div>主讲：{{item.lecturer}}</div>
          <!-- 直播 -->
          <div v-if="item.catType==1">
            <div v-if="item.playstate==1">未开播</div>
            <div v-else-if="item.playstate==2" class="living">
              <div></div>直播中
            </div>
            <div v-else>{{item.catTime}}</div>
          </div>
          <!-- 录播 -->
          <div v-else-if="item.catType==2">
            <div>已观看{{item.rateOfLearning}}%</div>
            <!-- <div v-if="item.rateOfLearning>0">已观看{{item.rateOfLearning}}%</div>
            <div v-else>{{item.catTime}}</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex"
  export default {
    props: {
      catalogue: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      ...mapGetters([
        "getUserId",
        "getNickname"
      ])
    },
    methods: {
      go(item) {
        //已购买或者免费试听
        // if (item.audition == 1 || this.buyState == 1) {
        //直播
        if (item.catType == 1) {
          if (item.playstate == 1) {//直播未开始
            this.$message("直播未开始")
          } else if (item.playstate == 2) {//正在直播
            console.log(this.getUserId)
            // window.location.href = `https://view.csslcloud.net/api/view/index?roomid=${item.catId}&userid=${this.getUserId}&autoLogin=true&viewername=${this.getNickname}`
            this.$router.push({ path: '/index/liveVedio', query: { catName: item.catName, catId: item.catId } })
          } else if (item.playstate == 3) {//直播已结束,回放
            this.$router.push({ path: '/index/playback', query: { recordId: item.playback, catName: item.catName, couId: item.couId, catId: item.catId, rateOfLearning: item.rateOfLearning } })
          }
        } else {//录播
          this.$router.push({ path: '/index/vedio', query: { url: item.catUrl, catName: item.catName, couId: item.couId, catId: item.catId, rateOfLearning: item.rateOfLearning } })
        }
        // } else {
        //   this.$message("请购买后，再进行观看")
        // }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .course-catalog {
    padding: 30px;

    .none {
      text-align: center;
      color: #6a6a6f;
      font-size: 14px;

    }
  }

  .title {
    @include whl(1140px, 52px, 52px) background-color: #f7f7f7;
    text-align: left;
    color: $tcolor;
  }

  .title::before {
    content: "";
    display: inline-block;
    @include wh(4px, 12px);
    background-color: $tc;
    margin-right: 20px;
  }

  .lists {
    .list {
      @include fj();
      height: 67px;

      font-size: 14px;
      line-height: 20px;
      border-bottom: 1px solid #eee;
      color: #9899a1;
      cursor: pointer;

      >div {

        flex: 1;

        @include fj(flex-end);

        span {
          color: #6a6a6f;
        }

        .play {
          @include wh(20px, 20px) margin: 0 10px;
          background-image: url(~assets/image/icon.png);
        }

        .live {
          background-position: -290px -193px;

        }

        .record {
          background-position: -240px -193px;

        }
      }

      >div:first-child {
        justify-content: flex-start;
        flex: 2;
      }

      >div:nth-child(2) {
        justify-content: flex-start;

      }

      >div:nth-child(3) {
        justify-content: flex-end;

        .img-audition {
          width: 86px;
          height: 24px;
        }
      }

    }
  }

  .list:hover span,
  .list:hover div {
    color: $tc !important;
  }

  .living {
    color: #FB9715;
    font-size: 14px;

    >div {
      @include wh(16px, 16px);
      background-image: url(~assets/image/icon.png);
      background-position: -312px -92px;

    }
  }
</style>