<template>
  <Danmaku class="danmaku" ref="danmaku"></Danmaku>
</template>
<script>
  import Danmaku from "components/live/Danmaku";
  import Mixins from "assets/js/mixins.js"
  export default {
    mixins: [Mixins],
    data() {
      return {

      }
    },
    computed: {
      danmaku() {
        return this.$refs.danmaku;
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // this.on("danmaku", msg => {
          this.sendDanmaku();
          console.log(888)
        // });
      },
      sendDanmaku() {
        this.danmaku.handleStart();
        this.danmaku.sendDanmaku({
          msg: parseInt(Math.random() * 10000000) + ''
        });
      },
    },
    components: {
      Danmaku
    }
  }
</script>
<style>
  .danmaku{
    position: relative;
    width: 200px;
  }
</style>