import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'js/axios'
import api from 'js/api'
import qs from 'qs'

import mixin from 'js/mixin'
import Velocity from 'velocity-animate'



let {keyword, id} = qs.parse(location.search.substr(1))

new Vue({
    el: '.container',
    data: {
        searchList: null,
        keyword,
        isShow: false
    },
    methods: {
        getSearchList(){
            axios.get(api.searchList, {
                params: {keyword, id}
            }).then(res => {
                this.searchList = res.data.lists
            })
        },
        move(){
            if(document.documentElement.scrollTop > 100){
                this.isShow = true
            }else{
                this.isShow = false
            }
        },
        toTop(){
            Velocity(document.body, 'scroll', {
                duration: 500
            })
            this.isShow = false
        }
    },
    created(){
        this.getSearchList()
    },
    mixins: [mixin]
})