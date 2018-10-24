// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

Mock.mock('/home/getRecommend', _=>{
    let res = [];
    for(let i=0; i<4; i++){
        res.push({
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
    return res
})