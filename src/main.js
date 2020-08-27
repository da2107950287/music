import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueLazyload from 'vue-lazyload'


import 'normalize.css/normalize.css'
import {post} from './assets/js/axios'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.use(ElementUI);
Vue.use(VueLazyload)
Vue.prototype.$axios=axios
Vue.config.productionTip = false
Vue.prototype.$post=post;

Vue.prototype.$bus=new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
