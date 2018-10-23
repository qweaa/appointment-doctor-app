<style lang="less" scoped>
.container{padding-bottom: 1rem;}
.flex-center{display: flex; justify-content: center; align-items: center;}
//搜索门店结果列表
</style>
<template>
    <div class="container">
        <m-header v-bind="headerData" @on-address-change="onAddressChange" @inSearch="inSearch" @outSearch="outSearch"></m-header>
        
        <!-- 搜索结果列表 -->
        <store-item :storeList="storeList"></store-item>
        <!-- 搜索结果列表 END-->

        <m-footer tab="1"></m-footer>
    </div>
</template>
<script>
import mHeader from '../components/header';
import mFooter from '../components/footer'
import storeItem from '../components/store-item'
const {getECAList} = require("../utils/request")

export default {
    components:{
        mHeader,
        mFooter,
        storeItem,
    },
    data(){
        return {
            headerData:{
                back: false,
                share: true,
                search: true,
            },
            storeList:[
                // {
                // Address:"棠下小区",
                // Area:"天河区",
                // City:"广州市",
                // ECAId:"796bc861-c753-4421-83a3-21164ff9e09e",
                // F_NickName:"杰6",
                // Latitude:23.1200491,
                // Longitude:113.3076497,
                // Province:"广东省",
                // ShopName:"鸿亿东风店",
                // }
            ],
        }
    },
    methods:{
        onAddressChange(val){
            var that = this,
                pointLocal,
                pointStore,
                distance;     //距离
            console.log(val)
            if(val.state){
                pointLocal = new BMap.Point(val.lng,val.lat)
                getECAList({    //val.province,val.city,val.lng,val.lat
                    province: val.province,
                    city: val.city,
                    lng: val.lng,
                    lat: val.lat,
                },function(data){
                    for(let i of data){
                        pointStore = new BMap.Point(i.Longitude,i.Latitude)
                        distance = parseFloat(BMapLib.GeoUtils.getDistance(pointLocal, pointStore).toFixed(2));
                        console.log(distance)
                        if(distance > 1000){
                            distance = parseFloat((distance/1000).toFixed(2)) + '千米'
                        }else{
                            distance = distance + '米'
                        }
                        i.distance = distance;
                    }
                    that.storeList = data;
                    console.log('getECAList',data)
                })
            }
        },
        inSearch(){
            this.headerData.back = true;
        },
        outSearch(){
            this.headerData.back = false;
        },
    },
    mounted(){
        if(this.$store.state.local.local.state){
            var that = this,
                pointStore,
                distance,     //距离
                local = this.$store.state.local.local;
            var pointLocal = new BMap.Point(local.lng,local.lat);
            getECAList({
                province: local.province,
                city: local.city,
                lng: local.lng,
                lat: local.lat,
            },function(data){
                for(let i of data){
                    pointStore = new BMap.Point(i.Longitude,i.Latitude)
                    distance = parseFloat(BMapLib.GeoUtils.getDistance(pointLocal, pointStore).toFixed(2));
                    if(distance > 1000){
                        distance = parseFloat((distance/1000).toFixed(2)) + '千米'
                    }else{
                        distance = distance + '米'
                    }
                    i.distance = distance;
                }
                that.storeList = data;
                console.log('getECAList',data)
            })
        }
    }
}
</script>
