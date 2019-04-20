<style lang="less" scoped>
.container{padding-bottom: 1rem;}
.flex-center{display: flex; justify-content: center; align-items: center;}
//搜索门店结果列表
</style>
<template>
    <div class="container">
        <m-header v-bind="headerData" @on-address-change="onAddressChange" @inSearch="inSearch" @outSearch="outSearch"></m-header>
        
        <!-- 搜索结果列表 -->
        <doctor-item :doctorList="storeList"></doctor-item> 
        <!-- <store-item :storeList="storeList"></store-item> -->
        <!-- 搜索结果列表 END-->

        <m-footer tab="1"></m-footer>
    </div>
</template>
<script>
import mHeader from '../components/header';
import mFooter from '../components/footer'
import storeItem from '../components/store-item'
import doctorItem from "../components/doctor-item";

export default {
    components:{
        mHeader,
        mFooter,
        storeItem,
        doctorItem,
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
                this.$api.getDoctorList().then(data=>{
                    this.storeList = data.data
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

            this.$api.getDoctorList().then(data=>{
                this.storeList = data.data
            })
        }else{
            this.$api.getDoctorList().then(data=>{
                this.storeList = data.data
            })
        }
    }
}
</script>
