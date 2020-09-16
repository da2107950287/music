<template>
  <div class="index">
    <top-header class="header"></top-header>
    <keep-alive include="livevedio">
      <router-view class="middle" />
    </keep-alive>
    <bottom-footer class="footer"></bottom-footer>
  </div>
</template>
<script>
  import TopHeader from "components/component/TopHeader.vue";
  import BottomFooter from "components/component/BottomFooter.vue";
  export default {
    components: {
      TopHeader,
      BottomFooter,
    },
  };
</script>
<style lang="scss" scoped>
  .index {
    min-width: 1200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f7f7f7;

    .header,
    .footer {
      flex: 0;
    }

    .middle {
      // flex: 1;

    }
  }
</style>