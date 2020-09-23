<template>
    <div class="order-list">
        <div class="order-item" v-for="(item,index) in list" :key="index">
            <div class="title" v-show="item.olState==1">
                <div>待支付</div>
                <div class="count-down">{{item.countTime}}</div>
            </div>
            <div class="title" v-show="item.olState==2">
                <div>待发货</div>
            </div>
            <div class="title" v-show="item.olState==3">
                <div>待收货</div>
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
                            <span v-if="el.isnotvip==0">&yen;{{el.price|priceFormat}}</span>
                            <span v-else>&yen;{{el.pricevip|priceFormat}}</span>
                            <span>&times;{{el.number}}</span>
                        </div>
                    </div>
                </div>
                <div class="total">
                    <span>合计：{{item.orderlistCourse.length}}件商品</span>
                    <div>
                        <span>共计：</span>
                        <span class="price">&yen;{{item.payPrice|priceFormat}}</span>
                    </div>
                </div>
                <div class="btn-box">
                    <div class="cancel btn" v-show="item.olState==1" @click="cancelOrder(el.olId)">取消订单</div>
                    <div class="pay btn" v-show="item.olState==1"
                        @click="toPay(el.olId,item.payMethod,el.couName,item.payPrice)">去支付
                    </div>
                    <div class="cancel btn" v-show="item.olState==3" @click="confirm(el.olId)">确认收货</div>
                    <div class="study btn" v-show="item.olState==2||item.olState==3||item.olState==5" @click="toStudy(el.couId)">去学习</div>
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
        filters:{
            priceFormat(value){
                return Number(value).toFixed(2)
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
            toPay(olId, payMethod, couName, totalPrice) {
                if (payMethod == 1) {
                    //支付宝支付
                    this.$post("/alipay/buyOrderlist", {
                        olId: olId,
                        type: 1,
                    }).then((res) => {
                        if (res.code == 200) {
                            this.qrLink = res.data;
                            console.log(this.qrLink)
                            const div = document.createElement("divform");
                            div.innerHTML = res.data;
                            document.body.appendChild(div);
                            // document.forms[0].acceptCharset = 'GBK'; //保持与支付宝默认编码格式一致，如果不一致将会出现：调试错误，请回到请求来源地，重新发起请求，错误代码 invalid-signature 错误原因: 验签出错，建议检查签名字符串或签名私钥与应用公钥是否匹配
                            document.forms[0].submit();
                        }
                    });
                }else if (payMethod == 2) {
                    //跳转到微信支付
                    this.$router.push({ path: '/index/scanPay', query: { olId, couName, totalPrice } });
                }
            },
            //再次购买
            buyAgain(payMethod, couId) {
                this.$router.push({ path: "/index/submitOrder", query: { payMethod, couId } })
            },
            //去学习
            toStudy(couId) {
                this.$router.push({ path: '/index/courseLearning', query: { couId } })
            },
            //确认收货
            confirm(olId){
                this.$confirm('你确认已收到货物?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.$post("/orderlist/updateOrderlist", { olId, olState: 4 }).then(res => {
                        if (res.code == 200) {
                            this.reload();
                        }
                    })
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/css/mixin";

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
                font-family: "PingFangSC-Medium", "PingFang SC";
            }

            .count-down {
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
                @include fj();
                height: 62px;
                padding: 0 30px;

                background-color: #f7f7f7;
                color: #9899a1;
                cursor: default;

            }

            .table-body {
                @include fj();

                padding: 30px;

                cursor: default;


                .left {
                    color: $tcolor;
                    font-weight: 500;
                    font-family: "PingFangSC-Medium", "PingFang SC";
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

            @include fj(flex-end);

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
                @include whl(108px, 32px, 32px) text-align: center;
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