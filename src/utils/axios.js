import axios from 'axios'
import Vue from 'vue'
import  { ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

axios.defaults.baseURL = 'http://192.168.1.2:9093';
// axios.defaults.headers.common['studentID'] = window.sessionStorage.getItem('studentID') || '';

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
    alert(error.toString())
    Vue.$vux.loading.hide()
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
        timeout: timeout,
        params: data,
        responseType: responseType,
        headers: {
            studentID: window.sessionStorage.getItem('studentID'),
        }
    }).then(res=>{
            console.log('请求：'+(description || url)+' 成功')
            console.log('返回：', res)
            console.log('')
            if(res.data.success){
                resolve(res.data)
            }else{
                let text = res.data.data === -2 ? '请登陆' : res.data.messages || '请求不被允许'
                Vue.$vux.toast.show({
                    type: 'warn',
                    text: text
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
            url: '/doctor/getRecommentsList',
            description: '取推荐 医师 列表',
            data: data
        })
    },
    getRecommendDoctor(data = {a: 1}){
        return ajax({
            url: '/doctor/getRecommentsList',
            description: '取推荐 医师 列表',
            data: data
        })
    },
    getNotcomList(data={a:1}){
        return ajax({
            url: '/note/getNotesList',
            description: '取公告',
            data: data
        })
    },
    GetSystemBanner(data={a:1}){
        return ajax({
            url: '/home/getBannersList',
            description: '取首页轮播图',
            data: data
        })
    },
    //搜索医师
    getDoctorList(key = '1'){
        return ajax({
            url: '/doctor/getSearch',
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
            url: '/auth/login',
            description: '登陆',
            method: 'post',
            data: {
                studentID,
                password,
            }
        })
    },
    //注册
    register(options){
        let {
            studentID = '',
            password = '',
        } = options
        return ajax({
            url: '/auth/register',
            description: '祖册',
            method: 'post',
            data: {
                studentID,
                password,
            }
        })
    },
    //取学生信息信息
    getStudentModel(studentID){
        return ajax({
            url: '/student/getStudentModule',
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

    //==================医师================

    //取医师详细信息
    getDoctorDetail(doctorID){
        return ajax({
            url: '/doctor/getDoctorModule',
            description: '取医师详细信息',
            data: {doctorID},
        })
    },
    //取医师预约时间列表
    getDoctorBooks(options){
        let {
            id = '',
            date = '',
        } = options
        return ajax({
            url: '/book/getBookList',
            description: '取医师预约时间列表',
            data: {doctorID: id,date},
        })
    },

    //============订单===================
    //提交订单
    submitOrder(options){
        // let data = Object({
        //     doctorID : '',
        //     book_id : '',
        //     book_date : '',
        //     book_price : '',
        //     name : '',
        //     idcard : '',
        //     phone : '',
        // },options)
        return ajax({
            url: '/order/submitOrder',
            method: 'post',
            description: '提交订单',
            data: options,
        })
    },
    

}