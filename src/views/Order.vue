<template>
  <div class="order">
    <div class="order-header">
      <div v-for="(item,index) in lists" :key="index" class="list" @click="handleClick(item.olState,index)">
        <div :class="{'active':currentIndex==item.olState}">{{item.name}}</div>
      </div>
    </div>
    <order-list :style="{'margin-bottom':total<=pageSize?'30px':''}" :list="list"></order-list>
    <el-pagination v-if="total>pageSize" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-size="pageSize" background layout="prev, pager, next" :total="total" class="pagination">
    </el-pagination>
  </div>
</template>
<script>
  import OrderList from 'components/order/OrderList'
  export default {
    data() {
      return {
        status: 0,
        currentIndex: "all",
        currentPage: 1,
        pageSize: 10,
        total: null,
        type: 1,
        lists: [
          { name: "全部", olState: "all" },
          { name: "待付款", olState: "1" },
          { name: "已完成", olState: "5" },
          { name: "已取消", olState: "6" },
        ],
        list: []
      };
    },

    created() {
      this.getData(this.currentIndex)

    },
    methods: {
      getData(olState) {

        this.$post('/orderlist/getOrderlist', { olState, type: this.type, PageNumber: this.currentPage, PageSize: this.pageSize }).then(res => {
          if (res.code == 200) {
            this.total = res.data.PageCount * this.pageSize;
            this.list = res.data.list;
            this.list.forEach(item => {
              if (item.olState == 1) {
                let timer = setInterval(() => {
                  var date = new Date();
                  var now = date.getTime();
                  let olData = new Date(item.olTime.replace(/-/g, '/'))
                  let olTime = olData.getTime()
                  let end = olTime + 30 * 1000 * 60;
                  let leftTime = end - now;
                  if (leftTime >= 0) {
                    let m = Math.floor(leftTime / 1000 / 60 % 60);
                    let s = Math.floor(leftTime / 1000 % 60);
                    this.$set(item, "countTime", `请在${m}分${s}秒内完成支付，超时订单将被自动取消哦〜`)
                  } else {
                    clearInterval(timer);
                  }
                }, 1000);
              }
            })
          }
        })
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getData(this.currentIndex)
      },
      handleClick(olState, index) {
        this.currentPage = 1;
        this.currentIndex = olState;
        this.getData(olState)
      },
    },
    components: {
      OrderList
    }
  };
</script>
<style lang="scss" scoped>
  @import '~assets/css/pagination.css';

  .order {
    width: 950px;
  }

  .order-header {
    height: 70px;
    padding-left: 9px;
    display: flex;
    font-size: 16px;
    background-color: #fff;

    .list {
      padding: 0 20px;

      div {
        width: 80px;
        line-height: 70px;
        text-align: center;
        color: #36363a;
        font-weight: 400;
        cursor: default;
      }

      .active {
        border-bottom: 3px solid #98b702;
        color: #98b702;
        font-weight: 500;
      }
    }
  }

  .order-list {}

  .order-item {
    margin-top: 10px;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;

    .title {
      display: flex;
      align-items: center;
      position: relative;

      div:first-child {
        font-size: 20px;
        font-weight: 500;
        color: #36363a;
      }

      div:nth-child(2) {
        margin-left: 10px;
        font-size: 16px;
        color: #ff4545;
      }
    }

    .title::before {
      content: "";
      position: absolute;
      top: 5px;
      left: -26px;
      display: inline-block;
      width: 4px;
      height: 12px;
      background-color: #98b702;
      margin-right: 30px;
    }

    .table {
      margin-top: 20px;
      border: 1px solid #eee;

      .table-header {
        height: 62px;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f7f7f7;
        color: #9899a1;
      }

      .table-body {
        padding: 30px;
        display: flex;
        justify-content: space-between;

        .left {
          color: #36363a;
          font-weight: 500;
        }

        .right {
          color: #9899a1;

          span:nth-child(2) {
            margin: 0 60px;
          }
        }
      }
    }

    .total,
    .btn-box {
      display: flex;
      justify-content: flex-end;

      div {
        cursor: default;
      }
    }

    .total {
      margin: 30px 0;
      color: #9899a1;

      div {
        margin-left: 30px;

        .price {
          color: #36363a;
        }
      }

    }

    .btn-box {

      .btn {
        width: 108px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 2px;
        margin-left: 15px;
        font-size: 14px;
      }

      .cancel {
        box-sizing: border-box;
        color: #36363A;
        background-color: #f7f7f7;
        border: 1px solid #ddd;
      }

      .pay {
        color: #fff;
        background-color: #98b702;
      }

      .study {
        color: #fff;
        background-color: #FB9715;
      }
    }
  }
</style>