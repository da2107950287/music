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
        created() {

        },
        components: {
            CourseItem
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/css/mixin";

    .home-main {
        width: 1200px;
        margin: 0 auto;
        padding-top: 30px;

    }

    .title {
        font-size: 22px;
        font-weight: 500;
        color: $tcolor;
        @include fj(flex-start);

    }

    .title::before {
        content: "";
        
        @include wh(6px,20px);

        display: inline-block;
        background-color: $tc;
        margin-right: 10px;

    }

    .content {
        @include fj(flex-start,center)
        flex-wrap: wrap;

        >div:nth-child(3n+2) {
            margin-left: 24px;
            margin-right: 24px
        }
    }
</style>