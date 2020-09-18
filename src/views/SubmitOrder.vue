<template>
    <div class="submit-order">
        <shipping-address @editAddress="showForm" :addressInfo="addressInfo">
            <div slot="right">
                <div class="title-left">
                    <img src="~assets/image/icon_xgdz.png" alt="">
                    <span v-if="addressInfo">修改地址</span>
                    <span v-else>添加地址</span>
                </div>
            </div>
        </shipping-address>
        <course-info :detail="detail"></course-info>
        <pay-order :totalPrice="totalPrice" @pay="pay"></pay-order>
        <edit-address :isShowForm="isShow" :aa="aa" @hideForm="hideForm" :addressInfo="addressInfo"></edit-address>
    </div>
</template>
<script>
    import ShippingAddress from 'components/submitorder/ShippingAddress.vue'
    import CourseInfo from 'components/submitorder/CourseInfo.vue'
    import PayOrder from 'components/submitorder/PayOrder.vue'
    import EditAddress from 'components/submitorder/EditAddress.vue'
    export default {
        data() {
            return {
                couId: '',
                detail: {},
                deduction:0,
                isVip: 0,
                integral: 0,
                totalPrice: 0,
                pricevip: null,
                price: null,
                couName: "",
                isShow: false,//是否显示编辑地址框
                addressInfo: {},
                aa: {}
            }
        },
     
        created() {
            this.couId = this.$route.query.couId;
            //获取地址
            this.$post("/address/getAddress", {}).then(res => {
                if (res.code == 200) {
                    let data = res.data;
                    data.forEach((item, index) => {
                        if (item.state == 1) {
                            this.addressInfo = item;
                        }
                    })
                }
            })
            // 获取用户相关信息
            this.$post('/userinfo/showUserinfo', {}).then(res => {
                if (res.code == 200) {
                    this.vip = res.data.userinfo.vip;
                    this.integral = res.data.userinfo.integral;
                    this.$set(this.detail, "vip", this.vip);
                    this.$set(this.detail, "integral", this.integral)
                    //获取课程相关信息
                    this.$post('/course/showCourse', { couId: this.couId }).then(res => {
                        if (res.code == 200) {
                            this.couName = res.data.couName;
                            this.pricevip = res.data.pricevip;
                            this.price = res.data.price
                            this.getPrice()
                            this.$set(this.detail, "couName", res.data.couName);
                            this.$set(this.detail, "lecturer", res.data.lecturer);
                            this.$set(this.detail, "totalHours", res.data.totalHours);
                            this.$set(this.detail, "pricevip", res.data.pricevip);
                            this.$set(this.detail, "price", res.data.price);
                        }
                    })
                }
            })

        },
        methods: {
            pay(payMethod) {
                if (payMethod == 2) {
                    //微信支付
                    this.$router.push({
                        path: '/index/scanPay', query: {
                            totalPrice: this.totalPrice,
                            couId: this.couId,
                            integral: this.deduction,
                            // payMethod,
                            couName: this.couName,
                            fullname: this.addressInfo.fullname,
                            address: this.addressInfo.addressinfo + this.addressInfo.detailed,
                            mobile: this.addressInfo.mobile
                        }
                    });
                } else {
                    //支付宝支付
                    this.$post("/alipay/buyCourse", {
                        couId: this.couId,
                        integral: this.deduction,
                        fullname: this.addressInfo.fullname,
                        address: this.addressInfo.addressinfo + this.addressInfo.detailed,
                        mobile: this.addressInfo.mobile,
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
                }

            },
            getPrice() {
                if (this.vip == 0) {
                    this.get(this.price)
                } else {
                    this.get(this.pricevip)
                }
            },
            get(price) {
                var max, deduction,totalPrice;
                if (this.integral >= 10) {
                    max = (price * 0.05);
                    deduction = (this.integral / 1000)
                    console.log(deduction, max)
                    console.log(deduction >= max)
                    if (deduction >= max) {
                        totalPrice = price - max;
                        deduction = max;
                    } else {
                        totalPrice = price - deduction;
                    }
                } else {
                    deduction = 0;
                    totalPrice = price;
                }
                this.totalPrice=totalPrice.toFixed(2);
                this.deduction=deduction*1000;
                this.$set(this.detail, "deduction", deduction.toFixed(2));
                this.$set(this.detail, "totalPrice", totalPrice);

            },
            showForm() {
                this.isShow = true;
            },
            hideForm() {
                this.isShow = false;
            }
        },
        components: {
            ShippingAddress,
            CourseInfo,
            PayOrder,
            EditAddress
        }
    }
</script>
<style scoped>
    .submit-order {
        width: 1200px;
        margin: 0 auto;
    }
</style>