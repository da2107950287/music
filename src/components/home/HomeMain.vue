<template>
    <div class="home-main">
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="content">
            <course-item v-for="(course,index) in courses" :key="index" :course="course.courseEntity"></course-item>
        </div>
    </div>
</template>
<script>
    import CourseItem from './CourseItem'
    export default {
        props: {
            courses: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        created(){

        },
        components: {
            CourseItem
        }
    }
</script>
<style lang="scss" scoped>
    .home-main {
        width: 1200px;
        /* background-color: #F7F7F7; */
        margin: 0 auto;
        padding-top: 30px;

    }

    .title {
        /* margin-top: 30px; */
        font-size: 22px;
        font-weight: 500;
        color: #36363A;
        text-align: left;
        display: flex;
        align-items: center;

    }

    .title::before {
        content: "";
        width: 6px;
        height: 20px;

        display: inline-block;
        background-color: #98B702;
        margin-right: 10px;

    }

    .content {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        >div:nth-child(3n+2){
            margin-left: 24px;
            margin-right:24px
        }
    }
</style>