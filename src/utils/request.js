import $ from 'webpack-zepto';
import {Vue} from '../main'
// import AjaxPlugin from './http'
import store from '../store/'
import router from '../router'
import {GetQueryString} from '../utils/util'

import axios from 'axios'

const config = {
    http: window.location.href.indexOf('192.168.3')===-1?'http://x_zyys.b2co.cn':'http://192.168.3.101',

    /*---- 首页模块 START----*/
    getRecommend: '/ECA/GetRecommendJson',          //获得推荐门店列表
    //http://192.168.3.35/ECA/GetRecommendJson?province=广东省&City=广州市&Longitude=113&Latitude=114
    getECAList: '/ECA/GetECAList',                  //ECA店面列表、ECA店面搜索列表
    //http://192.168.3.35/ECA/GetECAList?province=广东省&Longitude=113.3076497&Latitude=23.1200491&City=广州市
    getDoctorList: '/Doctor/GetDoctorList',         //医师搜索列表
    //http://192.168.3.35/Doctor/GetDoctorList?province=广东省&City=广州市&rows=10&page=1&keyword=
    getNotcomList: '/Prucom/GetNotcomList',         //公告信息
    //http://192.168.3.35/Prucom/GetNotcomList
    /*---- 首页模块 END ----*/

    /*---- 店铺模块 START---*/
    getECAInfo: '/ECA/GetECAInfo',                  //获得门店详细信息
    //http://192.168.3.35/ECA/GetECAInfo?ecaid=38FB5E6E-B482-46F3-A464-38269CB1FFFE
    GetECAScheduling: '/Doctor/GetECAScheduling',   //ECA店医师排班列表
    //http://192.168.3.35/Doctor/GetECAScheduling?ecaId=38FB5E6E-B482-46F3-A464-38269CB1FFFE&begin=2017-12-4&end=2017-12-8
    GetECADoctorList: '/Doctor/GetECADoctorList',   //ECA店医师列表
    //http://192.168.3.35/Doctor/GetECADoctorList?ecaId=38FB5E6E-B482-46F3-A464-38269CB1FFFE
    /*---- 店铺模块 END ----*/

    /*-------医师模块 START-------*/
    getDoctorScheduling: '/Doctor/GetDoctorScheduling', //单个医师排班列表
    //http://192.168.3.35/Doctor/GetDoctorScheduling?doctorId=&begin=2017-12-4&end=2017-12-8
    getDoctorDetail: '/Doctor/GetDoctorDetail',         //获取医师详细信息
    //http://192.168.3.35/Doctor/GetDoctorDetail?doctorId=
    /*-------医师模块 END-------*/

    /* 订单模块 START */
    // getUserReservation: '/Order/GetOrderItem',         //获取用户余额及下单时间OrderNum=
    //http://192.168.3.35/Doctor/GetOrderItem?OrderNum=2017120612532202709808
    postPay: '/Doctor/Pay',                             //用户支付(支持多订单一起支付)：OrderNum=
    //http://192.168.3.35/Doctor/Pay
    getOrderDetail: '/Order/GetOrderItem',               //订单详情
    //http://192.168.3.35/Order/GetOrderItem?OrderNum=
    DeleteOrderCancel: '/Order/DeleteOrderCancel',       //删除订单
    //http://192.168.3.35/Order/DeleteOrderCancel?OrderNum=
    getOrderCancel: '/Order/OrderCancel',             //取消订单
    //接口名：GetOrderCancel     参数     OrderNum：订单号          Reason ： 取消原因

    /* 订单模块 END */

    /* 用户模块 START */
    getUserDetail: '/User/GetUserDetail',                   //用户详情
    //http://192.168.3.35/User/GetUserDetail
    saveUserInfo: '/User/SaveUserInfo',                     //修改用户信息
    //http://192.168.3.35/User/SaveUserInfo
    /** FileUrl：file图片控件，
        F_NickName，
        F_Gender，
        F_Birthday，
        F_IdCard
    */
    getUserUpItem: '/Prucom/GetUserUpItem',                 //更新用户微信号，手机号
    //http://192.168.3.35/Prucom/GetUserUpItem
    /* 用户模块 END */

    /* 评论 START */
    getPrucomList: '/Prucom/GetPrucomList',                 //我的评论列表
    //http://192.168.3.35/Prucom/GetPrucomList
    saveProComm: '/Prucom/SaveProComm',                     //评价提交
    //http://192.168.3.35/Prucom/SaveProComm
    /*评论 END*/
}

