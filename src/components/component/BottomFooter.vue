<template>
    <div class="footer-box">
        <div class="footer">
            <div class="left">
                <span @click="seeAgreement('B')">关于我们</span>
                <div class="common"></div>
                <span @click="seeAgreement('A')">用户协议</span>
                <div class="common"></div>
                <span class="wechat" @click="dispalyQrCode">微信公众号
                    <div class="bg-qr" v-if="isShow">
                        <img src="~assets/image/qr.png" alt="">
                    </div>
                </span>
            </div>
            <div class="right">
                <span>芥末音乐教育有限公司 版权所有</span>
                <span>ICP备 5467983486351337865号-1</span>
            </div>
        </div>

        <div class="btns">
            <div class="consult1" @click="showChat"></div>
            <!-- <div v-else class="consult2 btn"></div> -->
            <div v-show="gotop" class="top btn" @click="toTop"></div>
            <!-- <chat v-if="isShowChat" @hideChat="hideChat" class="chat"></chat> -->

        </div>


    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    export default {
        data() {
            return {
                isShow: false,
                gotop: false
            }
        },
        computed: {
            ...mapGetters([
                "getConfigId"
            ])
        },
        watch: {
            $route(to, from) {
                this.isShow = false
            }
        },
        mounted() {
            this.init()
            window.addEventListener("scroll", this.handleScroll, true);
        },
        methods: {
            handleScroll() {
                let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
                this.gotop = scrolltop > 30 ? true : false;
            },
            init() {
                let that = this;
                window.easemobim = window.easemobim || {};
                easemobim.config = {
                    configId: that.getConfigId,
                    hide: true,
                    autoConnect: true,
                    hideKeyboard: true,
                    onready: function () {
                        console.log("eamsembim")
                    },
                    onsessionclosed: function () {
                        console.log("close")
                    }
                }
            },
            showChat() {
                easemobim.bind({ configId: this.getConfigId })
            },
            dispalyQrCode() {
                this.isShow = !this.isShow;
            },
            seeAgreement(type) {
                this.$router.push({ path: '/index/about', query: { type } })
            },
            //回到顶部
            toTop() {
                window.scrollTo(0, 0);
            }
        },

    }
</script>
<style>
    .em-widget-header {
        color: red;
    }
</style>
<style lang="scss" scoped>
    @import '~assets/css/mixin';

    .footer-box {
        width: 100%;
        background-color: $tcolor;
        position: relative;

        .footer {
            width: 1200px;
            height: 100px;

            @include fj();
            margin-left: auto;
            margin-right: auto;
            background-color: $tcolor;

            .left,
            .right {
                @include fj();
                color: #9899A1;
            }
        }
    }

    .left {
        span {
            cursor: pointer;
        }

        .common {
            width: 1px;
            height: 10px;
            background: rgba(152, 153, 161, 1);
            margin: 0 15px;
        }

        .wechat {
            position: relative;
        }
    }

    .right {
        :nth-child(1) {
            margin-right: 20px;
        }
    }

    .bg-qr {
        z-index: 200;
        width: 120px;
        height: 120px;
        position: absolute;
        left: -20px;
        bottom: 13px;
        /* background-image: url(~assets/image/bg_wxgzh.png); */
        /* background-size: 100%; */
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 80px;
            height: 80px;

        }
    }

    .btns {
        position: fixed;
        bottom: 250px;
        right: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 100;

        .btn {
            width: 60px;
            height: 60px;
            background-image: url(~assets/image/icon.png);
            border-radius: 50%;
        
        }

        .consult1 {
            width: 80px;
            height: 80px;
            background-image: url(~assets/image/bnt_zx.png);
            border-radius: 50%;
            background-size:100% 100%;
        }

        .consult2 {
            background-position: -156px -292px;

        }

        .top {
            margin-top: 20px;
            background-position: -246px -292px;
        }

        .chat {
            position: absolute;
            bottom: 160px;
            right: 20px;
            box-shadow: 5px 5px 10px rgba(152, 183, 2, 0.2);
        }
    }
</style>