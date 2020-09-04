<template>
  <div class="home">
    <banner :banners="banners" />
    <div>
      <home-main :courses="boutiqueCourses">
        <span slot="title">精品课程</span>
      </home-main>
      <div class="recommend">
        <home-main :courses="recommendedCourse" class="recommend">
          <span slot="title">推荐课程</span>
        </home-main>
      </div>
    </div>


    <!-- <div v-else class="course">
      <course-item v-for="(item,index) in list" :key="index" :course="item"></course-item>
    </div> -->
    <download-app />
  </div>
</template>
<script>
  import CourseItem from 'components/home/CourseItem'
  import Banner from 'components/home/Banner'
  import HomeMain from 'components/home/HomeMain'
  import Courses from 'components/home/Courses'
  import DownloadApp from 'components/home/DownloadApp'
  export default {
    data() {
      return {
        banners: [],
        boutiqueCourses: [],
        recommendedCourse: [],
        pageNumber: 1,
        pageSize: 6,
        list: [],
      }
    },
    created() {
      // 获取精品课
      this.$post('/course/getCourseBoutique', {}).then(res => {
        if (res.code == 200) {
          this.boutiqueCourses = res.data;
        }
      })
      // 获取推荐课程
      this.$post('/course/getCourseRec', { PageNumber: this.pageNumber, PageSize: this.pageSize }).then(res => {
        if (res.code == 200) {
          this.recommendedCourse = res.data.list;
        }
      })
      //获取banner列表
      this.$post('/other/getBanner', { positions: "1" }).then((res) => {
        if (res.code == 200) {
          this.banners = res.data
        }
      })
    },
    methods: {
      //获取课程
      getCourse(type) {
        this.$post("/course/getCourse", { couType: type, PageNumber: this.pageNumber, PageSize: this.pageSize }).then(res => {
          if (res.code == 200) {
            this.list = res.data.list;
          }
        })
      }
    },
    components: {
      Banner,
      HomeMain,
      CourseItem,
      Courses,
      DownloadApp
    }
  };
</script>
<style lang="scss" scoped>
  .recommend {
    background-color: #f7f7f7;
    margin-top: 40px;
    padding-bottom: 20px;
  }
</style>