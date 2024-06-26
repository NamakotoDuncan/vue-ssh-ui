import Vue from 'vue'
import Router from 'vue-router'
// import Customers from './views/Customers.vue'
// import CustomerDetails from './views/CustomerDetails.vue'
import Home from './views/Home.vue'
import ClusterDetails from './views/ClusterDetails.vue'
import DbStats from './views/DbStats.vue';

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/cluster-details/:clusterId',
      name: 'ClusterDetails',
      component: ClusterDetails,
      props: true

    },
    {
      path: '/cluster-details/:clusterId/:dbId',
      name: 'DbStats',
      component: DbStats,
      props: true

    }
  ]
})
export default router
