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
        currentIndex: "all",
        currentPage: 1,
        pageSize: 10,
        total: 0,
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
                    item.countTime=""
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
  @import "~assets/css/mixin";
  .order {
    width: 950px;
  }

  .order-header {
    height: 70px;
    padding-left: 9px;
    display: flex;
    background-color: $fc;

    .list {
      padding: 0 20px;

      div {
        width: 80px;
        line-height: 70px;
        text-align: center;
        color: $tcolor;
        cursor: default;
      }

      .active {
        border-bottom: 3px solid $tc;
        color: $tc;
        font-weight: 500;
      }
    }
  }

  .order-list {}

  .order-item {
    margin-top: 10px;
    padding: 30px;
    box-sizing: border-box;
    background-color: $fc;

    .title {
      @include fa();
      position: relative;

      div:first-child {
        font-size: 20px;
        font-weight: 500;
        color: $tcolor;
      }

      div:nth-child(2) {
        margin-left: 10px;
        font-size: 16px;
        color: #ff4545;
      }
    }

    .title::before {
      content: "";

      @include pa(5px, -26px);
      @include wh(4px, 12px);
      display: inline-block;

      background-color: $tc;
      margin-right: 30px;
    }

    .table {
      margin-top: 20px;
      border: 1px solid #eee;

      .table-header {
        height: 62px;
        padding: 0 30px;
        @include fj();
        background-color: #f7f7f7;
        color: #9899a1;
      }

      .table-body {
        padding: 30px;
        @include fj();


        .left {
          color: $tcolor;
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
      @include fj(center, center);


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
          color: $tcolor;
        }
      }

    }

    .btn-box {

      .btn {
        @include whl(108px, 32px, 32px);
        text-align: center;
        border-radius: 2px;
        margin-left: 15px;
        font-size: 14px;
      }

      .cancel {
        box-sizing: border-box;
        color: $tcolor;
        background-color: #f7f7f7;
        border: 1px solid #ddd;
      }

      .pay {
        color: $fc;
        background-color: $tc;
      }

      .study {
        color: $fc;
        background-color: #FB9715;
      }
    }
  }
</style>