<template>
    <div class="course-box">
        <div class="course-item" @click="showCourse(course.couType)">
            <div class="title">{{course.couTypeName}}</div>
            <div class="content">
                <div class="course-name">{{course.couName}}</div>
                <div class="common">
                    <div class="img-icon img1"></div>
                    <span>总 课 时：</span>
                    <span>{{course.totalHours}}</span>
                </div>
                <div class="blank"></div>
                <div class="common">
                    <div class="img-icon img2"></div>
                    <span>有 效 期：</span>
                    <span v-if="course.termOfValidity!=0">{{course.termOfValidity}}月</span>
                    <span v-else>长期有效</span>
                </div>
                <div class="blank"></div>
                <div class="common">
                    <div class="img-icon img3"></div>
                    <span>授课老师：</span>
                    <span>{{course.lecturer}}</span>
                </div>
            </div>
            <div class="bottom">

                <div class="left" v-if="course.teachingMethods==1">
                    <div class="icon-zb img-icon"></div>
                    <div class="live-lesson">直播课</div>
                </div>
                <div class="left" v-else></div>
                <div class="right">
                    <div class="vip"></div>
                    <div class="money">
                        <span>&yen;</span>
                        <span>{{course.pricevip.toFixed(2)}}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        props: {
            course: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            showCourse(couType) {
                this.$router.push({ path: '/index/detail', query: { couId: this.course.couId, couType } })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/css/mixin";
    .course-box {
        @include wh(384px,310px);      
        box-sizing: border-box;
        margin-top: 45px;
        background-color: $fc;
        border: 1px solid #eee;
    }

    .course-item {
        position: relative;
        background: $fc;
        border-radius: 3px;
        padding: 30px 20px 15px;
        box-sizing: border-box;
    }

    .course-box:hover {
        -webkit-box-shadow: 0 4px 12px rgba(152, 183, 2, 0.2);
        box-shadow: 0 4px 12px rgba(152, 183, 2, 0.2);
        -webkit-transform: translate3d(0, -2px, 0);
        transform: translate3d(0, -2px, 0);
        cursor: pointer;
    }

    .title {
        @include whl(90px,30px,30px)
        @include pa(-15px,148px)
        color: $fc;
        background: $tc;
        border-radius: 15px;
        text-align: center;
    }

    .content {
        padding: 20px;
        box-sizing: border-box;
        background-color: #F7F7F7;
        color: #9899A1;
        
        display: block;


    }


    .course-name {
        margin-bottom: 20px;
        line-height: 36px;
        color: $tcolor;
        font-size: 22px;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

    }

    .img-icon {
        @include wh(16px,16px)
        margin-right: 3px;
        background-image: url(~assets/image/icon.png);
    }

    .img1 {
        background-position: -174px -92px;
    }

    .img2 {
        background-position: -220px -92px;
    }

    .img3 {
        background-position: -266px -92px;
    }

    .icon-zb {
        background-position: -312px -92px;

    }

    .common {
        @include fa();
        line-height: 22px;
    }

    .common>span:nth-child(2) {
        color: #9899A1;
    }

    .common>span:nth-child(3) {
        color: #6A6A6F;
    }

    .blank {
       @include wh(1px,20px)
        background-color: #ccc;
        margin-left: 8px;
    }

    .bottom {
      @include fj()
        margin-top: 15px;
    }

    .left,
    .right {
        @include fa();

    }

    .live-lesson {
        color: #FB9715;
        font-weight: 400;

    }

    .right {
        .vip {
            @include wh(32px,18px)
            background-image: url(~assets/image/icon.png);
            background-position: -358px -91px;
        }
    }


    .money {
        color: $tcolor;
        font-family:"PingFangSC-Semibold","PingFang SC";
    }

    .money>span:nth-child(1) {
        font-size: 20px;
    }

    .money>span:nth-child(2) {
        font-size: 32px;
    }
</style>