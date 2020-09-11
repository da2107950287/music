<!-- 表情组件 -->
<template>
  <span>
    <el-popover ref="popover5" placement="top-start" width="360" v-model="showModal">
      <img v-for="(v,i) in emojiList" v-lazy="require(`../../../static/images/em2/em2_20/${v}`)" :key="i" @click="selectEmoji(i)"
        class="img-style" />
    </el-popover>
    <span class="img-icon" v-popover:popover5></span>

  </span>
</template>
<script>
  import emoji from "assets/js/emoji";
  export default {
    data() {
      return {
        emojiList: emoji.obj,
        currentEmoji: "",
        showModal: false
      };
    },
  
    methods: {
      selectEmoji(e) {
        let value = (this.inpMessage || "") + e;
        console.log(value)
        this.showModal= false;
        this.$emit("selectEmoji", value);
      }
    },
    props: {
      inpMessage: String
    }
  };
</script>
<style scoped>
  .img-style {
    width: 22px;
    margin: 5px;
    cursor: pointer;
  }

  .img-style:hover {
    background-color: aquamarine;
  }

  .img-icon {
    width: 22px;
    height: 22px;
    display: inline-block;
    background-image: url(~assets/image/icon.png);
    background-position: -704px -89px;


  }
</style>