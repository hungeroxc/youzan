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
        lists: null,
        total: 0,
        editingShop: null,
        editingShopIndex: -1,
        removePopup: false,
        removeData: null,
        removeMsg: ''
    },
    methods: {
        getList(){
            axios.get(api.cartLists).then(res => {
                let list =  res.data.cartList
                list.forEach(shop => {
                    shop.checked = true
                    shop.editing = false
                    shop.removeChecked = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good => {
                        good.checked = true
                        good.removeChecked = false
                    })
                })
                this.lists = list
            })
        },
        selectGood(shop, good){
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good => {
                return good[attr]
            })
        },
        selectedShop(shop){
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good => {
                good[attr] = shop[attr]
            })
        },
        selectAll(){
            let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
            this[attr] = !this[attr]
        },
        edit(shop, shopIndex){
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? '完成' : '编辑'
            this.lists.forEach((item, i) => {
                if(shopIndex !== i){
                    item.editing = false
                    item.editingMsg = shop.editing ? '' : '编辑'
                }
            })

            this.editingShop = shop.editing ? shop : null
            this.editingShopIndex = shop.editing ? shopIndex : -1
        },
        reduce(good){
            if(good.number===1)return
            axios.post(api.cartReduce, {
                id: good.id,
                number: 1
            }).then(res => {
                good.number--
            })
        },
        add(good){
            axios.post(api.addCart, {
                id: good.id,
                number: 1
            }).then(res => {
                good.number++
            })
        },
        remove(shop, shopIndex, good, goodIndex){
            this.removePopup = true
            this.removeData = {
                shop,shopIndex,good,goodIndex
            }
            this.removeMsg = '确定要删除该商品吗?'
        },
        removeConfirm(){
            if(this.removeMsg === '确定要删除该商品吗?'){
                let {shop, shopIndex, good, goodIndex} = this.removeData
                axios.post(api.cartRemove, {
                    id: good.id
                }).then(res => {
                    shop.goodsList.splice(goodIndex, 1)
                    if(shop.goodsList.length === 0){
                        this.lists.splice(shopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopup = false
                })
            }else{
                let ids = []
                this.removeList.forEach(good => {
                    ids.push(good.id)
                })
                axios.post(api.cartMremove, {
                    ids
                }).then(res => {
                    let arr = []
                    this.editingShop.goodsList.forEach(good => {
                        let index = this.removeList.findIndex(item => {
                            return item.id === good.id
                        })
                        if(index === -1){
                            arr.push(good)
                        }
                    })
                    if(arr.length){
                        this.editingShop.goodsList = arr
                    }else{
                        this.lists.splice(this.editingShopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopup = false
                })
            }

        },
        removeShop(){
            this.editingShop = null
            this.editingShopIndex = -1
            this.lists.forEach(shop => {
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        },
        removeLists(){
            this.removePopup = true
            this.removeMsg = `确定将所选的${this.removeList.length}个商品删除?`
        }
    },
    computed: {
        allSelected: {
            get(){
                if(this.lists && this.lists.length > 0){
                    return this.lists.every(shop => {
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal){
                this.lists.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach(good => {
                        good.checked = newVal
                    })
                })
            }
        },
        selectLists(){
            let arr = [],
                total = 0
            if(this.lists && this.lists.length > 0){
                this.lists.forEach(shop => {
                    shop.goodsList.forEach(good => {
                        if(good.checked){
                            arr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total
                return arr
            }
            return []
        },
        removeList(){
            if(this.editingShop){
                let arr = []
                this.editingShop.goodsList.forEach(good => {
                    if(good.removeChecked){
                        arr.push(good)
                    }
                })
                return arr
            }
            return []
        },
        allRemoveSelected:{
            get(){
                if(this.editingShop){
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal){
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good => {
                        good.removeChecked = newVal
                    })
                }
            }
        }
    },
    created(){
        this.getList()
    },
    mixins: [mixin]
})