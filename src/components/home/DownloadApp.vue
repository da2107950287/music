<template>
  <div class="download">
    <div>
      <div>下载APP 加入圈子聊音乐 音乐器材网上购 更多名师课程资源等着你</div>
      <img src="~assets/image/qr.png" alt class="img-qr" />
      <img src="~/assets/image/qr.png" alt class="img-qr" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "~assets/css/mixin";
  .download {
    width: 100%;
    background-image: url(~assets/image/bg_ad_xz.png);
    background-size: auto 120px;
    background-repeat: no-repeat;
  }

  .download>div {
    @include wh(1200px, 120px);
     @include fa();
    margin: 0 auto;
  }

  .download>div>div {
    height: 40px;
    font-size: 30px;
    font-family: "FZLTCHJW--GB1-0", "FZLTCHJW--GB1";
    font-weight: normal;
    color: $fc;
  }

  .img-qr {
    @include wh(70px,70px);
    margin-left: 57px;
  }
</style>