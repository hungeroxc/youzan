import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'js/axios'
import url from 'js/api.js'
import Foot from 'comp/Foot'
import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)



let app = new Vue({
    el: '#app',
    data: {
        lists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false,
        allLoaded: false
    },
    methods: {
        getLists(){
            if(this.allLoaded) return
            this.loading = true
            axios.get(url.hostLists, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                let lists = res.data.lists
                this.handleLists(lists)
            })
        },
        handleLists(lists){
            if(this.pageSize > lists.length){
                this.allLoaded = true
            }
            if(this.lists){
                this.lists = lists.concat(this.lists)
            }else{
                this.lists = lists
            }
            this.loading = false
            this.pageNum++
        }
    },
    created(){
        this.getLists()
    },
    components: {
        Foot
    }
})