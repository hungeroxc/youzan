import 'css/common.css'
import './category.css'
import Vue from 'vue'
import axios from 'js/axios'
import Foot from 'comp/Foot'
import api from 'js/api'




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
        }
    },  
    filters: {
        number(price){
            let str = String(price)
            if(str.indexOf('.') < 0){
                return price + '.00'
            }else if(str.split('.')[1].length === 1){
                return price + '0'
            }
            
        }
    },
    created(){
        this.getTopList()
        this.getSubList(0)
    },
    components: {
        Foot
    }
})