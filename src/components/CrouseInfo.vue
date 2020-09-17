<template>
    <div class="content">
        <div class="course-name">{{list.couName}}</div>
        <div class="common">
            <div class="img-icon img1"></div>
            <span>总 课 时：</span>
            <span>{{list.totalHours}}</span>
        </div>
        <div class="blank"></div>
        <div class="common">
            <div class="img-icon img2"></div>
            <span>有 效 期：</span>
            <span v-if="list.termOfValidity==0">长期有效</span>
            <span v-else>{{list.termOfValidity}}月</span>
        </div>
        <div class="blank"></div>
        <div class="common">
            <div class="img-icon img3"></div>
            <span>授课老师：</span>
            <span>{{list.lecturer}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            list: {
                type: Object,
                default() {
                    return {}
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/css/mixin";

    .content {
        padding: 0 20px;
        /* background-color: #F7F7F7; */
        color: #9899A1;
        /* font-size: 16px; */
        /* text-align: left; */
    }

    .course-name {
        margin-bottom: 16px;
        line-height: 36px;
        color: $tcolor;
        font-size: 22px;
        font-weight: 500;
        font-family: "PingFangSC-Medium", "PingFang SC";
    }

    .img-icon {
        @include wh(16px, 16px) margin-right: 3px;
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

    .common {
        display: flex;
        align-items: center;

        >span:nth-child(2) {
            color: #9899A1;
        }

        >span:nth-child(3) {
            color: #6A6A6F;
        }
    }
    .blank {
        @include wh(1px,20px);
        background-color: #ccc;
        margin-left: 8px;
    }
</style>