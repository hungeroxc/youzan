import './components/address_base.css'
import './components/address.css'

// import './components/member_base.css'
// import './components/member.css'


import Vue from 'vue'
import router from './router'
import store from './vuex'



new Vue({
    el: '#app',
    router,
    store
})