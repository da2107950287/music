<template>
    <div class="courses">
        <course-item v-for="(course,index) in courses" :key="index" :course="course"></course-item>
    </div>
</template>
<script>
    import CourseItem from './CourseItem'
    export default {
        props: {
            courses: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        components: {
            CourseItem
        }
    }
</script>
<style lang="scss" scoped>
    .courses {
        width: 1200px;
        /* background-color: #F7F7F7; */
        margin: 0 auto 30px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        >div:nth-child(3n+2){
            margin-left: 24px;
            margin-right:24px;
        }
    }
</style>