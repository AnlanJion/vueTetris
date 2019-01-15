import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import 'babel-polyfill'
Vue.use(Router)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
