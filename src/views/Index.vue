<template>
  <div class="index">
    <top-header class="index-header"></top-header>
    <keep-alive include="livevedio">
      <router-view class="middle" />
    </keep-alive>
    <DownloadApp />
    <bottom-footer class="index-footer"></bottom-footer>
    
  </div>
</template>
<script>
  import TopHeader from "components/component/TopHeader.vue";
  import BottomFooter from "components/component/BottomFooter.vue";
  import DownloadApp from 'components/home/DownloadApp'
  export default {
    components: {
      TopHeader,
      BottomFooter,
      DownloadApp
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

    .top-header,
    .bottom-footer {
      flex: 0;
    }

    .middle {
      flex: 1;
      -webkit-flex: 1;
      /* Chrome */
      -ms-flex: 1;
      /* IE 10 */
      -webkit-box-flex: 1;
      /* OLD - iOS 6-, Safari 3.1-6 */
      -moz-box-flex: 1;
      /* OLD - Firefox 19- */
    }
  }
</style>