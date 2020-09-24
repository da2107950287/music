<template>
    <div>
        <div class="main-detail">
            <TopDetail :topDetail="topDetail" @collectCourse="collectCourse" @buy="buy" :collected="collected" />
            <CourseDetail :couresDetail="couresDetail" :catalogue="catalogue" :buyState="buyState" class="margin30" />
        </div>
    </div>
</template>
<script>
    import TopDetail from 'components/detail/TopDetail'
    import CourseDetail from 'components/detail/CourseDetail'
    import { mapGetters,mapActions } from "vuex"

    export default {
        data() {
            return {
                couId: '',
                couType: '',
                couresDetail: {},
                topDetail: {},
                catalogue: [],
                collected: false,
                buyState: null,
                isRouterAlive: true,
            }
        },
        computed: {
            ...mapGetters([
                "getToken"
            ])
        },
        created() {
            this.init()
        },
        methods: {
            ...mapActions([
                "setForm"
            ]),
            init() {
                this.couId = this.$route.query.couId
                this.getCourse()
                // 获取课程目录
                this.$post('/course/getCatalogue', { couId: this.couId }).then(res => {
                    if (res.code == 200) {
                        this.catalogue = res.data;
                    }
                })
            },
            //获取课程详情
            getCourse() {
                this.$post('/course/showCourse', { couId: this.couId }).then(res => {
                    if (res.code == 200) {
                        this.couresDetail = res.data;
                        this.couType = res.data.couType;
                        this.buyState = res.data.buyState;
                        var lecturer=[]
                        this.couresDetail.list.forEach(el => {
                            lecturer+=el.username+" "
                        });
                        this.topDetail = {
                            cover: res.data.cover,
                            couName: res.data.couName,
                            courseCollState: res.data.courseCollState,
                            priceVip: res.data.pricevip,
                            price: res.data.price,
                            totalHours: res.data.totalHours,
                            termOfValidity: res.data.termOfValidity,
                            lecturer: lecturer,
                            buyState: res.data.buyState
                        }
                    }
                })
            },

            //收藏课程
            collectCourse() {
                this.$post('/course/setCourseColl', { couId: this.couId }).then(res => {
                    if (res.code == 200) {
                        this.getCourse();
                       
                    } else {
                        this.$message.error("收藏失败");
                    }
                })
            },
            //立即购买
            buy() {
                if (this.getToken) {
                    this.$router.push({ path: '/index/submitOrder', query: { couId: this.couId } })
                } else {
                    this.$message.warning("对不起，请登录后再进行操作！");
                    this.setForm(true)
                }
            }
        },
        components: {
            TopDetail,
            CourseDetail
        }
    }
</script>
<style scoped>
    .main-detail {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #F7F7F7;
    }

    .margin30 {
        margin-top: 30px;
    }
</style>