<template>
  <div class="profile-bottom">
    <div>
      <span>绑定手机：</span>
      <span>{{userinfo.account}}</span>
      <span @click="showPhoneForm">修改</span>
    </div>
    <div>
      <span>绑定微信：</span>
      <span v-if="!userinfo.wx">未绑定</span>
      <span v-if="!userinfo.wx" @click="bindWeChat">去绑定</span>
      <span v-if="userinfo.wx">已绑定</span>
      <span v-if="userinfo.wx" @click="unBindWeChat">去解绑</span>

    </div>
    <div>
      <span>
        <span class="justify">昵称</span>：
      </span>
      <span>{{userinfo.nickname}}</span>
    </div>
    <div>
      <span>
        <span class="justify">性别</span>：
      </span>
      <span>{{userinfo.sex}}</span>
    </div>
    <div>
      <span>所在城市：</span>
      <span>{{userinfo.province}}{{userinfo.city}}</span>
    </div>
    <div>
      <span>
        <span class="justify">简介</span>：
      </span>
      <span>{{userinfo.intro}}</span>
    </div>
    <div class="personal-icon">
      <img v-lazy="userinfo.headportrait" alt />

      <label for="inputId">
        <input style="display: none" id="inputId" ref="input" type="file"
          accept="image/gif, image/jpeg, image/jpg, image/png, image/svg" @change="handleFileChange" />
        <div class="edit"></div>
      </label>
    </div>
  </div>
</template>
<script>
  import { uploadPost } from "assets/js/axios.js";
  export default {
    props: {
      userinfo: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    methods: {
      showPhoneForm() {
        this.$emit("showPhoneForm");
      },
      updateImg() { },
      bindWeChat() {
        this.$emit("bindWeChat");
      },
      unBindWeChat() {
        this.$confirm('你确定要解绑微信?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$post("/userinfo/unbindWx", {}).then(res => {
            if (res.code == 200) {
              this.$message.success("解绑成功");
              this.$emit("unBindWeChat")
            }
          })
        })

      },
      handleFileChange(e) {
        let file = e.target.files[0];
        let formdata = new FormData();
        formdata.append("myfiles", file);
        console.log(formdata);
        uploadPost("/upload/pictureOrVideo", formdata).then((res) => {
          if (res.code == 200) {
            let imgUrl = res.data;
            console.log(999);
            this.update(imgUrl);
          }
        });
      },
      update(imgUrl) {
        this.$post("/userinfo/updateUserinfo", {
          nickname: this.userinfo.nickname,
          headportrait: imgUrl,
          sex: this.userinfo.sex,
          intro: this.userinfo.intro,
          province: this.userinfo.province,
          city: this.userinfo.city,
          background: this.userinfo.background,
        }).then((res) => {
          if (res.code == 200) {
            localStorage.setItem("nickname", this.userinfo.nickname);
            localStorage.setItem("headportrait", imgUrl);
            this.$emit("updateAvatar", imgUrl);
            window.location.reload();
          }
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .profile-bottom {

    @include wh(830px, 446px);
    padding: 0 60px;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #e8e8e8;

    >div {
      margin-top: 30px;
      font-size: 16px;

      >span:nth-child(1) {
        width: 80px;
        display: inline-block;
        color: #9899a1;
        cursor: default;
        text-align: justify;
        text-align-last: justify;
        text-justify: distribute-all-lines; // 这行必加，兼容baiie浏览器
      }

      span:nth-child(2) {
        color: $tcolor;
        margin-left: 20px;
        cursor: default;
      }

      span:nth-child(3) {
        margin-left: 10px;
        color: $tc;
        cursor: default;
      }
    }

    .personal-icon {
      /* @include pa(40px,0,60px) */
      position: absolute;
      top: 40px;
      right: 60px;

      img:nth-child(1) {

        @include wh(100px, 100px);
        border-radius:50%
      }

      .edit {
        @include wh(85px, 24px);
        position: absolute;
        bottom: 2px;
        right: 8px;
        background-image: url(~assets/image/icon.png);
        background-position: -564px -191px;
      }
    }
  }
</style>