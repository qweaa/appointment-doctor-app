<style scoped>
*{transition: all .3s;}
.center-flex{height: .9rem; display: flex; align-items: center; justify-content: center;}
.flex-center{display: flex; align-items: center; justify-content: center;}

.my-header{justify-content: space-between; border-bottom: 1px solid #E5E5E5; background-color: white; font-size: .24rem;}
.header-fixed{position: fixed; top: 0; width: 100%; z-index: 999; max-width: 750px;}

.my-header .right,.my-header .left{width: .9rem;}
.my-header .middle{flex: 1;}
.my-header .middle.noLeft{padding-left: .3rem;}
/*返回*/
.my-header .left img{width: .2rem; height: .35rem;}
/*定位*/
.my-header .left .header-address{font-size: .28rem; color: #333; display: inline-block; width: 100%; text-align: center;}
/*分享*/
.my-header .right img{width: .3rem; height: .3rem;}
.my-header .left.address{width: 1.2rem;}
/*取消搜索*/
.cancelSearch{display: black; width: 100%; height: 100%; text-align: center; line-height: .9rem;}
/*文字标题*/
.my-header .middle h1{font-size: .32rem; color: #222;}
/*搜索*/
.header-search{height: .56rem; border-radius: .5rem; position: relative; background-color: #F2F2F2; width: 80%; display: flex; justify-content: space-between; align-items: center; width: 100%; padding-right: .2rem;}
.header-search img{width: .3rem; height: .3rem; margin-left: .2rem; margin-right: .2rem;}
/* .header-search span{color: #999; font-size: .28rem;} */
.header-search input{flex: 1; height: .56rem; line-height: .56rem; font-size: .26rem;}
/* 分享弹窗 */
.sharePopup{background-color: white;}
.shareBox{justify-content: space-around; height: 3rem;}
.shareBox > div{flex-direction: column;}
.shareBox > div span{font-size: .28rem; color: #666; line-height: .6rem;}
.shareBox img{width: 1.3rem; height: 1.3rem;}
.cancleShare{line-height: 1rem; text-align: center; color: #222; font-size: .32rem; border-top: 1px solid #e5e5e5;}

/* 搜索弹窗 */
.searchPopup{padding-top: .9rem; background-color: #F5F5F5; line-height: .88rem; color: #333; font-size: .28rem; box-sizing: border-box;}
.searchPopup a{ background-color: white; display: block; color: #333;}
.searchPopup p{line-height: .72rem; padding-left: .3rem; background-color: #F6F8FC; color: #666;}
.searchPopup .item{padding-left: .3rem;}
.searchNothing{color: #666; line-height: 2rem; text-align: center;}

/*动画*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
  height: .88rem;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  height: 0;
  transform: translateY(10px);
}
</style>
<template>
    <div>

        <div :class="[fixed?'header-fixed':'','my-header','center-flex']">
            <div :class="[address?'address':'','left','center-flex']" @click="back&&searchFocus?outSearch():back?goBack():''" v-if="back || address">
                <img v-if="back" src="../assets/images/nav/nav_icon_back.png" alt="">
                <span class="header-address ellipsis" v-if="address">{{city}}</span>
            </div>
            <div :class="['middle','center-flex',back || address?'':'noLeft']">
                <h1 v-if="title != ''">{{title}}</h1>
                <div class="header-search" v-if="search">
                    <img src="../assets/images/nav/nav_icon_search.png" alt="">
                    <!-- <span>搜索门店、医师</span> -->
                    <input type="text" name="search" @keydown.enter="takeSearch" v-model="searchWord" placeholder="搜索门店、医师" @focus="inSearch">
                </div>
            </div>
            <div class="right center-flex" @click="share && !searchFocus?showShare():''">
                <img v-if="share && !searchFocus" src="../assets/images/nav/nav_icon_share.png" alt="">
                <span class="cancelSearch" v-if='searchFocus' @click.stop="takeSearch">搜索</span>
            </div>
        </div>
        <!-- 分享弹窗 -->
        <popup v-model="sharePopup" class="sharePopup">
            <div class="shareBox flex-center">
                <div class="flex-center">
                    <img src="../assets/images/share_icon_wechat.png" alt="">
                    <span>微信好友</span>
                </div>
                <div class="flex-center">
                    <img src="../assets/images/share_icon_circle.png" alt="">
                    <span>分享朋友圈</span>
                </div>
            </div>
            <div class="cancleShare" @click="sharePopup = false">取消</div>
        </popup>
        <!-- 分享弹窗 END-->
        <!-- 搜索弹窗 -->
        <popup v-model="searchPopup" height="100%" class="searchPopup">
            <!-- 门店 START -->
            <div class="searchStore" v-if="searchList.storeList.length != 0">
                <p>门店</p>
                <transition-group name="slide-fade">
                    <router-link :to="'/storeInfo?ecaid=' + v.ECAId + '&address=' + v.City+v.Area+v.Address + '&lng='  + v.Longitude + '&lat=' + v.Latitude" class="item" v-for="(v,i) in searchList.storeList" :key="i">{{v.ShopName}}</router-link>
                </transition-group>
            </div><!-- 门店 END -->
            <!-- 医师 START -->
            <div class="searchDoctor" v-if="searchList.doctorList.length != 0">
                <p>医师</p>
                <transition-group name="slide-fade">
                    <router-link :to="'/doctor?doctorId='+v.id" class="item" v-for="(v,i) in searchList.doctorList" :key="i">{{v.NickName}}</router-link>
                </transition-group>
            </div><!-- 医师 END -->
            <transition name="slide-fade">
                <div class="searchNothing" v-if="searchList.storeList.length == 0 && searchList.doctorList.length == 0">搜索结果为空，换个关键词试试吧~</div>
            </transition>
        </popup>
        <!-- 搜索弹窗 end-->

        <div id="test" style="display:none"></div>

        <!-- 提示 -->
        <toast v-model="showToast" type="text">{{toastText}}</toast>
    </div>
</template>

<script>
import {Popup, Toast } from 'vux';
const {getLocalPoint} = require('../utils/util')
import {getECAList,getDoctorList,getRecommend} from '../utils/request'
import $ from "webpack-zepto";
export default {
    components:{
        Popup,
        Toast,
    },
    data(){
        return{
            sharePopup: false,
            addressArr: {},
            city: '',
            showToast: false,
            toastText: "",
            searchFocus: false,             //当搜索框focus的时候为true
            searchPopup: false,             //搜索弹窗显示和隐藏
            searchList: {
                storeList: [],
                doctorList: []
            },
            searchWord: '',
        }
    },
    props:{
        'fixed':{
            type: Boolean,
            default: false,
        },
        'back':{
            type: Boolean,
            default: false,
        },
        'address':{
            type: Boolean,
            default: false,
        },
        'search':{
            type: Boolean,
            default: false,
        },
        'share':{
            type: Boolean,
            default: false,
        },
        'title':{
            type: String,
            default: ''
        }
    },
    methods:{
        goBack(){
            window.history.go(-1);
        },
        showShare(){
            this.sharePopup = true;
        },
        inSearch(){
            this.searchFocus = true;
            this.searchPopup = true;
            $('.my-header').css({'position':'relative','z-index':'9999'})
            this.$emit('inSearch');
            if(this.$store.state.local.local.state && this.searchList.storeList.length == 0){
              this.getRecommendStore();
            }
        },
        outSearch(){
            this.searchFocus = false;
            this.searchPopup = false;
            if(this.searchList.storeList.length == 0){
                this.getRecommendStore();
            }
            this.searchWord = '';
            setTimeout(function(){
                $('.my-header').css({'position':'static'})
            },300)
            this.$emit('outSearch')
        },
        //搜索
        takeSearch(){
            if(this.searchWord != ''){
                if(this.$store.state.local.local.state){
                    var that = this,
                        local = this.$store.state.local.local;
                    // getECAList({
                    //     province: local.province,
                    //     city: local.city,
                    //     lng: local.lng,
                    //     lat: local.lat,
                    //     keyword: that.searchWord
                    // },function(data){
                    //     that.searchList.storeList = []
                    //     console.log("门店",data)
                    //     that.searchList.storeList = data;
                    // });
                    this.$api.getDoctorList(that.searchWord).then(data=>{
                        if(data.data){
                            // that.searchList.doctorList = []
                            that.searchList.doctorList = data.data;
                        }
                    })
                    // getDoctorList({
                    //     province: local.province,
                    //     city: local.city,
                    //     rows: 20,
                    //     page: 1,
                    //     keyword: that.searchWord
                    // },function(data){
                    //     that.searchList.doctorList = []
                    //     console.log("医师",data)
                    //     that.searchList.doctorList = data;
                    // });
                }else{
                    this.showToast = true;
                    this.toastText = '定位失败，无法搜索到您身边的门店'
                }
            }
        },
        // 获取推荐门店
        getRecommendStore(){
            if(this.search && this.$store.state.local.local.state){
                var local = this.$store.state.local.local,
                    that = this;

                this.$api.getRecommend().then(data=>{
                    if(data.data){
                        that.searchList.storeList = data.data;
                    }
                })
                // getRecommend(local.province,local.city,local.lng,local.lat,function(data){
                //     that.searchList.storeList = data;
                //     console.log('getRecommendInHeader',data)
                // })
            }
        },
    },
    mounted(){
        var that = this;
        if(this.address && !this.$store.state.local.local.state){
            //地址在定位时的...效果
            var addressBot = 0;
            var cityTimer = setInterval(function(){
                if(addressBot == 3) {
                    addressBot = 0;
                    that.city = ''
                }else{
                    addressBot += 1;
                    that.city = '.' + that.city;
                }
            },500)
        }
        if(!this.$store.state.local.local.state){
            // 百度地图API功能-------------定位---------------
            var map = new BMap.Map("test");
            var point = new BMap.Point(116.331398,39.897445);
            map.centerAndZoom(point,12);

            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    if(r.address.city == ''){
                        that.city = '...'
                        that.showToast = true;
                        that.toastText = "定位失败，请稍后重试";
                    }else{
                        that.city = r.address.city
                        console.log('您的位置：'+r.point.lng+','+r.point.lat);
                    }
                    clearInterval(cityTimer)
                    that.addressArr = {
                        province: r.address.province,
                        city: r.address.city,
                        lng: r.point.lng,
                        lat: r.point.lat,
                        state: that.city != '...'
                    }
                    that.$emit("on-address-change",that.addressArr);
                    that.$store.commit('updateLocal',that.addressArr)
                }
                else {
                    that.city = '...'
                    that.showToast = true;
                    that.toastText = "定位失败，请稍后重试";
                    console.log('定位失败failed'+this.getStatus());
                }
            },{enableHighAccuracy: true})
        }else{
            that.city = this.$store.state.local.local.city
        }
    },
}
</script>
