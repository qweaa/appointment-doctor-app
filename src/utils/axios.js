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
    Vue.$vux.toast.show({
        type: 'cancel',
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
    Vue.$vux.toast.show({
        type: 'cancel',
        text: '服务器异常，请稍后重试'
    })
    return Promise.reject(error);
});

function ajax(options){
    let {
        description = '',
        method = 'get',
        url = '',
        data = '',
        // params = '',
        timeout = 30 * 1000,
        responseType = 'json',
    } = options
    return new Promise((resolve, reject)=>{
        axios({
            method: method,
            url: url,
            data: data,
            timeout: timeout,
            responseType: responseType,
        }).then(res=>{
            console.log('请求：'+(description || url)+' 成功')
            console.log('返回：', res)
            console.log('')
            if(res.data.success){
                resolve(res.data)
            }else{
                Vue.$vux.toast.show({
                    type: 'warn',
                    text: res.data.messages || '请求不被允许'
                })
                reject(res)
            }
        }).catch(err=>{
            console.log('请求：'+ (description || url) + ' 失败')
            console.log('返回：', err)
            console.log('')
            reject(err)
        })
    })

}

export default {
    getRecommend(data = {a: 1}){
        return ajax({
            url: '/home/getRecommendStore',
            description: '取推荐 门店 列表',
            data: data
        })
    },
    getRecommendDoctor(data = {a: 1}){
        return ajax({
            url: '/home/getRecommendDoctor',
            description: '取推荐 医师 列表',
            data: data
        })
    },
    getNotcomList(data={a:1}){
        return ajax({
            url: '/home/getNotcomList',
            description: '取公告',
            data: data
        })
    },
    GetSystemBanner(data={a:1}){
        return ajax({
            url: '/home/GetSystemBanner',
            description: '取首页轮播图',
            data: data
        })
    },
    //搜索医师
    getDoctorList(key = ''){
        return ajax({
            url: '/home/getDoctorList',
            description: '搜索医师',
            data: {key}
        })
    },

    //==================student 用户===============
    //登陆
    login(options){
        let {
            studentID = '',
            password = '',
        } = options
        return ajax({
            url: '/home/login',
            description: '登陆',
            data: {
                studentID,
                password,
            }
        })
    },
    //取学生信息信息
    getStudentModel(studentID){
        return ajax({
            url: '/home/getStudentModel',
            description: '取学生信息',
            data: {
                studentID,
            }
        })
    },
    //修改个人信息
    modifyStudentModel(options){
        return ajax({
            url: '/home/modifyStudentModel',
            description: '修改学生个人信息',
            data: options,
        })
    },

}