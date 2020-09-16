<!-- 上传文件组件 -->
<template>
  <label for="uploadImage" @click="clickFile">
    <span class="img-icon"></span>
    <input type="file" class="hide" ref="imgDom" @change="pictureChange" />
  </label>
</template>

<script>
  import HuodeScene from "assets/js/live.js";
  import { uploadPost } from "assets/js/axios.js";
  import { showEm } from "assets/js/utils.js"
  export default {
    data() {
      return {
      };
    },
    created(){
      this.hd=new HuodeScene()
    },
    methods: {
      pictureChange(e) {
        let file = e.target.files[0];
        let formdata = new FormData();
        formdata.append("myfiles", file);
        uploadPost("/upload/pictureOrVideo", formdata).then((res) => {
          if (res.code == 200) {
            let imgUrl = res.data;
            this.hd.sendPublicChatMsg(`[img_${imgUrl}]`);
          }
        });
      },
      clickFile() {
        let img = this.$refs.imgDom;
        img && img.click();
      },
    },

  };
</script>
<style scoped>
  .hide {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    filter: alpha(opacity=0);
    opacity: 0;
    cursor: inherit;
    display: none;
  }

  .img-icon {
    width: 22px;
    height: 22px;
    display: inline-block;
    background-image: url(~assets/image/icon.png);
    background-position: -757px -89px;


  }
</style>