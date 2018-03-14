import axios from 'js/axios'
import api from 'js/api'


export default {
    data(){
        return {
            name: '',
            tel: '',
            provinceValue: -1,
            cityValue: -1,
            districtValue: -1,
            address: '',
            id: '',
            type: '',
            instance: null,
            addressData: require('js/address.json'),
            cityList: null,
            districtList: null
        }
    },
    methods: {
        add(){
            let {name, tel, provinceValue, cityValue, districtValue, address} = this
            let data = {name, tel, provinceValue, cityValue, districtValue, address}
            if(this.type === 'add'){
                this.$store.dispatch('addAction', data)
            }
            if(this.type === 'edit'){
                data.id = this.id
                this.$store.dispatch('updateAction', data)
            }
        },
        remove(){
            if(window.confirm('要删除?')){
                this.$store.dispatch('removeAction', this.id)
            }
        },
        setDefault(){
            if(window.confirm('设为默认地址?')){
                this.$store.dispatch('setDefaultAction', this.id)
            }
        }
    },
    computed: {
        lists(){
            return this.$store.state.lists
        }
    },
    watch: {
        lists:{
            handler(){
                this.$router.go(-1)
            },
            deep: true
            
        },
        provinceValue(val){
            if(val === -1){
                this.cityList = null
            }else{
                let list = this.addressData.list
                let index = list.findIndex(item => {
                    return item.value === val
                })
                this.cityList = list[index].children
            }
            
            this.cityValue = -1
            this.districtValue = -1

            if(this.type === 'edit'){
                this.cityValue = parseInt(this.instance.cityValue)
            }
        },
        cityValue(val){
            if(val === -1){
                this.districtList = null
            }else{
                let list = this.cityList
                let index = list.findIndex(item => {
                    return item.value === val
                })
                this.districtList = list[index].children
            }

            
            this.districtValue = -1

            if(this.type === 'edit'){
                this.districtValue = parseInt(this.instance.districtValue)
            }
        }
    },
    created(){
        let q = this.$route.query
        this.type = q.type
        this.instance = q.instance
        if(this.type === 'edit'){
            let ad = this.instance
            this.provinceValue = parseInt(ad.provinceValue)
            this.name = ad.name
            this.tel = ad.tel
            this.address = ad.address
            this.id = ad.id
        }
    }
}