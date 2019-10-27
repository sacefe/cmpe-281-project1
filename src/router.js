import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import store from './store'

Vue.use(Router)

function checkIsLoggedIn() {
  return store.getters['auth/isLoggedIn'];
}

function checkIsAdmin() {
  return store.getters['auth/isAdmin'];
}


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
      component: () => import('@/views/Login.vue')     //lazy loading
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
        beforeEnter: (to, from, next) => {
          if(checkIsLoggedIn() && checkIsAdmin()) next();
          else if(checkIsLoggedIn() && !checkIsAdmin()) next('/user');
          else next('/login');
        },
        children: [
            {
                path: '/admin/',
                name: 'GetFiles',
                component: () => import('@/components/admin/GetFiles.vue')
            },
            {
                path: '/admin/upload',
                name: 'UploadFile',
                component: () => import('@/components/admin/UploadFile.vue')
            },
            // {
            //     path: '/admin/update',
            //     name: 'UpdateFile',
            //     component: () => import('@/components/admin/UpdateFile.vue')
            // }
        ]
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/User.vue'),
        beforeEnter: (to, from, next) => {
          if(checkIsLoggedIn()) next();
          else next('/login');
        },
        children: [
          {
              path: '/user',
              name: 'GetUserFiles',
              component: () => import('@/components/user/GetUserFiles.vue')
          },
          {
              path: '/user/upload',
              name: 'UploadUserFile',
              component: () => import('@/components/user/UploadUserFile.vue')
          },
        ]
      }
  ]
})
