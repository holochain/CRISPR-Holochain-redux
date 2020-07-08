import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/library/Index')
    },
    {
      path: '/library/:profiles',
      name: 'My Applications',
      component: () => import('@/views/library/Index'),
      props: true
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('@/views/home/Index')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/views/settings/Index')
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('@/views/article/Index'),
      props: true
    },
    {
      path: '/app-store',
      name: 'Applications Store',
      component: () => import('@/views/store/Index')
    },
    {
      path: '/part-store',
      name: 'Parts Store',
      component: () => import('@/views/store/Index')
    },
    {
      path: '/store/part/:id',
      name: 'Part Store Page',
      component: () => import('@/views/store-page/Part')
    },
    {
      path: '/store/application/:id',
      name: 'Application Store Page',
      component: () => import('@/views/store-page/Happ')
    },
    {
      path: '/projects/:instanceId',
      name: 'Projects',
      component: () => import('@/views/projects/Index')
    },
    {
      path: '/project/:instanceId/:base/:projectId',
      name: 'Project',
      component: () => import('@/views/projects/DnaModeller'),
      props: true
    },
    {
      path: '/parts',
      name: 'Parts',
      component: () => import('@/views/library/Parts'),
      props: true
    },
    {
      path: '/part/:instanceId/:base/:projectId',
      name: 'Part',
      component: () => import('@/views/parts/PartEditor')
    },
    {
      path: '/profiles',
      name: 'Profiles',
      component: () => import('@/views/profiles/Index')
    },
    {
      path: '/personas',
      name: 'Personas',
      component: () => import('@/views/personas/Index')
    },
    {
      path: '/profile-site/:id',
      name: 'Profile',
      component: () => import('@/views/profileSite/Index')
    },
    {
      path: '/kanbans/:instanceId',
      name: 'Kanbans',
      component: () => import('@/views/kanbans/Kanbans')
    },
    {
      path: '/projectKanban/:instanceId/:base/:projectId',
      name: 'Project Kanban',
      component: () => import('@/views/projectKanban/ProjectKanbanModule')
    },
    {
      path: '/bubbles/:instanceId',
      name: 'Bubbles',
      component: () => import('@/views/bubbles/Index')
    },
    {
      path: '/origins/:instanceId',
      name: 'Origins',
      component: () => import('@/views/origins/Index')
    },
    {
      path: '/holopunk-records/library',
      name: 'Holopunk Records',
      component: () => import('@/components/parts/MusicLibrary/MusicManager')
    },
    {
      path: '/knowledge-base',
      name: 'Knowledge Base',
      component: () => import('@/views/knowledgeBase/Index')
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
