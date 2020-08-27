<template>
  <div>
    <profile-header>
      <div slot="title">我的积分</div>
      <div slot="right">当前积分：{{integral}}</div>
    </profile-header>
    <div class="integral-bottom" :style="{'margin-bottom':total<=pageSize?'30px':''}">
      <div class="table">
        <ul class="table-header">
          <li>积分来源/用途</li>
          <li>积分变化</li>
          <li>日期</li>
        </ul>
        <ol class="table-body" v-for="(item,index) in list" :key="index">
          <li>{{item.describes}}</li>
          <li><span v-if="item.irSort==0">&#43;</span><span v-else>&#45;</span>{{item.number}}</li>
          <li>{{item.irTime}}</li>
        </ol>
      </div>
    </div>
    <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" background
      layout="prev, pager, next" :total="total" class="pagination">
    </el-pagination>
  </div>
</template>
<script>
  import ProfileHeader from "components/ProfileHeader.vue";
  export default {
    data() {
      return {
        integral: 0,
        currentPage: 1,
        pageSize: 10,
        total:0,
        list: [],
      };
    },
    created() {
      this.$post('/userinfo/showUserinfo', {}).then(res => {
        if (res.code == 200) {
          this.integral = res.data.userinfo.integral;
        }
      })
      this.getData()
    },
    methods: {
      getData() {
        this.$post("/other/getIntegralRecord", { PageNumber: this.currentPage, PageSize: this.pageSize }).then(res => {
          if (res.code == 200) {
            this.total = res.data.PageCount * this.pageSize;
            this.list = res.data.list;
          }
        })
      },
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
  @import '~assets/css/pagination.css';

  ul,
  ol,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .integral-bottom {
    width: 950px;
    margin-top: 10px;
    padding: 30px;
    box-sizing: border-box;

    background-color: #fff;
  }

  .table {
    border: 1px solid #eee;
    border-bottom: 0;
  }

  .table-header {
    display: flex;
    height: 50px;
    line-height: 50px;
    background-color: #f7f7f7;

    li {
      font-weight: 500;
      font-family: "PingFangSC-Medium", "PingFang SC";

    }
  }

  .table-body {
    display: flex;
    line-height: 80px;
    border-bottom: 1px solid #eee;
    font-family: "PingFangSC-Regular", "PingFang SC";

    li:nth-child(1) {
      text-align: left;
      margin-left: 30px;
    }
  }

  .table-header,
  .table-body {
    li {
      width: 25%;
      font-size: 14px;
      color: #36363a;
      text-align: center;
    }

    li:nth-child(1) {
      width: 50%;
    }
  }

  .el-pagination.is-background /deep/ .el-pager li:not(.disabled).active {
    background-color: #98B702;
  }
</style>