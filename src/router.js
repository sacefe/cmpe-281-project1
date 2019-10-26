import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/Admin.vue'),
        children: [
            {
                path: '/admin',
                name: 'GetFiles',
                component: () => import('@/components/admin/GetFiles.vue')
            },
            {
                path: '/admin/upload',
                name: 'UploadFile',
                component: () => import('@/components/admin/UploadFile.vue')
            },
            {
                path: '/admin/update',
                name: 'UpdateFile',
                component: () => import('@/components/admin/UpdateFile.vue')
            }
        ]
      }
  ]
})