function ajax(type,async,url,data,onsuccess,onfail, allurl){
    console.log('请求：',store.state.token.token,store.state.token.mpToken)
    Vue.$vux.loading.show({text: '加载中...'})

    $.ajax({
        url: allurl || config.http + url,
        type: type, //GET
        async: async, //或false,是否异步
        data: data,
        cache: false,
        headers:{
            token: store.state.token.token,
            mpToken: store.state.token.mpToken,
            page:router.currentRoute.fullPath
        },
        timeout:5000, //超时时间
        dataType:'json', //返回的数据格式：
        success:function(data,textStatus,jqXHR){
            console.log(data)
            Vue.$vux.loading.hide()
            if (data.message == "login") {
                window.location.href = data.data;
            }else{
                if(data.state == 'info' || data.state == 'success'){
                    onsuccess(data.data)
                }else{
                    Vue.$vux.toast.show({
                        type: 'warn',
                        text: '服务器开小差，请稍后重试'
                    })
                }
            }
        },
        error:function(xhr,textStatus){
            if(onfail){
                onfail()
            }else{
                Vue.$vux.loading.hide()
                Vue.$vux.toast.show({
                    type: 'warn',
                    text: '网络跑丢了，请稍后重试'
                })
            }
            console.log(textStatus)
            console.log(xhr)
        },
    })
}

//formData保存数据的ajax请求
function formDataAjax(type,async,url,formData,tip,onsuccess){
    Vue.$vux.loading.show({text: tip + '中...'})
    $.ajax({
        type: type, // 上传文件要用POST
        url: config.http + url,
        dataType : "json",
        async: async, //或false,是否异步
        crossDomain: true, // 如果用到跨域，需要后台开启CORS
        processData: false,  // 注意：不要 process data
        contentType: false,  // 注意：不设置 contentType
        cache: false,
        headers:{
            token: store.state.token.token,
            mpToken: store.state.token.mpToken,
            page:router.currentRoute.fullPath
        },
        data: {
            produ: formData
        },
        success(msg) {
            Vue.$vux.loading.hide()
            if (msg.message == "login") {
                window.location.href = msg.data;
            }else{
                if(msg.state == 'success'){
                    Vue.$vux.toast.show({
                        type: 'success',
                        text: tip + '成功'
                    })
                    if(onsuccess) onsuccess(msg)
                }else{
                    Vue.$vux.toast.show({
                        type: 'cancel',
                        text: '服务器异常，'+ tip +'失败'
                    })
                }
            }
        },
        fail(msg) {
            Vue.$vux.loading.hide()
            console.log(msg);
            Vue.$vux.toast.show({
                type: 'warn',
                text: '网络异常，'+ tip +'失败'
            })
        }
    });
}

