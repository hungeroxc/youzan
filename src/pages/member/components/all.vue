<template>
  <div class="container " style="min-height: 597px;">
    <div v-if="lists && lists.length > 0" class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item " 
      @click="toEdit(list)"
      v-for="list in lists"
      :key="list.id"
      :class="{'address-item-default': list.isDefault}">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit">修改</a>
      </a>
    </div>
    <div v-else>
        没有地址，请添加
    </div>
    <div class="block stick-bottom-row center">
      <router-link 
      class="btn btn-blue js-no-webview-block js-add-address-btn" 
      :to="{name: 'form', query: {type: 'add'}}">
            新增地址
        </router-link>
    </div>
  </div>
</template>

<style>

</style>

<script>
    import axios from 'js/axios'
    import api from 'js/api'
    export default {
        methods: {
            toEdit(list){
                this.$router.push({name: 'form', query: {
                    type: 'edit',
                    instance: list
                }})
            }
        },
        computed: {
            lists(){
                return this.$store.state.lists
            }
        },
        created(){
            if(!this.lists){
                this.$store.dispatch('getList')
            }   
            
        }
    }
</script>