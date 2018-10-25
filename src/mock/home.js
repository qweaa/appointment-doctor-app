// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

import {response} from './config'

Mock.mock('/home/getRecommend', req=>{
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