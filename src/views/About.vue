<template>
  <div class="about">
    <div class="mian-about">
      <div class="title">{{title}}</div>
      <div class="blank"></div>
      <div class="content" v-html="text">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        text: null,
        type: "",
        title: '',
        banId: ''
      }
    },
    watch: {
      $route() {
        this.type = this.$route.query.type;
        if(this.type){
          this.getAgreement()
        }
      }
    },
    created() {
      this.type = this.$route.query.type;

      this.banId = this.$route.query.banId;
      if (this.type) {
        this.getAgreement()
      }
      if (this.banId) {
        this.getContent()
      }
    },
    methods: {
      getAgreement() {
      
        this.$post('/other/getAgreement', { type: this.type }).then(res => {
          if (res.code == 200) {
            this.text = res.data.content;
            this.title = res.data.title
          }
        })
      },
      getContent() {
        this.$post('/other/showBanner', { banId: this.banId }).then(res => {
          if (res.code == 200) {
            this.text = res.data.content;
            this.title = res.data.title
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .about {
    width: 1200px;
    margin: 0 auto;
    background-color: $fc;
    margin-bottom: 30px;

  }

  .mian-about {
    padding: 30px;
  }

  .title {
    line-height: 28px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: $tcolor;
  }

  .blank {
    margin: 30px 0;
    @include wh(1140px, 1px);
    background-color: #EEE;
  }

  .content {
    width: 1140px;
    font-size: 14px;
    color: rgba(54, 54, 58, 1);
    line-height: 28px;
  }
</style>