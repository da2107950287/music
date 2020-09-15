<template>
    <div class="index">
        <top-header class="header"></top-header>
        <router-view class="middle"/>
        <bottom-footer class="footer"></bottom-footer>
    </div>
</template>
<script>
    import TopHeader from "components/component/TopHeader.vue";
    import BottomFooter from "components/component/BottomFooter.vue"
    export default {
        components: {
            TopHeader,
            BottomFooter
        }
    }
</script>
<style lang="scss" scoped>
    .index {
        min-width: 1200px;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #F5F5F5;
        .header,.footer{
            flex: 0;
        }
        .middle{
           flex-grow:1
        }
    }
</style>