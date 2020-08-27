<template>
  <div class="course-learning">
    <div class="top-box">
      <div class="left">
        <course-info :list="arr.courseEntity"></course-info>
      </div>
      <div class="right">
        <div class="bg-progress progress1">
          <el-progress type="circle" :percentage="arr.rateOfLearning" :width="100" color="#98B702" class="progress"></el-progress>
          <div class="progress-text text1">已学习</div>
        </div>
        <div class="bg-progress progress2">
          <el-progress type="circle" :percentage="rateOfLearning" :width="100" color="#FB9715" class="progress"></el-progress>
          <div class="progress-text text2">未学习</div>
        </div>
      </div>
    </div>
    <div class="course-detail">
      <div class="top">
        <div
          class="list-tab"
          v-for="(item,index) in lists"
          :key="index"
          :class="{'active':index===currentIndex}"
          @click="handleClick(index)"
        >{{item}}</div>
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
      catalogue: [],
      couId: "",
      list1: [], //未学
      list2: [], //已学
      arr:{},
      rateOfLearning:0,
    };
  },
  computed:{
    // rateOfLearning(){
    //   return 
    // }
  },
  created() {
    this.couId = this.$route.query.couId;
    this.$post("/course/showUserCourse", {couId: this.couId,}).then((res) => {
      if(res.code==200){
        this.arr=res.data;
        this.rateOfLearning=100-this.arr.rateOfLearning
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
  methods: {
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
.course-learning {
  width: 1200px;
  margin: 0 auto;
}
.top-box {
  width: 1200px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .right {
    display: flex;
    align-items: center;

    .bg-progress {
      width: 100px;
      height: 100px;
      position: relative;

      .progress {
        width: 100px;
        height: 100px;
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50px, -50px);
      }

      .progress-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-22px, 10px);
        font-size: 14px;

        line-height: 20px;
      }
      .text1 {
        color: #98b702;
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
  background-color: #fff;
  width: 1200px;
  margin-bottom: 30px;
}

.top {
  display: flex;
  position: relative;
}

.list-tab {
  width: 600px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  background-color: #f7f7f7;
  border-top: 1px solid #ddd;
  color: #36363a;
  cursor: default;
}

.active {
  border-top-style: #98b702;
  color: #98b702;
  background-color: #fff;
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