<template>
    <div  class="order-list">
        <div class="order-item" v-for="(item,index) in list" :key="index">
            <div class="title" v-show="item.olState==1">
                <div>待支付</div>
                <div class="count-down">{{item.countTime}}</div>
            </div>
            <div class="title" v-show="item.olState==5">
                <div>已完成</div>
            </div>
            <div class="title" v-show="item.olState==6">
                <div>已取消 </div>
            </div>
            <div v-for="(el,index) in item.orderlistCourse" :key="index+'1'">
                <div class="table">
                    <div class="table-header">
                        <div>
                            <span>订单号：</span>
                            <span>{{el.olId}}</span>
                        </div>
                        <div>
                            <span>下单时间：</span>
                            <span>{{item.olTime}}</span>
                        </div>
                    </div>
                    <div class="table-body" @click="seeDetail(el.olId)">
                        <div class="left">{{el.couName}}</div>
                        <div class="right">
                            <span>总课时：{{el.totalHours}}</span>
                            <span v-if="el.isnotVip==0">&yen;{{el.price}}</span>
                            <span v-else>&yen;{{el.pricevip}}</span>
                            <span>&times;{{el.number}}</span>
                        </div>
                    </div>
                </div>
                <div class="total">
                    <span>合计：{{item.orderlistCourse.length}}件商品</span>
                    <div>
                        <span>共计：</span>
                        <span class="price">&yen;{{item.payPrice}}</span>
                    </div>
                </div>
                <div class="btn-box">
                    <div class="cancel btn" v-show="item.olState==1" @click="cancelOrder(el.olId)">取消订单</div>
                    <div class="pay btn" v-show="item.olState==1" @click="toPay(el.olId,item.payMethod,el.couName,item.cdyPrice)">去支付
                    </div>
                    <div class="study btn" v-show="item.olState==5" @click="toStudy(el.couId)">去学习</div>
                    <div class="pay btn" v-show="item.olState==6" @click="buyAgain(el.couType,el.couId)">再次购买</div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        inject: ['reload'],
        props: {
            list: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            //进入订单详情
            seeDetail(olId) {
                this.$router.push({ path: '/index/orderDetail', query: { olId } })
            },
            //取消订单
            cancelOrder(olId) {
                this.$confirm('你确定要取消该订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.$post("/orderlist/updateOrderlist", { olId, olState: 6 }).then(res => {
                        if (res.code == 200) {
                            this.reload();
                        }
                    })
                })

            },
            //去支付
            toPay(olId,payMethod, couName, totalPrice) {
                this.$router.push({ path: '/index/scanPay', query: { olId,payMethod, couName, totalPrice } });
            },
            //再次购买
            buyAgain(payMethod, couId) {
                this.$router.push({ path: "/index/submitOrder", query: { payMethod, couId } })
            },
            //去学习
            toStudy(couId) {
                this.$router.push({ path: '/index/courseLearning', query: { couId } })
            },
        }
    }
</script>
<style lang="scss" scoped>
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
                font-family:"PingFangSC-Medium","PingFang SC";
            }

            /* .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
} */
            .count-down{
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
                cursor: default;

            }

            .table-body {
                padding: 30px;
                display: flex;
                justify-content: space-between;
                cursor: default;


                .left {
                    color: #36363a;
                    font-weight: 500;
                    font-family:"PingFangSC-Medium","PingFang SC";
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