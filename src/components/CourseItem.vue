<template>
  <div class="course">
    <div class="left">
      <slot name="img"></slot>
      <slot name="progress"></slot>
    </div>
    <div class="right">
      <div>
        <course-info :list="list"></course-info>
        <div class="collect">
          <slot name="collect"></slot>
        </div>
      </div>
      <div class="last">
        <slot name="last"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import CourseInfo from "../components/CrouseInfo";
export default {
  props: {
    list:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  components: {
    CourseInfo,
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";
.course {
  padding: 30px 0 29px;
  background-color: $fc;
  display: flex;
  img {
    @include wh(282px,185px);
  }

}
.left {
  @include wh(282px,185px);
  position: relative;
}
.right {
  width: 638px;
  position: relative;
  .collect {
position: absolute;
top:0;
right:0;
    img {
      @include wh(20px,20px);

    }
  }

  .last {
    float: right;
  }
}
</style>