<template>
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleDialogClose" center width="480px">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
            <div class="left">
                <div class="logo"></div>
                <div class="title"></div>
            </div>
            <el-form-item prop="phone">
                <el-input v-model="loginForm.phone" minlength="11" maxlength="11" placeholder="请输入手机号"
                    @keyup.enter.native="nextEnter('smsCode')">
                </el-input>
            </el-form-item>
            <el-form-item prop="smsCode" class="graphics-code">
                <el-input v-model="loginForm.smsCode" ref="smsCode" placeholder="请输入验证码"
                    @keyup.enter.native="submitForm"></el-input>
                <div class="code" :class="{'can-click':canClick1}" @click="codeClick">{{codeMsg}}</div>
            </el-form-item>
        </el-form>
        <div class="agreement">
            <span>首次登陆默认同意</span>
            <span @click="seeUserAgreement">《用户协议》</span>
        </div>
        <div @click="submitForm" ref="login" class="login-button" :disabled="!loginBtn"
            :class="{'login-btn-active':loginBtn}">登 录</div>
        <div class="contact">
            <span>登录遇到问题请联系客服：</span>
            <span>400-555-666</span>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        inject: ["reload"],
        props: {
            dialogFormVisible: {
                type: Boolean
            }
        },
        data() {
            //手机号自定义规则
            var validatorPhone = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入手机号"));
                } else {
                    var isPhone = /^[1][0-9][0-9]{9}$/;
                    if (!isPhone.test(value)) {
                        callback(new Error("手机号输入错误"));
                    } else {
                        this.canClick = true;
                        this.canClick1 = true;
                        callback();
                    }
                }
            };
            //短信验证码自定义规则
            var validatorSmsCode = (rule, value, callback) => {

                if (value === "") {
                    callback(new Error("请输入验证码"));
                } else {
                    this.loginBtn = true;
                    callback();
                }
            };
            return {
                canClick: true, //验证码开关
                canClick1: false,//codeMsg字体颜色
                loginBtn: false,//登录按钮开关
                codeMsg: "发送验证码",
                totalTime: 60,
                clock: null,
                loginForm: {
                    phone: "",//手机号
                    smsCode: "",//验证码
                },
                rules: {
                    phone: [{ validator: validatorPhone, trigger: "blur" }],
                    smsCode: [{ validator: validatorSmsCode, trigger: "blur" }],
                },
            }
        },
        watch: {
            'loginForm.smsCode'(val) {
                if (val !== "") {
                    this.loginBtn = true;
                } else {
                    this.loginBtn = false;
                }
            },
            'loginForm.phone'() {
                this.loginForm.phone = this.loginForm.phone.replace(/\D/g, '');
            }

        },
        methods: {
            nextEnter(next) {
                this.$nextTick(() => {
                    this.$refs[next].focus()
                })
            },
            //关闭dialog
            handleDialogClose() {
                this.$emit("hideLoginBox")
                this.codeMsg = "发送验证码";
                window.clearInterval(this.clock);
                this.canClick = true;
                this.canClick1 = false;
                this.loginForm = {
                    phone: "",
                    smsCode: ""
                }
                this.$refs.loginForm.resetFields();
            },
            //点击验证码
            codeClick() {

                if (!this.canClick) return;
                this.canClick = false;
                this.codeMsg = this.totalTime + "s";
                //60秒倒计时
                this.clock = window.setInterval(() => {
                    this.totalTime--;
                    this.codeMsg = this.totalTime + "s";
                    if (this.totalTime < 0) {
                        window.clearInterval(this.clock);
                        this.codeMsg = "重新发送验证码";
                        this.totalTime = 60;
                        this.canClick = true; //这里重新开启
                    }
                }, 1000);
                this.$post("/userinfo/send_sms", {
                    account: this.loginForm.phone
                }).then((res) => {
                    switch (res.code) {
                        case "200":
                            this.$message.success(res.msg);
                            break;
                        case "500":
                            this.canClick = true; //这里重新开启
                            this.$message.error(res.msg);
                            break;
                        default:
                            break;
                    }
                }
                );
            },
            //登录
            submitForm() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.$post("/userinfo/login", {
                            account: this.loginForm.phone,
                            verify: this.loginForm.smsCode,
                            inCode: "",
                            type: 1
                        }).then((res) => {
                            switch (res.code) {
                                case "200":
                                    this.$store.commit("setUserInfo", {
                                        accLeaTime: res.data.accLeaTime,
                                        headportrait: res.data.headportrait,
                                        nickname: res.data.nickname,
                                        token: res.data.token,
                                        vip: res.data.vip,
                                        integral: res.data.integral,
                                        sex: res.data.sex,
                                        status: res.data.status,
                                        uid: res.data.uid
                                    });
                                    this.$emit("hideLoginBox")
                                    this.reload()
                                case 201:
                                    this.$message.success(res.msg);
                                    this.$emit("hideLoginBox")
                                    this.reload()
                                    break;
                                case "401":
                                case "402":
                                case "500":
                                    this.$message.error(res.msg);
                                    break;
                                default:
                                    console.log(res.msg);
                                    break;
                            }
                        });
                    }
                });
            },
            //查看用户协议
            seeUserAgreement() {
                this.$emit("hideLoginBox")
                this.$router.push({ path: "/index/about", query: { type: "A" } });
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "~assets/css/mixin";

    .left {
        @include fj(center, center);
        text-align: center;
        margin-bottom: 50px;

        .logo {
            @include whl(78px, 78px, 78px);
            background-image: url(~assets/image/logo.png);
            background-size: 100% 100%;

        }

        .title {
            @include wh(119px, 35px);
            background-image: url(../../assets/image/name.png);
            background-size: 100% 100%;

        }
    }

    /*修改el-input样式 */
    .el-input /deep/ .el-input__inner {
        border: none;
        border-bottom: 1px solid #eee;
        font-size: 16px;
        color: $tcolor;
        border-radius: 0;
    }

    .graphics-code {
        position: relative;

        .code {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 14px;
            color: #ccc;
            cursor: default;
        }

        .can-click {
            color: $tc;
        }
    }

    .agreement {
        font-size: 14px;
        text-align: center;


        >span:nth-child(1) {
            color: $tcolor;
        }

        >span:nth-child(2) {
            color: #fb9715;
            cursor: default;
        }
    }

    .login-button {
        @include wh(400px, 50px);
        @include fj(center, center);
        margin: 12px auto;
        background-color: $tc;
        border-radius: 3px;
        opacity: 0.6;
        color: $fc;
        font-size: 18px;
        font-weight: 500;
        cursor: default;
        border: none;
    }

    .login-btn-active {
        opacity: 1;
    }

    .contact {
        font-size: 14px;
        text-align: center;
        color: #6a6a6f;

        >spam:nth-child(1) {
            color: #6a6a6f;
        }

        >span:nth-child(2) {
            color: #0091ff;
        }
    }
</style>