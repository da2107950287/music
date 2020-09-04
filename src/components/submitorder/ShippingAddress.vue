<template>
  <div class="course-info">
    <div class="title">
      <div class="title-right">收货地址</div>
      <div @click="editAddress">
        <slot name="right"></slot>
      </div>
      
    </div>
    <div class="table">
      <div class="tr1">
        <span>{{addressInfo.fullname}}</span>
        <span>{{addressInfo.mobile}}</span>
      </div>
      <div class="address">{{address}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      addressInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    watch:{
      addressInfo(){
        if(this.addressInfo.addressinfo){
          this.address=this.addressInfo.addressinfo.replace(/\s+/g, "")+this.addressInfo.detailed.replace(/\s+/g, "")

        }else{
          this.address=this.addressInfo.detailed.replace(/\s+/g, "")
        }
      }
    },
    data(){
     return{
      address:''
     }
    },
    methods: {
      editAddress() {
        this.$emit("editAddress");
      }
    }
  };
</script>
<style lang="scss" scoped>
    @import "~assets/css/mixin";

  .course-info {
    padding: 30px;
    margin-top: 10px;
    box-sizing: border-box;
    background-color: $fc;

    .title {
     @include fj();
      position: relative;

      .title-right {
        font-size: 20px;
        font-weight: 500;
        color: $tcolor;
        font-family: "PingFangSC-Medium", "PingFang SC";
      }

      .title-left {
@include fa();
        color: #0091FF;
        font-size: 18px;
        cursor: default;

        >img {
          @include wh(16px,16px);
          margin-right: 4px;
        }

      }
    }

    .title::before {
      content: "";
      @include wh(4px,12px);
      @include pa(5px,-26px)
      
      display: inline-block;
    
 
      background-color: $tc;
      margin-right: 30px;
    }

    .table {
      margin-top: 30px;
      border: 1px solid #eee;
      padding: 30px;
      font-size: 18px;

      .tr1 {
        color: $tcolor;
        line-height: 30px;

        >span:first-child {
          margin-right: 20px;
          font-size: 24px;
          font-weight: 500px;
          font-family: "PingFangSC-Medium", "PingFang SC";
        }
      }

      .address {
        margin-top: 30px;
        color: #6a6a6f;
      }
    }
  }
</style>