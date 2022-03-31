import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'
import Home from '../pages/home/Home'
import InvitationLetter from '../pages/invitation_letter/InvitationLetter'

export default new createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/invitation_letter', component: InvitationLetter },
  ]
})