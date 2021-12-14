<template>
  <div class="course-learning">
    <div class="top-box">
      <div class="left">
        <course-info :list="list.courseEntity"></course-info>
      </div>
      <div class="right">
        <div class="bg-progress progress1">
          <el-progress type="circle" :percentage="list.rateOfLearning" :width="100" color="#98b702" class="progress">
          </el-progress>
          <div class="progress-text text1">已学习</div>
        </div>
        <div class="bg-progress progress2">
          <el-progress type="circle" :percentage="rateOfLearning" :width="100" color="#FB9715" class="progress">
          </el-progress>
          <div class="progress-text text2">未学习</div>
        </div>
      </div>
    </div>
    <div class="course-detail">
      <div class="top">
        <div class="list-tab" v-for="(item,index) in lists" :key="index" :class="{'active':index===currentIndex}"
          @click="handleClick(index)">{{item}}</div>
      </div>
      <div class="content">
        <cou-cataLog v-show="currentIndex==0" :catalogue="list2"></cou-cataLog>
        <cou-cataLog v-show="currentIndex==1" :catalogue="list1"></cou-cataLog>
      </div>
    </div>
  </div>
</template>
<script>
  import CourseInfo from "components/CrouseInfo.vue";
  import CouCataLog from "components/courselearning/CouCataLog.vue";
  export default {
    data() {
      return {
        currentIndex: 0,
        lists: ["已学课程", "未学课程"],
        couId: "",
        list1: [], //未学
        list2: [], //已学
        list: {},
        rateOfLearning: 0,//学习进度
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.couId = this.$route.query.couId;
        this.$post("/course/showUserCourse", { couId: this.couId, }).then((res) => {
          if (res.code == 200) {
            this.list = res.data;
            this.rateOfLearning = 100 - this.list.rateOfLearning;
          }
        });
        this.$post("/course/getUserCatalogue", { couId: this.couId }).then(
          (res) => {
            if (res.code == 200) {
              this.list1 = res.data.list1;
              this.list2 = res.data.list2;
            }
          }
        );
      },
      handleClick(index) {
        this.currentIndex = index;
      },
    },
    components: {
      CourseInfo,
      CouCataLog,
    },
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .course-learning {
    width: 1200px;
    margin: 0 auto;
  }

  .top-box {
    width: 1200px;
    padding: 30px;
    box-sizing: border-box;
    @include fj();
    background-color: $fc;

    .right {
      @include fa();

      .bg-progress {
        @include wh(100px, 100px);

        position: relative;

        .progress {
          @include wh(100px, 100px);
          /* // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50px, -50px); */
        }

        .progress-text {
          @include pa(50%, 50%);
          transform: translate(-22px, 10px);
          font-size: 14px;

          line-height: 20px;
        }

        .text1 {
          color: $tc;
        }

        .text2 {
          color: #fb9715;
        }
      }

      .progress1 {
        margin-right: 50px;
      }
    }
  }

  .course-detail {
    margin-top: 30px;
    background-color: $fc;
    width: 1200px;
    margin-bottom: 30px;
  }

  .top {
    display: flex;
    position: relative;
  }

  .list-tab {
    @include whl(600px, 64px, 64px);
    text-align: center;
    background-color: #f7f7f7;
    border-top: 1px solid #ddd;
    color: $tcolor;
    cursor: default;
  }

  .active {
    border-top-color: $tc;
    border-top-width: 1px;
    color: $tc;
    background-color: $fc;
  }

  .progress1 /deep/ path:first-child {
    stroke: rgba(152, 183, 2, 0.3);
  }

  .progress2 /deep/ path:first-child {
    stroke: rgba(251, 151, 21, 0.3);
  }

  .el-progress /deep/ .el-progress__text {
    font-size: 16px !important;
  }
</style>