import axios from 'axios'

let host = 'http://rap2api.taobao.org/app/mock/7089/'


axios.interceptors.request.use(config => {
    let url = `${host}${config.method}${config.url}`
    config.url = url
    return config
}, err => {
    console.log(err)
})


export default axios