
import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'


import Vue from 'vue'
import api from 'js/api'
import axios from 'js/axios'
import mixin from 'js/mixin'
import qs from 'qs'
import Swiper from 'comp/Swiper'


let {id} = qs.parse(location.search.substr(1))

let detailTab = ['商品详情', '本店成交']

new Vue({
    el: '#app',
    data: {
        id,
        details: null,
        detailTab,
        tabIndex: 0,
        dealList: null,

        bannerLists: null,

        skuType: 1,
        showSku: false,
        skuNumber: 1,
        isAddCart: false,
        showAddMessage: false
    },
    methods: {
        getDetails(){
            axios.get(api.details, {
                params: {id}
            }).then(res => {
                this.details = res.data.data
                this.bannerLists = []
                this.details.imgs.forEach(e => {
                    this.bannerLists.push({
                        clickUrl: '',
                        image: e.image
                    })
                })
            })
        },
        changeTab(index){
            this.tabIndex = index
            if(index){
                this.getDeal()
            }
        },
        getDeal(){
            axios.get(api.deal, {
                params: {id}
            }).then(res => {
                this.dealList = res.data.data.lists
            })
        },
        chooseSku(type){
            this.skuType = type
            this.showSku = true        
        },
        changeSkuNumber(num){
            if(num < 0 && this.skuNumber === 1)return
            this.skuNumber = parseInt(this.skuNumber) + num
        },
        addCart(){
            axios.post(api.addCart, {
                id,
                number: this.skuNumber
            }).then(res => {
                if(res.data.status === 200){
                    this.showSku = false
                    this.isAddCart = true
                    this.showAddMessage = true

                    setTimeout(() => {
                        this.showAddMessage = false
                    }, 1000)
                }
            })
        }
    },
    watch: {
        showSku(val, oldVal){
            document.body.style.overflow = val ? 'hidden' : 'auto'
            document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
            document.body.style.height = val ? '100%' : 'auto'
            document.querySelector('html').style.height = val ? '100%' : 'auto'
        }
    },
    created(){
        this.getDetails()
    },
    components: {
        Swiper
    },
    mixins: [mixin]
})