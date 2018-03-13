import './cart_base.css'
import './cart_trade.css'
import './cart.css' 


import Vue from 'vue'
import mixin from 'js/mixin'
import axios from 'js/axios'
import api from 'js/api.js'


new Vue({
    el: '.container',
    data: {
        lists: null
    },
    methods: {
        getList(){
            axios.get(api.cartLists).then(res => {
                let list =  res.data.cartList
                list.forEach(e => {
                    e.checked = true
                    e.goodsList.forEach(v => {
                        v.checked = true
                    })
                })
                this.lists = list
            })
        },
        selectGood(good){
            good.checked = !good.checked
        }
    },
    computed: {

    },
    created(){
        this.getList()
    },
    mixins: [mixin]
})