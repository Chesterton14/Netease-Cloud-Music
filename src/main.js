import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import '@/style/index.scss'
import '@/icons' // icon

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

Vue.config.productionTip = false;

console.log(`当前环境:${process.env.NODE_ENV},后端接口:${process.env.VUE_APP_BASE_API}`);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