//获取推荐服务的门店
function getRecommend(province,city,lng,lat,onsuccess){
    // ajax('GET',true,config.getRecommend,{
    //     province: province,
    //     City: city,
    //     Longitude: lng,
    //     Latitude: lat
    // },onsuccess,function(){
    //     console.log("第二次请求推荐门店")
    //     ajax('GET',true,config.getRecommend,{
    //         province: province,
    //         City: city,
    //         Longitude: lng,
    //         Latitude: lat
    //     },onsuccess,null,'/home/getRecommend')
    // },'/home/getRecommend')
    axios.get('/home/getRecommend').then(res=>{
        if(onsuccess) onsuccess(res.data)
    })
}
//公告
function getNotcomList(onsuccess){
    ajax('GET',true,config.getNotcomList,{},onsuccess,function(){
        console.log("第二次请求公告")
        ajax('GET',true,config.getNotcomList,{},onsuccess)
    })
}
//ECA店面列表、ECA店面搜索列表
function getECAList(data,onsuccess){
    ajax('GET',true,config.getECAList,{
        province: data.province,
        City: data.city,
        Longitude: data.lng,
        Latitude: data.lat,
        keyword: data.keyword || ''
    },onsuccess)
}
//医师搜索列表
function getDoctorList(data,onsuccess){
    ajax('GET',true,config.getDoctorList,{
        province: data.province,
        City: data.city,
        rows: data.rows,
        page: data.page,
        keyword: data.keyword || ''
    },onsuccess)
}

/**-----------------------------------------店铺模块 START------------------------------------------ */
//获得门店详细信息
function getECAInfo(ecaid,onsuccess){
    ajax("GET",true,config.getECAInfo,{
        ecaid: ecaid
    },onsuccess)
}
//ECA店医师排班列表
function getECAScheduling(ecaId, begin, end, onsuccess){
    ajax("GET",true,config.GetECAScheduling,{
        ecaId: ecaId,
        begin: begin,
        end: end
    },onsuccess)
}
//ECA店医师列表
function getECADoctorList(UserId,onsuccess){
    ajax("GET",true,config.GetECADoctorList,{
        ecaId: UserId,
    },onsuccess)
}
/**-----------------------------------------店铺模块 END------------------------------------------ */
/**-----------------------------------------医师模块 START------------------------------------------ */
//单个医师排班列表
function getDoctorScheduling(doctorId,begin,end,onsuccess){
    ajax("GET",true,config.getDoctorScheduling,{
        doctorId: doctorId,
        begin: begin,
        end: end,
    },onsuccess)
}
//获取医师详细信息
function getDoctorDetail(doctorId,onsuccess){
    ajax("GET",true,config.getDoctorDetail,{
        doctorId: doctorId,
    },onsuccess)
}
/**-----------------------------------------医师模块 END------------------------------------------ */

/**-----------------------------------------订单模块 START------------------------------------------ */
//用户支付(支持多订单一起支付)：
function postPay(orderList,onsuccess){
    Vue.$vux.loading.show({text: '加载中...'})
    $.ajax({
        url: config.http + config.postPay,
        type: 'POST',
        headers:{
            token: store.state.token.token,
            mpToken: store.state.token.mpToken,
            page:router.currentRoute.fullPath
        },
        data: JSON.stringify({orderList: orderList}),
        contentType: 'application/json',
        dataType : "json",
        success: function(data,textStatus,jqXHR){
            console.log(data)
            Vue.$vux.loading.hide()
            if (data.message == "login") {
                window.location.href = data.data;
            }else{
                if(data.state == 'info' || data.state == 'success'){
                    onsuccess(data.data)
                }else{
                    Vue.$vux.toast.show({
                        type: 'warn',
                        text: '服务器异常，请稍后重试'
                    })
                }
            }
        },
        error:function(xhr,textStatus){
            if(onfail){
                onfail()
            }else{
                Vue.$vux.loading.hide()
                Vue.$vux.toast.show({
                    type: 'warn',
                    text: '网络异常，请稍后重试'
                })
            }
            console.log(textStatus)
            console.log(xhr)
        },
    })
}
//获取订单详细信息
function getOrderDetail(OrderNum,onsuccess){
    ajax("GET",false,config.getOrderDetail,{
        OrderNum: OrderNum,
    },onsuccess)
}
//删除订单
function DeleteOrderCancel(OrderNum,onsuccess){
    ajax("POST",true,config.DeleteOrderCancel,{
        OrderNum: OrderNum,
    },onsuccess)
}
//取消订单
function getOrderCancel(OrderNum,Reason,onsuccess){
    ajax("POST",true,config.getOrderCancel,{
        OrderNum: OrderNum,
        Reason: Reason
    },onsuccess)
}
/**-----------------------------------------订单模块 END------------------------------------------ */

