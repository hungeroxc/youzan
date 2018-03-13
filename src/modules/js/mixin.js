import Foot from 'comp/Foot'



let mixin = {
    filters: {
        currency(price){
            let str = price + ''
            if(str.indexOf('.') > -1){
                let arr = str.split('.')
                return arr[0] + '.' + (arr[1] + '0').substr(2)
            }else{
                return str + '.00'
            }
            
        }
    },
    components: {
        Foot
    }
}

export default mixin