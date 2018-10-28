// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

import {response} from './config'

//取医师数据模型
import {doctors} from './model'

//取推荐医师列表
Mock.mock('/home/getRecommendStore', req=>{
    console.log("传入参数：",req)
    
    let res = response,
        list = []
    for(let i=0; i<4; i++){
        list.push({
            Address:"棠下小区",
            Area:"天河区",
            City:"广州市",
            ECAId:"796bc861-c753-4421-83a3-21164ff9e09e",
            F_NickName:"杰6",
            Latitude:23.1200491,
            Longitude:113.3076497,
            Province:"广东省",
            ShopName:"鸿亿小区东风店",
        })
    }
    res.data = list
    res.messages = '取推荐医师列表成功'
    return res
})
Mock.mock('/home/getRecommendDoctor', req=>{
    console.log("传入参数：",req)
    
    let res = response,
        list = []

    const doctorsList = doctors

    for(let i of doctorsList){
        if(i.recommend) list.push(i)
    }
    res.data = list
    res.messages = '取推荐医师列表成功'
    return res
})

//取公告
Mock.mock('/home/getNotcomList', req=>{
    console.log("传入参数：",req)

    let res = response,
        list = []
    for(let i=0; i<4; i++){
        list.push({
          link: "javascript:",
          NoticeContent: '义务爱了 完成传奇世界H5-王者归来任务 获得30金币asdf',
          F_CreatorTime: '2017-12-20 10:16:39'
        })
    }
    res.data = list
    res.messages = '取公告'
    return res
})

//取首页轮播图 
Mock.mock('/home/GetSystemBanner', req=>{
    console.log("传入参数：",req)

    let res = response,
        list = []
    for(let i=0; i<4; i++){
        list.push({
            url: "javascript:",
            img: require("@/assets/images/tmp/2.jpg")
        })
    }
    res.data = list
    res.messages = '取首页轮播图'
    return res
})

//----------------搜索
//搜索医师 
Mock.mock('/home/getDoctorList', req=>{
    console.log("传入参数：",req)
    let res = response

    if(req.body && JSON.parse(req.body).key !== ''){
        const key = JSON.parse(req.body).key
        const doctorsList = doctors

        let list = []

        for(let i of doctorsList){
            if(i.F_Id.indexOf(key) > -1){
                list.push(i)
            }else if(i.NickName.indexOf(key) > -1){
                list.push(i)
            }
        }
        res.data = list
        res.messages = '搜索医师'
        return res
    }else{
        res.messages = '搜索关键词为空'
        res.success = false
        return res
    }
})