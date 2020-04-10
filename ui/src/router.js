import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'DNA Model',
      component: () => import('@/views/DnaModeller')
    },
    {
      path: '/model/:hAppId',
      name: 'Application Model',
      component: () => import('@/views/Model'),
      props: true
    },
    {
      path: '/modules',
      name: 'Modules',
      component: () => import('@/views/Modules')
    }
  ]
})

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.VUE_APP_GOOGLE_ANALYTICS) {
  Vue.use(require('vue-analytics').default, {
    id: process.env.VUE_APP_GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    }
  })
}

export default router
