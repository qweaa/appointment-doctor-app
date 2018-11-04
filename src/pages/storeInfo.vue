<style scoped lang="less">
.container{padding-bottom: 1rem}
.flex-center{display: flex; justify-content: center; align-items: center;}
/*公共的*/
.store-info .right > img{width: .12rem; height: .21rem; margin-right: .3rem;}

.store-info{border-top: none;}
.store-info .top{display: flex; height: 1.5rem; border-bottom: 1px solid #E5E5E5;}
.store-info .top .left{width: 1.5rem;}
.store-info .top .left img{width: .88rem; height: .88rem; border-radius: .08rem;}
.store-info .top .right{flex: 1; justify-content: space-between;}
.store-info .top .right > div{line-height: .44rem;}
.store-info .top .right > div h5{font-size: .32rem; color: #222;}
.store-info .top .right > div h6{font-size: .24rem; color: #999;}
.store-info .top .right > div h6 span{color: #F83A09;}
.store-info .bottom{height: .88rem; display: flex; align-items: center;}
.store-info .bottom .left{width: .88rem;}
.store-info .bottom .left img{width: .24rem; height: .31rem;}
.store-info .bottom .right{flex: 1; justify-content: space-between;}
.store-info .bottom span{color: #666; font-size: .28rem;}


/* 在线预约&坐诊医生 */
.reservation{font-size: .28rem; background-color: white;}
.reservation .leader{display: flex; justify-content: space-around; line-height: .88rem; padding-left: .3rem; padding-right: .3rem; color: #999; border-bottom: 1px solid #E5E5E5;}
.reservation .leader > div.cur{color: @primary-color; border-bottom: .06rem solid @primary-color;}
// /* 日期选择 */
// .date{width: 7.5rem;; overflow-x: scroll; background-color: #F5F5F5;}
// .date ul{width: 9.5rem;;}
// .date li{width: 1.3rem; float: left; line-height: .4rem; height: 1rem; flex-direction: column; font-size: .24rem; border-left: 1px solid #F5F5F5; border-right: 1px solid #F5F5F5; border-bottom: 1px solid #E5E5E5; color: #666;}
// .date li.cur{background-color: white; border-left: 1px solid #E5E5E5; border-right: 1px solid #E5E5E5; border-bottom: 1px solid white; color: @primary-color;}
// .date li:first-child{border-left: 1px solid #F5F5F5;}
// .date li:last-child{border-right: 1px solid #F5F5F5;}
// /* 预约时间 */
// .list-reservation .item{border-bottom: 1px solid #E5E5E5; height: 1.56rem; color: #222; font-size: .26rem; line-height: .35rem; justify-content: flex-start; justify-content: space-between} /*字体默认样式#222；大小.26rem；行高.4rem；*/
// .list-reservation .item:last-child{border-bottom: none;}
// .list-reservation .left{font-size: .28rem; width: 1.56rem; flex-direction: column;}
// .list-reservation .middle{flex: 1;}
// .list-reservation .middle h5{font-size: .32rem; line-height: .5rem;}
// .list-reservation .middle p{color: #999;}
// .list-reservation .right{width: 1.22rem; height: .58rem; border-radius: .5rem; border: 1px solid @primary-color; color: @primary-color; line-height: .58rem; text-align: center; margin-right: .3rem;}
/* 坐诊医生 */
@import '../assets/styles/user-item.css';
// .user-item .item{height: 1.56rem; justify-content: space-between; border-bottom: 1px solid #E5E5E5;}
// .user-item .item:last-child{border-bottom: none;}
// .user-item .left{width: 1.56rem;}
// .user-item .left img{width: 1rem; height: 1rem; border-radius: 50%;}
// .user-item .middle{width: 4.94rem;}
// .user-item .middle h5{font-size: .32rem; color: #222; height: .6rem; justify-content: flex-start;}
// .user-item .middle h5 span{padding-left: .2rem; padding-right: .15rem; line-height: .36rem; border: 1px solid #007DB2; color: #007DB2; font-size: .24rem; border-radius: .06rem; margin-left: .3rem;}
// .user-item .middle p{width: 100%; font-size: .24rem; color: #999;}
// .user-item .right{width: 1rem;}
// .user-item .right img{width: .12rem; height: .21rem;}
/* 分享弹窗 */
/* .sharePopup{background-color: white;}
.shareBox{justify-content: space-around; height: 3rem;}
.shareBox > div{flex-direction: column;}
.shareBox > div span{font-size: .28rem; color: #666; line-height: .6rem;}
.shareBox img{width: 1.3rem; height: 1.3rem;}
.cancleShare{line-height: 1rem; text-align: center; color: #222; font-size: .32rem; border-top: 1px solid #e5e5e5;} */
</style>
<style>
/* 轮播 */
@import '../assets/styles/swiper.css';</style>
</style>
<template>
    <div class="container">
        <m-header v-bind="headerData"></m-header>
        <!-- 店铺信息 -->
        <div class="store-info group">
            <div class="top">
                <div class="left flex-center">
                    <img :src="storeInfo.Logo" alt="">
                </div>
                <div class="right flex-center">
                    <div>
                        <h5>{{storeInfo.ShopName}}</h5>
                        <h6>关注数 <span>{{storeInfo.Fans}}</span> 好评率 <span>{{storeInfo.Reputation}}</span></h6>
                    </div>
                    <!-- <img src="../assets/images/list_icon_right.png" alt=""> -->
                </div>
            </div>
            <router-link :to="'/map?lng='+lng+'&lat='+lat+'&ShopName='+storeInfo.ShopName" class="bottom">
                <div class="left flex-center">
                    <img src="../assets/images/shop_icon_location.png" alt="">
                </div>
                <div class="right flex-center">
                    <span>{{storeInfo.address}}</span>
                    <img src="../assets/images/list_icon_right.png" alt="">
                </div>
            </router-link>
        </div><!-- 店铺信息 -->
        <!-- 轮播 -->
        <swiper loop auto dots-position="center" dots-class="banner-dots" :list="banner" :show-desc-mask="false"></swiper>
        <!-- 轮播 END -->
        <!-- 在线预约&坐诊医生 -->
        <div class="reservation">
            <div class="leader">
                <div :class="tab == 0 ? 'cur' : ''" @click="tab = 0">在线预约</div>
                <div :class="tab == 1 ? 'cur' : ''" @click="getDoctorList">坐诊医生</div>
            </div>
            <!-- 预约 -->
            <schedul v-if="tab == 0" :ecaid="userid"></schedul>
            <!-- <div v-if="tab == 0"> -->
                <!-- 日期选择 -->
                <!-- <div class="date">
                    <ul>
                        <li :class="['flex-center',dateTab == i ? 'cur':'']" v-for="(v,i) in dateList" :key="i" @click="selectECASchedul(i)">
                            <p>{{v.date}}</p>
                            <span>{{v.week}}</span>
                        </li>
                    </ul>
                </div> -->
                <!-- 预约时间 -->
                <!-- <div class="list-reservation">
                    <div class="item flex-center" v-for="(v,i) in bookList" :key="i">
                        <div class="left flex-center">
                            <p>{{v.DDate == null?'08:00:00':v.DDate.split(" ")[1]}}</p>
                            <p>~</p>
                            <p>{{v.DTime == null?'18:00:00':v.DTime.split(" ")[1]}}</p>
                        </div>
                        <div class="middle">
                            <h5>{{v.DNickName}}</h5>
                            <p>价格 ¥{{v.Price}}</p>
                            <p>剩余名额 {{v.Stock}}人</p>
                        </div>
                        <router-link class="right" :to="'/doctor?id='+v.id">预定</router-link>
                    </div>
                </div> -->
                <!-- 预约时间 END -->
            <!-- </div> -->
            <!-- 预约 END-->


            <!-- 坐诊医生 -->
            <div class="user-item" v-else>
                <m-default v-if="doctorList.length == 0" :data="defaultData"></m-default>
                <template v-else>
                    <router-link :to="'/doctor?doctorId='+v.id" class="item flex-center" v-for="(v,i) in doctorList" :key="i">
                        <div class="left flex-center">
                            <img :src="v.FileUrl" alt="">
                        </div>
                        <div class="middle">
                            <h5 class="flex-center">{{v.NickName}} <span>主任医师</span></h5>
                            <p class="ellipsis">医师简介：{{v.Detail}}</p>
                        </div>
                        <div class="right flex-center">
                            <img src="../assets/images/list_icon_right.png" alt="">
                        </div>
                    </router-link>
                </template>
            </div>
            <!-- 坐诊医生 END-->
        </div>
        <!-- 在线预约&坐诊医生 END -->
        <!-- 分享弹窗 -->
        <!-- <popup v-model="showShare" @on-hide="log('hide')" class="sharePopup" @on-show="log('show')">
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
            <div class="cancleShare" @click="showShare = false">取消</div>
        </popup> -->
        <!-- 分享弹窗 END-->
        <m-footer tab="1"></m-footer>
    </div>
</template>
<script>
import mFooter from '../components/footer'
import {Swiper} from 'vux';
import mHeader from '../components/header';
import schedul from '../components/select-ECA-schedul'
import {preToFixed} from '../utils/filter'
import mDefault from '../components/default'
const {getECAInfo,getECAScheduling,getECADoctorList} = require("../utils/request")
export default {
    components:{
        mHeader,
        Swiper,
        schedul,
        mDefault,
        mFooter
    },
    data(){
        return{
            defaultData:{
                title: '暂无医师',
                icon: require('../assets/images/default/star-144.png')
            },
            headerData:{
                back: true,
                title: "门店",
                share: true,
            },
            storeInfo:{
                Logo: require("../assets/images/tmp/1.jpg"),
                ShopName: '测试数据',
                Fans: 999,
                Reputation: '100%',
                address: '广州大学华软软件学院'
            },               //店铺信息
            // showShare: false,           //分享弹窗
            lng: '',                    //横坐标
            lat: '',                    //纵坐标
            tab: 0,                     //0:预约时间 || 1:坐诊医生
            ecaid:'',
            banner : [
                {
                //banner Swiper数据
                url: "javascript:",
                img: require("../assets/images/tmp/1.jpg")
                },
                {
                url: "javascript:",
                img: require("../assets/images/tmp/2.jpg")
                },
                {
                url: "javascript:",
                img: require("../assets/images/tmp/3.jpg")
                }
            ],
            doctorList: [],
            userid: '',
        }
    },
    methods:{
        //获取ECA店医师列表
        getDoctorList(){
            this.tab = 1;
            if(this.doctorList.length == 0){
                var that = this;
                getECADoctorList(this.storeInfo.UserId,function(data){
                    that.doctorList = data
                })
            }
        },
    },
    mounted(){
        this.ecaid = this.$route.query.ecaid
        this.lng = this.$route.query.lng
        this.lat = this.$route.query.lat
        var that = this,
            storeAddress = this.$route.query.address;
        //请求门店详细信息
        getECAInfo(this.ecaid,function(data){
            console.log(data)
            var banner = data.Banner,
                tmpbanner = [];
            for(let i of banner){
                tmpbanner.push({
                    img: i.FileUrl,
                    url: i.Hyperlink
                })
            }
            that.banner = tmpbanner;
            that.storeInfo = data.Info;
            that.userid = data.Info.UserId;
            console.log(that.ecaid)
            that.storeInfo.address = storeAddress
        });
    }
}
</script>
