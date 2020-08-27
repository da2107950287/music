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
.profile-header {
  height: 70px;
  padding: 0 30px;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
.left {
  color: #36363a;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  font-family:"PingFangSC-Medium","PingFang SC";
  .status {
    color: #9899a1;
    font-weight: 400;
  }
  .dec{
      margin-left: 10px;
      color: #FF4545;
      font-size: 16px;

  }
}
.right {
  color: #fb9715;
  font-size: 20px;
  font-family: "PingFangSC-Regular", "PingFang SC";
  font-weight: 400;
}
</style>