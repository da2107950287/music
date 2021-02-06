<template>
  <div class="bgi">

    <img src="~assets/image/logo_qdy.png"  class="logo">
    <div class="download">
      <a :href="andUrl" class="android" download=""></a>
      <a :href="iosUrl" class="ios"></a>
    </div>

  </div>
</template>
<script>

  export default {
    data() {
      return {
        andUrl:"",
        iosUrl:""
      }
    },
    mounted() {
      this.$post("/other/getAppversion",{}).then(res=>{
        if(res.code==200){
          this.andUrl=res.data.andUrl;
          this.iosUrl=res.data.iosUrl;
        }
      })
    },
  }
</script>
<style lang="scss" scoped>
  .bgi {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(~assets/image/download.png);
    background-size: 100% 100%;
  }

  .logo {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50px);
    width: 100px;
    height: 100px;
   
  }
  .download{
    position: absolute;
    left: 50%;
    transform: translateX(-100px);
    bottom: 100px;
    .android{
      background-image: url(~assets/image/android.png);
    }
    .ios{
      background-image: url(~assets/image/ios.png);
    }
    a{
      display: block;
  
      margin-top: 30px;
      width: 200px;
      height: 45px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    
    
  }
</style>