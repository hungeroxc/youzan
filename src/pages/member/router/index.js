import Vue from 'vue'
import Router from 'vue-router'




const member = () => import('../components/member.vue').then(m => m)
const address = () => import('../components/address.vue').then(m => m)
const all = () => import('../components/all.vue').then(m => m)
const form = () => import('../components/form.vue').then(m => m)

Vue.use(Router)

let routes = [{
    path: '/',
    component: member
},{
    path: '/address',
    component: address,
    children: [{
        path: '',
        redirect: 'all'
    },{
        path: 'all',
        name: 'all',
        component: all
    },{
        path: 'form',
        name: 'form',
        component: form
    }]
}]

let router = new Router({routes})

export default router