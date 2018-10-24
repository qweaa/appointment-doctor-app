import axios from 'axios'
import  { ToastPlugin, Loading, ConfirmPlugin, LoadingPlugin } from 'vux'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log(123)
    Loading.show({
        text: 'Loading'
    })
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default {
    getRecommend(data = {a: 1}){
        axios.get('/home/getRecommend',{
            data: data
        }).then(res=>{
            console.log(res)
        })
    }
}