<template>
  <div class="course">
    <profile-header>
      <div slot="title">我的课程</div>
      <div slot="right">累计学习：{{accLeaTime}}分钟</div>
    </profile-header>
    <div class="course-bottom" :style="{'margin-bottom':total<=pageSize?'30px':''}">
      <course-item v-for="(item,index) in list" :key="index" :list="item.courseEntity">
        <img slot="img" v-lazy="item.courseEntity.cover" alt />
        <div slot="progress" class="bg-progress">
          <el-progress type="circle" :percentage="item.rateOfLearning" :width="100" color="#fff" class="progress">
          </el-progress>
          <div class="progress-text">已学习</div>
        </div>
        <div slot="last" class="btn" @click="toStudy(item.couId)">去学习</div>
      </course-item>
    </div>
    <el-pagination v-if="total>pageSize" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" background
      layout="prev, pager, next" :total="total" class="pagination">
    </el-pagination>
  </div>
</template>
<script>
  import ProfileHeader from "components/ProfileHeader.vue";
  import CourseItem from "components/CourseItem.vue";
  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 5,
        total:0,
        accLeaTime: null,//累计时间
        list: []
      };
    },

    created() {
      this.accLeaTime = localStorage.getItem("accLeaTime")
      this.$post('/course/getUserCourse', { PageNumber: this.currentPage, PageSize: this.pageSize }).then(res => {
        if (res.code == 200) {
          this.total=res.data.PageCount*this.pageSize;
          this.list = res.data.list;
        }
      })
    },
    methods: {
      toStudy(couId) {
        this.$router.push({ path: '/index/courseLearning', query: { couId } })
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getData()
      }

    },
    components: {
      ProfileHeader,
      CourseItem,
    },
  };
</script>
<style lang="scss" scoped>
  @import '~assets/css/pagination.css';
  .course-bottom {
    width: 950px;

    padding: 0 30px;
    box-sizing: border-box;
    background-color: #fff;

    >div {
      border-bottom: 1px solid #EEEEEE
    }

    .bg-progress {
      width: 282px;
      height: 185px;
      position: absolute;
      top: 0;
      background-color: rgba(54, 54, 58, 0.3);

      .progress {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50px, -50px);
      }

      .progress-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-22px, 10px);
        font-size: 14px;
        color: #fff;
        line-height: 20px;
      }
    }
  }

  .btn {
    width: 88px;
    height: 32px;
    border-radius: 2px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    background-color: #fb9715;
    cursor: default;
  }

  .el-progress /deep/ path:first-child {
    stroke: #d2d2d2;
  }

  .el-progress /deep/ .el-progress__text {
    color: #fff;
    font-size: 16px !important;
  }
</style>