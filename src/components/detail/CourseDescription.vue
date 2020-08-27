<template>
    <div class="course-desc">
        <!-- <div class="title">课程参数</div> -->
        <!-- <div class="course-parameters" v-html="courseDes.intro"></div> -->
      
        <!-- <ul class="course-parameters">
            <li v-html="courseDes.lecturerIntro"></li> -->
            <!-- <li>
                <span>课时：</span>
                <span>13.0</span>
            </li>
            <li>
                <span>有效时期：</span>
                <span>400天</span>
            </li>
            <li>
                <span>电子讲义：</span>
                <span>有</span>
            </li>
            <li>
                <span>练习题：</span>
                <span>有</span>
            </li>
            <li>
                <span>离线看：</span>
                <span>有</span>
            </li>
            <li>
                <span>赠送材料：</span>
                <span>有</span>
            </li>
            <li>
                <span>学习群：</span>
                <span>购课后获取</span>
            </li>
            <li>
                <span>智能语音识别练习：</span>
                <span>有</span>
            </li> -->
        <!-- </ul> -->
        <!-- <div class="title">课程介绍</div> -->
        <p v-html="courseDes.intro"></p>
        <!-- <div class="title">听课须知</div> -->
        <!-- <p>{{message}}</p> -->
        
    </div>
</template>
<script>

    export default {
        props:{
            courseDes:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        data() {
            return {
                text: `中国国际工程咨询公司研究中心投融资咨询处处长,湖南衡阳县人。国家发改委PPP专家库定向邀请专家,中国银行间市场交易商协会法律专业委员会委员，清华大学PPP研究中心特聘高级专家。清华大学管理学博士，复旦大学经济学硕士，伦敦政治经济学院访问学者,注册会计师。2000年以来一直在基础设施投融资与资产证券化领域从事实务、研究和政策制订工作。2012-2017年在中国保监会资金部投资处工作，推动保险资金投资基础设施项目和保险资金信用风险监管，其中2016年度参加中央组织部第16批博士生服务团，在陕西金融控股集团挂职总经理助理。2004-2012年带领专业团队为西宁市、宝鸡市、肇庆市等地方政府提供项目融资全流程咨询服务。2000-2004年在上海城投集团工作期间，组织实施了上海老港生活垃圾填埋场国际招商、上海浦东自来水公司股权转让等标杆性项目。他还曾经在广东省机构编制委员会办公室、海淀区公共服务委员会挂职锻炼，由清华大学选派参与什邡市灾后重建规划编制工作。近年主译了《基础设施投资指南：投资策略、可持续发展、项目融资与PPP》等多本专业著作的编译工作。在《中国金融》、《财经》、《中国经济导报》、《上海证券报》、《当代金融家》的主流财经媒体发表一系列关于PPP、资产证券化、融资平台等方面的文章。`,
                message: `现为产业发展处副处长，高级工程师，国家注册咨询工程师，在区域经济领域具有丰富的研究经验。牵头组织并参与多项国家高技术研究发展计划（863计划）项目，参与西部开发、东北振兴、新疆发展、内蒙建设、人工智能、生态文明、高铁经济、能源开发、电力通道建设等重大项目的政策与规划研究。主持完成了发改委《高技术产业法律法规体系研究》，工信部《战略新兴产业指导目录》，商务部《电子信息产业损害预警体系建设》等国家重点研究课题，作为课题负责人，获得国家发改委优秀咨询成果奖、工信部科学技术奖等省部级奖项2项，发表论文20余篇。`,
            }
        },
        created(){
            console.log(this.courseDes)
        }
    }
</script>
<style lang="scss" scoped>
    ul,
    li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
.course-desc{
    padding: 30px;
    box-sizing: border-box;
}
    .title {
        height: 52px;
        width: 1140px;
        line-height: 52px;
        background-color: #f7f7f7;
        text-align: left;
        color: #36363A;
        font-family:"PingFangSC-Regular","PingFang SC";
    }

    .title::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 12px;
        background-color: #98B702;
        margin-right: 20px;
    }

    ul.course-parameters {
        display: flex;
        flex-wrap: wrap;
        padding: 0 30px 30px;
        li{
            width: 30%;
            margin-top: 24px;
            color: #6A6A6F;
        }
    }

    .title+p{
        padding: 24px 30px 30px;
        font-size:14px;
        line-height: 24px;
        font-weight: 400;
        color: #6A6A6F;
    }
</style>