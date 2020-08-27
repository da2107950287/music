<template>
    <div>
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