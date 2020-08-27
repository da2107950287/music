<template>
    <div class="footer-box">
        <div class="footer">
            <div class="left">
                <span @click="seeAgreement('B')">关于我们</span>
                <div class="common"></div>
                <span @click="seeAgreement('A')">用户协议</span>
                <div class="common"></div>
                <span @click="dispalyQrCode">微信公众号</span>
            </div>
            <div class="right">
                <span>芥末音乐教育有限公司 版权所有</span>
                <span>ICP备 5467983486351337865号-1</span>
            </div>
        </div>
        <div class="bg-qr" v-if="isShow">
            <img src="~assets/image/qr.png" alt="">
        </div>
        <div class="btns">
            <div v-if="!isShowChat" class="consult1 btn" @click="showChat"></div>
            <div v-else class="consult2 btn"></div>
            <div class="top btn" @click="toTop"></div>
            <!-- <chat v-if="isShowChat" @hideChat="hideChat" class="chat"></chat> -->

        </div>
    </div>
</template>
<script>
    import Chat from 'components/chat/Chat'
    export default {
        data() {
            return {
                isShow: false,
                isShowChat: false,
                uid: "",
                password: '123456',
                nickname: '',
                account: '',
                configId: "6a6f3d22-243d-4b3c-9e7f-5598c1057842"
            }
        },
        
        watch: {
            $route(to, from) {
                this.isShow = false
            }
        },
        created() {
            let _this=this
            window.easemobim = window.easemobim || {};
            if(localStorage.getItem("token")){
                this.$post("/userinfo/showUserinfo").then(res => {
                if (res.code == 200) {
                    this.uid = res.data.userinfo.uid;
                    this.nickname = res.data.userinfo.nickname;
                    this.account = res.data.userinfo.account;
                    easemobim.config = {
                        configId: _this.configId,
                        hide: true,
                        autoConnect: true,
                        hideKeyboard: true,
                        // dialogPosition: { x: '30px', y: '100px' },
                        // user: {
                        //     // username 必填，password 和 token 任选一项填写
                        //     username: this.uid,
                        //     password: this.password,
                        // },

                        visitor: {
                            userNickname: _this.username,
                            phone: _this.account
                        },
                        onready: function () {
                            console.log("open")
                        },
                        onclose: function () {
                            _this.isShowChat = false
                        }
                    }


                }
            })

            }
            
        },
        methods: {
            showChat() {
                this.isShowChat = true;
                easemobim.bind({ configId: this.configId })
            },
            hideChat() {
                this.isShowChat = false;
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
        components: {
            Chat
        }
    }
</script>
<style>
    body.theme-5 /deep/ .bg-color {
        display: none !important;
        background-color: #fff;
    }
</style>
<style lang="scss" scoped>
    .footer-box {
        width: 100%;
        background-color: #36363A;
        position: relative;

        .footer {
            width: 1200px;
            height: 100px;
            display: flex;
            justify-content: space-between;
            margin-left: auto;
            margin-right: auto;
            background-color: #36363A;

            .left,
            .right {
                display: flex;
                align-items: center;
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
        left: 508px;
        bottom: 66px;
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
        position: absolute;
        bottom: 250px;
        right: 0;
        display: flex;
        flex-direction: column;
        z-index: 100;

        .btn {
            width: 60px;
            height: 60px;
            background-image: url(~assets/image/icon.png);
            border-radius: 50%;
        }

        .consult1 {
            background-position: -66px -292px;
        }

        .consult2 {
            background-position: -156px -292px;

        }

        .top {
            margin-top: 30px;
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