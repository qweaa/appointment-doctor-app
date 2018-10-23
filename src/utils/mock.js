// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const productData = function() {
  let Data = [];
  for (let i = 0; i < 100; i++) {
    let data = {
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date()  // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
    }
    Data.push(data)
  }
 
  return {
    Data: Data
  }
}
 
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/user/login', productData );

Mock.mock('/home/getRecommend', _=>{
    for(let i=0; i<5; i++){

    }
    return [
        {
            Address:"棠下小区",
            Area:"天河区",
            City:"广州市",
            ECAId:"796bc861-c753-4421-83a3-21164ff9e09e",
            F_NickName:"杰6",
            Latitude:23.1200491,
            Longitude:113.3076497,
            Province:"广东省",
            ShopName:"鸿亿小区东风店",
        }
    ]
})
