import Vue from 'vue'
import App from './App.vue'
import Router from '@/router'
import TypeNav from '@/components/TypeNav'
import Pagenation from '@/components/pagination'
import store from '@/store'
import mockServer from '@/mock/mockServer'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import { MessageBox } from 'element-ui';
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import LazyPng from '@/assets/images/1.gif'
// 使用图片懒加载插件
const loadimage = require('@/assets/images/1.gif')
Vue.use(VueLazyload, {
  loading: loadimage,
})
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagenation.name, Pagenation)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false
new Vue({
  store,
  render: h => h(App),
  router: Router,
  beforeCreate() {
    Vue.prototype.$bus = this,
      Vue.prototype.$API = API
  }
}).$mount('#app')
