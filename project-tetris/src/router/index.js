import Vue from 'vue'
import Router from 'vue-router'
import Share from '../components/share.vue'
import Ranking from '../components/ranking.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/share',
      components: Share
    },
    {
      path: '/ranking',
      component: Ranking
    }
  ]
})
