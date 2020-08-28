import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决vue-router重复点击菜单报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    component: () => import('views/Index.vue'),
    children: [
      {
        path: '/',
        redirect: 'home'
      },
      {
        path: 'home',
        component: () => import('views/Home.vue'),
      },
      {
        path: 'detail',
        component: () => import('views/Detail.vue'),
        meta: { title: "课程详情" }
      },
      {
        path: 'vedio',
        component: () => import('views/Vedio.vue'),
        meta: { title: "录播播放" }
      },
      {
        path: 'courses',
        component: () => import('views/Courses.vue'),
        meta: { title: "" }
      },
      {
        path: 'submitOrder',
        component: () => import('views/SubmitOrder.vue'),
        meta: { title: '提交订单' }
      },
      {
        path: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ 'views/About.vue')
      },
      {
        path: 'buySuccess',
        component: () => import('views/BuySuccess.vue'),
        meta: { title: '购买成功' }
      },
      {
        path: 'orderDetail',
        component: () => import('views/OrderDetail.vue'),
        meta: { title: '订单详情' }
      },
      {
        path: 'courseLearning',
        component: () => import("views/CourseLearning.vue"),
        meta: { title: "课程学习" }
      },

      {
        path: 'scanPay',
        component: () => import("views/ScanPay.vue"),
        meta: { title: "扫码支付" }
      },
      {
        path: 'paySuccess',
        component: () => import("views/PaySuccess.vue"),
        meta: { title: "支付成功" }
      },
      {
        path: 'user',
        component: () => import('views/User.vue'),
        children: [
          {
            path: "/", redirect: "profile"
          },
          {
            path: 'profile',
            component: () => import(/* webpackChunkName: "user" */ 'views/Profile.vue'),
            meta: { title: '我的资料' }
          },
          {
            path: 'course',
            component: () => import(/* webpackChunkName: "user" */ 'views/Course.vue'),
            meta: { title: '我的课程' }
          },
          {
            path: 'order',
            component: () => import(/* webpackChunkName: "user" */ 'views/Order.vue'),
            meta: { title: '我的订单' }
          },
          {
            path: 'collect',
            component: () => import(/* webpackChunkName: "user" */ 'views/Collect.vue'),
            meta: { title: '我的收藏' }
          },
          {
            path: 'news',
            component: () => import(/* webpackChunkName: "user" */ 'views/News.vue'),
            meta: { title: '我的消息' }
          },
          {
            path: 'integral',
            component: () => import(/* webpackChunkName: "user" */ 'views/Integral.vue'),
            meta: { title: '我的积分' }
          },
        ]
      },
      {
        path: 'liveVedio',
        component: () => import("views/LiveVedio.vue"),
        meta: { title: "直播" }
      },
     
     

    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    next();
  } else {
    if (to.path.includes('/user')) {
      next({
        path: '/index/home'
      })
    } else {
      next();
    }
  }
})
// router.afterEach((to,from,next)=>{
//   function getClass(tagName,aClass){
//     let aEle = document.getElementsByTagName(tagName);　　  
//     let result = []; 
//     let className = '';
// 　　for(let i=0;i<aEle.length;i++){  
//         if(aEle[i].className != ''){
//           className = aEle[i].className;
//           if(className.indexOf(aClass) > -1){
//             result.push(aEle[i])
//           }else{
//             if(aEle[i].className == aClass){   
//               result.push(aEle[i]) 
//             }
//           }
//         }
// 　　}
// 　　return result
//   }
//   setTimeout(()=>{
//     let _hmt = _hmt || [];
//     (function() {
//       //重加载环信
//       let easemobimPromptWrapper = getClass("div","easemobim-prompt-wrapper");
//       if(easemobimPromptWrapper.length > 0){
//           for(let i=0;i<easemobimPromptWrapper.length;i++){
//             easemobimPromptWrapper[i].remove();
//           }
//       }
//       let easemobimMobile = getClass("iframe","easemobim-mobile");
//       if(easemobimMobile.length > 0){
//         for(let i=0;i<easemobimMobile.length;i++){
//           easemobimMobile[i].remove();
//         }
//       }

//       document.getElementById('kefuEasemob') && document.getElementById('kefuEasemob').remove();
//       let hm = document.createElement("script");
//       hm.src = "//kefu.easemob.com/webim/easemob.js";
//       hm.id = "kefuEasemob";
//       let s = document.getElementsByTagName("script")[0];
//       s.parentNode.insertBefore(hm, s);

//       // document.querySelector('body').removeClass('easemobim-mobile-body')
//     })();
//   },0);
// })
export default router
