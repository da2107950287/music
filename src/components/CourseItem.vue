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
.course {
  padding: 30px 0 29px;
  background-color: #fff;
  display: flex;
  img {
    width: 282px;
    height: 185px;
  }

}
.left {
  width: 282px;
  height: 185px;
  position: relative;
}
.right {
  width: 638px;
  position: relative;
  .collect {
    position: absolute;
    top: 0;
    right: 0;
    img {
      width: 20px;
      height: 20px;
    }
  }

  .last {
    float: right;
  }
}
</style>