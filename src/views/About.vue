<template>
  <div class="about">
    <div class="mian-about">
      <div class="title">关于我们</div>
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
        type:""
      }
    },
    watch:{
      $route(){
        this.getAgreement()
      }
    },
    created(){
     this.getAgreement()
    },
    methods:{
      getAgreement(){
        this.type=this.$route.query.type;
      this.$post('/other/getAgreement',{type:this.type}).then(res=>{
        if(res.code==200){
          this.text=res.data.content;
        }
      })
      }
    }
  }
</script>
<style scoped>
  .about {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
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
    color: #36363A;
    font-family: "PingFangSC-Regular", "PingFang SC";


  }

  .blank {
    margin: 30px 0;
    width: 1140px;
    height: 1px;
    background-color: #EEE;
  }

  .content {
    width: 1140px;
    font-size: 14px;
    font-family: "PingFangSC-Regular", "PingFang SC";
    font-weight: 400;
    color: rgba(54, 54, 58, 1);
    line-height: 28px;
  }
</style>