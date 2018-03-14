import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'js/axios'
import api from 'js/api'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        lists: null
    },
    mutations: {
        init(state, lists){
            state.lists = lists
        },
        add(state, instance){
            state.lists.push(instance)
        },
        remove(state, id){
            let lists = state.lists,
                index = lists.findIndex(item => item.id == id)
            
            lists.splice(index, 1)
        },
        update(state, instance){
            let lists = JSON.parse(JSON.stringify(state.lists)),
                index = lists.findIndex(item => item.id == instance.id)

            lists[index] = instance
            state.lists = lists
        },
        setDefault(state, id){
            let lists = JSON.parse(JSON.stringify(state.lists))

            lists.forEach(item => {
                if(item.id == id){
                    item.isDefault = true
                }else{
                    item.isDefault = false
                }
            })
            state.lists = lists
        }
    },
    actions: {
        getList({commit}){
            axios.get(api.addressLists).then(res => {
                commit('init', res.data.lists)
            })
        },
        addAction({commit}, instance){
            instance.id = parseInt(Math.random()*10000)
            axios.post(api.addressAdd, {instance}).then(res => {
                commit('add', instance)
            })
        },
        removeAction({commit}, id){
            axios.post(api.addressRemove, {id}).then(res => {
                commit('remove', id)
            })
        },
        updateAction({commit}, instance){
            axios.post(api.addressUpdate, {instance}).then(res => {
                commit('update', instance)
            })
        },
        setDefaultAction({commit}, id){
            axios.post(api.addressSetDefault, {id}).then(res => {
                commit('setDefault', id)
            })
        }
    }
})

export default store