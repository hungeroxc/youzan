import 'css/common.css'
import './category.css'
import Vue from 'vue'
import axios from 'js/axios'
import Foot from 'comp/Foot'
import api from 'js/api'


import mixin from 'js/mixin'

new Vue({
    el: '#app',
    data: {
        topLists: null,
        topIndex: 0,
        subData: null,
        rankData: null
    },
    methods: {
        getTopList(){
            axios.get(api.topList).then(res => {
                this.topLists = res.data.lists
            })
        },
        getSubList(index, id){
            this.topIndex = index
            if(index === 0){
                this.getRank()
            }else{
                axios.get(api.subList, {
                    params: {id}
                }).then(res => {
                    this.subData = res.data.data
                })
            }
        },
        getRank(){
            axios.get(api.rank).then(res => {
                this.rankData = res.data.data
            })
        },
        toSearch(list){
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    created(){
        this.getTopList()
        this.getSubList(0)
    },
    mixins: [mixin]
})