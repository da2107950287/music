<template>
  <div class="profile-header">
    <div class="left">
      <div class="status">
        <slot name="status"></slot>
      </div>
      <slot name="title"></slot>
      <div class="dec">
        <slot name="dec"></slot>
      </div>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .profile-header {
    @include fj();
    height: 70px;
    padding: 0 30px;
    margin-bottom: 10px;
    box-sizing: border-box;
    background-color: $fc;
  }

  .left {
    color: #36363a;
    font-size: 20px;
    font-weight: 500;
    @include fa();
    font-family: "PingFangSC-Medium", "PingFang SC";

    .status {
      color: #9899a1;
    }

    .dec {
      margin-left: 10px;
      color: #FF4545;
      font-size: 16px;
    }
  }

  .right {
    color: #fb9715;
    font-size: 20px;
  }
</style>