import {preToFixed} from '../utils/filter'


//正则
const regexp = {
  isChinese: (str) => (/^[\u2E80-\u9FFF]{2,4}$/g.test(str)),
  email: (str) => (/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g.test(str)),
  phone: (str) => (/^[1][0-9]{10}$/g.test(str)),
  callPhone: (str) => (/^(\d{3,4}-)?\d{7,8}$/.test(str)),
  bankNumber: (str) => (/^([1-9]{1})(\d{15}|\d{18})$/.test(str.replace(/\s+/g, ""))),
  idCard: (str) => (/^(\d{15}$)|(^\d{17}([0-9]|X))$/.test(str)),
  accountNumber: (str) => (/^\w+$/.test(str)),
  Number:(str)=>(/^[1-9]\d*$/.test(str)),
  str:(str)=>(/^[A-Za-z\u4e00-\u9fa5]{0,}$/.test(str)),
  check: (str)=>(/[@#\$%\^&\*]+/g.test(str)),            //非法字符
}
//获取浏览器坐标
function getLocalPoint(callback){
    if( navigator.geolocation ){
        console.log('恭喜，您的浏览器支持HTML5 Geolocation API');
        navigator.geolocation.getCurrentPosition( successCallback, handleLocationError,{maximumAge:15000, timeout:10000, enableHighAccuracy:true});
    }else{
        console.log( "对不起，您的浏览器不支持html5定位");
    }

    function successCallback (data){
        console.log(data)
        if(callback) callback({lng: data.coords.longitude, lat: data.coords.latitude})

        console.log('成功获取到位置信息');
    };

    function handleLocationError(error) {
        if(callback) callback(false)
        console.log(error);
        switch(error.code){
            case 0:
                console.log("获取位置信息出错！");
                break;
            case 1:
                console.log("您设置了阻止该页面获取位置信息！");
                break;
            case 2:
                console.log("浏览器无法确定您的位置！");
                break;
            case 3:
                console.log("获取位置信息超时！");
                break;
            default:
                console.log('不明原因');
                break;
        }
    }

}
//获取当前日期以及根据需求获取未来日期
function getFuture(n){
  //计算未来n天的时间日期
  var date = new Date().getTime(),
    //   year = new Date().getFullYear(),
      tmp,
      weekStr = ['周日','周一','周二','周三','周四','周五','周六'],
      time = [];
  for(let i=0; i<n; i++){
      tmp = new Date(date + i * 24 * 3600 * 1000);
      time.push({
          year: tmp.getFullYear(),
          date: preToFixed(tmp.getMonth() + 1,2) + '-' + preToFixed(tmp.getDate(),2),
          week: weekStr[tmp.getDay()],
          weekValue: tmp.getDay(),
          time: tmp.toLocaleDateString(),
          timeValue: tmp.getTime(),
      })
  }
//   time.year = year;
  return time;
}
// 解析URL
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


export {
    getLocalPoint,
    regexp,
    getFuture,
    GetQueryString
}