/**-----------------------------------------用户模块 START------------------------------------------ */
function getUserDetail(onsuccess){
    ajax("GET",true,config.getUserDetail,{},onsuccess)
}
///修改用户信息
function saveUserInfo(formData,onsuccess){
    Vue.$vux.loading.show({text: '加载中...'})
    $.ajax({
        type: "POST", // 上传文件要用POST
        url: config.http + "/User/SaveUserInfo",
        dataType : "json",
        crossDomain: true, // 如果用到跨域，需要后台开启CORS
        processData: false,  // 注意：不要 process data
        contentType: false,  // 注意：不设置 contentType
        cache: false,
        headers:{
            token: store.state.token.token,
            mpToken: store.state.token.mpToken,
            page:router.currentRoute.fullPath
        },
        data: formData,
        success(msg) {
            console.log(msg)
            Vue.$vux.loading.hide()
            if (msg.message == "login") {
                window.location.href = msg.data;
            }else{
                if(msg.state == 'success'){
                    Vue.$vux.toast.show({
                        type: 'success',
                        text: '保存成功'
                    })
                    if(onsuccess) onsuccess();
                }else{
                    Vue.$vux.toast.show({
                        type: 'cancel',
                        text: '服务器异常，保存失败'
                    })
                }
            }
        },
        fail(msg) {
            Vue.$vux.loading.hide()
            console.log(msg);
            Vue.$vux.toast.show({
                type: 'warn',
                text: '网络异常，保存失败'
            })
        }
    });
}
//修改用户微信号，手机号
function getUserUpItem(F_MobilePhone,F_WeChat,onsuccess){
    ajax("POST",true,config.getUserUpItem,{
        F_MobilePhone: F_MobilePhone,
        F_WeChat: F_WeChat
    },onsuccess)
}
/**-----------------------------------------用户模块 END------------------------------------------ */

/**-----------------------------------------评论模块 START------------------------------------------ */
//我的评论列表
function getPrucomList(onsuccess){
    ajax("GET",true,config.getPrucomList,{},onsuccess)
}
//评论提交doctorID,CommentLevel,CommentContent
function saveProComm(doctorID,OrderNum,CommentLevel,CommentContent,onsuccess){
    ajax("POST",true,config.saveProComm,{
        ProductID: doctorID,
        OrderNum: OrderNum,
        CommentLevel: CommentLevel,
        CommentContent: CommentContent,
    },onsuccess)
}
/**-----------------------------------------评论模块 END------------------------------------------ */

export function testMock(onsuccess){
    axios.post("/user/login").then(res=>{
        console.log('data',res)
    })
    // ajax("GET",true,'','',onsuccess,()=>{},'http://123.com')
}

export {
    getRecommend,
    getNotcomList,              //公告
    getECAList,                 //门店列表
    getDoctorList,              //医师搜索
    getECAInfo,
    getECAScheduling,
    getECADoctorList,
    getDoctorScheduling,        //单个医师排班列表
    getDoctorDetail,            //获取医师详细信息
    // getUserReservation,         //获取用户余额及下单时间
    postPay,                    //用户支付(支持多订单一起支付)：
    getUserDetail,              //用户详情
    saveUserInfo,               //更新用户信息
    getUserUpItem,              //修改用户微信号，手机号
    getOrderDetail,             //获取订单详细信息
    DeleteOrderCancel,          //删除订单
    getOrderCancel,             //取消订单
    getPrucomList,              //我的评论列表
    saveProComm,                //评论提交
}
