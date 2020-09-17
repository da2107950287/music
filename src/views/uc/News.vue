<template>
  <div class="news">
    <profile-header>
      <div slot="title">我的消息</div>
    </profile-header>
    <div class="table" :style="{'margin-bottom':total<=pageSize?'30px':''}">
      <div class="table-header flex">
        <div @click="handleCheckedAll">
          <img v-if="!checkedAll" src="~assets/image/icon_check_normal.png" class="select-icon" />
          <img v-else src="~assets/image/icon_check_sel.png" class="select-icon" />
        </div>
        <div @click="readMsg" class="btn read">全部已读</div>
        <!-- <img @click="deleteMsg" src="~assets/image/bnt_sc.png" class="btn delete" /> -->
      </div>
      <div v-for="(item,index) in arr" :key="index" class="list">
        <div class="table-body flex">
          <div @click="item.checked=!item.checked">
            <img v-if="item.checked==false" src="~assets/image/icon_check_normal.png" class="select-icon" />
            <img v-else src="~assets/image/icon_check_sel.png" class="select-icon" />
          </div>
          <div class="flex td">
            <div class="td-left">
              <img src="~assets/image/icon_jyxx.png" />
              <div v-if="item.readstate==0" class="red-circle"></div>
            </div>
            <div class="td-right">
              <div class="flex">
                <!-- <span v-if="item.type==0" class="tip">交易消息</span>
                <span v-else class="tip">系统通知</span> -->
                <span class="msg-title">{{item.msgTitle}}</span>
                <span>{{item.msgTime}}</span>
              </div>
              <div>{{item.content}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-pagination v-if="total>pageSize" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-size="pageSize" background layout="prev, pager, next" :total="total" class="pagination">
    </el-pagination>
  </div>
</template>
<script>
  import ProfileHeader from "components/ProfileHeader.vue";
  export default {
    data() {
      return {
        checked: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        arr: [],
      };
    },
    computed: {
      checkedAll() {
        if (this.arr.length == 0) {
          return false;
        }
        return !this.arr.some(item => {
          return item.checked === false;
        })
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        this.$post("/other/getMessage", { PageNumber: this.currentPage, PageSize: this.pageSize }).then(res => {
          if (res.code == 200) {
            this.arr = res.data.list;
            this.total = res.data.PageCount * this.pageSize;
            this.arr.forEach((ele, index) => {
              this.$set(ele, "checked", false);
            });
          }
        })
      },
      handleCheckedAll() {
        let isCheckedAll = this.arr.some(item => {
          return item.checked === false;
        })
        if (isCheckedAll) {
          this.arr.forEach(item => {
            item.checked = true
          })
        } else {
          this.arr.forEach(item => {
            item.checked = false
          })
        }
      },
      // 获取已读消息
      readMsg() {
        this.currentPage = 1;
        this.$post('/other/getMessage', { PageNumber: this.currentPage, PageSize: this.pageSize }).then(res => {
          if (res.code == 200) {
            this.arr = res.data.list;
            this.total = res.data.PageCount * this.pageSize;
            this.arr.forEach((ele, index) => {
              this.$set(ele, "checked", false);
            });
          }
        })
      },
      deleteMsg() {
        let arr = this.arr.filter(item => {
          console.log(item)
          return item.checked == false;
        })
        this.arr = arr
      },
      //点击页码
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getData()
      }
    },
    components: {
      ProfileHeader,
    },
  };
</script>
<style lang="scss" scoped>
  @import "~assets/css/pagination.css";
  @import "~assets/css/mixin";

  .flex {
    display: flex;
  }

  .news {
    width: 950px;
  }

  .table {
    padding: 30px 30px 0;
    margin-top: 10px;
    background-color: $fc;

    .select-icon {
      @include wh(16px, 16px);

    }
  }

  .table-header {
    padding: 0 30px;
    align-items: center;
    height: 70px;
    background-color: #f7f7f7;

    .btn {
      @include whl(80px, 28px, 28px);
      text-align: center;
      border-radius: 2px;
      cursor: default;
    }

    .read {
      margin-left: 60px;
      color: #6a6a6f;
      font-size: 14px;
      box-sizing: border-box;
      border: 1px solid #bbb;
      background-color: $fc;
    }

    .delete {
      margin-left: 30px;
    }
  }

  .list {
    border-bottom: 1px solid #eee;
  }

  .table-body {
    @include wh(100%, 108px) padding-left: 30px;
    box-sizing: border-box;
    align-items: center;
    color: #9899a1;

    .td {
      width: 100%;
      margin-left: 60px;
      font-size: 14px;
      line-height: 24px;

      .td-left {
        position: relative;

        img {
          @include wh(48px, 48px);

          margin-right: 10px;
        }

        .red-circle {

          @include wh(6px, 6px);
          position: absolute;
          top: 4px;
          right: 14px;
          border-radius: 50%;
          background-color: #FF4545;
        }
      }


      .td-right {
        width: 100%;

        div {
          justify-content: space-between;

          .tip {
            color: $tcolor;
            font-weight: 500;
          }

          .msg-title {
            color: $tcolor;
            font-family: "PingFangSC-Medium", "PingFang SC";
          }
        }
      }
    }
  }
</style>