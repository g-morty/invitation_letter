import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'

export default new createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('../pages/index') },
    { path: '/invitation_letter', component: () => import('../pages/invitation_letter/') },
  ]
})