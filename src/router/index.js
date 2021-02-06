import Vue from 'vue'
import store from "../store/index"
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
Vue.use(VueRouter)
// 解决vue-router重复点击菜单报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  {
    path: '/ShareCircle',
    component: () => import(/* webpackChunkName: "share" */ "views/share/ShareCircle.vue"),
    meta: { title: "分享动态详情", requireAuth: false }
  },
  {
    path: '/shareCourse',
    component: () => import(/* webpackChunkName: "share" */"views/share/ShareCourse.vue"),
    meta: { title: "分享课程", requireAuth: false }
  },
  {
    path: '/shareGood',
    component: () => import(/* webpackChunkName: "share" */"views/share/ShareGood.vue"),
    meta: { title: "分享商品", requireAuth: false }
  },
  {
    path:'/share',
    component: () => import(/* webpackChunkName: "share" */"views/share/Share.vue"),
    meta: { title: "分享APP", requireAuth: false }
  },
  {
    path:'/download',
    component: () => import(/* webpackChunkName: "share" */"views/share/Download.vue"),
    meta: { title: "下载APP", requireAuth: false }
  },
  { path: '', redirect: '/index' },
  {
    path: '/index',
    component: () => import('views/Index.vue'),
    children: [
      { path: '', redirect: 'home' },
      {
        path: 'home',
        component: () => import('views/Home.vue'),
        meta: { requireAuth: false }
      },
      {
        path: 'detail',
        component: () => import('views/Detail.vue'),
        meta: { title: "课程详情", requireAuth: false }
      },
      {
        path: 'vedio',
        component: () => import('views/Vedio.vue'),
        meta: { title: "录播播放", requireAuth: true }
      },
      {
        path: 'courses',
        component: () => import('views/Courses.vue'),
        meta: { title: "" }
      },
      {
        path: 'submitOrder',
        component: () => import('views/SubmitOrder.vue'),
        meta: { title: '提交订单', requireAuth: true }
      },
      {
        path: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ 'views/About.vue'),
        meta: { requireAuth: false }
      },
      {
        path: 'buySuccess',
        component: () => import('views/BuySuccess.vue'),
        meta: { title: '购买成功', requireAuth: true }
      },
      {
        path: 'orderDetail',
        component: () => import('views/OrderDetail.vue'),
        meta: { title: '订单详情', requireAuth: true }
      },
      {
        path: 'courseLearning',
        component: () => import("views/CourseLearning.vue"),
        meta: { title: "课程学习", requireAuth: true }
      },

      {
        path: 'scanPay',
        component: () => import("views/ScanPay.vue"),
        meta: { title: "扫码支付", requireAuth: true }
      },
      {
        path: 'paySuccess',
        component: () => import("views/PaySuccess.vue"),
        meta: { title: "支付成功", requireAuth: true }
      },
      {
        path: 'user',
        component: () => import('views/uc/User.vue'),
        children: [
          {
            path: "", redirect: "profile"
          },
          {
            path: 'profile',
            component: () => import(/* webpackChunkName: "user" */ 'views/uc/Profile.vue'),
            meta: { title: '我的资料', requireAuth: true }
          },
          {
            path: 'course',
            component: () => import(/* webpackChunkName: "user" */ 'views/uc/Course.vue'),
            meta: { title: '我的课程', requireAuth: true }
          },
          {
            path: 'order',
            component: () => import(/* webpackChunkName: "user" */ 'views/uc/Order.vue'),
            meta: { title: '我的订单', requireAuth: true }
          },
          {
            path: 'collect',
            component: () => import(/* webpackChunkName: "user" */ 'views/uc/Collect.vue'),
            meta: { title: '我的收藏', requireAuth: true }
          },
          {
            path: 'news',
            component: () => import(/* webpackChunkName: "user" */ 'views/uc/News.vue'),
            meta: { title: '我的消息', requireAuth: true }
          },
          {
            path: 'integral',
            component: () => import(/* webpackChunkName: "user" */ 'views/uc/Integral.vue'),
            meta: { title: '我的积分', requireAuth: true }
          },
        ]
      },
      {
        path: 'liveVedio',
        component: () => import("views/LiveVedio.vue"),
        meta: { title: "直播", requireAuth: true }
      },
      {
        path: 'playback',
        component: () => import("views/PlayBack.vue"),
        meta: { title: "回放", requireAuth: true }
      },

    ]
  }
]

const router = new VueRouter({
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.getToken) {
      next();
    } else {
      Message({
        message: "对不起，请登录后再进行操作",
        type: 'warning',
        duration: 1000
      });
      // store.commit('setForm',{status:true})
      next("/index");
      
   
    }
  } else {
    next()
  }
})

export default router
