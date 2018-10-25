import axios from 'axios'
import Vue from 'vue'
import  { ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log(123)
    Vue.$vux.loading.show({
        text: '加载中...'
    })
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    this.$vux.toast.show({
        text: '网络丢失，请稍后重试'
    })
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Vue.$vux.loading.hide()
    return response;
}, function (error) {
    // 对响应错误做点什么
    this.$vux.toast.show({
        text: '服务器异常，请稍后重试'
    })
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