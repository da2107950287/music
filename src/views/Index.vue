<template>
    <div class="index">
        <top-header></top-header>
        <router-view />
        <bottom-footer></bottom-footer>
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
<style scoped>
    .index {
        min-width: 1200px;
        background-color: #F5F5F5;
    }
</style>