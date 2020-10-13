<template>
  <div>
    <el-dialog :visible.sync="isShowForm" width="700px" :before-close="handleClose" center>
      <el-form :model="form" :rules="rules" ref="form" class="form">
        <div class="popup-title">编辑收货信息</div>
        <el-form-item prop="username" label="收货人：">
          <el-input v-model="form.username" placeholder="请输入收货人姓名"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系电话：">
          <el-input v-model="form.phone" maxlength="11" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item prop="region" label="所在地区：">
          <el-cascader size="large" :options="options" v-model="form.region" separator placeholder="请选择省/市/区">
          </el-cascader>
        </el-form-item>
        <el-form-item prop="address" label="详细地址：">
          <el-input type="textarea" v-model="form.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <div class="btns">
          <div class="cancel" @click="handleClose">取消</div>
          <div class="save" @click="saveEdit">保存</div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import regionData from "assets/js/area.js";
  export default {
    props: {
      isShowForm: {
        type: Boolean,
        default() {
          return false;
        },
      },
      addressInfo: {
        type: Object,
        default() {
          return {};
        },
      },
    },

    data() {
      return {
        form: {
          username: "",
          phone: "",
          region: [],
          address: "",
        },
        rules: {},
        options: regionData,
      };
    },
    watch: {
      addressInfo() {
        this.form.username = this.addressInfo.fullname;
        this.form.phone = this.addressInfo.mobile;
        this.form.region = this.addressInfo.addressinfo.split(" ");
        this.form.address = this.addressInfo.detailed.replace(/\s+/g, "");
      },
    },
    methods: {
      handleClose() {
        this.$emit("hideForm");
      },
      saveEdit() {

        //修改默认地址
        if (Object.keys(this.addressInfo).length !== 0) {
          this.$post("/address/updateAddress", {
            addId: this.addressInfo.addId,
            fullname: this.form.username,
            mobile: this.form.phone,
            addressinfo: this.form.region.join(" "),
            detailed: this.form.address,
            state: "1",
          }).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.$emit("hideForm");
            }
          });
        } else {
          //添加默认地址
          this.$post("/address/addAddress", {
            fullname: this.form.username,
            mobile: this.form.phone,
            addressinfo: this.form.region.join(" "),
            detailed: this.form.address,
            state: 1,
          }).then((res) => {
            if (res.code == 200) {
              this.$message.success("添加地址成功！");
              this.$emit("hideForm");
            }
          });
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/mixin";

  .form {
    .popup-title {
      padding-bottom: 20px;
      margin-bottom: 30px;
      color: $tcolor;
      font-size: 20px;
      font-family: "PingFangSC-Medium", "PingFang SC";
      font-weight: 500;
      border-bottom: 1px solid #eee;
    }

    >div {
      @include fj(center);
    }

    /deep/ .el-form-item__label {
      width: 90px;
      text-align: left;
      color: #6a6a6f;
      font-size: 14px;
    }

    /deep/ .el-form-item__content {
      width: 400px;
    }

    /deep/ .el-input__inner {
      font-size: 14px;
    }

    /deep/ .el-input__inner:focus {
      border-color: #c0c4cc;
    }

    /deep/ .el-cascader {
      width: 400px;
    }

    .btns {
      display: flex;
      padding-top: 29px;
      margin-top: 30px;
      border-top: 1px solid #eee;

      >div {
        @include whl(100px, 40px, 40px);

        text-align: center;
        font-size: 14px;
        cursor: default;
      }

      .cancel {
        color: $tcolor;
        background-color: #f7f7f7;
        border: 1px solid #ddd;
      }

      .save {
        margin-left: 16px;
        color: $fc;
        background-color: $tc;
        border: 1px solid $tc;
      }
    }
  }
</style>