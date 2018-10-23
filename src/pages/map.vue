<style lang="less" scoped>
.container,#allmap{height: 100%;}
</style>
<style>
.anchorBL{display: none;}
</style>

<template>
    <div class="container">
        <m-header v-bind="headerData"></m-header>
        <div id="allmap"></div>
    </div>
</template>
<script>
import $ from "webpack-zepto";
import mHeader from '../components/header'
import {getLocalPoint} from '../utils/util'
export default {
    components:{
        mHeader,
    },
    data(){
        return{
            headerData:{
                back: true,
                title: "地图",
                fixed: true,
            },
        }
    },
    mounted(){
        //获取传过来的经纬度
        var lng = this.$route.query.lng;
        var lat = this.$route.query.lat;
        this.headerData.title = this.$route.query.ShopName;
        var that = this;
        console.log(this.$route.query.ShopName)
        console.log(lng)
        console.log(lat)


        // 百度地图API功能
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(lng,lat),18);
        map.enableScrollWheelZoom(true);
        
        //添加控件
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
		map.addControl(top_left_navigation);

        //定位门店
        map.clearOverlays(); 
        var new_point = new BMap.Point(lng,lat);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(new_point);     

        //地址提示信息
        var opts = {
            width : 150,     // 信息窗口宽度
            height: 60,     // 信息窗口高度
            title : that.headerData.title , // 信息窗口标题
        }
        var infoWindow;

        var geoc = new BMap.Geocoder();
        geoc.getLocation(new_point, function(rs){
            console.log('rs',rs)
            var addComp = rs.addressComponents;
            console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);

            infoWindow = new BMap.InfoWindow(addComp.province+addComp.city+addComp.district+addComp.street+addComp.streetNumber, opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow,new_point);
        })
        //点击标注显示地址信息
        marker.addEventListener("click", function(){          
            map.openInfoWindow(infoWindow,new_point); //开启信息窗口
        });


        //根据浏览器定位
        // var geolocation = new BMap.Geolocation();
        // geolocation.getCurrentPosition(function(r){
        //     console.log('r',r)
        //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //         var mk = new BMap.Marker(r.point);
        //         map.addOverlay(mk);
        //         map.panTo(r.point);
        //         console.log('您的位置：'+r.point.lng+','+r.point.lat);
        //     }
        //     else {
        //         console.log('failed'+this.getStatus());
        //     }        
        // },{enableHighAccuracy: true})

        // getLocalPoint(function(data){
        //     if(data){
        //         console.log(data)
        //         var ggPoint = new BMap.Point(data.lng,data.lat);
        //         var convertor = new BMap.Convertor();
        //         var pointArr = [];
        //         pointArr.push(ggPoint);
        //         convertor.translate(pointArr, 1, 5, function(data){console.log(data)})
        //     }
        // })

        //地址逆解析
        // var geoc = new BMap.Geocoder();
        // function myFun(result){
        //     console.log(result)
        //     var new_point = new BMap.Point(lng,lat);
        //     var cityName = result.name;
        //     map.setCenter(cityName);
        //     console.log("当前定位城市:"+cityName);
        //     geoc.getLocation(new_point, function(rs){
        //         console.log('rs',rs)
        //         var addComp = rs.addressComponents;
        //         console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        //     }); 
        // }
        // var myCity = new BMap.LocalCity();
        // myCity.get(myFun);

    },
    created(){
        //设置html，body的高度为100%
        $("html").css("height", "100%");
        $("body").css("height", "100%");
        $("#app-box").css("height", "100%");
    },
    beforeRouteLeave: (to, from, next) => {
        $("html").css("height", "auto");
        $("body").css("height", "auto");
        $("#app-box").css("height", "auto");
        next();
    }
}
</script>
