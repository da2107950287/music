<template>
    <div class="course-detail">
        <div class="top">
            <div class="list-tab" v-for="(item,index) in lists" :key=index :class="{'active':index===currentIndex}"
                @click="handleClick(index)">{{item}}</div>
            <div class="audition-icon"></div>
        </div>
        <div class="content">
            <course-description v-show="currentIndex==0" :courseDes="couresDetail"></course-description>
            <course-catalog v-show="currentIndex==1" :catalogue="catalogue" :buyState="buyState"></course-catalog>
            <!-- <div v-show="currentIndex==2" v-html="couresDetail.lecturerIntro"></div> -->
            <teacher-intro v-show="currentIndex==2"  :teacherList="couresDetail.list"></teacher-intro>
        </div>
    </div>
</template>
<script>
    import CourseDescription from 'components/detail/CourseDescription'
    import CourseCatalog from 'components/detail/CourseCatalog'
    import TeacherIntro from 'components/detail/TeacherIntro'
    export default {
        props: {
            couresDetail: {
                type: Object,
                default() {
                    return {}
                }
            },
            catalogue: {
                type: Array,
                default() {
                    return []
                }
            },
            buyState: {
                type: Number
            }
        },
        data() {
            return {
                currentIndex: 0,
                lists: ["课程介绍", "课程目录", "讲师介绍"],
                teacherList: []
            }
        },
        created() {
            
            this.$bus.$on("audition", this.audition)
        },
        methods: {

            audition() {
                this.currentIndex = 1
            },
            handleClick(index) {
                this.currentIndex = index
            }
        },
        components: {
            CourseDescription,
            TeacherIntro,
            CourseCatalog
        }
    }
</script>
<style lang="scss" scoped>
    .course-detail {
        background-color: #fff;
        width: 1200px;
        margin-bottom: 30px;
    }

    .top {
        display: flex;
        position: relative;

    }

    .audition-icon {
        width: 52px;
        height: 18px;
        position: absolute;
        top: 23px;
        left: 635px;
        background-image: url(~assets/image/icon.png);
        background-position: -158px -194px;

    }

    .list-tab {
        width: 400px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        background-color: #f7f7f7;
        border-top: 1px solid #ddd;
        color: #36363A;
        cursor: default;
    }

    .active {
        border-top:3px solid #98B702;
        
        color: #98B702;
        background-color: #fff;
    }
</style>