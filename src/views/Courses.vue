<template>
    <div>
        <Banner :banners="banners" />
        <Courses :courses="list" :style="{'margin-bottom':total<=pageSize?'30px':''}" />
        <el-pagination v-if="total>pageSize" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-size="pageSize" background layout="prev, pager, next" :total="total" class="pagination">
        </el-pagination>
        <DownloadApp />
    </div>
</template>
<script>
    import Banner from 'components/home/Banner'
    import Courses from 'components/home/Courses'
    import DownloadApp from 'components/home/DownloadApp'
    export default {
        data() {
            return {
                banners: [],
                list: [],
                couType: '',
                currentPage: 1,
                pageSize: 12,
                total: 0
            }
        },
        watch: {
            $route() {
                this.currentPage = 1;
                this.couType = this.$route.query.couType
                this.getData()
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.$post('/other/getBanner', { positions: "1" }).then((res) => {
                    if (res.code == 200) {
                        this.banners = res.data
                    }
                })
                this.getData();
            },
            getData() {
                this.couType = this.$route.query.couType
                this.$post("/course/getCourse", { couType: this.couType, PageNumber: this.currentPage, PageSize: this.pageSize }).then(res => {
                    if (res.code == 200) {
                        this.list = res.data.list;
                        this.total = res.data.PageCount * this.pageSize;
                    }
                })
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.getData()
            }
        },
        components: {
            Banner,
            Courses,
            DownloadApp
        }

    }
</script>
<style>
    @import "../assets/css/pagination.css";
</style>